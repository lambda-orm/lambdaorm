# Lambda ORM

**IMPORTANT: the library is in an Alpha version!!!**

LambdaORM is an intermediary between the business model and the persistence of the data.
Completely decoupling the business model from the data layer.
For this use:

- Query Language written in javascript lambda expressions.
- Schema Configuration.

## Features

- Query Language
	- Simple query language based on javascript lambda expressions.
	- Can write the expression as javascript code or as a string
	- Crud clauses
	- Implicit joins and group by
	- Eager loading using the Include() method.
	- Metadata from query expression
- Schema Configuration
	- Decoupling the business model from phisical model
	- Configuration in json or yml formats
	- Definition of mappins to map the business model with the physical model
	- Extends entities
	- Environment variables
	- define index, unique key, constraints
- CLI
	- Init and update commands
	- Run expressions
	- Sync and drop schema
	- Imports and exports
- Repositories
- Transactions
- Using multiple database connections

## Schema Configuration

It is the nexus between the business model and the persistence of the data.

The classes that represent the business model are completely clean, without any attributes that link them to persistence.

All the configuration necessary to resolve the relationship between the business model and persistence is done in the schema, which is configuration.

This configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

### Config

When the orm.init () method is invoked, the initialization of the orm will be executed from the configuration.

This configuration contains the main sections, paths, databases and schemas.

- In the app section, the general configuration of the application is set, such as the main paths, default database, etc.
- In the databases section the databases to which we are going to connect and which is the corresponding schema are defined
- In the section of diagrams, the entities, their relationships and their mapping with the database are defined.

### Example:

This schema has two entities that are in different databases.

![schema](https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm/HEAD/images/schema4.svg)

The database attribute is used in the entity to be able to specify that an entity is in a database other than the default of the schema.

```yaml
entities:
  - name: Countries
    primaryKey: ["iso3"]
    uniqueKey: ["name"]
    properties:
      - name: name
        nullable: false
      - name: iso3
        length: 3
        nullable: false
    relations:
      - name: states
        type: manyToOne
        composite: true
        from: iso3
        entity: States
        to: countryCode
  - name: States
    primaryKey: ["id"]
    uniqueKey: ["countryCode", "name"]
    properties:
      - name: id
        type: integer
        nullable: false
      - name: name
        nullable: false
      - name: countryCode
        nullable: false
        length: 3
    relations:
      - name: country
        from: countryCode
        entity: Countries
        to: iso3
dataSources:
  - name: dataSource1
    dialect: mysql
    connection:
      host: localhost
      port: 3306
      user: test
      password: test
      database: test
  - name: dataSource2
    dialect: postgres
    connection:
      host: localhost
      port: 5432
      user: test
      password: test
      database: test
stages:
  - name: stage1
    dataSources:
      - name: dataSource2
        condition: entity == "States"
      - name: dataSource1
```

## Lambda expressions

The [lambda expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are written based on the programming language itself, referring to the business model, completely abstracting from the database language and its structure.

The purpose is to use javascript syntax to write query expressions. Which will be translated into the SQL statement corresponding to the database engine.

Example:

```ts
Countries.page(1,10).include(p => p.states.map(p=> [p.name,p.latitude,p.longitude] ))
```

The engine also allows us to write the expressions in a string.

```ts
'Countries.page(1,10).include(p => p.states.map(p=> [p.name,p.latitude,p.longitude] ))'
```

### Advantage:

 - Use of the same programming language.
 - It is not necessary to learn a new language.
 - Easy to write and understand expressions.
 - Use of the intellisense offered by the IDE to write the expressions.
 - Avoid syntax errors.

## Usage

To work with the orm we can do it using the singleton object called "orm" or using repositories.

### Objeto __orm__

This orm object acts as a facade and from this we access all the functionalities.

To execute a query we have two methods

#### __Lambda method__:

This method receives the expression as a javascript lambda function.

If we are going to write the expression in the code, we must do it with the lambda function, since in this way we will have the help of intellisense and we will make sure that the expression does not have syntax errors.

```ts
import { orm } from 'lambdaorm'

(async () => {
	await orm.init()	
	const exp = (country:string)=>
				Products.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))
						.having(p => max(p.price) > 50)
						.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
						.sort(p => desc(p.largestPrice))

	const result = await orm.lambda(exp).execute({ country: 'USA' },'mydb')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

where the SQL equivalent of the expression is:

```sql
SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` 
FROM Products p 
INNER JOIN Suppliers s ON s.SupplierID = p.SupplierID 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
WHERE ((p.UnitPrice > 5 AND s.Country = ?) OR p.UnitsInStock < 3) 
GROUP BY c.CategoryName 
HAVING MAX(p.UnitPrice) > 50 
ORDER BY `largestPrice` desc 
```

#### __Expression method__:

This method receives the expression as a text string.

if the expression comes from somewhere else, UI, CLI command, persisted, etc, in this case we will use the expression in a string

```ts
import { orm } from 'lambdaorm'

(async () => {
	await orm.init()
	const country = 'USA'
	const exp = `Products.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))
						.having(p => max(p.price) > 50)
						.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
						.sort(p => desc(p.largestPrice))`

	const result = await orm.expression(exp).execute({ country: country },'mydb')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

### Repositories

Repositories are associated with an entity and have several methods to interact with it.

Example:

```ts
import { orm } from 'lambdaorm'
import { ProductRespository } from './models/northwind'

(async () => {
	await orm.init()
	const productRepository = new ProductRespository('mydb')
	const country = 'USA'
	const result = awaitproductRepository.query().filter(p => (p.price > 5 && p.supplier.country === country) || (p.inStock < 3))
			.having(p => max(p.price) > 50)
			.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
			.sort(p => desc(p.largestPrice))
			.execute({ country: country })
	
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Repository)

### Includes:

LambdaORM includes the Include method to load related entities, both for OnetoMany, manyToOne and oneToOne relationships.

We can also apply filters or bring us some fields from the related entities.

For each include, a statement is executed bringing all the necessary records, then the objects with relationships are assembled in memory. In this way, multiple executions are avoided, considerably improving performance.

Includes can be used in selects, insert, update, delete, and bulckinsert.

Example:

``` ts
import { orm } from 'lambdaorm'
(async () => {
	await orm.init()
	const expression = (id:number) => Orders
		.filter(p => p.id === id)
		.include(p => [p.customer.map(p => ({ name: p.name, address: concat(p.address, ', ', p.city, ' (', p.postalCode, ')  ', p.country) })),
			p.details.include(p => p.product
				.include(p => p.category.map(p => p.name))
				.map(p => p.name))
				.map(p => [p.quantity, p.unitPrice])])
		.map(p => p.orderDate)

	const result = await orm.lambda(expression).execute('mydb')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

The previous sentence will bring us the following result:

```json
[[
{
	"orderDate": "1996-07-03T22:00:00.000Z",
	"customer": { "name": "Vins et alcools Chevalier", "address": "59 rue de l'Abbaye, Reims (51100)  France"
	},
	"details": [
		{
			"quantity": 12, "unitPrice": 14,
			"product": { "name": "Queso Cabrales", 	"category": { "name": "Dairy Products"}
			}
		},
		{
			"quantity": 10, "unitPrice": 9.8,
			"product": { "name": "Singaporean Hokkien Fried Mee",	"category": { "name": "Grains/Cereals" 	}}
		},
		{
			"quantity": 5, "unitPrice": 34.8,
			"product": { "name": "Mozzarella di Giovanni", "category": { "name": "Dairy Products"	}	}
		}
	]
}
]]
```

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)

### Transactions

To work with transactions use the orm.transaction method.

This method receives the name of the database as the first argument and as the second it is a callback function that does not pass a Transaction object, in the example we name it tr.

We use the lambda or expression method to execute the sentence (as we found it written).

When we reach the end and return the callback, the orm will internally execute the COMMIT, if there is an exception, internally the ROLLBACK will be executed

Example

``` ts
import { orm } from 'lambdaorm'

(async () => {

const order={customerId:"VINET",employeeId:5,orderDate:"1996-07-03T22:00:00.000Z",requiredDate:"1996-07-31T22:00:00.000Z",shippedDate:"1996-07-15T22:00:00.000Z",shipViaId:3,freight:32.38,name:"Vins et alcools Chevalier",address:"59 rue de l-Abbaye",city:"Reims",region:null,postalCode:"51100",country:"France",details:[{productId:11,unitPrice:14,quantity:12,discount:!1},{productId:42,unitPrice:9.8,quantity:10,discount:!1},{productId:72,unitPrice:34.8,quantity:5,discount:!1}]};

try {
orm.transaction('mydb', async (tr) => {
	// create order
	const orderId = await tr.lambda(() => Orders.insert().include(p => p.details), order)
	// get order
	const result = await tr.lambda((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
	const order2 = result[0]
	// updated order
	order2.address = 'changed 59 rue de l-Abbaye'
	order2.details[0].discount = true
	order2.details[1].unitPrice = 10
	order2.details[2].quantity = 7
	const updateCount = await tr.lambda(() => Orders.update().include(p => p.details), order2)
	console.log(updateCount)
	// get order
	const order3 = await tr.lambda((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
	console.log(JSON.stringify(order3))
	// delete
	const deleteCount = await tr.lambda(() => Orders.delete().include(p => p.details), order3[0])
	console.log(deleteCount)
	// get order
	const order4 = await tr.lambda((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
	console.log(JSON.stringify(order4))
})
} catch (error) {
	console.log(error)
}
})()
```

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Transaction)

### Metadata

Lambda ORM has the following methods to extract metadata information from expressions.

To execute these methods it is not necessary to connect to the database.

|method    		|Description          															|Path                         						  						|
|:------------|:--------------------------------------------------|:------------------------------------------------------|
|	parameters	| returns the list of parameters in the expression	| orm.lambda(query).parameters(schema) 									|
|	model				| returns the model of the result in an execution		| orm.lambda(query).model(schema)												|
|	metadata		| returns the metadata of the expression						| orm.lambda(query).metadata(schema)										|
|	sentence		| returns the sentence in the specified dialect			| orm.lambda(query).sentence('mysql','northwind')				|

- [more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/metadata)

## Installation

```sh
npm install lambdaorm
```

## CLI

Install the package globally to use the CLI commands to help you create and maintain projects

```sh
npm install lambdaorm-cli -g
```

- [CLI package](https://www.npmjs.com/package/lambdaorm-cli)

## Documentation

- [Wiki](https://github.com/FlavioLionelRita/lambdaorm/wiki)
- [Source Code](https://github.com/FlavioLionelRita/lambdaorm/blob/main/doc/source/README.md)

## Labs

### Lab northwind

In this laboratory we will see:

Creating the northwind sample database tables and loading it with sample data. This database presents several non-standard cases such as: - Name of tables and fields with spaces - Tables with composite primary keys - Tables with autonumeric ids and others with ids strings

Since this is the database that was used for many examples and unit tests, you can test the example queries that are in the documentation. We will also see some example queries to execute from CLI

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab-northwind)

### Lab 01

In this laboratory we will see:

- How to use the Lambdaorm-cli commands
- how to create a project that uses lambda ORM
- How to define a schema
- how to run a bulckInsert from a file
- how to export data from a schema
- how to import data into a schema from a previously generated export file

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab01)

### Lab 02

In this laboratory we will see:

- how to create a project that uses lambda ORM
- How to define a schema
- how to extend entities using abstract entities
- How to insert data from a file.
- how to run queries from cli to perform different types of queries

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab02)

### Lab 03

In this laboratory we will see:

- How to insert data from a file to more than one table.
- how to extend entities using abstract entities
- how to extend a schema to create a new one, overwriting the mapping
- how to work with two schemas and databases that share the same model
- how to use imported data from one database to import it into another

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab03)

### Lab 04

In this laboratory we will see:

- How to insert data from a file to more than one table.
- how to extend entities using abstract entities
- how to define a schema that works with entities in different databases
- how to run a bulkinsert on entities in different databases
- how to export and import entity data in different databases

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab04)
