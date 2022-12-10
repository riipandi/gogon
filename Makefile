BUILD_VERSION := $(or $(BUILD_VERSION),git-`git rev-parse --short HEAD`)
BUILD_DATE = $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")
IMAGE_NAME = riipandi/gogon
CONTAINER_NAME = gogon

# Golang build flags
PKG_FLAGS_PREFIX = github.com/riipandi/gogon/pkg/constants
LD_FLAGS = -w -s -extldflags '-static' -X $(PKG_FLAGS_PREFIX).Version=$(BUILD_VERSION) -X $(PKG_FLAGS_PREFIX).BuildDate=$(BUILD_DATE)

deps:
	@go mod download && go mod tidy

dev:
	@air -c config/air.config.toml

build-prod: deps
	@echo Running Build version $(BUILD_VERSION)
	@CGO_ENABLED=0 go build --ldflags="$(LD_FLAGS)" -a -o build/gogon cmd/app/main.go
	@ls -lAh build

release-single:
	@goreleaser build --single-target

release-snapshot:
	@goreleaser release --snapshot --rm-dist

# --------------------------------------------------------------------------------------------------
# Docker scripts
# --------------------------------------------------------------------------------------------------

docker-build:
	@echo Running Docker Build version $(BUILD_VERSION)
	@DOCKER_BUILDKIT=1 docker build --build-arg VERSION=$(BUILD_VERSION) --build-arg BUILD_DATE=$(BUILD_DATE) \
	-t $(IMAGE_NAME):latest -t $(IMAGE_NAME):$(BUILD_VERSION) .

docker-run:
	docker run --rm -it --name $(CONTAINER_NAME) -e PORT=8000 -p 8000:8000 $(IMAGE_NAME):latest

docker-shell:
	docker run --rm -it --entrypoint sh $(IMAGE_NAME):latest

docker-migrate:
	docker exec --env-file=env.docker $(CONTAINER_NAME) /usr/bin/gogon migrate
