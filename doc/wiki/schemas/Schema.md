# Schema Configuration

It is the nexus between the business model and the persistence of the data.

The classes that represent the business model are completely clean, without any attributes that link them to persistence.

All the configuration necessary to resolve the relationship between the business model and persistence is done in the schema, which is configuration.

This configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

## Config

When the orm.init () method is invoked, the initialization of the orm will be executed from the configuration.

This configuration contains the main sections, paths, databases and schemas.

- In the app section, the general configuration of the application is set, such as the main paths, default database, etc.
- In the databases section the databases to which we are going to connect and which is the corresponding schema are defined
- In the section of diagrams, the entities, their relationships and their mapping with the database are defined.

## Example:

```json
{
  "app:": { "src": "src", "data": "data" ,"models":"models","defaulStage": "stage1" },
	"enums": [],
	"entities": [
		{
			"name": "Countries",
			"primaryKey": [ "id"  ],
			"uniqueKey": [ "name" ],
			"properties": [
				{ "name": "id", "type": "integer","nullable": false },
				{ "name": "name", "nullable": false, "type": "string" },
				{ "name": "alpha2", "nullable": false,"type": "string","length": 2 },
				{ "name": "alpha3", "nullable": false, "type": "string", "length": 3 }
			]
		}
	],		
	"dataSources": [
    {
      "name": "dataSource1",
			"mapping": "mapping1",
      "dialect": "mysql",
      "connection": "$CNN_MYSQL"
    }
  ],
	"mappings":[
		{
			"name":"mapping1",
		  "entities":[
				{
					"name": "Countries",
					"mapping": "TBL_COUNTRIES",
					"properties": [
						{ "name": "id", "mapping": "ID" },
						{ "name": "name","mapping": "NAME" },
						{ "name": "alpha2","mapping": "ALPHA_2" },
						{ "name": "alpha3", "mapping": "ALPHA_3" }
					]
				}
			]
		}
	],
	"stages":[
		{"name":"stage1", "defaultDataSource":"dataSource1" }
	]
}
```

## Set schema:

There are the following options to define the settings.

- Invoke the orm.init () method without the first argument and write this configuration in a file called lambdaorm.json or lambdaorm.yaml in the root of the project.
according to the lambdaorm extension you will know how to read it.

- Invoke the orm.init () method, pass as an argument the path where the configuration file is located.
This path must include the extension .yaml or .json since this way we will know how to read it.

- Invoke the orm.init () method passing the configuration as a json object as an argument

Example passing the path of the configuration file:

```ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init('/home/my/app1/lambaORM.yaml')
	try {		
		const result = await orm.execute('Loan.map(p=>{user:p.reader.name,book:p.book.title,date:p.date})')
		console.log(result)	
	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
	}
})()
```

## Example model generated

``` ts
export class Country {
		id?: number
		name?: string
		alpha2?: string
		alpha3?: string
}
export interface QryCountry {
	id: number
	name: number
	alpha2: string
	alpha3: string
}
export let Countries : Queryable<QryCountry>		
```
