# λORM "We don't reinvent the wheel, we improve it"

[![Join the community on GitHub Discussions](https://img.shields.io/badge/Join%20the%20community-on%20GitHub%20Discussions-blue.svg)](https://github.com/lambda-orm/lambdaorm/discussions)
[![Slack](https://img.shields.io/badge/chat-on%20slack-orange)](https://join.slack.com/t/nuevoespaciod-xo58767/shared_invite/zt-29ix7pc2r-Wd_ZBWnWRDv_5DM4NPtVhQ)
[![Gitter](https://badges.gitter.im/lambdaorm/community.svg)](https://app.gitter.im/#/room/#lambdaorm-how-to-contribute:gitter.im)
[![Discord](https://img.shields.io/badge/chat-on%20discord-orange)](https://discord.com/invite/yXT6XBX2)
[![Wiki](https://img.shields.io/badge/doc-wiki-yellow)](https://github.com/lambda-orm/lambdaorm/wiki)
[![language typescript](https://img.shields.io/badge/language-typescript-blue)](https://www.npmjs.com/package/lambdaorm)
[![npm version](https://img.shields.io/badge/npm-10.2.5-green)](https://www.npmjs.com/package/lambdaorm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Github CI](https://img.shields.io/badge/Github-CI-red.svg)](https://github.com/lambda-orm/lambdaorm/actions?query=workflow%3A%22publish%22)
[![CLI](https://img.shields.io/badge/Api-CLI-blue.svg)](https://www.npmjs.com/package/lambdaorm-cli)
[![Api REST](https://img.shields.io/badge/Api-REST-blue.svg)](https://github.com/lambda-orm/lambdaorm-svc)

λORM goes beyond being an ORM library.

In addition to being consumed as a NodeJs library, it can also be consumed as a command line interface (CLI), as a REST service, or as a REST service client in various languages. This facilitates its consumption from environments.

λORM abstracts the domain model of the infrastructure, being independent of the database engine, the mapping and the distribution of entities in said engines. For example, in a query you can obtain or modify records from different entities, where some persist in MySQL, others in Postgres, and others in Mongo.

λORM allows you to define different scenarios for the same domain. For example, in one scenario the infrastructure may consist of distributed instances across SQlServer, MongoDB, and Oracle. Another scenario may be a single Postgres instance.

Through the schema you can define entities, enumerations, indexes, unique keys, default values, restrictions, mapping, sources, stages, listeners, etc. The schema can be defined in a JSON or YAML. Conditions or actions are performed with the same [expression language](https://www.npmjs.com/package/3xpr) that is used to define queries.

It is possible to implement the [CQRS](https://microservices.io/patterns/data/cqrs.html) pattern with just configuration, without needing to write a single line of additional code.

λORM has methods to obtain information from queries without having to execute them. We can get the resulting data model, the required parameters, the constraints to be evaluated in an insert or update query, and the execution plan.

Would you like to contribute? Read [our contribution guidelines](https://github.com/lambda-orm/lambdaorm/blob/main/CONTRIBUTING.md) to know more. There are many ways to help!

## Features

- Supports MySQL, MariaDB, PostgresSQL, Oracle, SqlServer, SqlJs and MongoDB.
- [Schema Configuration](https://github.com/lambda-orm/lambdaorm/wiki/Schema-Configuration)
  - Decoupling the domain model from infrastructure
	- Configuration in json or yml formats
	- Definition of mappings between domain and infrastructure
	- Extends entities
	- Environment variables
  - define indices, unique keys and constraints
  - Conditions and actions are based on the expression engine [3xpr](https://www.npmjs.com/package/3xpr)
- [Query Language](https://github.com/lambda-orm/lambdaorm/wiki/Query-Language)
	- Simple query language based on javascript lambda expressions.
	- Can write the expression as javascript code or as a string
	- Crud clauses
	- Implicit joins and group by
	- [Eager loading using the Include() method.](https://github.com/lambda-orm/lambdaorm/wiki/Include)
	- [Query expression metadata](https://github.com/lambda-orm/lambdaorm/wiki/Metadata)
- [Repositories and custom repositories](https://github.com/lambda-orm/lambdaorm/wiki/Repository)
- [Transactions and distributed transactions](https://github.com/lambda-orm/lambdaorm/wiki/Transaction)
- Performance and Optimization
  - [BulkInsert](https://github.com/lambda-orm/lambdaorm/wiki/BulkInsert)
  - High performance queries
  - Connection pooling
- Listeners and subscribers
- TypeScript and JavaScript support
- [CLI Support](https://github.com/lambda-orm/lambdaorm-cli) support
- [REST API Support](https://github.com/lambda-orm/lambdaorm-svc)
- HTTP Client Support
  - [Node Client](https://www.npmjs.com/package/lambdaorm-client-node)
  - [Kotlin Client](https://github.com/lambda-orm/lambdaorm-client-kotlin) (In Progress)
  - Java Client (Coming Soon)
  - C# Client (Coming Soon)
  - Python Client (Coming Soon)

## Usage

To show different ways of consuming the ORM we will propose different cases with an example domain and we will propose different infrastructures.
To simplify the schema, we will omit the specification of the properties, keys, indices and relationships of the entities as well as the mapping.
But you can see the complete schema in the example labs.

### Unique Source

**Schema:**

In the following schema we define 4 entities in the domain: Categories, Customers, Products and Orders, with Orders being an entity composed of Orders and Order Details.
In infrastructure we define a single scenario that is associated with a single data source called Ordering, which is a MySQL database, which uses the default mapping.

```yaml
domain:  
  entities:
  - name: Categories
  - name: Customers
  - name: Products
  - name: Orders
  - name: Orders.details
infrastructure:
  mappings:
  - name: default
  sources:
    - name: Ordering
      mapping: default
      dialect: MySQL
      connection: ${CNN_MYSQL}
  stages:
  - name: default
    sources:
      - name: Ordering
```

**Query:**

We will write the query to obtain an Order with its details belonging to a client.
We will write the query using lambda expression.

```typescript
import { orm } from 'lambdaorm'
import { Orders } from './northwind/domain/model'
( async () => {
 try { 
  // Initialize the ORM by passing the schema file
  await orm.init('./lambdaORM.yaml')
  // Query
  const query = (customerId:string)=> Orders.filter(p =>p.customerId==customerId)
                   .include(p=>[p.customer.map(p=>p.name),p.details
                    .include(p=>p.product
                     .include(p=>p.category.map(p=>p.name))
                    .map(p=>p.name))
                   .map(p=>[p.quantity,p.unitPrice])])
                   .page(1,1)
  // Execute the query                 
  const result = await orm.execute(query, {customerId: 'CENTC' })
  // Print the result
  console.log(JSON.stringify(result,null,2))
 } catch (error: any) {
  console.error(error)
 }
})()
```

**Result:**

```json
[
  {
    "id": 12,
    "customerId": "CENTC",
    "orderDate": "1996-07-18T00:00:00.000Z",
    "customer": {
      "name": "Centro comercial Moctezuma"
    },
    "details": [
      {
        "quantity": 10,
        "unitPrice": 8,
        "product": {
          "name": "Sir Rodney's Scones",
          "category": {
            "name": "Confections"
          }
        }
      },
      {
        "quantity": 1,
        "unitPrice": 20.8,
        "product": {
          "name": "Gravad lax",
          "category": {
            "name": "Seafood"
          }
        }
      }
    ]
  }
]
```

### Multiple Sources

**Schema:**

In this case we will define a scenario where the domain entities are persisted in different data sources:

- The Categories, Products entities are persisted in the source Catalog, which is a MySQL database that uses the default mapping.
- The Customers entity is persisted in the Crm source, which is a PostgreSQL database that uses the default mapping.
- The Orders entity is persisted in the Ordering source, which is a MongoDB database that uses the mongoDb mapping.

```yaml
domain:  
  entities:
  - name: Categories
  - name: Customers
  - name: Products
  - name: Orders
  - name: Orders.details
infrastructure:
  mappings:
  - name: default
  - name: mongoDb
    extends: default
  sources:
  - name: Catalog      
    dialect: MySQL
    mapping: default
    connection: ${CNN_MYSQL}      
  - name: Crm    
    dialect: PostgreSQL
    mapping: default
    connection: ${CNN_POSTGRES}
  - name: Ordering
    dialect: MongoDB
    mapping: mongoDb      
    connection: ${CNN_MONGODB}    
  stages:
  - name: default
    sources:
    - name: Catalog
      condition: entity.in(["Categories","Products"])
    - name: Crm
      condition: entity.in(["Address","Customers"])
    - name: Ordering
      condition: entity.in(["Orders","Orders.details"])
```

**Query:**

This time we will execute the query from the command line interface (CLI) and we will obtain the same result as in the previous case.

```sh
lambdaorm execute -e ".env" -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]).page(1,1)" -d "{\"customerId\": \"HANAR\"}"
```

**Result:**

```json
[
  {
    "id": 12,
    "customerId": "CENTC",
    "orderDate": "1996-07-18T00:00:00.000Z",
    "customer": {
      "name": "Centro comercial Moctezuma"
    },
    "details": [
      {
        "quantity": 10,
        "unitPrice": 8,
        "product": {
          "name": "Sir Rodney's Scones",
          "category": {
            "name": "Confections"
          }
        }
      },
      {
        "quantity": 1,
        "unitPrice": 20.8,
        "product": {
          "name": "Gravad lax",
          "category": {
            "name": "Seafood"
          }
        }
      }
    ]
  }
]
```

[view complete laboratory](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/06-northwind-multiples-datasources)

### [CQRS (Command Query Responsibility Segregation)](https://microservices.io/patterns/data/cqrs.html)

**Schema:**

In this case we will define 3 scenarios for the same domain.

- default: where data is read and written to the Catalog, Crm and Ordering sources.
- insights: where the data from the Insights source is read and written.
- cqrs: where data is read from the Insights source but persisted in the Catalog, Crm and Ordering sources.

In order to synchronize the data between the Catalog, Crm and Ordering sources with Insights, we will define a listener that will be executed after each insertion, update or deletion of data in the default and cqrs scenario and will apply the same operation in the insights scenario.

```yaml
domain:  
  entities:
  - name: Categories
  - name: Customers
  - name: Products
  - name: Orders
  - name: Orders.details
infrastructure:
  mappings:
  - name: default
  - name: mongoDb
    extends: default
  sources:
  - name: Catalog      
    dialect: MySQL
    mapping: default
    connection: ${CNN_MYSQL}      
  - name: Crm    
    dialect: PostgreSQL
    mapping: default
    connection: ${CNN_POSTGRES}
  - name: Ordering
    dialect: MongoDB
    mapping: mongoDb      
    connection: ${CNN_MONGODB}
  - name: Insights    
    dialect: PostgreSQL
    mapping: default
    connection: ${CNN_INSIGHTS}         
  stages:
  - name: default
    sources:
    - name: Catalog
      condition: entity.in(["Categories","Products"])
    - name: Crm
      condition: entity.in(["Address","Customers"])
    - name: Ordering
      condition: entity.in(["Orders","Orders.details"])
  - name: insights
    sources:
    - name: Insights
  - name: cqrs
    sources:
    - name: Insights
      condition: action == "select"
    - name: Catalog
      condition: entity.in(["Categories","Products"])
    - name: Crm
      condition: entity.in(["Address","Customers"])
    - name: Ordering
      condition: entity.in(["Orders","Orders.details"])
application:
  listeners:
    - name: syncInsights
      on: [insert, bulkInsert, update, delete ]
      condition: options.stage.in("default","cqrs")
      after: orm.execute(expression,data,{stage:"insights"})        
```

**Query:**

In this case we will execute the query from the REST service.

```sh
curl -X POST "http://localhost:9291/execute?format=beautiful" -H "Content-Type: application/json" -d '{"expression": "Orders.filter(p=>p.customerId==customerId).include(p=>[p.details.include(p=>p.product.map(p=>p.name)).map(p=>{subTotal:p.quantity*p.unitPrice}),p.customer.map(p=>p.name)]).order(p=>p.orderDate).page(1,1)","data":"{\"customerId\": \"CENTC\"}", "options":"{\"stage\": \"default\"}"}'
```

**Result:**

```json
[
  {
    "id": 12,
    "customerId": "CENTC",
    "orderDate": "1996-07-18T00:00:00.000+02:00",
    "details": [
      {
        "subTotal": 80,
        "product": {
          "name": "Sir Rodney's Scones"
        }
      },
      {
        "subTotal": 20.8,
        "product": {
          "name": "Gravad lax"
        }
      }
    ],
    "customer": {
      "name": "Centro comercial Moctezuma"
    }
  }
]
```

**Read Query Plan on Default Stage:**

When a query is executed in the default stage, data will be obtained from different data sources according to the stage configuration.

```sh
curl -X POST "http://localhost:9291/plan?format=beautiful" -H "Content-Type: application/json" -d '{"expression": "Orders.filter(p=>p.customerId==customerId).include(p=>[p.details.include(p=>p.product.map(p=>p.name)).map(p=>{subTotal:p.quantity*p.unitPrice}),p.customer.map(p=>p.name)]).order(p=>p.orderDate).page(1,1)", "options":"{\"default\": \"cqrs\"}"}'
```

**Result:**

```sh
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

**Read Query Plan on CQRS Stage:**

When you run a query on the cqrs stage, you will get data from a single data source according to the stage configuration.
But if the query is for insert, update or delete, it will be executed in the corresponding data source.

```sh
curl -X POST "http://localhost:9291/plan?format=beautiful" -H "Content-Type: application/json" -d '{"expression": "Orders.filter(p=>p.customerId==customerId).include(p=>[p.details.include(p=>p.product.map(p=>p.name)).map(p=>{subTotal:p.quantity*p.unitPrice}),p.customer.map(p=>p.name)]).order(p=>p.orderDate).page(1,1)", "options":"{\"stage\": \"cqrs\"}"}'
```

**Result:**

```json
{
  "entity": "Orders",
  "dialect": "PostgreSQL",
  "source": "Insights",
  "sentence": "SELECT o.OrderID AS \"id\", o.CustomerID AS \"customerId\", o.OrderDate AS \"orderDate\", o.OrderID AS \"__id\", o.CustomerID AS \"__customerId\" FROM Orders o  WHERE o.CustomerID = $1 ORDER BY o.OrderDate asc  OFFSET 0 LIMIT 1 ",
  "children": [
    {
      "entity": "Orders.details",
      "dialect": "PostgreSQL",
      "source": "Insights",
      "sentence": "SELECT (o1.Quantity * o1.UnitPrice) AS \"subTotal\", o1.ProductID AS \"__productId\", o1.OrderID AS \"LambdaOrmParentId\" FROM \"Order Details\" o1  WHERE  o1.OrderID IN ($1) ",
      "children": [
        {
          "entity": "Products",
          "dialect": "PostgreSQL",
          "source": "Insights",
          "sentence": "SELECT p.ProductName AS \"name\", p.ProductID AS \"LambdaOrmParentId\" FROM Products p  WHERE  p.ProductID IN ($1) "
        }
      ]
    },
    {
      "entity": "Customers",
      "dialect": "PostgreSQL",
      "source": "Insights",
      "sentence": "SELECT c.CompanyName AS \"name\", c.CustomerID AS \"LambdaOrmParentId\" FROM Customers c  WHERE  c.CustomerID IN ($1) "
    }
  ]
}
```

[view complete laboratory](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/svc/03-northwind-cqrs)

### [CQRS (Command Query Responsibility Segregation)](https://microservices.io/patterns/data/cqrs.html) with Kafka

If we use the ORM from the REST service, we can use Kafka to publish the insert, update and delete data events in the default and cqrs scenario. And configure Kafka consumers to update the data in the insights scenario.

**Schema:**

```yaml
...
infrastructure:
  ...
  queue: 
    config: $QUEUE_CONFIG
    consumers:
      - name: syncInsights
        config:
          groupId: group1
        subscribe:
          topic: insights-sync
          fromBeginning: true
        execute: orm.execute(message.expression,message.data, {stage:"insights"})    
application:
  listeners:
    - name: syncInsights
      on: [insert, bulkInsert, update, delete ]
      condition: options.stage.in("default","cqrs")
      after: queue.send("insights-sync",[{expression:expression,data:data}]) 
```

[view complete laboratory](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/svc/04-northwind-cqrs-kafka)

### Node Client

**Schema:**

In the case of using a rest service client, the schema only defines the domain and the paths in the infrastructure.
Since the infrastructure definition is done in the rest service configuration.

```yaml
domain:  
  entities:
  - name: Categories
  - name: Customers
  - name: Products
  - name: Orders
  - name: Orders.details
infrastructure:
  paths:    
    src: src
    domain: northwind/domain 
```

**Query:**

In this case we will use a Node client that will connect to the REST service to execute the query.
And in this case we will write the query in string format.

```typescript
import { orm } from 'lambdaorm-client-node'
import fs from 'fs'
import path from'path'
( async () => {
 try { 
  await orm.init('http://localhost:9291')
  // test connection
  console.log(await orm.general.ping())
  // Gets the content of the data.json file to insert the data
  const content = fs.readFileSync(path.join(__dirname,'../data.json'), 'utf-8')
  const data = JSON.parse(content)
  // Import data
  await orm.stage.import('default',data)
  // query as string
  const query = `Orders.filter(p =>p.customerId==customerId)
                   .include(p=>[p.customer.map(p=>p.name),p.details
                    .include(p=>p.product
                     .include(p=>p.category.map(p=>p.name))
                    .map(p=>p.name))
                   .map(p=>[p.quantity,p.unitPrice])])`
  // get plan 
  const plan = await orm.plan(query, { stage: 'default'})
  console.log(JSON.stringify(plan,null,2))
  // execute query
  const result = await orm.execute(query, {customerId: 'CENTC' },{ stage: 'default'})
  console.log(JSON.stringify(result,null,2))
 } catch (error: any) {
  console.error(error)
 } finally {
  await orm.end()
 }
})()
```

[view complete laboratory](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/client-node/02-import-data)

## Considerations

Keep in mind that whether we use the "lambdaorm" or "lambdaorm-client-node" library we can write the queries in lambda or string format.

We could start a development by proposing a simple infrastructure and then make modifications to it and this would not affect our code, since the queries are written based on the domain model and are independent of the infrastructure.

You could also have development, test and production environments with different infrastructure configurations without having to alter the code.

In addition to the examples presented previously, there are many other use cases that can be solved with λORM by configuring the schema and queries language. Therefore, we invite you to explore the different [laboratories](https://github.com/lambda-orm/lambdaorm-labs) and read the [documentation](https://github.com/lambda-orm/lambdaorm/wiki).

## All Labs

You can access various labs at [lambdaorm labs](https://github.com/lambda-orm/lambdaorm-labs)

## Documentation

Full documentation is available in the [Wiki](https://github.com/lambda-orm/lambdaorm/wiki).

## Related projects

- [Lambda ORM CLI](https://www.npmjs.com/package/lambdaorm-cli)
- [Lambda ORM Service](https://github.com/lambda-orm/lambdaorm-svc)
- [Client Node](https://www.npmjs.com/package/lambdaorm-client-node)
- [Client Kotlin](https://github.com/lambda-orm/lambdaorm-client-kotlin)
- [3xpr](https://www.npmjs.com/package/3xpr)
