# Create database for test

## Start

```sh
docker-compose -p data up -d
```

## Stop

```sh
docker-compose -p data down
```

## References

Kill Postgres:

```sh
sudo kill -9 $(sudo lsof -t -i:5432)
```
