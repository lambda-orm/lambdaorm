# Create database for test

## Start

```sh
docker compose -p lab up -d
```

## Stop

```sh
docker compose -p lab down
```

## References

Kill Postgres:

```sh
sudo kill -9 $(sudo lsof -t -i:5432)
```
