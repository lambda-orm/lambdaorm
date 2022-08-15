
## Examples

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

## Code example

``` ts
import { orm } from 'lambdaorm'

async function example () {
	await orm.init()

	const query = () => Products
						.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))
						.having(p => max(p.price) > 50)
						.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
						.sort(p => desc(p.largestPrice))

	const result = await orm.lambda(query).execute('MySQL')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
}
```
