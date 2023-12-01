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

## Schema

The schema includes all the configuration that the ORM needs.

The schema separates the definition of the business model (Domain) from the persistence of the data (Infrastructure).

In the domain, the entities and enumerators that represent the business model are completely clean, without any attributes that couple them to persistence.

All queries are made according to the business model, so all queries are decoupled from the physical model of the data.

In the infrastructure, all the necessary configuration is defined to be able to persist and obtain the data from the different sources.

The schema configuration can be done in a yaml, json file or passed as a parameter when initializing the ORM.

All the expressions that are used for the definition of conditions and for the execution of actions are based on the expression engine [js-expressions](https://www.npmjs.com/package/js-expressions)

## Usage

To work with the orm we can do it using the singleton object called "orm" or using repositories.

### Object **orm**

This orm object acts as a facade and from this we access all the methods.

When the orm.init() method is called, the orm initialization will be executed from the configuration.

#### **execute method**:

This method receives the expression as a javascript lambda function or a string.

### Queries

The query language is based on [javascript lambda expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
These expressions can be written as javascript code by browsing the business model entities.

Expressions can also be sent as a string

λOrm translates the expression into the language corresponding to each database engine.

### Query Language Example

For a schema where we have mapped the entities to different data sources.
For example:

- Orders and OrderDetails are located in a MongoDb collection
- Customers in a MySQL table
- Products in a Postgres table.

**We can execute and also obtain the execution plan:**

```typescript
import { orm } from 'lambdaorm'
(async () => {
	await orm.init()	
	const query =  
	`Orders.filter(p => p.customerId == customerId)
		.include(p => [p.details.include(p=> p.product.map(p=>p.name))
                    .map(p=> {subTotal: p.quantity * p.unitPrice}) ,
                  p.customer.map(p => p.name)])
		.order(p=> p.orderDate)							
		.page(1,1)`  
	const result = await orm.execute(query, { customerId: 'HANAR' })
	console.log(JSON.stringify(result,null,2))
	const plan = orm.plan(query)
  console.log(JSON.stringify(plan,null,2))	
	await orm.end()
})()
```

**Result:**

```json
[
  {
    "id": 3,
    "customerId": "HANAR",
    "orderDate": "1996-07-08T00:00:00.000+02:00",
    "details": [
      {
        "subTotal": 77,
        "product": {
          "name": "Jack's New England Clam Chowder"
        }
      },
      {
        "subTotal": 1484,
        "product": {
          "name": "Manjimup Dried Apples"
        }
      },
      {
        "subTotal": 252,
        "product": {
          "name": "Louisiana Fiery Hot Pepper Sauce"
        }
      }
    ],
    "customer": {
      "name": "Hanari Carnes"
    }
  }
]
```

**Plan:**

```json
{
  "entity": "Orders",
  "dialect": "MongoDB",
  "source": "Ordering",
  "sentence": "[{ \"$match\" : { \"CustomerID\":{{customerId}} } }, { \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"customerId\":\"$CustomerID\", \"orderDate\":\"$OrderDate\", \"__id\":\"$_id\", \"__customerId\":\"$CustomerID\" ,\"details\": { \"$map\":{ \"input\": \"$\\\"Order Details\\\"\", \"in\": { \"subTotal\":{ \"$multiply\" :[\"$$this.Quantity\",\"$$this.UnitPrice\"] }, \"__productId\":\"$$this.ProductID\", \"LambdaOrmParentId\":\"$$this.OrderID\" } }} }} , { \"$sort\" :{ \"OrderDate\":1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]",
  "children": [
    {
      "entity": "Orders.details",
      "dialect": "MongoDB",
      "source": "Ordering",
      "children": [
        {
          "entity": "Products",
          "dialect": "MySQL",
          "source": "Catalog",
          "sentence": "SELECT p.ProductName AS name, p.ProductID AS LambdaOrmParentId FROM Products p  WHERE  p.ProductID IN (?) "
        }
      ]
    },
    {
      "entity": "Customers",
      "dialect": "PostgreSQL",
      "source": "Crm",
      "sentence": "SELECT c.CompanyName AS \"name\", c.CustomerID AS \"LambdaOrmParentId\" FROM Customers c  WHERE  c.CustomerID IN ($1) "
    }
  ]
}
```

### We can do it ourselves through CLI

**Execute:**

```sh
lambdaorm execute -q 'Orders.filter(p => p.customerId == customerId).include(p => [p.details.include(p=> p.product.map(p=>p.name)),p.customer.map(p => p.name)]).order(p=> p.orderDate).page(1,2)' -d	'{"customerId":"HANAR"}'
```

**Plan:**

```sh
lambdaorm plan -q 'Orders.filter(p => p.customerId == customerId).include(p => [p.details.include(p=> p.product.map(p=>p.name)),p.customer.map(p => p.name)]).order(p=> p.orderDate).page(1,2)'
```

### Use lambda expression

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

**Result:**

```json
[
  {
    "name": "Afghanistan",
    "subregion": "Southern Asia",
    "latitude": "33.00000000",
    "longitude": "65.00000000",
    "states": [
      {
        "name": "Farah",
        "latitude": "32.49532800",
        "longitude": "62.26266270"
      },
      {
        "name": "Faryab",
        "latitude": "36.07956130",
        "longitude": "64.90595500"
      }
    ]
  },
  {
    "name": "United Arab Emirates",
    "subregion": "Western Asia",
    "latitude": "24.00000000",
    "longitude": "54.00000000",
    "states": [
      {
        "name": "Fujairah",
        "latitude": "25.12880990",
        "longitude": "56.32648490"
      }
    ]
  },
  {
    "name": "Armenia",
    "subregion": "Western Asia",
    "latitude": "40.00000000",
    "longitude": "45.00000000",
    "states": []
  }
]
```

#### Advantage

- Use of the same programming language.
- No need to learn a new language.
- Expressions easy to write and understand.
- Use of the intellisense offered by the IDE to write the expressions.
- Avoid syntax errors.

## Related projects

- [3xpr](https://www.npmjs.com/package/3xpr)
- [Lambda ORM CLI](https://www.npmjs.com/package/lambdaorm-cli)
- [Lambda ORM Service](https://github.com/FlavioLionelRita/lambdaorm-svc)
- [Client Node](https://www.npmjs.com/package/lambdaorm-client-node)
- [Client Kotlin](https://github.com/FlavioLionelRita/lambdaorm-client-kotlin)

## Documentation

Full documentation is available in the [Wiki](https://github.com/FlavioLionelRita/lambdaorm/wiki).

## Labs

You can access various labs at [lambdaorm labs](https://github.com/FlavioLionelRita/lambdaorm-labs)
