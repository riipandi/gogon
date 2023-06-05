BUILD_VERSION := $(or $(BUILD_VERSION),git-`git rev-parse --short HEAD`)
BUILD_DATE = $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")
IMAGE_NAME = riipandi/gogon
CONTAINER_NAME = gogon

# Golang build flags
PKG_FLAGS_PREFIX = github.com/riipandi/gogon/pkg/config
LD_FLAGS = -w -s -extldflags '-static' -X $(PKG_FLAGS_PREFIX).Version=$(BUILD_VERSION) -X $(PKG_FLAGS_PREFIX).BuildDate=$(BUILD_DATE)

# --------------------------------------------------------------------------------------------------
# Development scripts
# --------------------------------------------------------------------------------------------------

clean:
	@find . -name *_gen.go -type f -delete

deps:
	@go mod download && go mod tidy && mkdir -p build

dev:
	@air -c config/air.config.toml

lint: gofmt
	@golangci-lint run -c golangci.yml ./...
	@gosec -quiet -no-fail ./...

build: clean deps
	@echo Running Build version $(BUILD_VERSION)
	@CGO_ENABLED=0 go build --ldflags="$(LD_FLAGS)" -a -o build/gogon cmd/app/main.go
	@ls -lAh build

# --------------------------------------------------------------------------------------------------
# Release scripts
# --------------------------------------------------------------------------------------------------

release-single:
	@goreleaser build --single-target --snapshot --rm-dist

release-snapshot:
	@goreleaser release --snapshot --rm-dist --skip-publish

release-publish:
	@goreleaser release --rm-dist

# --------------------------------------------------------------------------------------------------
# Docker scripts
# --------------------------------------------------------------------------------------------------

docker-build:
	@echo Running Docker Build version $(BUILD_VERSION)
	@DOCKER_BUILDKIT=1 docker build --build-arg BUILD_VERSION=$(BUILD_VERSION) \
	  	--build-arg BUILD_DATE=$(BUILD_DATE) \
		-t $(IMAGE_NAME):$(BUILD_VERSION) \
		-t $(IMAGE_NAME):latest .

docker-push:
	docker push $(IMAGE_NAME):latest && docker push $(IMAGE_NAME):0.1.0

docker-run:
	docker run --rm -it --name $(CONTAINER_NAME) -e PORT=8000 -p 8000:8000 $(IMAGE_NAME):latest

docker-shell:
	docker run --rm -it --entrypoint sh $(IMAGE_NAME):latest

docker-migrate:
	docker exec --env-file=env.docker $(CONTAINER_NAME) /usr/bin/gogon migrate
