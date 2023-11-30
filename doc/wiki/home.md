# λORM

λORM is an ORM for Node.js which bases its queries on a business model, abstracting from the physical model.
By means of rules the corresponding Data Source is determined and by definition of mappings how the business model is mapped with the physical one.

What differentiates λORM from other ORMs:

- Obtain or modify records from different Databases in the same query. \
  These Databases may be from different engines (Example: MySQL, PostgreSQL, MongoDB, etc.)

- Abstraction of the physical model, being the same to work with a single database than with multiple ones.

- Define different stages for a business model. \
  You can define a stage where you work with a MySQL instance and another stage where you work with Oracle and MongoDB.
  
- Friendly query syntax, being able to write in the programming language itself as in a string. \
	Expressions are parsed in the same way as with an expression language.

## Features

- Supports MySQL, MariaDB, PostgresSQL, Oracle, SqlServer, SqlJs and MongoDB.
- TypeScript and JavaScript support
- [Schema Configuration](https://github.com/FlavioLionelRita/lambdaorm/wiki/Schema-Configuration)
	- Decoupling the business model from physical model
	- Configuration in json or yml formats
	- Definition of mappings to map the business model with the physical model
	- Extends entities
	- Environment variables
	- define indices, unique keys and constraints
- [Query Language](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Language)
	- Simple query language based on javascript lambda expressions.
	- Can write the expression as javascript code or as a string
	- Crud clauses
	- Implicit joins and group by
	- [Eager loading using the Include() method.](https://github.com/FlavioLionelRita/lambdaorm/wiki/Include)
	- [Query expression metadata](https://github.com/FlavioLionelRita/lambdaorm/wiki/Metadata)
- [Repositories and custom repositories](https://github.com/FlavioLionelRita/lambdaorm/wiki/Repository)
- Using multiple database instances
- [Transactions and distributed transactions](https://github.com/FlavioLionelRita/lambdaorm/wiki/Transaction)
- [BulkInsert](https://github.com/FlavioLionelRita/lambdaorm/wiki/BulkInsert)
- Connection pooling
- Listeners and subscribers
- High performance
- [CLI](https://github.com/FlavioLionelRita/lambdaorm-cli)
- [Api Rest](https://github.com/FlavioLionelRita/lambdaorm-svc)

## Schema Configuration

The schema includes all the configuration that the ORM needs.

The schema separates the definition of the business model (Domain) from the persistence of the data (Infrastructure).

In the domain, the entities and enumerators that represent the business model are completely clean, without any attributes that couple them to persistence.

All queries are made according to the business model, so all queries are decoupled from the physical model of the data.

In the infrastructure, all the necessary configuration is defined to be able to persist and obtain the data from the different sources.

The schema configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

All the expressions that are used for the definition of conditions and for the execution of actions are based on the expression engine [js-expressions](https://www.npmjs.com/package/js-expressions)

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

## Related projects

- [Lambda ORM CLI](https://github.com/FlavioLionelRita/lambdaorm-cli)
- [Lambda ORM Service](https://github.com/FlavioLionelRita/lambdaorm-cvs)
- [Node Client](https://github.com/FlavioLionelRita/lambdaorm-client-node)
- [Kotlin Client](https://github.com/FlavioLionelRita/lambdaorm-client-kotlin)

## Labs

You can access various labs at [github.com/FlavioLionelRita/lambdaorm-labs](https://github.com/FlavioLionelRita/lambdaorm-labs)
