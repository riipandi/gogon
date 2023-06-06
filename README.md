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

In this repo I'm using [Bunrouter][bunrouter] from [Uptrace][uptrace], but you can change it with whatever library you want.

## Quick Start

> **_Warning! This project still WIP!_**

## Build Container

```sh
echo $GITHUB_TOKEN | docker login ghcr.io --username YOUR_USERNAME --password-stdin
echo $DOCKER_TOKEN | docker login docker.io --username YOUR_USERNAME --password-stdin
```

## Deployment to Fly.io

### Create app instances

```sh
# Create Fly.io app
fly apps create gogon --org personal

# Create volume for the data.
fly postgres create --org personal --name gogon-db --region sjc --password $(openssl rand -hex 8)
```

### Launch and deploy

```sh
# Attach Postgres database
fly postgres attach gogon-db -a gogon

# Load secrets from dotenv file then initialize deployment
fly secrets set $(cat .env | xargs -I %s echo %s)
fly secrets list

# Deploy the app
fly deploy --remote-only
```

### Setup custom domain

Point DNS A Record to the assigned IP address.
Or, if using subdomain you can point `gogon.fly.dev` CNAME record.

```sh
# Allocate IPs and setup custom domain (optional)
fly ips allocate-v4 -a gogon
fly ips allocate-v6 -a gogon
fly certs create api.example.com -a gogon
```

## References

- [Choosing the Right Go Web Framework](https://brunoscheufler.com/blog/2019-04-26-choosing-the-right-go-web-framework)
- [How To Structure A Golang Project](https://blog.boot.dev/golang/golang-project-structure)
- [How to Structure Your Project in Golang](https://medium.com/geekculture/how-to-structure-your-project-in-golang-the-backend-developers-guide-31be05c6fdd9)

## License

This project is open-sourced software licensed under the [MIT license](https://aris.mit-license.org).

Copyrights in this project are retained by their contributors.
See the [license file](./LICENSE) for more information.

---

<sub>🤫 Psst! You can [support my work here](https://github.com/sponsors/riipandi).</sub>

[cobra]: https://cobra.dev/
[viper]: https://github.com/spf13/viper
[bunrouter]: https://github.com/uptrace/bunrouter
[uptrace]: https://uptrace.dev/
