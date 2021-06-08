

# Install
## create volume

linux:
```
docker volume create --name mariadb-data --opt type=none --opt device=/home/pi/volumes/mariadb/data --opt o=bind
docker volume create --name mariadb-log --opt type=none --opt device=/home/pi/volumes/mariadb/log --opt o=bind
```

windows:
```
docker volume create --name mariadb-data --opt type=none --opt device=C:\Users\Beesion\volumes\mariadb\data --opt o=bind
docker volume create --name mariadb-log --opt type=none --opt device=C:\Users\Beesion\volumes\mariadb\log --opt o=bind
```

## install database
```
docker-compose up -d
```

## uninstall
```
docker-compose down
```

# install client
```
sudo apt-get update
sudo apt-get install mariadb-client-10.0
```

# connect
host
```
mysql --host=0.0.0.0 --port=3306 --user=root --password=admin northwind
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