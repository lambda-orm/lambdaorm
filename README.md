# documentation in process

## Objetivo

Generar consultas a la database a partir de expressiones lambda
de la misma forma que lo hariamos con un array de objetos.

de esta forma no requiere aprender un nuevo lenguaje de consultas
y podremos aprovechar el intelicense.

## Queries

Lambda

``` ts
Products
```

SQL

``` sql
SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` 
FROM Products p  
```

Lambda

``` ts
Products.map(p => p.name)
```

SQL

``` sql
SELECT p.ProductName FROM Products p 
```

Lambda

``` ts
Products.map(p => ({ name: p.name, category: p.category.name }))
```

SQL

``` sql
SELECT p.ProductName AS `name`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 

```

Lambda

``` ts
Products.first()

```

SQL

``` sql
SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` 
FROM Products p  
ORDER BY `id` 
LIMIT 0,1 


```

Lambda

``` ts
Products.last()

```

SQL

``` sql
SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` 
FROM Products p  
ORDER BY `id` desc 
LIMIT 0,1 
```

Lambda

``` ts
Products.take()
```

SQL

``` sql
SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` 
FROM Products p  
LIMIT 0,1 
```

Lambda

``` ts
Products
	.distinct(p => ({ quantity: p.quantity, category: p.category.name }))
	.sort(p => p.category)

```

SQL

``` sql
SELECT DISTINCT p.QuantityPerUnit AS `quantity`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
ORDER BY `category` 

```

Lambda

``` ts
Products
	.filter(p => p.price > 10)
	.map(p => ({ name: p.name, category: p.category.name }))
```

SQL

``` sql
SELECT p.ProductName AS `name`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
WHERE p.UnitPrice > 10 

```

Lambda

``` ts
Products
	.filter(p => p.price > 10)
	.map(p => ({ name: p.name, category: p.category.name}))
	.sort(p => p.category)
	.page(1, 10)
```

SQL

``` sql
SELECT p.ProductName AS `name`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
WHERE p.UnitPrice > 10 
ORDER BY `category` LIMIT 0,10 
```

Lambda

``` ts
OrderDetails
	.filter(p => p.orderId == id)
	.map(p => ({ product: concat(p.product.name, ' ', p.product.category.name), amount: round(p.quantity * p.unitPrice, 2) }))
	.sort(p => p.product)
```

SQL

``` sql
SELECT CONCAT(p.ProductName,' ',c.CategoryName) AS `product`, ROUND((o.Quantity * o.UnitPrice),2) AS `amount` 
FROM `Order Details` o 
INNER JOIN Products p ON p.ProductID = o.ProductID 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
WHERE o.OrderID = ? 
ORDER BY `product`
```

Lambda

``` ts
OrderDetails
	.filter(p => p.order.customer.name == customerName)
	.map(p => ({ order: p.order.orderDate, total: sum(p.quantity * p.unitPrice) }))
	.sort(p => desc(p.total))
```

SQL

``` sql
SELECT o1.OrderDate AS `order`, SUM(o.Quantity * o.UnitPrice) AS `total` 
FROM `Order Details` o 
INNER JOIN Orders o1 ON o1.OrderID = o.OrderID 
INNER JOIN Customers c ON c.CustomerID = o1.CustomerID 
WHERE c.CompanyName = ? 
GROUP BY o1.OrderDate 
ORDER BY `total` desc 
```

Lambda

``` ts
Products
	.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))
	.having(p => max(p.price) > 50)
	.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
	.sort(p => desc(p.largestPrice))

```

SQL

``` sql
SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` 
FROM Products p 
INNER JOIN Suppliers s ON s.SupplierID = p.SupplierID 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
WHERE ((p.UnitPrice > 5 AND s.Country = ?) OR p.UnitsInStock < 3) 
GROUP BY c.CategoryName 
HAVING MAX(p.UnitPrice) > 50 
ORDER BY `largestPrice` desc 

```

Lambda

``` ts
 Orders.filter(p => p.id == id).include(p => p.customer)
```

SQL

``` sql
SELECT o.OrderID AS `id`, o.CustomerID AS `customerId`, o.EmployeeID
AS `employeeId`, o.OrderDate AS `orderDate`, o.RequiredDate AS
`requiredDate`, o.ShippedDate AS `shippedDate`, o.ShipVia AS
`shipViaId`, o.Freight AS `freight`, o.ShipName AS `name`,
o.ShipAddress AS `address`, o.ShipCity AS `city`, o.ShipRegion AS
`region`, o.ShipPostalCode AS `postalCode`, o.ShipCountry AS `country`
FROM Orders o  WHERE o.OrderID = ? 

SELECT c.CustomerID AS `id`, c.CompanyName AS `name`, c.ContactName AS
`contact`, c.ContactTitle AS `phone`, c.Address AS `address`, c.City
AS `city`, c.Region AS `region`, c.PostalCode AS `postalCode`,
c.Country AS `country` FROM Customers c  WHERE  c.CustomerID IN (?)

```

Lambda

``` ts
 Orders.filter(p => p.id == id).include(p => [p.details,p.customer])
```

SQL

``` sql
SELECT o.OrderID AS `id`, o.CustomerID AS `customerId`, o.EmployeeID
AS `employeeId`, o.OrderDate AS `orderDate`, o.RequiredDate AS
`requiredDate`, o.ShippedDate AS `shippedDate`, o.ShipVia AS
`shipViaId`, o.Freight AS `freight`, o.ShipName AS `name`,
o.ShipAddress AS `address`, o.ShipCity AS `city`, o.ShipRegion AS
`region`, o.ShipPostalCode AS `postalCode`, o.ShipCountry AS `country`
FROM Orders o  WHERE o.OrderID = ? 

SELECT o1.OrderID AS `orderId`, o1.ProductID AS `productId`,
o1.UnitPrice AS `unitPrice`, o1.Quantity AS `quantity`, o1.Discount AS
`discount` FROM `Order Details` o1  WHERE  o1.OrderID IN (?) 

SELECT c.CustomerID AS `id`, c.CompanyName AS `name`, c.ContactName AS
`contact`, c.ContactTitle AS `phone`, c.Address AS `address`, c.City
AS `city`, c.Region AS `region`, c.PostalCode AS `postalCode`,
c.Country AS `country` FROM Customers c  WHERE  c.CustomerID IN (?)

```

Lambda

``` ts
Orders
	.filter(p => p.id == id)
	.include(p => [p.details.include(q => q.product.include(r => r.category)), p.customer])

```

SQL

``` sql
SELECT o.OrderID AS `id`, o.CustomerID AS `customerId`, o.EmployeeID
AS `employeeId`, o.OrderDate AS `orderDate`, o.RequiredDate AS
`requiredDate`, o.ShippedDate AS `shippedDate`, o.ShipVia AS
`shipViaId`, o.Freight AS `freight`, o.ShipName AS `name`,
o.ShipAddress AS `address`, o.ShipCity AS `city`, o.ShipRegion AS
`region`, o.ShipPostalCode AS `postalCode`, o.ShipCountry AS `country`
FROM Orders o  WHERE o.OrderID = ? 

SELECT o1.OrderID AS `orderId`, o1.ProductID AS `productId`,
o1.UnitPrice AS `unitPrice`, o1.Quantity AS `quantity`, o1.Discount AS
`discount` FROM `Order Details` o1  WHERE  o1.OrderID IN (?) 

SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS
`supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS
`quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`,
p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`,
p.Discontinued AS `discontinued` FROM Products p  WHERE  p.ProductID
IN (?) 

SELECT c.CategoryID AS `id`, c.CategoryName AS `name`, c.Description
AS `description` FROM Categories c  WHERE  c.CategoryID IN (?) 

SELECT c1.CustomerID AS `id`, c1.CompanyName AS `name`, c1.ContactName
AS `contact`, c1.ContactTitle AS `phone`, c1.Address AS `address`,
c1.City AS `city`, c1.Region AS `region`, c1.PostalCode AS
`postalCode`, c1.Country AS `country` FROM Customers c1  WHERE 
c1.CustomerID IN (?) 

```

Lambda

``` ts
Orders
filter(p => p.id == id)
.include(p => [p.customer.map(p => p.name), 
	p.details.include(p => p.product.
		include(p => p.category.map(p => p.name))
	.map(p => p.name))
.map(p => [p.quantity, p.unitPrice])])
```

SQL

``` sql
SELECT o.OrderID AS `id`, o.CustomerID AS `customerId`, o.EmployeeID
AS `employeeId`, o.OrderDate AS `orderDate`, o.RequiredDate AS
`requiredDate`, o.ShippedDate AS `shippedDate`, o.ShipVia AS
`shipViaId`, o.Freight AS `freight`, o.ShipName AS `name`,
o.ShipAddress AS `address`, o.ShipCity AS `city`, o.ShipRegion AS
`region`, o.ShipPostalCode AS `postalCode`, o.ShipCountry AS `country`
FROM Orders o  WHERE o.OrderID = ? 

SELECT c.CompanyName FROM Customers c  WHERE  c.CustomerID IN (?) 

SELECT o1.Quantity, o1.UnitPrice FROM `Order Details` o1  WHERE o1.OrderID IN (?) 

SELECT p.ProductName FROM Products p  WHERE  p.ProductID IN (?) 

SELECT c1.CategoryName FROM Categories c1  WHERE  c1.CategoryID IN (?) 

```

Lambda

``` ts

```

SQL

``` sql

```

Lambda

``` ts

```

SQL

``` sql

```

Lambda

``` ts

```

SQL

``` sql

```

Lambda

``` ts

```

SQL

``` sql

```

Lambda

``` ts

```

SQL

``` sql

```
