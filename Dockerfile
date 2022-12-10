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

ENV GIN_MODE release
ENV BIND 0.0.0.0:8000

RUN apk update && apk add --no-cache ca-certificates \
  && rm -rf /var/cache/apk/* && addgroup -g 1001 -S groot \
  && adduser -S groot -u 1001 && mkdir -p /appdata \
  && chown -R groot:groot /appdata

COPY --from=builder --chown=groot:groot /app/gogon /usr/bin

USER groot
EXPOSE 8000

ENTRYPOINT [ "sh", "-c", "gogon serve --host ${BIND}", "--" ]
