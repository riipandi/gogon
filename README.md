<img src="https://i.imgur.com/vJfIiId.png" alt="banner" align="left" height="220" />

Golang starter project template with [Cobra][cobra], [Viper][viper], and whatever router library you want to use.
This aims to make you able to quickly create awesome app without having to bother with the
initial setup.

This repository contains a **Go** starter project template.

[![Contributions](https://img.shields.io/badge/Contributions-welcome-blue.svg?color=gray)](https://github.com/riipandi/gogon/graphs/contributors)
[![Go Report Card](https://goreportcard.com/badge/github.com/riipandi/gogon)](https://goreportcard.com/report/github.com/riipandi/gogon)
[![Twitter Badge](https://img.shields.io/badge/-%40riipandi-1ca0f1?style=flat&labelColor=0890f0&logo=twitter&logoColor=white)][riipandi-twitter]

```bash
npx degit riipandi/gogon myapp-name
```

In this repo I'm using [go-chi][go-chi], but you can change it with whatever library you want.

## 🏁 Quick Start

You will need `Go >=1.21`, `Docker >= 20.10`, and `Taskfile` installed on your machine.

### Up and Running

1. Install the required toolchain & SDK: [Go](https://go.dev/doc/install), [Docker][docker], and [Taskfile][taskfile].
2. Install the required dependencies: `task dev:install`
3. Geneate application secret key: `task generate-key`
3. Create `.env` file or copy from `.env.example`, then configure required variables.
4. Run project in development mode: `task dev`

### Available tasks for this project

Type `task --list-all` on your terminal and see the available commands.

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `start`            | Run the compiled application                    |
| `generate-key`     | Generate a random secret key                    |
| `update-deps`      | Update NPM dependencies                         |
| `build`            | Build the application binary                    |
| `build:publih`     | GoReleaser build and release                    |
| `build:single`     | GoReleaser build single target                  |
| `build:snapshot`   | GoReleaser relese snapshot                      |
| `code:check`       | Check code quality                              |
| `code:format`      | Format code                                     |
| `code:lint`        | Lint code                                       |
| `dev:cleanup`      | Stop dev server and cleanup generated files     |
| `dev`              | Start development mode                          |
| `dev:install`      | Install required dependencies                   |
| `dev:prepare`      | Start the database and local mail server        |
| `docker:build`     | Build Docker image                              |
| `docker:migrate`   | Run database migrations inside Docker container |
| `docker:push`      | Push Docker image to container registry         |
| `docker:run`       | Run Docker container                            |
| `docker:shell`     | Run Docker container shell                      |

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

[![Made by](https://badgen.net/badge/icon/Made%20by%20Aris%20Ripandi?icon=bitcoin-lightning&label&color=black&labelColor=black)][riipandi-twitter]

[cobra]: https://cobra.dev/
[viper]: https://github.com/spf13/viper
[go-chi]: https://github.com/go-chi/chi
[docker]: https://docs.docker.com/engine/install/
[taskfile]: https://taskfile.dev/installation
[license-mit]: https://choosealicense.com/licenses/mit/
[license-apache]: https://choosealicense.com/licenses/apache-2.0/
[riipandi-twitter]: https://twitter.com/intent/follow?original_referer=https://ripandis.com&screen_name=riipandi
