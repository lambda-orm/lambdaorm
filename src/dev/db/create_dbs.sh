#!/usr/bin/env bash

docker-compose up -d

./wait-until-healthy.sh lambdaorm-source
# ./wait-until-healthy.sh lambdaorm-mysql-57
./wait-until-healthy.sh lambdaorm-postgres-10
./wait-until-healthy.sh lambdaorm-mariadb-103
./wait-until-healthy.sh lambdaorm-mssql

docker exec lambdaorm-source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
docker exec lambdaorm-mysql-57  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
# docker exec lambdaorm-mariadb-103  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
docker exec lambdaorm-mssql /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Lambda1234!" -Q "CREATE DATABASE northwind; ALTER DATABASE northwind SET READ_COMMITTED_SNAPSHOT ON;"

echo "INFO: Databases instances is ready for tests."