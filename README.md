<img src="https://i.imgur.com/vJfIiId.png" alt="banner" align="left" height="220" />

Golang starter project template with [Cobra][cobra], [Viper][viper], and whatever router library you want to use.
This aims to make you able to quickly create awesome app without having to bother with the
initial setup.

[![Go](https://img.shields.io/badge/Go-1.26-blue.svg?logo=Go&logoColor=white)](https://go.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg?logo=typescript&logoColor=blue)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev)
[![Go Report Card](https://goreportcard.com/badge/github.com/riipandi/gogon)](https://goreportcard.com/report/github.com/riipandi/gogon)
[![Contributions](https://img.shields.io/badge/Contributions-welcome-blue.svg?color=gray)](https://github.com/riipandi/gogon/graphs/contributors)
<!-- [![Release](https://img.shields.io/github/v/release/riipandi/gogon?logo=docker&logoColor=white)](https://github.com/riipandi/gogon/releases) -->
<!-- [![CI Test](https://github.com/riipandi/gogon/actions/workflows/test.yml/badge.svg)](https://github.com/riipandi/gogon/actions/workflows/test.yml) -->
<!-- [![CI Release](https://github.com/riipandi/gogon/actions/workflows/release.yml/badge.svg)](https://github.com/riipandi/gogon/actions/workflows/release.yml) -->

---

```bash
pnpm dlx tiged riipandi/gogon myapp-name
```

In this repo I'm using [go-chi][go-chi], but you can change it with whatever library you want.

## 🏁 Quick Start

You will need [`Go >=1.26`][golang], [`Node.js >= 24.14`][nodejs], [`PNPM >= 10.33`][pnpm],
and [`Docker >= 20.10`][docker] installed on your machine.

Also, you need to install the following tools:

```sh
go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@latest
go install github.com/bufbuild/buf/cmd/buf@latest
go install github.com/swaggo/swag/cmd/swag@latest

go get -tool google.golang.org/protobuf/cmd/protoc-gen-go@latest
go get -tool connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
```

### Up and Running

1. Install the required toolchain & SDK.
2. Install the required dependencies: `pnpm install && go mod tidy`
3. Create `.env` file or copy from `.env.example`, then configure required variables.
4. Geneate application secret key: `pnpm generate:key`
5. Geneate Connect RPC proto: `pnpm generate:proto`
6. Run project in development mode: `pnpm dev`

Vite serves the frontend on `:3000` and proxies `/api/*` to Go on `:3080`.
Go files are watched and auto-rebuilt. Produces a single binary with the frontend embedded.
No web server needed.

### Available tasks for this project

| Command      | Description                                     |
|--------------|-------------------------------------------------|
| `pnpm dev`   | Vite dev server (:3000) + Go API server (:3080) |
| `pnpm build` | Build frontend + Go binary (single file)        |
| `pnpm start` | Run the production binary                       |
| `pnpm cmd`   | Run Go server directly (`go run -tags debug .`) |
| `pnpm test`  | Run tests (frontend and backend)                |

## Test ConnectRPC
```sh
curl -sSL http://localhost:3000/rpc/api.myapp.v1.GreetService/Greet \
  -H "Content-Type: application/json" -d '{"name": "John"}'
```

## 🐳 Publishing Docker Image

Sign in to container registry:

```sh
echo $REGISTRY_TOKEN | docker login REGISTRY_URL --username YOUR_USERNAME --password-stdin
```

Replace `REGISTRY_URL` with your container registry, ie: `ghcr.io` or `docker.io`

Push docker image:

```sh
pnpm docker:push
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

[![Creator Badge](https://badgen.net/badge/icon/by%20Aris%20Ripandi?label&color=black&labelColor=black)][riipandi-twitter]

[cobra]: https://cobra.dev/
[viper]: https://github.com/spf13/viper
[go-chi]: https://github.com/go-chi/chi
[golang]: https://go.dev/doc/install
[nodejs]: https://nodejs.org/en/download
[docker]: https://docs.docker.com/engine/install/
[pnpm]: https://pnpm.io/installation
[license-mit]: https://choosealicense.com/licenses/mit/
[license-apache]: https://choosealicense.com/licenses/apache-2.0/
[riipandi-twitter]: https://twitter.com/intent/follow?screen_name=riipandi
