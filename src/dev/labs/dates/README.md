# Infrastructure

## Requirements

**Postgres:**

if you have a service running on port 5432, you can kill it with the following command:

```sh
sudo kill -9 $(sudo lsof -t -i:5432)
```

## Start

```sh
docker-compose -p dates up -d
```

**Oracle:**

You must wait a few minutes for the Oracle service to start correctly.

```sh
#MySQL
docker exec dates-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "ALTER DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;"
docker exec dates-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
# SqlServer
docker exec dates-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Lambda1234!" -Q "CREATE DATABASE test; ALTER DATABASE test SET READ_COMMITTED_SNAPSHOT ON;"
# Oracle
docker exec -it dates-oracle sqlplus system/ORACLE123 @/home/oracle/setup/custom_scripts/startup.sql
docker exec dates-oracle "/bin/sh" -c "echo DISABLE_OOB=ON>>/opt/oracle/oradata/dbconfig/ORCLCDB/sqlnet.ora"
docker restart dates-oracle
```

### Push

```sh
lambdaorm push -e .env -s MySQL
lambdaorm push -e .env -s PostgreSQL
lambdaorm push -e .env -s SqlServer
lambdaorm push -e .env -s MongoDB
lambdaorm push -e .env -s Oracle
```

### Build

```sh
lambdaorm build -l node
```

## Stop

```sh
lambdaorm drop -e .env -s MySQL
lambdaorm drop -e .env -s PostgreSQL
lambdaorm drop -e .env -s SqlServer
lambdaorm drop -e .env -s MongoDB
lambdaorm drop -e .env -s Oracle
docker-compose -p dates down
```

## Queries
