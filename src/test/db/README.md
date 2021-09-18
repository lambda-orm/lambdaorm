# Install

## create volume

linux:

``` sh
docker volume create --name source --opt type=none --opt device=~/volumes/source --opt o=bind
docker volume create --name mysql --opt type=none --opt device=~/volumes/mysql --opt o=bind
docker volume create --name mariadb-data --opt type=none --opt device=~/volumes/mariadb/data --opt o=bind
docker volume create --name mariadb-log --opt type=none --opt device=~/volumes/mariadb/log --opt o=bind
docker volume create --name postgres --opt type=none --opt device=~/volumes/postgres --opt o=bind
docker volume create --name mssql --opt type=none --opt device=~/volumes/mssql --opt o=bind
docker volume create --name mongodb --opt type=none --opt device=~/volumes/mongodb --opt o=bind
docker volume create --name oracle --opt type=none --opt device=~/volumes/oracle --opt o=bind
```

windows:

``` sh
docker volume create --name source --opt type=none --opt device=C:\volumes\source --opt o=bind
docker volume create --name mysql --opt type=none --opt device=C:\volumes\mysql --opt o=bind
docker volume create --name mariadb-data --opt type=none --opt device=C:\volumes\mariadb\data --opt o=bind
docker volume create --name mariadb-log --opt type=none --opt device=C:\volumes\mariadb\log --opt o=bind
docker volume create --name postgres --opt type=none --opt device=C:\volumes\postgres --opt o=bind
docker volume create --name mssql --opt type=none --opt device=C:\volumes\mssql --opt o=bind
docker volume create --name mongodb --opt type=none --opt device=C:\volumes\mongodb --opt o=bind
docker volume create --name oracle --opt type=none --opt device=C:\volumes\oracle --opt o=bind
```

## install database

``` sh
docker-compose up -d
```

## uninstall

``` sh
docker-compose down --remove-orphans
```

### remove volumes

``` sh
docker volume rm source
docker volume rm mysql
docker volume rm mariadb-data
docker volume rm mariadb-log
docker volume rm postgres
docker volume rm mssql
docker volume rm mongodb
docker volume rm oracle
```

## install client

mariadb

``` sh
sudo apt-get update
sudo apt-get install mariadb-client-10.0
```

## connect

host

``` sh
mysql --host=0.0.0.0 --port=3306 --user=root --password=root northwind
mysql --host=0.0.0.0 --port=3307 --user=root --password=root northwind
```

container

``` sh
docker exec -it mariadb mysql -h localhost -u root -p 
```

## connection string

- source: mysql://root:root@0.0.0.0:3306/northwind
- mysql: mysql://root:root@0.0.0.0:3307/northwind
- mariadb: mysql://root:admin@0.0.0.0:3308/northwind
- postgres: postgresql://admin:admin@0.0.0.0:5432/northwind
- mssql: {server:'0.0.0.0',authentication:{type:'default',options:{userName:'sa',password:'Adm1n_Adm1n'}},options:{port:1433,database:'Adm1n_Adm1n',trustServerCertificate:true}}
- mongodb:
- oracle:

## references

- [mariadb docker compose](https://github.com/monstrenyatko/docker-rpi-mariadb)
- [mariadb-using-docker-compose](https://learntubes.com/how-to-install-mariadb-using-docker-compose)
- [mysql in nodejs](https://evertpot.com/executing-a-mysql-query-in-nodejs/)
- [module to connect mysql](https://www.npmjs.com/package/mysq)
- [mysql client on windows](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install-windows-quick.html#:~:text=To%20install%20MySQL%20Shell%20on,steps%20in%20the%20Setup%20Wizard.)
