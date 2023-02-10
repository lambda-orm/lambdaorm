# λORM

**IMPORTANT: the library is in an Beta version!!!**

λORM is an ORM for Node.js which bases its queries on a business model, abstracting from the physical model.
By means of rules the corresponding Data Source is determined and by definition of mappings how the business model is mapped with the physical one.

What differentiates λORM from other ORMs:

- Obtain or modify records from different Databases in the same query. \
  These Databases may be from different engines (Example: MySQL, PostgreSQL and MongoDB)

- Abstraction of the physical model, being the same to work with a single database than with multiple ones.

- Define different stages for a business model. \
  You can define a stage where you work with a MySQL instance and another stage where you work with Oracle and MongoDB.
  
- Friendly query syntax, being able to write in the programming language itself as in a string. \
	Expressions are parsed in the same way as with an expression language.

## Features

- Supports MySQL, MariaDB, PostgresSQL, Oracle, SqlServer, SqlJs and MongoDB.
- TypeScript and JavaScript support
- [Schema Configuration](#schema-configuration)
	- Decoupling the business model from physical model
	- Configuration in json or yml formats
	- Definition of mappings to map the business model with the physical model
	- Extends entities
	- Environment variables
	- define indices, unique keys and constraints
- [Query Language](#query-language)
	- Simple query language based on javascript lambda expressions.
	- Can write the expression as javascript code or as a string
	- Crud clauses
	- Implicit joins and group by
	- [Eager loading using the Include() method.](#includes)
	- [Query expression metadata](#query-expression-metadata)
- [Repositories and custom repositories](https://github.com/FlavioLionelRita/lambdaorm/wiki/Repository)
- Using multiple database instances
- [Transactions and distributed transactions](https://github.com/FlavioLionelRita/lambdaorm/wiki/Transaction)
- [BulkInsert](https://github.com/FlavioLionelRita/lambdaorm/wiki/BulkInsert)
- Connection pooling
- Listeners and subscribers
- High performance
- [CLI](#cli)

## Schema Configuration

It is the link between the business model and data persistence.

The classes that represent the business model are completely clean, without any attribute that binds them to persistence.

All the configuration required to resolve the relationship between the business model and persistence is done in the schema, which is configuration.

This configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

This configuration contains the following sections.

- In the app section, the general configuration of the application is established, such as the src, data and model routes.
- In the enums section, the enums that are part of the business model are defined
- In the entities section, the entities that are part of the business model are defined
- In the data sources section the different data sources are defined
- In the mapping section, the mappings between the business model and the model in the data sources are defined.
- In the stages section, the stages are defined where the rules that relate the business model to the different data sources are defined.

### Schema Configuration Example:

This example poses a stage where two sources are accessed.
Data source 1 is MySQL and contains the Countries table and source 2 is PostgreSQL contains the States table.

In the case of the Countries entity, both the name of the table and the fields coincide with the name of the entity and the name of the properties, so the mapping is transparent.

But in the case of the States entity, the name of the table and its fields differ, so the mapping defines the mapping.

![diagram](https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm/HEAD/images/schema5.svg)

[View schema configuration](https://github.com/FlavioLionelRita/lambdaorm/wiki/Schema-Examples#one-schema-related-multiples-databases)

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Schema)

## Query Language

The query language is based on [javascript lambda expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
These expressions can be written as javascript code by browsing the business model entities.

Expressions can also be sent as a string

λOrm translates the expression into the language corresponding to each database engine.

### Query Language Example:

```ts
Countries
	.filter(p=> p.region == region)	
	.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
	.include(p => p.states.filter(p=> substr(p.name,1,1)=="F")
		  .map(p=> [p.name,p.latitude,p.longitude])
	)
	.page(1,3)
```

where the SQL equivalent of the expression is:

```sql
SELECT c.name AS `name`, c.subregion AS `subregion`, c.latitude AS `latitude`, c.longitude AS `longitude`, c.iso3 AS `__iso3` 
FROM Countries c  
WHERE c.region = ? 
LIMIT 0,3

SELECT s.NAME AS "name", s.LATITUDE AS "latitude", s.LONGITUDE AS "longitude", s.COUNTRY_CODE AS "__parentId" 
FROM TBL_STATES s  
WHERE SUBSTR(s.NAME,1,1) = 'F'
  AND s.s.COUNTRY_CODE IN (?) 
```

### Advantage:

- Use of the same programming language.
- No need to learn a new language.
- Expressions easy to write and understand.
- Use of the intellisense offered by the IDE to write the expressions.
- Avoid syntax errors.

## Usage

To work with the orm we can do it using the singleton object called "orm" or using repositories.

### Object **orm**

This orm object acts as a facade and from this we access all the methods.

When the orm.init() method is called, the orm initialization will be executed from the configuration.

#### **execute method**:

This method receives the expression as a javascript lambda function or a string.

#### Use lambda expression:

The advantage of writing the expression as a javascript lambda function is that this way we will have the help of intellisense and we will make sure that the expression has no syntax errors.

```ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init()	
	const query = (region:string) => 
		Countries.filter(p=> p.region == region)			
			.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
			.include(p => p.states.filter(p=> substr(p.name,1,1)=="F")
				.map(p=> [p.name,p.latitude,p.longitude])
			)
			.page(1,3)
	const result = await orm.execute(query, { region: 'Asia' })
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

#### Use string expression

The advantage of writing the expression in a string is that we can receive it from outside, example UI, CLI command, stored, etc.

```ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init()	
	const query = `
	Countries
		.filter(p=> p.region == region)		
		.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
		.include(p => p.states.filter(p=> substr(p.name,1,1)=="F")
			.map(p=> [p.name,p.latitude,p.longitude])
		)
		.page(1,3)`																								    
	const result = await orm.execute(query, { region: 'Asia' })
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

#### Result:

```json
[{"name": "Afghanistan",
  "subregion": "Southern Asia",
  "latitude": "33.00000000",
  "longitude": "65.00000000",
  "states":[{"name": "Farah", "latitude": "32.49532800", "longitude": "62.26266270" },
      		{"name": "Faryab", "latitude": "36.07956130","longitude": "64.90595500" }]
 },
 {"name": "United Arab Emirates",
  "subregion": "Western Asia",
  "latitude": "24.00000000",
  "longitude": "54.00000000",
  "states": [{"name": "Fujairah","latitude": "25.12880990","longitude": "56.32648490" }]
 },
 {"name": "Armenia",
  "subregion": "Western Asia",
  "latitude": "40.00000000",
  "longitude": "45.00000000",
  "states": []
 }]
```

### Repositories

Repositories are associated with an entity and have various methods to interact with it.

```ts
import { orm } from 'lambdaorm'
import { CountryRepository } from './models/country'

(async () => {
	await orm.init()
	const countryRepository = new CountryRepository('stage1')
	const result = await countryRepository.query()
		.filter(p=> p.region == region)
		.page(1,3)
		.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
		.include(p => p.states.filter(p=> substr(p.name,1,1)=="F")
							.map(p=> [p.name,p.latitude,p.longitude])
		).execute({ region: 'Asia' })	
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Repository)

### Includes:

λORM includes the include method to load related entities, both for OneToMany, manyToOne, and oneToOne relationships.

We can also apply filters or bring us some fields from related entities.

For each include, a statement is executed that fetches all the necessary records, then the objects with relationships are assembled in memory. In this way, multiple executions are avoided, considerably improving performance.

Includes can be used in selects, inserts, updates, deletes, and bulkInserts.

``` ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init()
	const query = (id:number) => 
	Orders.filter(p => p.id === id)
		.include(p => [p.customer.map(p => ({ name: p.name, address: concat(p.address, ', ', p.city, ' (', p.postalCode, ')  ', p.country) })),
			p.details.include(p => p.product
				.include(p => p.category.map(p => p.name))
				.map(p => p.name))
				.map(p => [p.quantity, p.unitPrice])])
		.map(p => p.orderDate)
	const result = await orm.execute(query)
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

The previous sentence will bring us the following result:

```json
[{"orderDate": "1996-07-03T22:00:00.000Z",
  "customer": { "name": "Vins et alcools Chevalier",
				  "address": "59 rue de l'Abbaye, Reims (51100)  France"
				},
  "details":[
	{"quantity": 12, "unitPrice": 14,
	  "product": { "name": "Queso Cabrales",
					"category": { "name": "Dairy Products"}}
	},
	{"quantity": 10, "unitPrice": 9.8,
	 "product": { "name": "Singaporean Hokkien Fried Mee",
				  "category": { "name": "Grains/Cereals" 	}}
	},
	{"quantity": 5, "unitPrice": 34.8,
	 "product": { "name": "Mozzarella di Giovanni",
				  "category": { "name": "Dairy Products" }}
	}]
}]
```

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)

### Query expression metadata

λORM has the following methods to extract metadata information from expressions.

To execute these methods it is not necessary to connect to the database.

|method    		|Description          															|Path                     		|
|:------------|:--------------------------------------------------|:----------------------------|
|	parameters	| Get parameters in the expression									| orm.parameters(expression)	|
|	model				| Get model of the result in an execution						| orm.model(expression)				|
|	metadata		| Get metadata of the expression										| orm.metadata(expression)		|
|	sentence		| Get sentence in the dialect of the physical model	| orm.sentence(expression)		|
|	constraints	| Get constraints of expression											| orm.constraints(expression)	|

[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/metadata)

## CLI

Install the package globally to use the CLI commands to help you create and maintain projects

```sh
npm install lambdaorm-cli -g
```

### CLI Commands

| Command    	| Description                                  									  |
|:------------|:----------------------------------------------------------------|
|	version	 		| Prints lambdaorm version this project uses.											|
|	init				| Generates lambdaorm project structure.													|
|	update			| update model, packages and project structure.										|
|	sync				|	Synchronize database.																						|
|	import			| Import data from file to database																|
|	export			| Export data from a database 																		|
|	execute			| Execute an expression lambda or return information							|
|	drop				|	Removes all database objects but not the database.							|

[CLI package](https://www.npmjs.com/package/lambdaorm-cli)

## Documentation

- [Expression](https://github.com/FlavioLionelRita/lambdaorm/wiki/Expression)
- [Repository](https://github.com/FlavioLionelRita/lambdaorm/wiki/Repository)
- [Transaction](https://github.com/FlavioLionelRita/lambdaorm/wiki/Transaction)
- Schemas
	- [Schema](https://github.com/FlavioLionelRita/lambdaorm/wiki/Schema)
	- [Examples](https://github.com/FlavioLionelRita/lambdaorm/wiki/Schema-Examples)
- Queries
	- [Select](https://github.com/FlavioLionelRita/lambdaorm/wiki/Select)
	- [Include](https://github.com/FlavioLionelRita/lambdaorm/wiki/Include)
	- [BulkInsert](https://github.com/FlavioLionelRita/lambdaorm/wiki/BulkInsert)
	- [Insert](https://github.com/FlavioLionelRita/lambdaorm/wiki/Insert)
	- [Update](https://github.com/FlavioLionelRita/lambdaorm/wiki/Update)
	- [Delete](https://github.com/FlavioLionelRita/lambdaorm/wiki/Delete)
- Operators & Functions
	- [Bitwise](https://github.com/FlavioLionelRita/lambdaorm/wiki/Bitwise)
	- [Comparison](https://github.com/FlavioLionelRita/lambdaorm/wiki/Comparison)
	- [Datetime](https://github.com/FlavioLionelRita/lambdaorm/wiki/Datetime)
	- [Group](https://github.com/FlavioLionelRita/lambdaorm/wiki/Group)
	- [Logical](https://github.com/FlavioLionelRita/lambdaorm/wiki/Logical)
	- [Nullable](https://github.com/FlavioLionelRita/lambdaorm/wiki/Nullable)
	- [Numeric](https://github.com/FlavioLionelRita/lambdaorm/wiki/Numeric)
	- [Sort](https://github.com/FlavioLionelRita/lambdaorm/wiki/Sort)
	- [String](https://github.com/FlavioLionelRita/lambdaorm/wiki/String)
- [Metadata](https://github.com/FlavioLionelRita/lambdaorm/wiki/Metadata)
- [CLI](https://www.npmjs.com/package/lambdaorm-cli)
- [Labs](https://github.com/FlavioLionelRita/lambdaorm/wiki/Labs)
- [Source Code](https://github.com/FlavioLionelRita/lambdaorm/blob/main/doc/source/README.md)
