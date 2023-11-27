CREATE TABLE Customers (CustomerID VARCHAR(5) NOT NULL ,CompanyName VARCHAR(80) NOT NULL ,ContactName VARCHAR(80)  ,ContactTitle VARCHAR(80)  ,Address VARCHAR(80)  ,City VARCHAR(80)  ,Region VARCHAR(80)  ,PostalCode VARCHAR(20)  ,Country VARCHAR(80)  ,CONSTRAINT Customers_PK PRIMARY KEY (CustomerID));
CREATE TABLE Employees (EmployeeID serial,LastName VARCHAR(80) NOT NULL ,FirstName VARCHAR(80) NOT NULL ,Title VARCHAR(80)  ,TitleOfCourtesy VARCHAR(80)  ,BirthDate TIMESTAMP  ,HireDate TIMESTAMP  ,HomePhone VARCHAR(80)  ,ReportsTo INTEGER  ,Address VARCHAR(80)  ,City VARCHAR(80)  ,Region VARCHAR(80)  ,PostalCode VARCHAR(20)  ,Country VARCHAR(80)  ,CONSTRAINT Employees_PK PRIMARY KEY (EmployeeID));
ALTER TABLE Employees ADD CONSTRAINT Employees_UK UNIQUE (LastName,FirstName);
CREATE TABLE Shippers (ShipperID serial,CompanyName VARCHAR(80) NOT NULL ,Phone VARCHAR(20)  ,CONSTRAINT Shippers_PK PRIMARY KEY (ShipperID));
ALTER TABLE Shippers ADD CONSTRAINT Shippers_UK UNIQUE (CompanyName);
CREATE TABLE Suppliers (SupplierID serial,CompanyName VARCHAR(80) NOT NULL ,ContactName VARCHAR(80)  ,Phone VARCHAR(20)  ,HomePage VARCHAR(200)  ,Address VARCHAR(80)  ,City VARCHAR(80)  ,Region VARCHAR(80)  ,PostalCode VARCHAR(20)  ,Country VARCHAR(80)  ,CONSTRAINT Suppliers_PK PRIMARY KEY (SupplierID));
ALTER TABLE Suppliers ADD CONSTRAINT Suppliers_UK UNIQUE (CompanyName);
CREATE INDEX Customers_name ON Customers (CompanyName);
ALTER TABLE Employees ADD CONSTRAINT Employees_reportsTo_FK FOREIGN KEY (ReportsTo) REFERENCES Employees (EmployeeID);