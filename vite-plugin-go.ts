import type { Plugin, ViteDevServer } from 'vite'
import { spawn, type ChildProcess } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

export interface GoBuildOptions {
  args?: string[]
  outputDir?: string
  outputBin?: string
  embedDir?: string
  buildFlags?: string[]
  buildTags?: string[]
}

export interface GoPluginOptions {
  cmd?: string
  args?: string[]
  bin?: string
  binArgs?: string[]
  delay?: number
  killDelay?: number
  stopOnError?: boolean
  excludeDir?: string[]
  excludeRegex?: string[]
  extensions?: string[]
  log?: boolean
  build?: GoBuildOptions
}

interface ResolvedBuildOptions {
  outputDir: string
  outputBin: string
  embedDir: string
  args: string[]
  buildFlags: string[]
  buildTags: string[]
}

const defaults: Required<Omit<GoPluginOptions, 'build'>> & { build: Required<GoBuildOptions> } = {
  cmd: 'go',
  args: ['build', '-o', 'build/debug/gogon', '.'],
  bin: '',
  binArgs: ['serve'],
  delay: 1000,
  killDelay: 300,
  stopOnError: false,
  excludeDir: ['vendor', 'node_modules', 'web/dist', 'tmp', '.git', 'build'],
  excludeRegex: ['_test\\.go$'],
  extensions: ['go'],
  log: true,
  build: {
    args: [],
    outputDir: '',
    outputBin: '',
    embedDir: 'web/dist',
    buildFlags: [],
    buildTags: ['release'],
  },
}

function inferBin(args: string[]): string {
  const oIdx = args.indexOf('-o')
  if (oIdx !== -1 && oIdx + 1 < args.length) return args[oIdx + 1]
  return 'build/debug/gogon'
}

function matchAny(value: string, patterns: string[]): boolean {
  return patterns.some((p) => new RegExp(p).test(value))
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function formatFileSize(bytes: number): string {
  const mb = (bytes / (1024 * 1024)).toFixed(2)
  const kb = (bytes / 1024).toFixed(1)
  return bytes >= 1024 * 1024 ? `${mb} MB` : `${kb} KB`
}

function formatBuildInfo(buildOpts: ResolvedBuildOptions): string[] {
  const isProduction = process.env.NODE_ENV === 'production'
  const mode = isProduction ? 'release' : 'debug'
  const tags = buildOpts.buildTags.length > 0 ? buildOpts.buildTags.join(', ') : 'none'

  const lines: string[] = []
  lines.push(`  mode     ${mode}`)
  lines.push(`  tags     ${tags}`)

  if (buildOpts.buildFlags.length > 0) {
    lines.push(`  flags    ${buildOpts.buildFlags.join(' ')}`)
  }

  lines.push(`  embed    ${buildOpts.embedDir}`)
  lines.push(`  output   ${buildOpts.outputDir}/${buildOpts.outputBin}`)

  return lines
}

function resolveBuildOptions(
  devArgs: string[],
  userBuild: GoBuildOptions | undefined,
): ResolvedBuildOptions {
  const isProduction = process.env.NODE_ENV === 'production'

  const outputDir = userBuild?.outputDir || (isProduction ? 'build/release' : 'build/debug')
  const outputBin = userBuild?.outputBin || inferBin(devArgs).split('/').pop() || 'gogon'
  const embedDir = userBuild?.embedDir || 'web/dist'
  const buildFlags = userBuild?.buildFlags || []
  const buildTags = userBuild?.buildTags || defaults.build.buildTags

  let buildArgs: string[]
  if (userBuild?.args && userBuild.args.length > 0) {
    buildArgs = [...userBuild.args]
  } else {
    const oIdx = devArgs.indexOf('-o')
    if (oIdx !== -1 && oIdx + 1 < devArgs.length) {
      buildArgs = [...devArgs]
      buildArgs[oIdx + 1] = `${outputDir}/${outputBin}`
    } else {
      buildArgs = ['build', '-o', `${outputDir}/${outputBin}`, '.']
    }
  }

  if (buildTags.length > 0) {
    buildArgs.splice(1, 0, '-tags', buildTags.join(','))
  }

  if (buildFlags.length > 0) {
    buildArgs.splice(1, 0, ...buildFlags)
  }

  return { outputDir, outputBin, embedDir, args: buildArgs, buildFlags, buildTags }
}

export function goPlugin(userOptions: GoPluginOptions = {}): Plugin {
  if (process.env.VITEST) {
    return { name: 'vite-plugin-go' }
  }

  const opts = {
    ...defaults,
    ...userOptions,
    bin: userOptions.bin || inferBin(userOptions.args ?? defaults.args),
    build: { ...defaults.build, ...userOptions.build },
  }

  const excludeDirPatterns = opts.excludeDir.map(
    (d) => `[\\/]${path.normalize(d)}[\\/]`,
  )
  const allExcludePatterns = [...excludeDirPatterns, ...opts.excludeRegex]
  let goProcess: ChildProcess | null = null
  let buildTimer: ReturnType<typeof setTimeout> | null = null
  let isBuilding = false
  let disposed = false

  const buildOpts = resolveBuildOptions(opts.args, userOptions.build)

  function log(msg: string) {
    if (opts.log) console.log(`\x1b[36m[go]\x1b[0m ${msg}`)
  }

  function killGo() {
    if (!goProcess) return
    try {
      process.kill(-goProcess.pid!, 'SIGTERM')
    } catch {
      goProcess.kill('SIGTERM')
    }
    goProcess = null
  }

  function dispose() {
    if (disposed) return
    disposed = true
    if (buildTimer) clearTimeout(buildTimer)
    killGo()
    log('stopped')
  }

  function startBinary() {
    goProcess = spawn(opts.bin, opts.binArgs, {
      stdio: 'inherit',
      detached: true,
    })
  }

  function buildAndStart() {
    if (isBuilding || disposed) return
    if (buildTimer) clearTimeout(buildTimer)

    buildTimer = setTimeout(() => {
      isBuilding = true
      log('building...')

      const buildProcess = spawn(opts.cmd, opts.args, { stdio: 'pipe' })
      let stderr = ''

      buildProcess.stderr?.on('data', (data: Buffer) => {
        stderr += data.toString()
      })

      buildProcess.on('close', (code) => {
        isBuilding = false
        buildTimer = null

        if (code === 0) {
          log('built successfully')
          setTimeout(() => {
            if (disposed) return
            killGo()
            startBinary()
          }, opts.killDelay)
        } else {
          log(`build failed (exit code ${code})`)
          if (stderr) console.error(stderr)
          if (opts.stopOnError) {
            killGo()
          }
        }
      })
    }, opts.delay)
  }

  function initialBuild() {
    isBuilding = true
    log('building...')

    const buildProcess = spawn(opts.cmd, opts.args, { stdio: 'pipe' })
    let stderr = ''

    buildProcess.stderr?.on('data', (data: Buffer) => {
      stderr += data.toString()
    })

    buildProcess.on('close', (code) => {
      isBuilding = false
      if (disposed) return

      if (code === 0) {
        log('built successfully')
        startBinary()
      } else {
        log(`build failed (exit code ${code})`)
        if (stderr) console.error(stderr)
      }
    })
  }

  function shouldWatch(filePath: string): boolean {
    const ext = path.extname(filePath).slice(1)
    if (!opts.extensions.includes(ext)) return false
    if (matchAny(filePath, allExcludePatterns)) return false
    return true
  }

  return {
    name: 'vite-plugin-go',
    configureServer(_server: ViteDevServer) {
      initialBuild()

      _server.watcher.on('change', (file: string) => {
        if (isBuilding || disposed) return
        if (!shouldWatch(file)) return
        buildAndStart()
      })

      const onSignal = () => {
        dispose()
        process.exit(0)
      }
      process.on('SIGINT', onSignal)
      process.on('SIGTERM', onSignal)
    },
    closeBundle: {
      sequential: true,
      order: 'post',
      handler() {
        const embedDir = buildOpts.embedDir
        if (!fs.existsSync(embedDir)) {
          log(`embed directory "${embedDir}" not found, skipping go build`)
          return
        }

        fs.mkdirSync(buildOpts.outputDir, { recursive: true })

        log('building binary...')
        for (const line of formatBuildInfo(buildOpts)) {
          log(line)
        }

        const startTime = Date.now()
        const buildProcess = spawn(opts.cmd, buildOpts.args, { stdio: 'pipe' })
        let stderr = ''

        buildProcess.stderr?.on('data', (data: Buffer) => {
          stderr += data.toString()
        })

        return new Promise<void>((resolve) => {
          buildProcess.on('close', (code) => {
            const duration = Date.now() - startTime

            if (code === 0) {
              const binPath = `${buildOpts.outputDir}/${buildOpts.outputBin}`
              const stat = fs.statSync(binPath)
              log(`binary built → ${binPath} (${formatFileSize(stat.size)}) in ${formatDuration(duration)}`)
            } else {
              log(`build failed (exit code ${code}) in ${formatDuration(duration)}`)
              if (stderr) console.error(stderr)
              process.exitCode = 1
            }
            resolve()
          })
        })
      },
    },
  }
}
