#!/usr/bin/env bash

mkdir -p ~/volumes

docker volume create --name source --opt type=none --opt device=~/volumes/source --opt o=bind
docker volume create --name mysql --opt type=none --opt device=~/volumes/mysql --opt o=bind
docker volume create --name mariadb-data --opt type=none --opt device=~/volumes/mariadb/data --opt o=bind
docker volume create --name mariadb-log --opt type=none --opt device=~/volumes/mariadb/log --opt o=bind
docker volume create --name postgres --opt type=none --opt device=~/volumes/postgres --opt o=bind
docker volume create --name mssql --opt type=none --opt device=~/volumes/mssql --opt o=bind
docker volume create --name mongodb --opt type=none --opt device=~/volumes/mongodb --opt o=bind
docker volume create --name oracle --opt type=none --opt device=~/volumes/oracle --opt o=bind

docker-compose up -d

# docker exec lambda-orm-source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"


echo "Local Databases instances is ready for tests."