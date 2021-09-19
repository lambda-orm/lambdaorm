#!/usr/bin/env bash

docker-compose down --remove-orphans

docker volume rm db_source
docker volume rm db_mysql
docker volume rm db_postgres
docker volume rm db_mariadb-data
docker volume rm db_mariadb-log
docker volume rm db_mssql
docker volume rm db_mongodb
docker volume rm db_oracle


echo "INFO: stopped Databases (if it was running)."