# Lambda ORM

## **IMPORTANT:** the library is in an Alpha version!!!

LambdaORM is an ORM based on using the same syntax of lambda expressions in javascript to write the expressions that will be translated into SQL sentences according to the database.

When starting from javascript lambda expressions we can use the IDE's own intellisense to write the sentences.

Example:

```ts
import { orm } from 'lambdaorm'

(async () => {
	await orm.init()
	const expression = (country:string)=>Products
			.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))
			.having(p => max(p.price) > 50)
			.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
			.sort(p => desc(p.largestPrice))

	const result = await orm.lambda(expression).execute('mysql')
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

You could also write the expression to a string.

In this case you should use the **orm.expression** method instead of **orm.lambda**

```ts
import { orm } from 'lambdaorm'

(async () => {
	await orm.init()
	const expression = `Products
						.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))
						.having(p => max(p.price) > 50)
						.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
						.sort(p => desc(p.largestPrice))`

	const result = await orm.expression(expression).execute('mysql')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()
```

## Queries:

Starting from the entity we have the following methods to assemble the sentences.

|Operator    |Description                                   										| SQL Equivalent								|																																								|
|:-----------|:-----------------------------------------------------------------|:------------------------------|:-----------------------------------------------------------------------------:|
|filter			 | To filter the records.																						| WHERE 												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|having 		 | To filter on groupings.																					|	HAVING 												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|map				 | To specify the fields to return. 																| SELECT 												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|distinct		 | to specify the fields to return by sending duplicate records.		|																|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|first			 | returns the first record																					| SELECT + ORDER BY + LIMIT 		|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|last 		 	 | returns the last record																					|	SELECT + ORDER BY DESC + LIMIT|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|take 		 	 | returns one record																								|	SELECT +  LIMIT 							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|sort				 | To specify the order in which the records are returned.					| ORDER BY 											|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|page				 | To paginate.																											| LIMIT  (MySQL)								|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)		|
|include		 | To get records of related entities																|																|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)	|
|insert			 | To insert records																								| INSERT												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Update)		|
|update			 | To update records always including a filter											| UPDATE with WHERE							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Update)		|
|updateAll	 | to be able to update all the records of an entity								| UPDATE without WHERE					|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Update)		|
|delete			 | To delete records always including a filter											| DELETE with WHERE							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Delete)		|
|deleteAll	 | To be able to delete all records of an entity										| DELETE without WHERE					|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Delete)		|
|bulkinsert	 | to insert records in bulk																				| INSERT												|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-BulkInsert)|

There are no methods for the INNER JOIN clause since it is deduced when navigating through the relations of a property.

There are no methods for the GROUP BY clause since this is deduced when grouping methods are used.

### Operators

The operators used are the same as those of javascript.

below access to their documentation:

- [Arithmectic](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Arithmectic)
- [Assignment](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Assignment)
- [Bitwise](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Bitwise)
- [Comparison](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Comparison)
- [Logical](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Logical)
- [Array](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operatos-Array)

### Functions

In the case of functions, some correspond to javascript functions and others are specific to sql

below access to their documentation:

- [Numeric](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Numeric)
- [String](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-String)
- [Datetime](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Datetime)
- [Convert](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Convert)
- [Nullable](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Nullable)
- [General](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-General)
- [Sort](https://github.com/FlavioLionelRita/lambdaorm/wiki/Function-Sort)
- [Conditionals](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Conditionals)
- [Group](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Group)
- [Metadata](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Metadata)

### Includes:

LambdaORM includes the Include method to load related entities, both for OnetoMany, manyToOne and oneToOne relationships.

We can also apply filters or bring us some fields from the related entities.

For each include, a statement is executed bringing all the necessary records, then the objects with relationships are assembled in memory. In this way, multiple executions are avoided, considerably improving performance.

Includes can be used in selects, insert, update, delete, and bulckinsert.

[More info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)

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

	const result = await orm.lambda(expression).execute('mysql')
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

## Using the ORM

To work with the orm we do it through a singleton object called "orm".

This object acts as a facade and from this we access all the functionalities.

to execute we have two methods, one lambda to which the expression is passed as a javascript lambda function and another expression to which we pass a string containing the expression.

If we are going to write the expression in the code, we should do it with the lambda function, since this way we will have the help of intellisense and make sure that the expression does not have syntax errors.

But if the expression comes to us from another side, UI, CLI command, persisted, etc, in this case we will use the expression in a string

Example:

``` ts
import { orm } from 'lambdaorm'

(async () => {
await orm.init()
try {
	//writing the statement as a lambda expression in javascript
	const query = (id: number) => Orders.filter(p => p.id === id).include(p => p.details)
	let result = await orm.lambda(query).execute('source',{ id: 10248 })
	console.log(JSON.stringify(result, null, 2))

	//writing the statement as a lambda expression to a text string
	const expression = 'Orders.filter(p => p.id === id).include(p => p.details)'
	result = await orm.expression(expression).execute('source',{ id: 10248 })
	console.log(JSON.stringify(result, null, 2))

} catch (error) {
	console.log(error)
} finally {
	await orm.end()
}
})()
```

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
orm.transaction('source', async (tr) => {
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

## Config

When the orm.init () method is invoked, the initialization of the orm will be executed from the configuration.

This configuration contains the main sections, paths, databases and schemas.

- In the paths section the src and data paths are defined.
- In the databases section the databases to which we are going to connect and which is the corresponding schema are defined
- In the section of diagrams, the entities, their relationships and their mapping with the database are defined.

Example:

```json
{
  "paths": { "src": "src", "data": "data"  },
  "databases": [
    {
      "name": "lab_01",
      "dialect": "mysql",
      "schema": "lab_01",
      "connection": { "type": "mysql", "host": "localhost", "port": 3306, "username": "test", "password": "test", "database": "test"  }
    }
  ],
  "schemas": [
    {
      "name": "lab_01",
      "enums": [],
      "entities": [
        {
          "name": "Country",
          "mapping": "COUNTRY",
          "primaryKey": [ "id"  ],
          "uniqueKey": [ "name" ],
          "properties": [
            { "name": "id", "mapping": "ID", "type": "integer","nullable": false },
            { "name": "name","mapping": "NAME", "nullable": false, "type": "string", "length": 127 },
            { "name": "alpha2","mapping": "ALPHA_2", "nullable": false,"type": "string","length": 2 },
            { "name": "alpha3", "mapping": "ALPHA_3", "nullable": false, "type": "string", "length": 3 }
          ]
        }
      ]
    }
  ]
}
```

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
	await orm.init('/home/my/db/book.yaml')
	try {
		const result = await orm.expression('Loan.map(p=>{user:p.reader.name,book:p.book.title,date:p.date})').execute('mydb')
		console.log(result)	
	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
	}
})()
```

- [more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/Config)

## Metadata

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

install Lambda ORM

```sh
npm install lambdaorm 
```

And add the packages according to the databases to be used

```sh
npm install mysql2 
npm install mariadb
npm install pg # Postgres 
npm install tedious # Microsoft SQL Server
npm install oracledb
```

to use cli commands install package globally

```sh
npm install lambdaorm -g

```

## CLI

|Command    	|Description                                   									  |																																								|
|:------------|:----------------------------------------------------------------|:-----------------------------------------------------------------------------:|
|	version	 		| Prints lambdaorm version this project uses.											|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-version)		|
|	init				| Generates lambdaorm project structure.													|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-init)				|
|	model				| Generate model.																									|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-model)			|
|	sync				|	Syncronize database.																						|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-sync)				|
|	run					| Run an expression lambda or return information									|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-run)				|
|	export			| Export data from a database 																		|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-export)			|
|	import			| Import data from file to database																|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-import)			|
|	drop				|	Removes all database objects but not the database.							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-drop)				|

## Documentation

- [Wiki](https://github.com/FlavioLionelRita/lambdaorm/wiki)
- [Source Code](https://github.com/FlavioLionelRita/lambdaorm/blob/main/doc/README.md)
