#!/usr/bin/env bash

HERE_FOLDER=$(dirname "$0")
ROOT_FOLDER=$(cd "$HERE_FOLDER" && cd ../ && pwd)

docker compose -f "$ROOT_FOLDER/environment/rulngin-docker/docker-compose.yml" up -d t12s-db-postgres t12s-oidc-keycloak t12s-rulngin-dynamodb t12s-rulngin-db-init
