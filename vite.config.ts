import path from 'node:path'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { goPlugin } from './vite-plugin-go'

export default defineConfig({
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({
      routesDirectory: path.resolve('./app/routes'),
      generatedRouteTree: path.resolve('./app/routes.gen.ts'),
      autoCodeSplitting: true,
      target: 'react'
    }),
    viteReact(),
    goPlugin({
      args: ['build', '-o', 'build/debug/gogon', '.'],
      build: {
        outputDir: 'build/release',
        buildFlags: ['-trimpath'],
        buildTags: ['release'],
      },
    }),
  ],
  resolve: {
    alias: {'#': path.resolve(__dirname, './app')},
    tsconfigPaths: true,
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024,
    reportCompressedSize: false,
    outDir: 'web/dist',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ''),
      },
    },
  },
})
