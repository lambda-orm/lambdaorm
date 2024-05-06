# Join

Join statements are implicit when they add fields through their relationships.

## Join simple

Retrieves the product name and its category through a relationship.

**Lambda:**

``` ts
Products.map(p => ({ name: p.name, category: p.category.name }))
```

**SQL Result:**

``` sql
-- Selects the product name as `name` and the category name as `category`.
-- Performs an inner join between the Products table and the Categories table using CategoryID.
SELECT p.ProductName AS `name`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
```

## Join with distinct and sort

Retrieves distinct values of quantity per unit and category, sorted by category.

**Lambda:**

``` ts
Products
	.distinct(p => ({ quantity: p.quantity, category: p.category.name }))
	.sort(p => p.category)
```

**SQL Result:**

```sql
-- Selects distinct values of quantity per unit as `quantity` and the category name as `category`.
-- Performs an inner join between the Products table and the Categories table using CategoryID.
-- Orders the results by `category`.
SELECT DISTINCT p.QuantityPerUnit AS `quantity`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
ORDER BY `category` 
```

## Join with filter

Retrieves the product name and its category, but only for products with a price greater than 10.

**Lambda:**

``` ts
Products
	.filter(p => p.price > 10)
	.map(p => ({ name: p.name, category: p.category.name }))
```

**SQL Result:**

``` sql
-- Selects the product name as `name` and the category name as `category`.
-- Performs an inner join between the Products table and the Categories table using CategoryID.
-- Filters products with a price greater than 10.
SELECT p.ProductName AS `name`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
WHERE p.UnitPrice > 10 
```

## Join and pagination

Retrieves the product name and its category for products with a price greater than 10, ordered by category and paginated.

**Lambda:**

``` ts
Products
	.filter(p => p.price > 10)
	.map(p => ({ name: p.name, category: p.category.name}))
	.sort(p => p.category)
	.page(1, 10)
```

**SQL Result:**

``` sql
-- Selects the product name as `name` and the category name as `category`.
-- Performs an inner join between the Products table and the Categories table using CategoryID.
-- Filters products with a price greater than 10.
-- Orders the results by `category` and limits them to 10 results per page, starting from page 1.
SELECT p.ProductName AS `name`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
WHERE p.UnitPrice > 10 
ORDER BY `category` LIMIT 0,10 
```

## Multiple Join and grouping

Retrieves the order date and the total for each order for a specific customer, ordered by total in descending order.

**Lambda:**

``` ts
OrderDetails
	.filter(p => p.order.customer.name == customerName)
	.map(p => ({ order: p.order.orderDate, total: sum(p.quantity * p.unitPrice) }))
	.sort(p => desc(p.total))
```

**SQL Result:**

``` sql
-- Selects the order date as `order` and the sum of quantity times unit price as `total`.
-- Performs inner joins between the Order Details table and the Orders and Customers tables using OrderID and CustomerID respectively.
-- Filters orders associated with the provided customer name.
-- Groups the results by order date.
-- Orders the results by `total` in descending order.
SELECT o1.OrderDate AS `order`, SUM(o.Quantity * o.UnitPrice) AS `total` 
FROM `Order Details` o 
INNER JOIN Orders o1 ON o1.OrderID = o.OrderID 
INNER JOIN Customers c ON c.CustomerID = o1.CustomerID 
WHERE c.CompanyName = ? 
GROUP BY o1.OrderDate 
ORDER BY `total` desc 
```

## Code example

```Typescript
import { orm } from '../../lib'
import { OrderDetails } from '../northwind/model/__model'
(async () => {	
	try {		
		await orm.init('./config/northwind.yaml')
		const query = OrderDetails
					.filter(p => p.order.customer.name == customerName)
					.map(p => ({ order: p.order.orderDate, total: sum(p.quantity * p.unitPrice) }))
					.sort(p => desc(p.total))
		const result = await orm.execute(query, {maxPrice:10}, {stage:'MySQL'})
		console.log(JSON.stringify(result, null, 2))		
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
	}
})()
```
