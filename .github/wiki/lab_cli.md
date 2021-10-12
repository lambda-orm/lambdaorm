
## Create project

will create the project folder with the basic structure.

```sh
lambdaorm init -w lab_01
```

position inside the project folder.

```sh
cd lab_01
```

## Complete Schema

In the creation of the project the schema was created but without any entity.
Add the Country entity as seen in the following example

```yaml
paths:
  src: src
  data: data
databases:
  - name: lab_01
    dialect: mysql
    schema: lab_01
    connection:
      type: mysql
      host: localhost
      port: 3306
      username: test
      password: test
      database: test
schemas:
  - name: lab_01
    enums: []
    entities:
      - name: Country
        mapping: COUNTRY
        primaryKey: ["id"]
        uniqueKey: ["name"]
        properties:
          - name: id
            mapping: ID
            type: integer
            nullable: false
          - name: name
            mapping: NAME
            nullable: false
            type: string
            length: 127
          - name: alpha2
            mapping: ALPHA_2
            nullable: false
            type: string
            length: 2
          - name: alpha3
            mapping: ALPHA_3
            nullable: false
            type: string
            length: 3

```

## Update Model

```sh
lambdaorm model
```

the file model.d.ts will be created inside src with the following content

```ts
import './sintaxis'
declare global {
	interface Country{
		id: number
		name: string
		alpha2: string
		alpha3: string
  }
	let Country: Entity<Country>
}
```

It will generate a status file in the "data" folder, with the following content:

```json
{
	"schema": {
		"name": "lab_01",
		"entities": [
			{
				"name": "Country",
				"mapping": "COUNTRY",
				"primaryKey": [ "id" ],
				"uniqueKey": [ "name"	],
				"properties": [
					{	"name": "id", "mapping": "ID", "type": "integer", "nullable": false },
					{ "name": "name", "mapping": "NAME", "type": "string","length": 127, "nullable": false },
					{ "name": "alpha2", "mapping": "ALPHA_2", "type": "string", "length": 2, "nullable": false },
					{ "name": "alpha3", "mapping": "ALPHA_3", "type": "string", "length": 3, "nullable": false }
				],
				"relations": [],
				"indexes": []
			}
		],
		"enums": []
	},
	"mapping": {},
	"pending": []
}
```

## Popuplate Data

At the root of the project we create a file called countries.json and add the records found in the following link

[cuntries](https://github.com/stefangabos/world_countries/blob/master/data/en/countries.json)

then we execute

```sh
lambdaorm run -e Country.bulkInsert() -c ./countries.json
```

## Export Data

```sh
lambdaorm export 
```

will generate a file called "lab_01-export.json"

## Import Data

Before importing we are going to delete all the records:

```sh
lambdaorm run -e Country.deleteAll()
```

We verify that there are no records left:

```sh
lambdaorm run -e Country
```

we import the file that we generate when exporting

```sh
lambdaorm import -s ./lab_01-export.json
```

We verify that the data was imported.

```sh
lambdaorm run -e Country
```

## Drop

remove all tables from the schema and delete the state file, lab_01-state.json

```sh
lambdaorm drop
```
