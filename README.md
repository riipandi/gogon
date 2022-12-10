# Go Gin Project Starter

[![License](https://img.shields.io/github/license/riipandi/gogon?style=flat-square)](https://github.com/riipandi/gogon/blob/master/LICENSE)
[![Contributions](https://img.shields.io/badge/Contributions-welcome-blue.svg?style=flat-square)](./CODE_OF_CONDUCT.md)
[![GitHub contributors](https://img.shields.io/github/contributors/riipandi/gogon?style=flat-square)](https://github.com/riipandi/gogon/graphs/contributors)
[![Sponsors](https://img.shields.io/static/v1?color=26B643&label=Sponsor&message=%E2%9D%A4&logo=GitHub&style=flat-square)](https://github.com/sponsors/riipandi)
[![Twitter](https://img.shields.io/twitter/follow/riipandi?style=social)](https://twitter.com/riipandi)

---

> WIP! Golang starter project template with Gin, Cobra, and Viper.

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
fly secrets set $(cat env.fly | xargs -I %s echo %s)
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

## License

This project is open-sourced software licensed under the [MIT license](https://aris.mit-license.org).

Copyrights in this project are retained by their contributors.
See the [license file](./LICENSE) for more information.
