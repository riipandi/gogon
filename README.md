<img src="https://i.imgur.com/vJfIiId.png" alt="banner" align="left" height="220" />

Golang starter project template with [Cobra][cobra], [Viper][viper], and whatever router library you want to use.
This aims to make you able to quickly create awesome app without having to bother with the
initial setup.

This repository contains a **Go** starter project template.

[![CI Test](https://github.com/riipandi/gogon/actions/workflows/release.yml/badge.svg)](https://github.com/riipandi/gogon/actions/workflows/release.yml)
[![CI Release](https://github.com/riipandi/gogon/actions/workflows/test.yml/badge.svg)](https://github.com/riipandi/gogon/actions/workflows/test.yml)
[![Go Report Card](https://goreportcard.com/badge/github.com/riipandi/gogon)](https://goreportcard.com/report/github.com/riipandi/gogon)
[![Contributions](https://img.shields.io/badge/Contributions-welcome-blue.svg?color=gray)](https://github.com/riipandi/gogon/graphs/contributors)

```bash
npx degit riipandi/gogon myapp-name
```

In this repo I'm using [go-chi][go-chi], but you can change it with whatever library you want.

## 🏁 Quick Start

You will need [`Go >=1.22`][golang], [`Docker >= 20.10`][docker], [`air >= 1.49.0`][air],
and [`Taskfile >= 3.34`][taskfile] installed on your machine.

### Up and Running

1. Install the required toolchain & SDK: [Go][golang], [Docker][docker], [air][air], and [Taskfile][taskfile].
2. Install the required dependencies: `task dev:install`
3. Geneate application secret key: `task generate-key`
3. Create `.env` file or copy from `.env.example`, then configure required variables.
4. Run project in development mode: `task dev`

### Available tasks for this project

Type `task --list-all` on your terminal and see the available commands.

| Command                 | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `task start`            | Run the compiled application                    |
| `task generate-key`     | Generate a random secret key                    |
| `task update-deps`      | Update NPM dependencies                         |
| `task build`            | Build the application binary                    |
| `task build:release`    | GoReleaser build and release                    |
| `task build:single`     | GoReleaser build single target                  |
| `task build:snapshot`   | GoReleaser relese snapshot                      |
| `task code:check`       | Check code quality                              |
| `task code:format`      | Format code                                     |
| `task code:lint`        | Lint code                                       |
| `task dev:cleanup`      | Stop dev server and cleanup generated files     |
| `task dev`              | Start development mode                          |
| `task dev:install`      | Install required dependencies                   |
| `task dev:prepare`      | Start the database and local mail server        |
| `task docker:build`     | Build Docker image                              |
| `task docker:migrate`   | Run database migrations inside Docker container |
| `task docker:push`      | Push Docker image to container registry         |
| `task docker:run`       | Run Docker container                            |
| `task docker:shell`     | Run Docker container shell                      |
| `task docker:validate`  | Validate docker compile application version     |

## 🐳 Publishing Docker Image

Sign in to container registry:

```sh
echo $REGISTRY_TOKEN | docker login REGISTRY_URL --username YOUR_USERNAME --password-stdin
```

Replace `REGISTRY_URL` with your container registry, ie: `ghcr.io` or `docker.io`

Push docker image:

```sh
task docker:push
```

## 🚀 Deployment

Read [DEPLOY.md](./DEPLOY.md) for detailed documentation.

## 📚 References

- [Choosing the Right Go Web Framework](https://brunoscheufler.com/blog/2019-04-26-choosing-the-right-go-web-framework)
- [How To Structure A Golang Project](https://blog.boot.dev/golang/golang-project-structure)
- [How to Structure Your Project in Golang](https://medium.com/geekculture/how-to-structure-your-project-in-golang-the-backend-developers-guide-31be05c6fdd9)

## 🪪 License

Licensed under either of [Apache License 2.0][license-apache] or [MIT license][license-mit] at your option.

> Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in this project by you,
> as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.

Copyrights in this project are retained by their contributors.

See the [LICENSE-APACHE](./LICENSE-APACHE) and [LICENSE-MIT](./LICENSE-MIT) files for more information.

---

<sub>🤫 Psst! If you like my work you can support me via [GitHub sponsors](https://github.com/sponsors/riipandi).</sub>

[![Twitter Badge](https://img.shields.io/badge/-%40riipandi-1ca0f1?style=flat&labelColor=0890f0&logo=twitter&logoColor=white)][riipandi-twitter]

[cobra]: https://cobra.dev/
[viper]: https://github.com/spf13/viper
[go-chi]: https://github.com/go-chi/chi
[golang]: https://go.dev/doc/install
[air]: https://github.com/cosmtrek/air?tab=readme-ov-file#installation
[docker]: https://docs.docker.com/engine/install/
[taskfile]: https://taskfile.dev/installation
[license-mit]: https://choosealicense.com/licenses/mit/
[license-apache]: https://choosealicense.com/licenses/apache-2.0/
[riipandi-twitter]: https://twitter.com/intent/follow?screen_name=riipandi
