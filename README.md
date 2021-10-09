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
[
  [
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
	]
]
```

More info:

- [include](https://github.com/FlavioLionelRita/lambdaorm/wiki/Query-Include)

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
		let result = await orm.lambda(query).execute({ id: 10248 }, 'source')
		console.log(JSON.stringify(result, null, 2))

		//writing the statement as a lambda expression to a text string
		const expression = 'Orders.filter(p => p.id === id).include(p => p.details)'
		result = await orm.expression(expression).execute({ id: 10248 }, 'source')
		console.log(JSON.stringify(result, null, 2))

	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
	}
})()
```

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

### Operators

The operators used are the same as those of javascript.

below access to their documentation:

- ["Arithmectic"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Arithmectic)
- ["Assignment"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Assignment)
- ["Bitwise"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Bitwise)
- ["Comparison"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Comparison)
- ["Logical"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operators-Logical)
- ["Array"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Operatos-Array)

### Functions

In the case of functions, some correspond to javascript functions and others are specific to sql

below access to their documentation:

- ["Numeric"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Numeric)
- ["String"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-String)
- ["Datetime"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Datetime)
- ["Convert"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Convert)
- ["Nullable"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Nullable)
- ["General"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-General)
- ["Sort"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Function-Sort)
- ["Conditionals"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Conditionals)
- ["Group"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Group)
- ["Metadata"](https://github.com/FlavioLionelRita/lambdaorm/wiki/Functions-Metadata)

## Metadata

TODO

## Config

### Databases

TODO

### Schemas

TODO

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

TODO
