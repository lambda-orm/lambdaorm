# Create database for test

## Script

Up

```sh
./db.sh up
```

Down

```sh
./db.sh down
```

## Manual

### install database

``` sh
docker compose -p "northwind" up -d
```

### create database

```sql
CREATE DATABASE IF NOT EXISTS northwind
```

### create users

``` sh
	docker exec northwind-source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec northwind-source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec northwind-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec northwind-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec northwind-mariadb mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec northwind-mariadb mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec northwind-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Lambda1234!" -Q "CREATE DATABASE northwind; ALTER DATABASE northwind SET READ_COMMITTED_SNAPSHOT ON;"

	docker exec -it northwind-oracle sqlplus system/ORACLE123 @/home/oracle/setup/custom_scripts/startup.sql
	# Error ORA-12637
	docker exec northwind-oracle "/bin/sh" -c "echo DISABLE_OOB=ON>>/opt/oracle/oradata/dbconfig/ORCLCDB/sqlnet.ora"
	docker restart northwind-oracle 
```

### Postgres

```sql
CREATE ROLE "northwind" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'northwind';
```

### Oracle

Conexión:

- port: 1521
- sid: ORCLCDB
- user: system
- password: ORACLE123

```sql
alter session set "_ORACLE_SCRIPT"=true;
create user northwind identified by northwind;
GRANT create session,create table,create view,create sequence TO northwind;
ALTER USER northwind quota unlimited on USERS;
```

#### Error ORA-12637

- [description](https://franckpachot.medium.com/19c-instant-client-and-docker-1566630ab20e)
- [solution](https://github.com/oracle/docker-images/issues/2338)

```sh
docker exec northwind-oracle "/bin/sh" -c "echo DISABLE_OOB=ON>>/opt/oracle/oradata/dbconfig/ORCLCDB/sqlnet.ora"
docker restart northwind-oracle
```

Test

```sh
sqlplus "northwind/northwind@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=localhost)(Port=1521))(CONNECT_DATA=(SID=ORCLCDB)))"
```

### uninstall

``` sh
docker compose -p "northwind" down --remove-orphans
docker volume rm northwind_source-data
docker volume rm northwind_source-log
docker volume rm northwind_mysql-data
docker volume rm northwind_mysql-log
docker volume rm northwind_postgres-data
docker volume rm northwind_sqlserver
docker volume rm northwind_oracle_oradata
docker volume rm northwind_mongodb
docker volume rm northwind_mariadb-data
docker volume rm northwind_mariadb-log
```

## connect

### install client

MySQL

``` sh
sudo apt-get update
sudo apt-get install mysql-client
```

MariaDB

``` sh
sudo apt-get update
sudo apt-get install mariadb-client-10.0
```

host

``` sh
mysql --host=0.0.0.0 --port=3306 --user=root --password=root tests
mysql --host=0.0.0.0 --port=3306 --user=test --password=test test
mysql --host=0.0.0.0 --port=3307 --user=root --password=root northwind
```

container

``` sh
docker exec -it MariaDB mysql -h localhost -u root -p 
```

### connect mysql

grant user test

``` sh
docker exec northwind-source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

```

``` sh
docker exec -ti northwind-source  bash
mysql --host 127.0.0.1 --port 3306 -uroot -proot
```

``` mysql
mysqladmin -uroot -proot status
mysqladmin -uadmin -padmin status

select Host, User from mysql.user;
CREATE USER 'test2'@'%' IDENTIFIED WITH mysql_native_password BY 'test2';
GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;

```

./wait-until-healthy.sh lambdaORM-Source

## connection string

- Source: mysql://root:root@0.0.0.0:3306/northwind
- MySQL: mysql://root:root@0.0.0.0:3307/northwind
- MariaDB: mysql://root:root@0.0.0.0:3308/northwind
- Postgres: postgresql://test:test@0.0.0.0:5432/northwind
- SqlServer: {server:'0.0.0.0',authentication:{type:'default',options:{userName:'sa',password:'Lambda1234!'}},options:{port:1433,database:'Adm1n_Adm1n',trustServerCertificate:true}}
- MongoDB: mongodb://test:test@0.0.0.0:27017/northwind
- Oracle:{"connectString":"localhost:1521/ORCLCDB","user":"northwind","password":"northwind"}

## references

- [MariaDB docker compose](https://github.com/monstrenyatko/docker-rpi-mariadb)
- [MariaDB-using-docker compose](https://learntubes.com/how-to-install-mariadb-using-docker compose)
- [mysql in nodejs](https://evertpot.com/executing-a-mysql-query-in-nodejs/)
- [module to connect mysql](https://www.npmjs.com/package/mysq)
- [mysql client on windows](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install-windows-quick.html#:~:text=To%20install%20MySQL%20Shell%20on,steps%20in%20the%20Setup%20Wizard.)
- [MongoDB with docker](https://citizix.com/how-to-run-MongoDB-with-docker-and-docker compose/)
- [mongo shared](https://github.com/bitnami/bitnami-docker-MongoDB/issues/208)
- [nodejs mongodb](https://www.w3schools.com/nodejs/nodejs_mongodb_createcollection.asp)
