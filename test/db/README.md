

# Install
## create volume

linux:
```
docker volume create --name source --opt type=none --opt device=/home/pi/volumes/source --opt o=bind
docker volume create --name mysql --opt type=none --opt device=/home/pi/volumes/mysql --opt o=bind
docker volume create --name mariadb-data --opt type=none --opt device=/home/pi/volumes/mariadb/data --opt o=bind
docker volume create --name mariadb-log --opt type=none --opt device=/home/pi/volumes/mariadb/log --opt o=bind
docker volume create --name postgres --opt type=none --opt device=/home/pi/volumes/postgres --opt o=bind
docker volume create --name mssql --opt type=none --opt device=/home/pi/volumes/mssql --opt o=bind
docker volume create --name mongodb --opt type=none --opt device=/home/pi/volumes/mongodb --opt o=bind
docker volume create --name oracle --opt type=none --opt device=/home/pi/volumes/oracle --opt o=bind
```

windows:
```
docker volume create --name source --opt type=none --opt device=C:\Users\Beesion\volumes\source --opt o=bind
docker volume create --name mysql --opt type=none --opt device=C:\Users\Beesion\volumes\mysql --opt o=bind
docker volume create --name mariadb-data --opt type=none --opt device=C:\Users\Beesion\volumes\mariadb\data --opt o=bind
docker volume create --name mariadb-log --opt type=none --opt device=C:\Users\Beesion\volumes\mariadb\log --opt o=bind
docker volume create --name postgres --opt type=none --opt device=C:\Users\Beesion\volumes\postgres --opt o=bind
docker volume create --name mssql --opt type=none --opt device=C:\Users\Beesion\volumes\mssql --opt o=bind
docker volume create --name mongodb --opt type=none --opt device=C:\Users\Beesion\volumes\mongodb --opt o=bind
docker volume create --name oracle --opt type=none --opt device=C:\Users\Beesion\volumes\oracle --opt o=bind
```

## install database
```
docker-compose up -d
```

## uninstall
```
docker-compose down
```
### remove volumes
```
docker volume rm source
docker volume rm mysql
docker volume rm mariadb-data
docker volume rm mariadb-log
docker volume rm postgres
docker volume rm mssql
docker volume rm mongodb
docker volume rm oracle
```

# install client
```
sudo apt-get update
sudo apt-get install mariadb-client-10.0
```

# connect
host
```
mysql --host=0.0.0.0 --port=3307 --user=root --password=root northwind
```

container
```
docker exec -it mariadb mysql -h localhost -u root -p 
```

# references
- [mariadb docker compose](https://github.com/monstrenyatko/docker-rpi-mariadb)
- [mariadb-using-docker-compose](https://learntubes.com/how-to-install-mariadb-using-docker-compose)
- [mysql in nodejs](https://evertpot.com/executing-a-mysql-query-in-nodejs/)
- [module to connect mysql](https://www.npmjs.com/package/mysq)
- [mysql client on windows](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install-windows-quick.html#:~:text=To%20install%20MySQL%20Shell%20on,steps%20in%20the%20Setup%20Wizard.)