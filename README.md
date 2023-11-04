<img src="https://i.imgur.com/vJfIiId.png" alt="banner" align="left" height="220" />

Golang starter project template with [Cobra][cobra], [Viper][viper], and whatever router library you want to use.
This aims to make you able to quickly create awesome app without having to bother with the
initial setup.

This repository contains a **Go** starter project template.

[![Contributions](https://img.shields.io/badge/Contributions-welcome-blue.svg?style=flat-square&color=blueviolet)](https://github.com/riipandi/gogon/graphs/contributors)
[![Go Report Card](https://goreportcard.com/badge/github.com/riipandi/gogon?style=flat-square)](https://goreportcard.com/report/github.com/riipandi/gogon)
[![License](https://img.shields.io/github/license/riipandi/gogon?style=flat-square&color=informational)](https://github.com/riipandi/gogon/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/riipandi?style=flat-square&color=00acee)](https://twitter.com/riipandi)

```bash
npx degit riipandi/gogon myapp-name
```

In this repo I'm using [go-chi][go-chi], but you can change it with whatever library you want.

## 🏁 Quick Start

You will need `Go >=1.21.3`, `Docker >= 20.10`, and `Taskfile` installed on your machine.

### Up and Running

1. Install the required toolchain & SDK: [Go](https://go.dev/doc/install), [Docker][docker], and [Taskfile][taskfile].
2. Install the required dependencies using this command: `go mod download && go mod vendor`
3. Create `.env` file or copy from `.env.example`, then configure required variables.
4. Run project in development mode: `task dev`

Type `task --list-all` on your terminal and see the available commands.

## 🐳 Docker Container

### Build Container

```sh
task docker-build
```

### Testing Container

```sh
docker run --rm -it -p 3080:3080 --name gogon --env-file .env gogon
```

### Push Images

```sh
# Sign in to container registry
echo $GITHUB_TOKEN | docker login ghcr.io --username YOUR_USERNAME --password-stdin
echo $DOCKER_TOKEN | docker login docker.io --username YOUR_USERNAME --password-stdin

# Push docker image
docker push riipandi/gogon:latest
```

## 🚀 Deployment

Read [DEPLOY.md](./DEPLOY.md) for detailed documentation.

## 📚 References

- [Choosing the Right Go Web Framework](https://brunoscheufler.com/blog/2019-04-26-choosing-the-right-go-web-framework)
- [How To Structure A Golang Project](https://blog.boot.dev/golang/golang-project-structure)
- [How to Structure Your Project in Golang](https://medium.com/geekculture/how-to-structure-your-project-in-golang-the-backend-developers-guide-31be05c6fdd9)

## 🪪 License

This project is open-sourced software licensed under the [MIT license](https://aris.mit-license.org).

Copyrights in this project are retained by their contributors.
See the [license file](./LICENSE) for more information.

---

<sub>🤫 Psst! You can [support my work here](https://github.com/sponsors/riipandi).</sub>

[cobra]: https://cobra.dev/
[viper]: https://github.com/spf13/viper
[go-chi]: https://github.com/go-chi/chi
[docker]: https://docs.docker.com/engine/install/
[taskfile]: https://taskfile.dev/installation
