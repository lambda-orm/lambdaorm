# Composite Entity

Using the period in the name of an entity we can define a composite entity. \
For example, if we have an entity Orders and another Orders.details \
The Orders.details entity is a composite entity of the Orders entity. \

If the datasource is NoSQL, the data will be stored in a single collection but if the datasource is Relational, the data will be stored in separate tables. \

But on the domain side it will be treated the same regardless of the type of datasource. \
abstracting from persistence technology.

## Composite Example

In this example we can see that we have an entity Orders and another Orders.details \
The Orders.details entity is a composite entity of the Orders entity. \

**Part of the schema where the composite entity is defined:**

```yaml
domain:  
  entities:
...  
  - name: Orders
    primaryKey: [id]
    indexes:
    - name: orderDate
      fields: [orderDate]
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
  - name: Orders.details
    primaryKey: [orderId, productId]
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
...
```

**Schema Complete:**

```yaml
domain:  
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

**Environment Variables:**

```sh
CNN_MYSQL={"host":"localhost","port":3306,"user":"test","password":"test","database":"test"}
CNN_POSTGRES={"host":"localhost","port":5433,"user":"test","password":"test","database":"test"}
CNN_MONGODB={"url":"mongodb://test:test@localhost:27017","database":"test"}
```

**Laboratory:**

[CLI - northwind multiples datasources](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/06-northwind-multiples-datasources)

## Composite example in different datasources

En este ejemple podemos ver como se trata una entidad compuesta en diferentes datasources. \
En el stage default se utiliza Mongo para almacenar las Orders y Orders.details \
En el stage insights se utiliza Postgres para almacenar las Orders y Orders.details  

**Part of the schema where the stages are configured:**

```yaml
...
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
...
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
```

### Orders Composite in MongoDb

Orders collection:

![OrderCompositeInMongo](https://raw.githubusercontent.com/lambda-orm/lambdaorm/HEAD/images/OrderCompositeInMongo.png)

### Orders Composite in Postgres

Orders table:

![OrderCompositeInPostgres](https://raw.githubusercontent.com/lambda-orm/lambdaorm/HEAD/images/OrderCompositeInPostgres.png)

Orders details table:

![OrderDetailsCompositeInPostgres](https://raw.githubusercontent.com/lambda-orm/lambdaorm/HEAD/images/OrderDetailCompositeInPostgres.png)

## Queries

But if we execute the same query in the different stages we can see that the result is the same

### Query on default stage

```sh
lambdaorm execute -e ".env" -s default -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]).order(p=> p.id).page(1,1)" -d "{\"customerId\": \"HANAR\"}"
```

Result:

```json
[
  {
    "id": 3,
    "customerId": "HANAR",
    "employeeId": 4,
    "orderDate": "1996-07-08T00:00:00.000+02:00",
    "requiredDate": "1996-08-05",
    "shippedDate": "1996-07-12",
    "shipViaId": 2,
    "freight": 65.83,
    "name": "Hanari Carnes",
    "address": "Rua do Pao, 67",
    "city": "Rio de Janeiro",
    "region": "RJ",
    "postalCode": "05454-876",
    "country": "Brazil",
    "details": [
      {
        "quantity": 10,
        "unitPrice": 7.7,
        "product": {
          "name": "Jack's New England Clam Chowder",
          "category": {
            "name": "Seafood"
          }
        }
      },
      {
        "quantity": 35,
        "unitPrice": 42.4,
        "product": {
          "name": "Manjimup Dried Apples",
          "category": {
            "name": "Produce"
          }
        }
      },
      {
        "quantity": 15,
        "unitPrice": 16.8,
        "product": {
          "name": "Louisiana Fiery Hot Pepper Sauce",
          "category": {
            "name": "Condiments"
          }
        }
      }
    ],
    "customer": {
      "name": "Hanari Carnes"
    }
  }
]
```

### Same query on insights stage

```sh
lambdaorm execute -e ".env" -s insights -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]).order(p=> p.id).page(1,1)" -d "{\"customerId\": \"HANAR\"}"
```

Result:

```json
[
  {
    "id": 3,
    "customerId": "HANAR",
    "employeeId": 4,
    "orderDate": "1996-07-07T22:00:00.000Z",
    "requiredDate": "1996-08-04T22:00:00.000Z",
    "shippedDate": "1996-07-11T22:00:00.000Z",
    "shipViaId": 2,
    "freight": 65.83,
    "name": "Hanari Carnes",
    "address": "Rua do Pao, 67",
    "city": "Rio de Janeiro",
    "region": "RJ",
    "postalCode": "05454-876",
    "country": "Brazil",
    "customer": {
      "name": "Hanari Carnes"
    },
    "details": [
      {
        "quantity": 10,
        "unitPrice": 7.7,
        "product": {
          "name": "Jack's New England Clam Chowder",
          "category": {
            "name": "Seafood"
          }
        }
      },
      {
        "quantity": 35,
        "unitPrice": 42.4,
        "product": {
          "name": "Manjimup Dried Apples",
          "category": {
            "name": "Produce"
          }
        }
      },
      {
        "quantity": 15,
        "unitPrice": 16.8,
        "product": {
          "name": "Louisiana Fiery Hot Pepper Sauce",
          "category": {
            "name": "Condiments"
          }
        }
      }
    ]
  }
]
```

## Laboratories

- [CLI - northwind](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/05-northwind)
- [CLI - northwind multiples datasources](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/06-northwind-multiples-datasources)
- [CLI - northwind multiples stages](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/07-northwind-multiples-stages)
