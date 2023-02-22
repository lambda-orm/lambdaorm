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

Create MySql database for test:

```sh
docker-compose -p "countries" up -d
```

Create user and set character:

```sh
docker exec countries-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "ALTER DATABASE countries CHARACTER SET utf8 COLLATE utf8_general_ci;"
docker exec countries-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'countries'@'%' with grant option; FLUSH PRIVILEGES;"
```
