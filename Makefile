DEFAULT_VERSION=beta-`git rev-parse --short HEAD`
VERSION := $(or $(VERSION),$(DEFAULT_VERSION))

deps:
	go mod download && go mod tidy

dev:
	air -c config/air.config.toml

build-all:
	CGO_ENABLED=0 go build -v -ldflags='-w -s -extldflags "-static"' -a -o build/gogon cmd/app/main.go
