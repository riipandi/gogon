DEFAULT_VERSION=beta-`git rev-parse --short HEAD`
VERSION := $(or $(VERSION),$(DEFAULT_VERSION))
IMAGE_NAME="riipandi/gogon"
CONTAINER_NAME="gogon"

deps:
	go mod download && go mod tidy

dev:
	air -c config/air.config.toml

build-all:
	CGO_ENABLED=0 go build -v -ldflags='-w -s -extldflags "-static"' -a -o build/gogon cmd/app/main.go

# --------------------------------------------------------------------------------------------------
# Docker scripts
# --------------------------------------------------------------------------------------------------

docker-build:
	DOCKER_BUILDKIT=1 docker build --build-arg VERSION=$(VERSION) -t $(IMAGE_NAME):latest -t $(IMAGE_NAME):$(VERSION) .

docker-run:
	docker run --rm -it --name ${CONTAINER_NAME} -e PORT=8090 -p 8090:8090 $(IMAGE_NAME):latest

docker-shell:
	docker run --rm -it --entrypoint sh $(IMAGE_NAME):latest

docker-migrate:
	docker exec --env-file=env.docker ${CONTAINER_NAME} /usr/bin/gogon migrate
