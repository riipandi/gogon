# -----------------------------------------------------------------------------
# Build the application binaries
# -----------------------------------------------------------------------------
FROM golang:1.19-alpine as builder
ARG VERSION 0.0.0
ENV VERSION $VERSION
ENV CGO_ENABLED 0
ENV GIN_MODE release
WORKDIR /app

COPY . .
RUN go mod download && go mod tidy && \
  go build -ldflags='-w -s -extldflags "-static"' \
  -a -v -o gogon cmd/app/main.go

# -----------------------------------------------------------------------------
# Use the slim image for a lean production container.
# -----------------------------------------------------------------------------
FROM alpine:3.17 as runner
LABEL org.opencontainers.image.source="https://github.com/riipandi/gogon"

ARG PORT 8000
ENV PORT $PORT
ENV GIN_MODE release

COPY --from=builder --chown=groot:groot /app/init/entrypoint.sh /usr/bin
RUN apk update && apk add --no-cache ca-certificates && rm -rf /var/cache/apk/* \
  && addgroup -g 1001 -S groot && adduser -S groot -u 1001 \
  && mkdir -p /appdata && chown -R groot:groot /appdata \
  && chown groot:groot /usr/bin/entrypoint.sh \
  && chmod +x /usr/bin/entrypoint.sh

COPY --from=builder --chown=groot:groot /app/gogon /usr/bin

USER groot
EXPOSE $PORT

# ENTRYPOINT [ "sh", "-c", "gogon serve --host 0.0.0.0:8000", "--" ]

ENTRYPOINT [ "/usr/bin/entrypoint.sh", "--" ]
