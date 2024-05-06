# Grouping

In the case of grouping, it is not necessary to define it explicitly, since it is deduced when one of the grouping functions is used. \
The fields by which they are grouped are deduced by which they are contained with some of the grouping functions.

## Grouping Functions

|Function   |Description                                   										|
|-----------|-----------------------------------------------------------------|
|avg				|Calculates the average of the specified columns in a set of rows	|
|count			|Calculating the number of rows in a set.													|
|first			|Returns the first value of the selected column										|
|last				|Returns the last value of the selected column.										|
|max				|Calculating the maximum.																					|
|min				|Calculating the minimum.																					|
|sum				|Calculating the sum.																							|

## Grouping by sum with order and filter

Filters order details based on customer name
Maps the results to get the order date and the total calculated as the sum of (quantity * unit price)
Orders the results in descending order by total

**Lambda:**

```Typescript
OrderDetails
	.filter(p => p.order.customer.name == customerName)
	.map(p => ({ order: p.order.orderDate, total: sum(p.quantity * p.unitPrice) }))
	.sort(p => desc(p.total))
```

**SQL Result:**

``` sql
-- Selects order date and calculates the sum of (quantity * unit price) as 'total'
-- Performs inner join with Orders and Customers table to get additional customer information
-- Filters the results based on customer company name
-- Groups the results by order date
-- Orders the results in descending order by total
SELECT o1.OrderDate AS `order`, SUM(o.Quantity * o.UnitPrice) AS `total` 
FROM `Order Details` o 
INNER JOIN Orders o1 ON o1.OrderID = o.OrderID 
INNER JOIN Customers c ON c.CustomerID = o1.CustomerID 
WHERE c.CompanyName = ? 
GROUP BY o1.OrderDate 
ORDER BY `total` desc 
```

## Grouping and Having

Filters products based on price and supplier country, or stock quantity
Filters the results based on maximum price
Maps the results to get the product category and maximum price
Sorts the results in descending order by maximum price

**Lambda:**

```Typescript
Products
	.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))
	.having(p => max(p.price) > 50)
	.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
	.sort(p => desc(p.largestPrice))
```

**SQL Result:**

```sql
-- Selects product category and calculates the maximum price as 'largestPrice'
-- Performs inner join with Suppliers and Categories tables to get additional product information
-- Filters the results based on price and supplier country, or stock quantity
-- Groups the results by product category
-- Filters the results based on maximum price
-- Orders the results in descending order by maximum price
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

```Typescript
import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'
(async () => {
	try {		
		await orm.init('./config/northwind.yaml')
		// Defining a query function that accepts a country parameter
		// Filtering products based on price and supplier country, or stock quantity
		// Filtering the results based on maximum price
		// Mapping the results to get the product category and maximum price
		// Sorting the results in descending order by maximum price		
		const query = (country:string) => Products						
						.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))						
						.having(p => max(p.price) > 50)						
						.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))						
						.sort(p => desc(p.largestPrice))
		const result = await orm.execute(query, {country:'ARG'})
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		// Ending the ORM connection
		await orm.end()
	}
})()
```
