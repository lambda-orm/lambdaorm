# λORM

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

λORM is an ORM that allows us to perform distributed queries on different database engines.

In λORM, queries are defined using lambda expressions based on a domain model which abstracts us from the infrastructure. For example, in a query you can obtain or modify records from different entities, where some persist in MySQL, others in Postgres, and others in Mongo.

λORM allows you to define different scenarios for the same domain. For example, in one scenario, the infrastructure may consist of distributed instances across SQL Server, MongoDB, and Oracle, while in another scenario it may be a single Postgres instance. This allows the [CQRS](https://microservices.io/patterns/data/cqrs.html) pattern to be implemented through configuration, without needing to write a single line of code. [view example](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/svc/04-northwind-cqrs-with-kafka)

In addition to being used as a Node.js library, it can be consumed from a command line interface (CLI), a REST service, or a REST service client in other programming languages.

## Query Language

Example of a query where orders and their details associated with a customer are obtained:

```Typescript
const query = (country: string) => Products
    .map(p => ({ category: p.category.name, largestPrice: max(p.price) }))    
    .filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))    
    .having(p => max(p.price) > 50)
    .sort(p => desc(p.largestPrice));
// Run the query passing the value of the country parameter
const result = await orm.execute(query, { country: 'ARG' });
```

In this example:

- Define a query that returns a list of product categories along with the maximum price of each category.
- Filter products based on price and supplier's country or stock availability
- Group products by category and calculate the maximum price
- Map each product to an object with category name and maximum price
- Sort the products by largest price in descending order

**view:** [queries](https://github.com/lambda-orm/lambdaorm/wiki/Query-Language) |
[select](https://github.com/lambda-orm/lambdaorm/wiki/Select) |
[join](https://github.com/lambda-orm/lambdaorm/wiki/Join) |
[grouping](https://github.com/lambda-orm/lambdaorm/wiki/Grouping) |
[include](https://github.com/lambda-orm/lambdaorm/wiki/Include) |
[insert](https://github.com/lambda-orm/lambdaorm/wiki/Insert) |
[bulkInsert](https://github.com/lambda-orm/lambdaorm/wiki/BulkInsert) |
[update](https://github.com/lambda-orm/lambdaorm/wiki/Update) |
[delete](https://github.com/lambda-orm/lambdaorm/wiki/Delete) |
[repository](https://github.com/lambda-orm/lambdaorm/wiki/Repository) |
[usage](https://github.com/lambda-orm/lambdaorm/wiki/Usage) |
[metadata](https://github.com/lambda-orm/lambdaorm/wiki/Metadata)

### Include

The include allows us to obtain the entity data and its relationships in the same query. These data may be in different databases. \
In this example the query is expressed as a text string. (Which is another alternative to the lambda expression)

```Typescript
import { orm } from '../../lib'
(async () => {
  try {
    await orm.init('./config/northwind.yaml')
    const query = `Orders
	.filter(p => p.id === id)
	.include(p => 
	  [ p.customer.map(p => p.name), 
	    p.details
             .include(p => 
                 p.product
  	          .include(p => p.category.map(p => p.name))
		  .map(p => p.name))
	     .map(p => [p.quantity, p.unitPrice])
	   ]
         )`
	const params = { id: 102 }
	const result = await orm.execute(query, params, { stage: 'PostgreSQL' })
	console.log(JSON.stringify(result, null, 2))
   } catch (error:any) {
	console.error(error.message)
   } finally {
       await orm.end()
   }
})()
```

**Result:**

```json
[
  {
    "id": 102,
    "customerId": "SPLIR",
    "employeeId": 7,
    "orderDate": "1996-11-07T23:00:00.000Z",
    "requiredDate": "1996-12-05T23:00:00.000Z",
    "shippedDate": "1996-11-14T23:00:00.000Z",
    "shipViaId": 1,
    "freight": 8.63,
    "name": "Split Rail Beer & Ale",
    "address": "P.O. Box 555",
    "city": "Lander",
    "region": "WY",
    "postalCode": "82520",
    "country": "USA",
    "customer": {
      "name": "Split Rail Beer & Ale"
    },
    "details": [
      {
        "quantity": 24,
        "unitPrice": 5.9,
        "product": {
          "name": "Tourtire",
          "category": {
            "name": "Meat/Poultry"
          }
        }
      }
    ]
  }
]
```

**more info:** [include](https://github.com/lambda-orm/lambdaorm/wiki/Include)

## Schema Configuration

Through the schema, you can define entities, enumerations, indexes, unique keys, default values, constraints, mapping, sources, stages, listeners, etc. The schema can be defined in a JSON or YAML format. Conditions or actions are performed using the same [expression language](https://www.npmjs.com/package/3xpr) that is used to define queries.

**view:**  [schema](https://github.com/lambda-orm/lambdaorm/wiki/Schema) |
[definition](https://github.com/lambda-orm/lambdaorm/wiki/SchemaDefinition) |
[use](https://github.com/lambda-orm/lambdaorm/wiki/Schema-Use) |
[expressions](https://github.com/lambda-orm/lambdaorm/wiki/SchemaDefinition-Expressions) |
[environment Variables](https://github.com/lambda-orm/lambdaorm/wiki/SchemaDefinition-EnvironmentVariables) |
[composite](https://github.com/lambda-orm/lambdaorm/wiki/SchemaDefinition-Composite) |
[listener](https://github.com/lambda-orm/lambdaorm/wiki/SchemaExample-Listener) |
[multiple stages](https://github.com/lambda-orm/lambdaorm/wiki/SchemaExample-MultiplesStages) |
[multiple sources](https://github.com/lambda-orm/lambdaorm/wiki/SchemaExample-StageMultiplesSources) |
[push](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Push) |
[pull](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Pull) |
[fetch](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Fetch) |
[introspect](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Introspect) |
[incorporate](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization-Incorporate)

## Features

- Supports MySQL, MariaDB, PostgresSQL, Oracle, SqlServer, SqlJs and MongoDB.
- [Query Language](https://github.com/lambda-orm/lambdaorm/wiki/Query-Language)
	- Simple query language based on javascript lambda expressions.
	- Can write the expression as javascript code or as a string
	- DQL, DML and DDL clauses
	- Implicit joins and group by
	- [Eager loading using the Include() method.](https://github.com/lambda-orm/lambdaorm/wiki/Include)
	- [Query expression metadata](https://github.com/lambda-orm/lambdaorm/wiki/Metadata)
- [Repositories and custom repositories](https://github.com/lambda-orm/lambdaorm/wiki/Repository)
- [Transactions and distributed transactions](https://github.com/lambda-orm/lambdaorm/wiki/Transaction)
- [Schema Configuration](https://github.com/lambda-orm/lambdaorm/wiki/Schema)
  - Decoupling the domain model from infrastructure
	- Configuration in json or yml formats
	- Definition of mappings between domain and infrastructure
	- Extends entities
	- Environment variables
  - define indices, unique keys and constraints
  - Conditions and actions are based on the expression engine [3xpr](https://www.npmjs.com/package/3xpr)
  - [Synchronization](https://github.com/lambda-orm/lambdaorm/wiki/SchemaSynchronization)
- Performance and Optimization
  - [BulkInsert](https://github.com/lambda-orm/lambdaorm/wiki/BulkInsert)
  - High performance queries
  - Connection pooling
- [Listeners and subscribers](https://github.com/lambda-orm/lambdaorm/wiki/SchemaExample-Listener)
- TypeScript and JavaScript support
- [CLI Support](https://www.npmjs.com/package/lambdaorm-cli)
- [REST API Support](https://github.com/lambda-orm/lambdaorm-svc)
- HTTP Client Support:  [Node Client](https://www.npmjs.com/package/lambdaorm-client-node)
  [Kotlin Client](https://github.com/lambda-orm/lambdaorm-client-kotlin) (In Progress)

## Contributing

Would you like to contribute? Read [our contribution guidelines](https://github.com/lambda-orm/lambdaorm/blob/main/CONTRIBUTING.md) to learn more. There are many ways to help!

## Documentation

Full documentation is available in the [Wiki](https://github.com/lambda-orm/lambdaorm/wiki).

## All Labs

You can access various labs at [lambdaorm labs](https://github.com/lambda-orm/lambdaorm-labs)

## Related projects

- [Lambda ORM CLI](https://www.npmjs.com/package/lambdaorm-cli): Command line interface for λORM
- [Lambda ORM Service](https://github.com/lambda-orm/lambdaorm-svc): REST service for λORM
- [Client Node](https://www.npmjs.com/package/lambdaorm-client-node): HTTP client for λORM
- [Client Kotlin](https://github.com/lambda-orm/lambdaorm-client-kotlin) : HTTP client for λORM for Kotlin
- [3xpr](https://www.npmjs.com/package/3xpr): Extensible expression engine, which allows evaluating mathematical and logical expressions.
