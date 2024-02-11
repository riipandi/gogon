# syntax=docker/dockerfile:1.4

# Arguments with default value (for build).
ARG GO_VERSION=1.22
ARG NODE_VERSION=20

# -----------------------------------------------------------------------------
# This is base image with `pnpm` package manager
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS base-frontend
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk update && apk add --no-cache tini curl jq libc6-compat
RUN corepack enable && corepack prepare pnpm@latest-8 --activate
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
WORKDIR /srv
ENV HUSKY 0

# -----------------------------------------------------------------------------
# Build the application
# -----------------------------------------------------------------------------
FROM base-frontend AS frontend
COPY --chown=node:node . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store NODE_ENV=production node esbuild.config.js

# -----------------------------------------------------------------------------
# Build the application binaries
# -----------------------------------------------------------------------------
FROM golang:${GO_VERSION}-alpine as builder
WORKDIR /srv

ARG BUILD_VERSION 0.0.0
ENV BUILD_VERSION $BUILD_VERSION
ENV CGO_ENABLED 0

COPY --from=frontend /srv /srv

RUN --mount=type=cache,id=go,target=/go/pkg/mod \
  --mount=type=cache,id=go,target=/root/.cache/go-build \
  go install github.com/a-h/templ/cmd/templ@latest && templ \
  generate

RUN --mount=type=cache,id=go,target=/go/pkg/mod \
  --mount=type=cache,id=go,target=/root/.cache/go-build \
  go mod download && go mod tidy && go build \
  --ldflags="-w -s -extldflags '-static' \
    -X github.com/riipandi/gogon/pkg.Version=${BUILD_VERSION} \
    -X github.com/riipandi/gogon/pkg.BuildDate=$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  -trimpath -a -o gogon cmd/app/main.go

# -----------------------------------------------------------------------------
# Use the slim image for a lean production container.
# -----------------------------------------------------------------------------
FROM alpine:3.18 as runner
LABEL org.opencontainers.image.source="https://github.com/riipandi/gogon"

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

# Don't run production as root, spawns command as a child process.
RUN addgroup --system --gid 1001 nonroot && adduser --system --uid 1001 nonroot
RUN apk update && apk add --no-cache tini ca-certificates
RUN mkdir -p /appdata && chown -R nonroot:nonroot /appdata

COPY --from=builder --chown=nonroot:nonroot /srv/gogon /usr/bin/gogon

USER nonroot
EXPOSE 3080

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/bin/gogon", "--address", "0.0.0.0:3080"]
