#!/usr/bin/env bash

docker-compose up -d

./wait-until-healthy.sh lambda-orm-source
./wait-until-healthy.sh lambda-orm-mysql-57
./wait-until-healthy.sh lambda-orm-postgres-10
./wait-until-healthy.sh lambda-orm-mariadb-103
./wait-until-healthy.sh lambda-orm-mssql-2019

docker exec lambda-orm-source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
docker exec lambda-orm-mysql-57  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
docker exec lambda-orm-mariadb-103  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
docker exec lambda-orm-mssql-2019 /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Lambda1234!" -Q "CREATE DATABASE northwind; ALTER DATABASE northwind SET READ_COMMITTED_SNAPSHOT ON;"

echo "INFO: Local Databases instances is ready for tests."