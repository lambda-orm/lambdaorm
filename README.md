# Lambda ORM

## **IMPORTANT:** the library is in an Alpha version!!!

LambdaORM is an ORM based on using the same syntax of lambda expressions in javascript to write the expressions that will be translated into SQL sentences according to the database.
When starting from javascript lambda expressions we can use the IDE's own intellisense to write the sentences.

## Queries:

Starting from the entity we have the following methods to assemble the sentences.

|Operator    |Description                                   										| SQL Equivalent								|
|:-----------|:-----------------------------------------------------------------|:------------------------------|
|filter			 | To filter the records.																						| WHERE 												|
|having 		 | To filter on groupings.																					|	HAVING 												|
|map				 | To specify the fields to return. 																| SELECT 												|
|distinct		 | to specify the fields to return by sending duplicate records.		|																|
|first			 | returns the first record																					| SELECT + ORDER BY + LIMIT 		|
|last 		 	 | returns the last record																					|	SELECT + ORDER BY DESC + LIMIT|
|take 		 	 | returns one record																								|	SELECT +  LIMIT 							|
|sort				 | To specify the order in which the records are returned.					| ORDER BY 											|
|page				 | To paginate.																											| LIMIT  (MySQL)								|
|include		 | To get records of related entities																|																|
|insert			 | To insert records																								| INSERT												|
|update			 | To update records always including a filter											| UPDATE with WHERE							|
|updateAll	 | to be able to update all the records of an entity								| UPDATE without WHERE					|
|delete			 | To delete records always including a filter											| DELETE with WHERE							|
|deleteAll	 | To be able to delete all records of an entity										| DELETE without WHERE					|
|bulkinsert	 | to insert records in bulk																				| INSERT												|

There are no methods for the INNER JOIN clause since it is deduced when navigating through the relations of a property.

There are no methods for the GROUP BY clause since this is deduced when grouping methods are used.

Example:

``` ts
OrderDetails
	.filter(p => p.order.customer.name == customerName)
	.map(p => ({ order: p.order.orderDate, total: sum(p.quantity * p.unitPrice) }))
	.sort(p => desc(p.total))
```

the previous expression is equivalent to the following statement for MySQL.

``` sql
SELECT o1.OrderDate AS `order`, SUM(o.Quantity * o.UnitPrice) AS `total` 
FROM `Order Details` o 
INNER JOIN Orders o1 ON o1.OrderID = o.OrderID 
INNER JOIN Customers c ON c.CustomerID = o1.CustomerID 
WHERE c.CompanyName = ? 
GROUP BY o1.OrderDate 
ORDER BY `total` desc 
```

More info:

- [queries](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Select)
- [insert](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Insert)
- [update](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Update)
- [delete](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Delete)
- [bulkinsert](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Bulkinsert)
- [include](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)

## Includes:

LambdaORM includes the Include method to load related entities, both for OnetoMany, manyToOne and oneToOne relationships.

We can also apply filters or bring us some fields from the related entities.

For each include, a statement is executed bringing all the necessary records, then the objects with relationships are assembled in memory. In this way, multiple executions are avoided, considerably improving performance.

Includes can be used in selects, insert, update, delete, and bulckinsert.

Example:

``` ts
Orders
	.filter(p => p.id === id)
	.include(p => [p.customer.map(p => ({ name: p.name, address: concat(p.address, ', ', p.city, ' (', p.postalCode, ')  ', p.country) })),
			p.details.include(p => p.product
				.include(p => p.category.map(p => p.name))
			.map(p => p.name))
		.map(p => [p.quantity, p.unitPrice])])
	.map(p => p.orderDate)
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

More info:

- [include](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)

## Operators

The operators used are the same as those of javascript.

below access to their documentation:

- [Arithmectic](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Arithmectic)
- [Assignment](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Assignment)
- [Bitwise](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Bitwise)
- [Comparison](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Comparison)
- [Logical](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Logical)
- [Array](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operatos-Array)

## Functions

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

Class ORM

|method    	|Description                                   									  |
|:------------|:----------------------------------------------------------------|
|	version	 		| Prints lambdaorm version this project uses.											|
|	init				| Generates lambdaorm project structure.													|
|	model				| Generate model.																									|
|	sync				|	Syncronize database.																						|
|	export			| Export data from a database 																		|
|	import			| Import data from file to database																|
|	drop				|	Removes all database objects but not the database.							|
|	expression	| Run an expression lambda or return information									|

## Transactions

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

Lambda OMR configuration is through a file called lambdaorm.yaml
by default it must be in the root of the project.

The file structure is divided into 3 parts.

- path: paht configuration
- databases: database configuration
- schema:  schemas configuration (represents the entity model that is mapped with the tables of a database)
		
```yaml
path:
  src: path where the project code is located
  data: path where files generated in operations synchronization, export, import, etc. will be stored
databases:
  - name: name with which the database will be identified
    schema: database schema name 
    dialect: [mysql|mariadb|postgres|mssql|oracle|mongo]
    connection: connectionString  | environment variable with the connectionString 
schemas:
  schemaCode:
	name: schema name
	enums: []
	entities:
	- name: name of entity
		mapping: name table on database
		primaryKey: []
		uniqueKey: []
		properties:
		- name: name of property
			mapping: name field on database
			type: [string|boolean|integer|decimal|datetime|date|time]
			nullable: [true|false]
			autoincrement: [true|false]	
			indexes:
			- name: nameOfIndex
			fields: []
			relations:
			- name: name of relation
				type: [manyToOne|oneTpMany|oneToOne]
				composite: [true|false]	
				from: field From
				entity: name of entity related
				to: field in entity related					
```

Example:

```yaml
ath:
  src: src
  data: data
databases:
  - name: mydb
    schema: library
    dialect: mysql
    connection: MY_DB_STRING_CONNECTION
  - name: mysql
    schema: northwind
    dialect: mysql
    connection:
      host: "0.0.0.0"
      port: 3307
      user: test
      password: test
      database: northwind
      multipleStatements: true
      waitForConnections: true
      connectionLimit: 10
      queueLimit: 0
schemas:
  library:
    name: library
    enums:
    entities:
      - name: Reader
        mapping: TB_READERS
        primaryKey: ["id"]
        uniqueKey: ["name"]
        properties:
          - name: id
            mapping: READER_ID
            type: integer
            nullable: false
            autoincrement: true
          - name: name
            mapping: NAME
            nullable: false
            type: string
            length: 80
      - name: Book
        mapping: TB_BOOKS
        primaryKey: ["id"]
        uniqueKey: ["title"]
        properties:
          - name: id
            mapping: BOOK_ID
            type: integer
            length: 14
            nullable: false
            autoincrement: true
          - name: title
            mapping: TITLE
            nullable: false
            type: string
            length: 80
      - name: Loan
        mapping: TB_LOAN
        primaryKey: ["readerId", "bookId"]
        uniqueKey: ["lastName", "firstName"]
        properties:
          - name: readerId
            mapping: READER_ID
            type: integer
            nullable: false
          - name: bookId
            mapping: BOOK_ID
            type: integer
            nullable: false         
        relations:
          - name: reader
            type: oneToMany
            from: readerId
            entity: Reader
            to: id
          - name: book
            type: oneToMany
            from: bookId
            entity: Book
            to: id  

```

If you want to place the configuration file in another location or with another name, you must pass the path including the name of the configuration file to the method:  orm.init(configPath)

Example:

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

## Metadata

Lambda ORM has the following methods to extract metadata information from expressions.

To execute these methods it is not necessary to connect to the database.

|method    		|Description          															|Path                         						  						|
|:------------|:--------------------------------------------------|:------------------------------------------------------|
|	parameters	| returns the list of parameters in the expression	| orm.lambda(query).parameters(schema) 									|
|	model				| returns the model of the result in an execution		| orm.lambda(query).model(schema)												|
|	metadata		| returns the metadata of the expression						| orm.lambda(query).metadata(schema)										|
|	sentence		| returns the sentence in the specified dialect			| orm.lambda(query).sentence('mysql','northwind')				|

### Example:

```ts
import { orm } from 'lambdaorm'

(async () => {
await orm.init()

try {
	const query = (id:number) => Orders.filter(p => p.id === id).include(p => p.details).map(p => ({ name: p.orderDate, customer: p.customer.name }))

	const parameters = await orm.lambda(query).parameters('northwind')
	const model = await orm.lambda(query).model('northwind')
	const metadata = await orm.lambda(query).metadata('northwind')
	const sql = await orm.lambda(query).sentence('mysql', 'northwind')

	console.log(JSON.stringify(parameters, null, 2))
	console.log(JSON.stringify(model, null, 2))
	console.log(JSON.stringify(metadata))
	console.log(sql)
} catch (error) {
	console.log(error)
} finally {
	await orm.end()
}
})()
```

### Results:

Parameters:

```json
{
  "id": "integer"
}
```

Model:

```json
{
  "name": "datetime",
  "customer": "string",
  "details": [
    {
      "orderId": "integer",
      "productId": "integer",
      "unitPrice": "decimal",
      "quantity": "decimal",
      "discount": "decimal"
    }
  ]
}
```

Metadata:

```json
{"n":"select","t":"Sentence","c":[{"n":"filter","t":"Filter","c":[{"n":"===","t":"Operator","c":[{"n":"id","t":"Field","c":[],"e":"Orders","m":"o.OrderID"},{"n":"id","t":"Variable","c":[],"u":1}]}]},{"n":"Orders.o","t":"From","c":[]},{"n":"map","t":"Map","c":[{"n":"obj","t":"Obj","c":[{"n":"name","t":"KeyValue","c":[{"n":"orderDate","t":"Field","c":[],"e":"Orders","m":"o.OrderDate"}]},{"n":"customer","t":"KeyValue","c":[{"n":"name","t":"Field","c":[],"e":"Customers","m":"c.CompanyName"}]},{"n":"__id","t":"KeyValue","c":[{"n":"id","t":"Field","c":[],"e":"Orders","m":"o.OrderID"}]}]}]},{"n":"details","t":"SentenceInclude","c":[{"n":"select","t":"Sentence","c":[{"n":"filter","t":"Filter","c":[{"n":"includes","t":"FunctionRef","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"},{"n":"__parentId","t":"Variable","c":[],"u":1}]}]},{"n":"Order Details.o1","t":"From","c":[]},{"n":"map","t":"Map","c":[{"n":"obj","t":"Obj","c":[{"n":"orderId","t":"KeyValue","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"}]},{"n":"productId","t":"KeyValue","c":[{"n":"productId","t":"Field","c":[],"e":"OrderDetails","m":"o1.ProductID"}]},{"n":"unitPrice","t":"KeyValue","c":[{"n":"unitPrice","t":"Field","c":[],"e":"OrderDetails","m":"o1.UnitPrice"}]},{"n":"quantity","t":"KeyValue","c":[{"n":"quantity","t":"Field","c":[],"e":"OrderDetails","m":"o1.Quantity"}]},{"n":"discount","t":"KeyValue","c":[{"n":"discount","t":"Field","c":[],"e":"OrderDetails","m":"o1.Discount"}]},{"n":"__parentId","t":"KeyValue","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"}]}]}]}],"f":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"},{"name":"__parentId","type":"integer"}],"p":[{"name":"__parentId","type":"array"}],"e":"OrderDetails"}],"r":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","to":"orderId"}},{"n":"Customers.c","t":"Join","c":[{"n":"==","t":"Operator","c":[{"n":"id","t":"Field","c":[],"e":"Customers","m":"c.CustomerID"},{"n":"customerId","t":"Field","c":[],"e":"Orders","m":"o.CustomerID"}]}]}],"f":[{"name":"name","type":"datetime"},{"name":"customer","type":"string"},{"name":"__id","type":"integer"}],"p":[{"name":"id","type":"integer"}],"e":"Orders","a":{"name":"id","mapping":"OrderID","type":"integer","nullable":false,"autoincrement":true}}
```

Sentence:

```sql
SELECT o.OrderDate AS `name`, c.CompanyName AS `customer`, o.OrderID AS `__id` 
FROM Orders o 
INNER JOIN Customers c ON c.CustomerID = o.CustomerID 
WHERE o.OrderID = ? 

SELECT o1.OrderID AS `orderId`, o1.ProductID AS `productId`, o1.UnitPrice AS `unitPrice`, o1.Quantity AS `quantity`, o1.Discount AS `discount`, o1.OrderID AS `__parentId` 
FROM `Order Details` o1  
WHERE  o1.OrderID IN (?) 
```

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

|Command    	|Description                                   									  |
|:------------|:----------------------------------------------------------------|
|	version	 		| Prints lambdaorm version this project uses.											|
|	init				| Generates lambdaorm project structure.													|
|	model				| Generate model.																									|
|	sync				|	Syncronize database.																						|
|	export			| Export data from a database 																		|
|	import			| Import data from file to database																|
|	drop				|	Removes all database objects but not the database.							|
|	expression	| Run an expression lambda or return information									|

## Documentation

[Source Code](https://github.com/FlavioLionelRita/lambdaorm/blob/main/doc/README.md)
[Wiki](https://github.com/FlavioLionelRita/lambdaorm/wiki)
