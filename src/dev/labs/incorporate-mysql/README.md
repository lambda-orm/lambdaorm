# Create database for test

## Start

```sh
docker-compose -p incorporate up -d
docker exec lab-mysql mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "ALTER DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;"
docker exec lab-mysql mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
```

## Lab

Run incorporate mysql debug

## Stop

```sh
rm -rf data
docker-compose -p incorporate down
```
