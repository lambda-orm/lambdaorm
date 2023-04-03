# Northwind lab

## Up

Create Databases:

```sh
cd db
./db.sh up
```

Load source db:

```sh
npm run populate-source
```

Load all databases for test:

```sh
npm run populate-databases
```

Build Test:

```sh
npm run create-data-for-test
npm run create-data-for-test-suite
npm run create-test
npm run create-test-suite
```

## Down

```sh
./db/db.sh down
```
