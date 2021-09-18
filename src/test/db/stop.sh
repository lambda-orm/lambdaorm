#!/usr/bin/env bash

docker-compose down --remove-orphans

docker volume rm source
docker volume rm mysql
docker volume rm mariadb-data
docker volume rm mariadb-log
docker volume rm postgres
docker volume rm mssql
docker volume rm mongodb
docker volume rm oracle

echo "stopped Databases (if it was running)."