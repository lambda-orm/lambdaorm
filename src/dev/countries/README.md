# Countries lab

## Up

Create Databases:

```sh
cd db
db.sh up
```

Load source db:

```sh
npm run countries-populate-source
```

Build Test:

```sh
npm run countries-create-data-for-test-suite
npm run countries-create-test-suite
```

## Down

```sh
cd db
db.sh down
```
