To show different ways of consuming the ORM we will propose different cases with an example domain and we will propose different infrastructures.
To simplify the schema, we will omit the specification of the properties, keys, indices and relationships of the entities as well as the mapping.
But you can see the complete schema in the example labs.

## Unique Source

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

## Multiple Sources

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

## [CQRS (Command Query Responsibility Segregation)](https://microservices.io/patterns/data/cqrs.html)

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
      after: orm.execute(query,data,{stage:"insights"})        
```

**Query:**

In this case we will execute the query from the REST service.

```sh
curl -X POST "http://localhost:9291/execute?format=beautiful" -H "Content-Type: application/json" -d '{"query": "Orders.filter(p=>p.customerId==customerId).include(p=>[p.details.include(p=>p.product.map(p=>p.name)).map(p=>{subTotal:p.quantity*p.unitPrice}),p.customer.map(p=>p.name)]).order(p=>p.orderDate).page(1,1)","data":"{\"customerId\": \"CENTC\"}", "options":"{\"stage\": \"default\"}"}'
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
curl -X POST "http://localhost:9291/plan?format=beautiful" -H "Content-Type: application/json" -d '{"query": "Orders.filter(p=>p.customerId==customerId).include(p=>[p.details.include(p=>p.product.map(p=>p.name)).map(p=>{subTotal:p.quantity*p.unitPrice}),p.customer.map(p=>p.name)]).order(p=>p.orderDate).page(1,1)", "options":"{\"default\": \"cqrs\"}"}'
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
curl -X POST "http://localhost:9291/plan?format=beautiful" -H "Content-Type: application/json" -d '{"query": "Orders.filter(p=>p.customerId==customerId).include(p=>[p.details.include(p=>p.product.map(p=>p.name)).map(p=>{subTotal:p.quantity*p.unitPrice}),p.customer.map(p=>p.name)]).order(p=>p.orderDate).page(1,1)", "options":"{\"stage\": \"cqrs\"}"}'
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

## [CQRS (Command Query Responsibility Segregation)](https://microservices.io/patterns/data/cqrs.html) with Kafka

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
        execute: orm.execute(message.query,message.data, {stage:"insights"})    
application:
  listeners:
    - name: syncInsights
      on: [insert, bulkInsert, update, delete ]
      condition: options.stage.in("default","cqrs")
      after: queue.send("insights-sync",[{query,data}]) 
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

## Considerations

[view complete laboratory](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/client-node/02-import-data)

Keep in mind that whether we use the "lambdaorm" or "lambdaorm-client-node" library we can write the queries in lambda or string format.

We could start a development by proposing a simple infrastructure and then make modifications to it and this would not affect our code, since the queries are written based on the domain model and are independent of the infrastructure.

You could also have development, test and production environments with different infrastructure configurations without having to alter the code.

In addition to the examples presented previously, there are many other use cases that can be solved with λORM by configuring the schema and queries language. Therefore, we invite you to explore the different [laboratories](https://github.com/lambda-orm/lambdaorm-labs) and read the [documentation](https://github.com/lambda-orm/lambdaorm/wiki).
