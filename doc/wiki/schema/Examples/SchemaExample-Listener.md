# Listener on Schema

Listeners allow us to execute actions when an event occurs in the ORM. \
events are set to the "on" property. \
And the events that can be listened to are select, insert, bulkInsert, update and delete. \
The "condition" property allows you to define an expression that is evaluated to determine if the listener is executed. \
The expressions to be executed can be defined in the "before", "after" and "error" properties. \

The parameters that we have to use in the expressions are:

| Parameter   | Description                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| query       | The query expression that was executed                                                                          |
| data        | The data that was sent when the expression was executed                                                         |
| options     | The options that were sent when the expression was executed                                                     |
| result      | It is only available in the after event and contains the result of the expression execution                     |
| action      | The action that was executed (select, insert, update, delete, upsert, merge, bulkInsert, bulkUpdate, bulkMerge) |
| type        | The type of sentence that was executed (dql, ddl, dml)                                                          |
| category    | The category of the sentence that was executed (select, insert, update, delete, upsert)                         |
| sentence    | The sentence that was executed                                                                                  |
| dialect     | The dialect of the source where the sentence was executed                                                       |
| source      | The source where the sentence was executed                                                                      |
| entity      | The entity that was affected by the sentence                                                                    |
| error       | It is only available in the error event and contains the error that occurred                                    |

## Listener Example

In this example we see how a Listener is declared to synchronize data in Insights. \
When a record is inserted, updated or deleted in the default or cqrs stages, the listener is executed. \
In this case, the expression is defined in the after property, which executes the same expression with the same data but in the stage insights.

**Part of the schema where the listener is defined:**

```yaml
...
application:
  listeners:
    - name: syncInsights
      on: [insert, bulkInsert, update, delete]
      condition: options.stage.in("default","cqrs")
      after: orm.execute(query,data,{stage:"insights"}) 
```

**Schema Complete:**

```yaml
domain:  
  enums:
  entities:
  - name: Address
    abstract: true
    indexes:
    - name: postalCode
      fields: ["postalCode"]
    - name: region
      fields: ["region", "country"]
    - name: city
      fields: ["city"]
    properties:
    - name: address
    - name: city
    - name: region
    - name: postalCode
      length: 20
    - name: country
  - name: Categories
    primaryKey: ["id"]
    uniqueKey: ["name"]
    properties:
    - name: id
      type: integer
      required: true
      autoIncrement: true
    - name: name
      required: true
  - name: Customers
    extends: Address
    primaryKey: ["id"]
    indexes:
    - name: name
      fields: ["name"]
    properties:
    - name: id
      length: 5
      required: true
    - name: name
      required: true
  - name: Products
    primaryKey: ["id"]
    uniqueKey: ["name", "supplierId"]
    properties:
    - name: id
      type: integer
      required: true
      autoIncrement: true
    - name: name
      required: true
    - name: categoryId
      type: integer
    - name: quantity
    - name: price
      type: decimal
      default: 0
    relations:
    - name: category
      from: categoryId
      entity: Categories
      to: id
      target: products
  - name: Orders
    primaryKey: ["id"]
    indexes:
    - name: orderDate
      fields: ["orderDate"]
    properties:
    - name: id
      type: integer
      required: true
      autoIncrement: true
    - name: customerId
      required: true
      length: 5
    - name: orderDate
      type: dateTime 
    relations:
    - name: customer
      from: customerId
      entity: Customers
      to: id
      target: orders
  - name: Orders.details
    primaryKey: ["orderId", "productId"]
    properties:
    - name: orderId
      required: true
      type: integer
    - name: productId
      required: true
      type: integer
    - name: unitPrice
      type: decimal
    - name: quantity
      type: decimal
    relations:
    - name: order
      from: orderId
      entity: Orders
      to: id
      target: details
    - name: product
      from: productId
      entity: Products
      to: id
      target: orderDetails
infrastructure:
  views:
  - name: default  
  mappings:
  - name: default
    entities:
    - name: Address
      abstract: true
      properties:
      - name: address
        mapping: Address
      - name: city
        mapping: City
      - name: region
        mapping: Region
      - name: postalCode
        mapping: PostalCode
      - name: country
        mapping: Country
    - name: Categories
      mapping: Categories
      properties:
      - name: id
        mapping: CategoryID
      - name: name
        mapping: CategoryName
    - name: Customers
      extends: Address
      mapping: Customers
      properties:
      - name: id
        mapping: CustomerID
      - name: name
        mapping: CompanyName
    - name: Products
      mapping: Products
      properties:
      - name: id
        mapping: ProductID
      - name: name
        mapping: ProductName
      - name: categoryId
        mapping: CategoryID
      - name: quantity
        mapping: QuantityPerUnit
      - name: price
        mapping: UnitPrice
    - name: Orders
      mapping: Orders
      properties:
      - name: id
        mapping: OrderID
      - name: customerId
        mapping: CustomerID
      - name: orderDate
        mapping: OrderDate
    - name: Orders.details
      mapping: Order Details
      properties:
      - name: orderId
        mapping: OrderID
      - name: productId
        mapping: ProductID
      - name: unitPrice
        mapping: UnitPrice
      - name: quantity
        mapping: Quantity
  - name: mongoDb
    extends: default
    entities:
      - name: Orders
        sequence: SQ_ORDERS
        properties:
          - name: id
            mapping: _id
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

## Laboratories

[CLI - northwind cqrs](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/08-northwind-cqrs)
