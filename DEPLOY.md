# Deployment to Fly.io

## Create app instances

```sh
# Create Fly.io app
fly apps create gogon

# Create volume for the data.
fly postgres create --name gogon-db --region sjc --password $(openssl rand -hex 8)
```

## Launch and deploy

```sh
# Attach Postgres database
fly postgres attach gogon-db -a gogon

# Load secrets from dotenv file then initialize deployment
fly secrets set $(cat .env | xargs -I %s echo %s)
fly secrets list

# Deploy the app
fly deploy --remote-only
```

## Setup custom domain

Point DNS A Record to the assigned IP address.
Or, if using subdomain you can point `gogon.fly.dev` CNAME record.

```sh
# Allocate IPs and setup custom domain (optional)
fly ips allocate-v4 -a gogon
fly ips allocate-v6 -a gogon
fly certs create api.example.com -a gogon
```
