export PROJECT = lablk

## Docker
docker-build:
	@echo "Building docker image..."
	@docker build --ssh default \
		-t ${PROJECT}:build \
		-f deploy/Dockerfile .