# syntax=docker/dockerfile:1.4

# -----------------------------------------------------------------------------
# Build the application binaries
# -----------------------------------------------------------------------------
FROM golang:1.20-alpine as builder
WORKDIR /app

ARG BUILD_VERSION 0.0.0
ENV BUILD_VERSION $BUILD_VERSION
ENV CGO_ENABLED 0

COPY . .
RUN go mod download && go mod tidy
RUN export BUILD_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)" &&\
  export PKG_PREFIX="github.com/riipandi/gogon/pkg/config" &&\
  go build -trimpath -ldflags="-w -s -X ${PKG_PREFIX}.Version=${BUILD_VERSION} \
  -X ${PKG_PREFIX}.BuildDate=${BUILD_DATE} -extldflags '-static'" \
  -a -v -o gogon cmd/app/main.go

# -----------------------------------------------------------------------------
# Use the slim image for a lean production container.
# -----------------------------------------------------------------------------
FROM alpine:3.17 as runner
LABEL org.opencontainers.image.source="https://github.com/riipandi/gogon"

RUN apk -U upgrade && apk add --no-cache dumb-init ca-certificates
RUN addgroup -g 1001 -S groot && adduser -S groot -u 1001
RUN mkdir -p /appdata && chown -R groot:groot /appdata

COPY --from=builder --chown=groot:groot /app/gogon /usr/bin/gogon

USER groot
EXPOSE 9090

ENTRYPOINT ["/usr/bin/gogon", "--address", "0.0.0.0:9090"]
