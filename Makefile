DEFAULT_VERSION=beta-`git rev-parse --short HEAD`
VERSION := $(or $(VERSION),$(DEFAULT_VERSION))

deps:
	go mod download && go mod tidy

dev:
	air -c config/air.config.toml
