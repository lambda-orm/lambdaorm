# Lab CLI - Northwind multiple datasources

In this laboratory we will see:

Creating the northwind sample database tables and loading it with sample data.
This database presents several non-standard cases such as:
	- Name of tables and fields with spaces
	- Tables with composite primary keys
	- Tables with autonumeric ids and others with ids strings

Since this is the database that was used for many examples and unit tests, you can test the example queries that are in the documentation.
We will also see some example queries to execute from CLI

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
docker-compose -p lambdaorm-lab up -d
```

Create user and set character:

```sh
docker exec lab-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "ALTER DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;"
docker exec lab-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"
```

## Add environment file

Add file ".env"

```sh
CNN_MYSQL={"host":"localhost","port":3306,"user":"test","password":"test","database":"test"}
CNN_POSTGRES={"host":"localhost","port":5433,"user":"test","password":"test","database":"test"}
CNN_MONGODB={"url":"mongodb://test:test@localhost:27017","database":"test"}
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
        - name: description
          length: 1000
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
        - name: contact
        - name: phone
    - name: Employees
      extends: Address
      primaryKey: ["id"]
      uniqueKey: ["lastName", "firstName"]
      properties:
        - name: id
          type: integer
          required: true
          autoIncrement: true
        - name: lastName
          required: true
        - name: firstName
          required: true
        - name: title
        - name: titleOfCourtesy
        - name: birthDate
          type: dateTime
        - name: hireDate
          type: dateTime
        - name: phone
        - name: reportsToId
          type: integer
      relations:
        - name: reportsTo
          from: reportsToId
          entity: Employees
          to: id
    - name: Shippers
      primaryKey: ["id"]
      uniqueKey: ["name"]
      properties:
        - name: id
          type: integer
          required: true
          autoIncrement: true
        - name: name
          required: true
        - name: phone
          length: 20
    - name: Suppliers
      extends: Address
      primaryKey: ["id"]
      uniqueKey: ["name"]
      properties:
        - name: id
          type: integer
          required: true
          autoIncrement: true
        - name: name
          required: true
        - name: contact
        - name: phone
          length: 20
        - name: homepage
          length: 200
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
        - name: supplierId
          required: true
          type: integer
        - name: categoryId
          type: integer
        - name: quantity
        - name: price
          type: decimal
          default: 0
        - name: inStock
          type: decimal
          default: 0
        - name: onOrder
          type: decimal
          default: 0
        - name: reorderLevel
          type: decimal
          default: 0
        - name: discontinued
          type: boolean
          default: false
      relations:
        - name: supplier
          from: supplierId
          entity: Suppliers
          to: id
          target: products
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
        - name: shippedDate
          fields: ["shippedDate"]
      properties:
        - name: id
          type: integer
          required: true
          autoIncrement: true
        - name: customerId
          required: true
          length: 5
        - name: employeeId
          required: true
          type: integer
        - name: orderDate
          type: dateTime
        - name: requiredDate
          type: date
        - name: shippedDate
          type: date
        - name: shipViaId
          type: integer
        - name: freight
          type: decimal
        - name: name
        - name: address
        - name: city
        - name: region
        - name: postalCode
          length: 20
        - name: country
      relations:
        - name: customer
          from: customerId
          entity: Customers
          to: id
          target: orders
        - name: employee
          from: employeeId
          entity: Employees
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
        - name: discount
          type: decimal
      relations:
        - name: order
          from: orderId
          entity: Orders
          to: id
          target: details
          # targetComposite: true
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
            - name: description
              mapping: Description
        - name: Customers
          extends: Address
          mapping: Customers
          properties:
            - name: id
              mapping: CustomerID
            - name: name
              mapping: CompanyName
            - name: contact
              mapping: ContactName
            - name: phone
              mapping: ContactTitle
        - name: Employees
          extends: Address
          mapping: Employees
          properties:
            - name: id
              mapping: EmployeeID
            - name: lastName
              mapping: LastName
            - name: firstName
              mapping: FirstName
            - name: title
              mapping: Title
            - name: titleOfCourtesy
              mapping: TitleOfCourtesy
            - name: birthDate
              mapping: BirthDate
            - name: hireDate
              mapping: HireDate
            - name: phone
              mapping: HomePhone
            - name: reportsToId
              mapping: ReportsTo
        - name: Shippers
          mapping: Shippers
          properties:
            - name: id
              mapping: ShipperID
            - name: name
              mapping: CompanyName
            - name: phone
              mapping: Phone
        - name: Suppliers
          extends: Address
          mapping: Suppliers
          properties:
            - name: id
              mapping: SupplierID
            - name: name
              mapping: CompanyName
            - name: contact
              mapping: ContactName
            - name: phone
              mapping: Phone
            - name: homepage
              mapping: HomePage
        - name: Products
          mapping: Products
          properties:
            - name: id
              mapping: ProductID
            - name: name
              mapping: ProductName
            - name: supplierId
              mapping: SupplierID
            - name: categoryId
              mapping: CategoryID
            - name: quantity
              mapping: QuantityPerUnit
            - name: price
              mapping: UnitPrice
            - name: inStock
              mapping: UnitsInStock
            - name: onOrder
              mapping: UnitsOnOrder
            - name: reorderLevel
              mapping: ReorderLevel
            - name: discontinued
              mapping: Discontinued
        - name: Orders
          mapping: Orders
          properties:
            - name: id
              mapping: OrderID
            - name: customerId
              mapping: CustomerID
            - name: employeeId
              mapping: EmployeeID
            - name: orderDate
              mapping: OrderDate
            - name: requiredDate
              mapping: RequiredDate
            - name: shippedDate
              mapping: ShippedDate
            - name: shipViaId
              mapping: ShipVia
            - name: freight
              mapping: Freight
            - name: name
              mapping: ShipName
            - name: address
              mapping: ShipAddress
            - name: city
              mapping: ShipCity
            - name: region
              mapping: ShipRegion
            - name: postalCode
              mapping: ShipPostalCode
            - name: country
              mapping: ShipCountry
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
            - name: discount
              mapping: Discount
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
      mapping: default      
      connection: ${CNN_MONGODB}    
  stages:
    - name: default
      sources:
        - name: Catalog
          condition: entity.in(["Categories","Products"])
        - name: Crm
          condition: entity.in(["Address","Employees","Customers","Shippers","Suppliers"])
        - name: Ordering
          condition: entity.in(["Orders","Orders.details"])
```

### Sync

```sh
lambdaorm sync -e .env
```

It will generate:

- the tables will be created in the database and a status file "MySQL-model.json" in the "data" folder.

### Populate Data

for the import we will download the following file.

```sh
wget https://raw.githubusercontent.com/FlavioLionelRita/lambdaorm-labs/main/source/northwind/data.json
```

then we execute

```sh
lambdaorm import -e .env -d ./data.json
```

### Queries

Shows some fields of the first product:

```sh
lambdaorm execute -e ".env" -q "Products.first(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock }))"
```

lists details of orders that meet a filter and sorts the records
the values to filter are passed as parameters:

```sh
lambdaorm execute -e ".env" -q "Orders.details.filter(p => between(p.order.shippedDate, from, to) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product])" -d "{ \"minValue\": 10, \"from\": \"1997-01-01\", \"to\": \"1997-12-31\" }"
```

List the maximum price by category, ordered by descending price and filtering by maximum price greater than 100

```sh
lambdaorm execute -e ".env" -q "Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))"
```

distinct category of products:

```sh
lambdaorm execute -e ".env" -q "Products.distinct(p => ({ quantity: p.quantity, category: p.category.name })).sort(p => p.category)"
```

returns an order including customer fields, order detail, product and category:

```sh
lambdaorm execute -e ".env" -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])])" -d "{\"customerId\": \"HANAR\"}"
```

## End

### Clean and Remove databases

Remove MySql database:

```sh
lambdaorm drop -e .env
docker-compose -p lambdaorm-lab down
```
