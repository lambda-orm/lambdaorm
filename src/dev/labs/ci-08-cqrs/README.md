# CLI Lab - Northwind CQRS

In this laboratory we will see:

- How to configure the schema to work with multiple data sources
- How to configure the schema to work with multiple stages
- How to execute queries from CLI to obtain data from multiple data sources in the same query
- How to obtain the execution plan of a query and visualize which data sources the queries will be executed on
- How to export data from one stage and import it into another
- How can you obtain the same results regardless of whether they are stored in a single data source or in multiple data sources

## Install lambda ORM CLI

Install the package globally to use the CLI commands to help you create and maintain projects

```sh
npm install lambdaorm-cli -g
```

Test:

```sh
lambdaorm --version
```

## Create project

will create the project folder with the basic structure.

```sh
lambdaorm init -w lab
```

position inside the project folder.

```sh
cd lab
```

## Create database for test

Create file "docker-compose.yaml"

```yaml
version: '3'
services:
  mysql:
    container_name: lab-mysql
    image: mysql:5.7
    restart: always
    environment:
      - MYSQL_DATABASE=test
      - MYSQL_USER=test
      - MYSQL_PASSWORD=test
      - MYSQL_ROOT_PASSWORD=root
    ports:
      - 3306:3306
  postgres:
    container_name: lab-postgres  
    image: postgres:10
    restart: always
    environment:
      - POSTGRES_DB=test
      - POSTGRES_USER=test
      - POSTGRES_PASSWORD=test
    ports:
      - 5433:5432
  mongodb:    
    container_name: lab-mongo
    image: mongo:5.0
    restart: always
    environment:
      - MONGO_INITDB_DATABASE=test
      - MONGO_INITDB_ROOT_USERNAME=test
      - MONGO_INITDB_ROOT_PASSWORD=test
    ports:
      - 27017:27017  
           
```

Create MySql database for test:

```sh
docker-compose -p lambdaorm-cqrs up -d
```

Initialize databases:

```sh
docker exec lab-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "ALTER DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;"
docker exec lab-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
docker exec lab-postgres psql -U test -c "CREATE DATABASE insights" -W test
```

## Add environment file

Add file ".env"

```sh
CNN_MYSQL={"host":"localhost","port":3306,"user":"test","password":"test","database":"test"}
CNN_POSTGRES={"host":"localhost","port":5433,"user":"test","password":"test","database":"test"}
CNN_MONGODB={"url":"mongodb://test:test@localhost:27017","database":"test"}
CNN_INSIGHTS={"host":"localhost","port":5433,"user":"test","password":"test","database":"insights"}
```

## Complete Schema

In the creation of the project the schema was created but without any entity.
Modify the configuration of lambdaorm.yaml with the following content

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
      on:
        - insert
        - upsert
        - update
        - delete
      condition: options.stage.in("default","cqrs")
      after: execute(query,data,{stage:"insights"})    
```

### Push

```sh
lambdaorm push -e .env -s default
lambdaorm push -e .env -s insights
```

It will generate:

```sh
├── data
│   ├── default-ddl-20231130T230552235Z-push-Catalog.sql
│   ├── default-ddl-20231130T230552236Z-push-Crm.sql
│   ├── default-ddl-20231130T230552237Z-push-Ordering.json
│   ├── default-model.json
│   ├── insights-ddl-20231130T230559815Z-push-Insights.sql
│   └── insights-model.json
```

### Populate Data

for the import we will download the following file.

```sh
wget https://raw.githubusercontent.com/lambda-orm/lambdaorm-labs/main/source/northwind/data.json
```

then we execute

```sh
lambdaorm import -e .env -s default -d ./data.json
```

## Queries

### Query on default stage

```sh
lambdaorm plan -e .env -s default -q "Orders.filter(p => p.customerId == customerId).include(p => p.customer.map(p => p.name)).order(p=> p.id).page(1,1)" -o beautiful

lambdaorm plan -e .env -s cqrs -q "Orders.filter(p => p.customerId == customerId).include(p => p.customer.map(p => p.name)).order(p=> p.id).page(1,1)" -o beautiful

lambdaorm plan -e .env -s cqrs -q "Customers.insert() " -o beautiful




lambdaorm execute -e ".env" -s default -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]).order(p=> p.id).page(1,1)" -d "{\"customerId\": \"HANAR\"}" -o beautiful

lambdaorm execute -e ".env" -s cqrs -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]).order(p=> p.id).page(1,1)" -d "{\"customerId\": \"HANAR\"}" -o beautiful
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

### Plan on default stage

If we add the -o plan parameter we can see the different statements that will be executed and in what source they will be executed.

```sh
lambdaorm execute -e ".env" -s default -o plan -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]).order(p=> p.id).page(1,1)" -d "{\"customerId\": \"HANAR\"}"
```

Result:

```json
{
  "entity": "Orders",
  "dialect": "MongoDB",
  "source": "Ordering",
  "sentence": "[{ \"$match\" : { \"CustomerID\":{{customerId}} } }, { \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"customerId\":\"$CustomerID\", \"employeeId\":\"$EmployeeID\", \"orderDate\":\"$OrderDate\", \"requiredDate\":\"$RequiredDate\", \"shippedDate\":\"$ShippedDate\", \"shipViaId\":\"$ShipVia\", \"freight\":\"$Freight\", \"name\":\"$ShipName\", \"address\":\"$ShipAddress\", \"city\":\"$ShipCity\", \"region\":\"$ShipRegion\", \"postalCode\":\"$ShipPostalCode\", \"country\":\"$ShipCountry\", \"__customerId\":\"$CustomerID\", \"__id\":\"$_id\" ,\"details\": { \"$map\":{ \"input\": \"$\\\"Order Details\\\"\", \"in\": { \"quantity\":\"$$this.Quantity\", \"unitPrice\":\"$$this.UnitPrice\", \"__productId\":\"$$this.ProductID\", \"LambdaOrmParentId\":\"$$this.OrderID\" } }} }} , { \"$sort\" :{ \"_id\":1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]",
  "children": [
    {
      "entity": "Customers",
      "dialect": "PostgreSQL",
      "source": "Crm",
      "sentence": "SELECT c.CompanyName AS \"name\", c.CustomerID AS \"LambdaOrmParentId\" FROM Customers c  WHERE  c.CustomerID IN ($1) "
    },
    {
      "entity": "Orders.details",
      "dialect": "MongoDB",
      "source": "Ordering",
      "sentence": "[{ \"$unwind\" : \"$\\\"Order Details\\\"\" }, { \"$replaceRoot\": { \"newRoot\": \"$\\\"Order Details\\\"\" } }, { \"$match\" : { \"OrderID\":{ \"$in\" :[{{LambdaOrmParentId}}]} } }, { \"$project\" :{ \"_id\": 0 , \"quantity\":\"$Quantity\", \"unitPrice\":\"$UnitPrice\", \"__productId\":\"$ProductID\", \"LambdaOrmParentId\":\"$OrderID\" }} , { \"$project\": { \"_id\": 0 } }]",
      "children": [
        {
          "entity": "Products",
          "dialect": "MySQL",
          "source": "Catalog",
          "sentence": "SELECT p.ProductName AS name, p.CategoryID AS `__categoryId`, p.ProductID AS LambdaOrmParentId FROM Products p  WHERE  p.ProductID IN (?) ",
          "children": [
            {
              "entity": "Categories",
              "dialect": "MySQL",
              "source": "Catalog",
              "sentence": "SELECT c1.CategoryName AS name, c1.CategoryID AS LambdaOrmParentId FROM Categories c1  WHERE  c1.CategoryID IN (?) "
            }
          ]
        }
      ]
    }
  ]
}
```

### Plan on insights stage

If we add the -o plan parameter we can see the different statements that will be executed and in what source they will be executed.

```sh
lambdaorm execute -e ".env" -s insights -o plan -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]).order(p=> p.id).page(1,1)" -d "{\"customerId\": \"HANAR\"}"
```

Result:

```json
{
  "entity": "Orders",
  "dialect": "PostgreSQL",
  "source": "Insights",
  "sentence": "SELECT o.OrderID AS \"id\", o.CustomerID AS \"customerId\", o.EmployeeID AS \"employeeId\", o.OrderDate AS \"orderDate\", o.RequiredDate AS \"requiredDate\", o.ShippedDate AS \"shippedDate\", o.ShipVia AS \"shipViaId\", o.Freight AS \"freight\", o.ShipName AS \"name\", o.ShipAddress AS \"address\", o.ShipCity AS \"city\", o.ShipRegion AS \"region\", o.ShipPostalCode AS \"postalCode\", o.ShipCountry AS \"country\", o.CustomerID AS \"__customerId\", o.OrderID AS \"__id\" FROM Orders o  WHERE o.CustomerID = $1 ORDER BY o.OrderID asc  OFFSET 0 LIMIT 1 ",
  "children": [
    {
      "entity": "Customers",
      "dialect": "PostgreSQL",
      "source": "Insights",
      "sentence": "SELECT c.CompanyName AS \"name\", c.CustomerID AS \"LambdaOrmParentId\" FROM Customers c  WHERE  c.CustomerID IN ($1) "
    },
    {
      "entity": "Orders.details",
      "dialect": "PostgreSQL",
      "source": "Insights",
      "sentence": "SELECT o1.Quantity AS \"quantity\", o1.UnitPrice AS \"unitPrice\", o1.ProductID AS \"__productId\", o1.OrderID AS \"LambdaOrmParentId\" FROM \"Order Details\" o1  WHERE  o1.OrderID IN ($1) ",
      "children": [
        {
          "entity": "Products",
          "dialect": "PostgreSQL",
          "source": "Insights",
          "sentence": "SELECT p.ProductName AS \"name\", p.CategoryID AS \"__categoryId\", p.ProductID AS \"LambdaOrmParentId\" FROM Products p  WHERE  p.ProductID IN ($1) ",
          "children": [
            {
              "entity": "Categories",
              "dialect": "PostgreSQL",
              "source": "Insights",
              "sentence": "SELECT c1.CategoryName AS \"name\", c1.CategoryID AS \"LambdaOrmParentId\" FROM Categories c1  WHERE  c1.CategoryID IN ($1) "
            }
          ]
        }
      ]
    }
  ]
}
```

## End

### Drop tables/collections and remove databases

```sh
lambdaorm drop -e .env -s default
lambdaorm drop -e .env -s insights
docker-compose -p lambdaorm-cqrs down
```

The data folder should remain like this:

```sh
├── data
│   ├── default-ddl-20231129T110712162Z-sync-Catalog.sql
│   ├── default-ddl-20231129T110712163Z-sync-Crm.sql
│   ├── default-ddl-20231129T110712163Z-sync-Ordering.json
│   ├── default-ddl-20231129T111730593Z-clean-Catalog.sql
│   ├── default-ddl-20231129T111730594Z-clean-Crm.sql
│   ├── default-ddl-20231129T111730594Z-clean-Ordering.json
│   ├── insights-ddl-20231129T110303423Z-sync-Insights.sql
│   └── insights-ddl-20231129T111738316Z-clean-Insights.sql
```

Remove Data

```sh
rm -rf data
```
