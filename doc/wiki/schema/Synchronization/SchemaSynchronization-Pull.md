# Pull

The pull is the process of updating the schema defined in the configuration file with the structure in the sources (Databases). The pull process is done by the command `lambdaorm pull`.

## CLI

The pull command is used to update the schema with respect to the sources (Databases). \
Once executed, the schema will be synchronized with the database. \
It also adds a file with the pulling scripts. \

Running the pull command:

```sh
lambdaorm pull
```

Once the command is executed, the schema file (lambdaORM.yaml in this case) will be updated with respect to the data source.

Files created:

```sh
├── orm_state
│   ├── default-ddl-20240501T212640369Z-pull-default.sql
│   └── default-model.json
```

Content of the generated file `default-ddl-20240501T212640369Z-pull-default.sql`:

```sql
CREATE TABLE Categories (CategoryID INTEGER  AUTO_INCREMENT,CategoryName VARCHAR(15) NOT NULL ,Description TEXT  ,Picture LONGBLOB  ,CONSTRAINT Categories_PK PRIMARY KEY (CategoryID));
CREATE TABLE CustomerCustomerDemo (CustomerID VARCHAR(5) NOT NULL ,CustomerTypeID VARCHAR(10) NOT NULL ,CONSTRAINT CustomerCustomerDemo_PK PRIMARY KEY (CustomerID,CustomerTypeID));
CREATE TABLE CustomerDemographics (CustomerTypeID VARCHAR(10) NOT NULL ,CustomerDesc TEXT  ,CONSTRAINT CustomerDemographics_PK PRIMARY KEY (CustomerTypeID));
CREATE TABLE Customers (CustomerID VARCHAR(5) NOT NULL ,CompanyName VARCHAR(40) NOT NULL ,ContactName VARCHAR(30)  ,ContactTitle VARCHAR(30)  ,Address VARCHAR(60)  ,City VARCHAR(15)  ,Region VARCHAR(15)  ,PostalCode VARCHAR(10)  ,Country VARCHAR(15)  ,Phone VARCHAR(24)  ,Fax VARCHAR(24)  ,CONSTRAINT Customers_PK PRIMARY KEY (CustomerID));
CREATE TABLE EmployeeTerritories (EmployeeID INTEGER NOT NULL ,TerritoryID VARCHAR(20) NOT NULL ,CONSTRAINT EmployeeTerritories_PK PRIMARY KEY (EmployeeID,TerritoryID));
CREATE TABLE Employees (EmployeeID INTEGER  AUTO_INCREMENT,LastName VARCHAR(20) NOT NULL ,FirstName VARCHAR(10) NOT NULL ,Title VARCHAR(30)  ,TitleOfCourtesy VARCHAR(25)  ,BirthDate DATETIME  ,HireDate DATETIME  ,Address VARCHAR(60)  ,City VARCHAR(15)  ,Region VARCHAR(15)  ,PostalCode VARCHAR(10)  ,Country VARCHAR(15)  ,HomePhone VARCHAR(24)  ,Extension VARCHAR(4)  ,Photo LONGBLOB  ,Notes TEXT NOT NULL ,ReportsTo INTEGER  ,PhotoPath VARCHAR(255)  ,Salary DECIMAL(10,4)  ,CONSTRAINT Employees_PK PRIMARY KEY (EmployeeID));
CREATE TABLE `Order Details` (OrderID INTEGER NOT NULL ,ProductID INTEGER NOT NULL ,UnitPrice DECIMAL(10,4) NOT NULL ,Quantity INTEGER NOT NULL ,Discount DECIMAL(10,4) NOT NULL ,CONSTRAINT `Order Details_PK` PRIMARY KEY (OrderID,ProductID));
CREATE TABLE Orders (OrderID INTEGER  AUTO_INCREMENT,CustomerID VARCHAR(5) NOT NULL ,EmployeeID INTEGER NOT NULL ,OrderDate DATETIME  ,RequiredDate DATETIME  ,ShippedDate DATETIME  ,ShipVia INTEGER  ,Freight DECIMAL(10,4)  ,ShipName VARCHAR(40)  ,ShipAddress VARCHAR(60)  ,ShipCity VARCHAR(15)  ,ShipRegion VARCHAR(15)  ,ShipPostalCode VARCHAR(10)  ,ShipCountry VARCHAR(15)  ,CONSTRAINT Orders_PK PRIMARY KEY (CustomerID,EmployeeID,OrderID));
CREATE TABLE Products (ProductID INTEGER  AUTO_INCREMENT,ProductName VARCHAR(40) NOT NULL ,SupplierID INTEGER NOT NULL ,CategoryID INTEGER NOT NULL ,QuantityPerUnit VARCHAR(20)  ,UnitPrice DECIMAL(10,4)  ,UnitsInStock INTEGER  ,UnitsOnOrder INTEGER  ,ReorderLevel INTEGER  ,Discontinued INTEGER NOT NULL ,CONSTRAINT Products_PK PRIMARY KEY (CategoryID,ProductID,SupplierID));
CREATE TABLE Region (RegionID INTEGER NOT NULL ,RegionDescription VARCHAR(50) NOT NULL ,CONSTRAINT Region_PK PRIMARY KEY (RegionID));
CREATE TABLE Shippers (ShipperID INTEGER  AUTO_INCREMENT,CompanyName VARCHAR(40) NOT NULL ,Phone VARCHAR(24)  ,CONSTRAINT Shippers_PK PRIMARY KEY (ShipperID));
CREATE TABLE Suppliers (SupplierID INTEGER  AUTO_INCREMENT,CompanyName VARCHAR(40) NOT NULL ,ContactName VARCHAR(30)  ,ContactTitle VARCHAR(30)  ,Address VARCHAR(60)  ,City VARCHAR(15)  ,Region VARCHAR(15)  ,PostalCode VARCHAR(10)  ,Country VARCHAR(15)  ,Phone VARCHAR(24)  ,Fax VARCHAR(24)  ,HomePage TEXT  ,CONSTRAINT Suppliers_PK PRIMARY KEY (SupplierID));
CREATE TABLE Territories (TerritoryID VARCHAR(20) NOT NULL ,TerritoryDescription VARCHAR(50) NOT NULL ,RegionID INTEGER NOT NULL ,CONSTRAINT Territories_PK PRIMARY KEY (TerritoryID,RegionID));
ALTER TABLE CustomerCustomerDemo ADD CONSTRAINT CustomerCustomerDemo_customerCustomerDemo_FK FOREIGN KEY (CustomerTypeID) REFERENCES CustomerDemographics (CustomerTypeID);
ALTER TABLE CustomerCustomerDemo ADD CONSTRAINT CustomerCustomerDemo_customerCustomerDemo_FK FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID);
ALTER TABLE EmployeeTerritories ADD CONSTRAINT EmployeeTerritories_employeeTerritories_FK FOREIGN KEY (EmployeeID) REFERENCES Employees (EmployeeID);
ALTER TABLE Employees ADD CONSTRAINT Employees_employees_FK FOREIGN KEY (ReportsTo) REFERENCES Employees (EmployeeID);
ALTER TABLE `Order Details` ADD CONSTRAINT `Order Details_order_FK` FOREIGN KEY (OrderID) REFERENCES Orders (OrderID);
ALTER TABLE `Order Details` ADD CONSTRAINT `Order Details_order_FK` FOREIGN KEY (ProductID) REFERENCES Products (ProductID);
ALTER TABLE Orders ADD CONSTRAINT Orders_orders_FK FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID);
ALTER TABLE Orders ADD CONSTRAINT Orders_orders_FK FOREIGN KEY (EmployeeID) REFERENCES Employees (EmployeeID);
ALTER TABLE Orders ADD CONSTRAINT Orders_orders_FK FOREIGN KEY (ShipVia) REFERENCES Shippers (ShipperID);
ALTER TABLE Products ADD CONSTRAINT Products_products_FK FOREIGN KEY (CategoryID) REFERENCES Categories (CategoryID);
ALTER TABLE Products ADD CONSTRAINT Products_products_FK FOREIGN KEY (SupplierID) REFERENCES Suppliers (SupplierID);
ALTER TABLE Territories ADD CONSTRAINT Territories_territories_FK FOREIGN KEY (RegionID) REFERENCES Region (RegionID);
```

[View lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/cli/11-pull)

## Node

```Typescript
import { Orm } from 'lambdaorm'
(async () => {
	const workspace = process.cwd()
	const orm = new Orm(workspace)
	try{		
		await orm.helper.fs.removeDir(workspace + '/data')
		const originalSchema = orm.helper.yaml.load(await orm.helper.fs.read(workspace + '/lambdaOrm.yaml'))
		await orm.init(originalSchema)	
		await orm.stage.pull()
	}catch(e){
		console.log(e)
	} finally {
		await orm.end()
	}	
})()
```

[view lab](https://github.com/lambda-orm/lambdaorm-labs/tree/main/labs/node/11-pull)
