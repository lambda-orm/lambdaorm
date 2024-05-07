# Select

All queries are based on the schema from which it deduces the fields that an entity contains, primary key, indexes, relationships and constraints.

Therefore, if you want to obtain all the fields of an entity, it is not necessary to specify them.

## All Fields from entity

Selecting all fields from the Products entity

**Lambda:**

``` ts
Products
```

**SQL Result:**

``` sql
-- SQL query to select all fields from the Products table
SELECT 
    p.ProductID AS `id`, 
    p.ProductName AS `name`, 
    p.SupplierID AS `supplierId`, 
    p.CategoryID AS `categoryId`, 
    p.QuantityPerUnit AS `quantity`, 
    p.UnitPrice AS `price`, 
    p.UnitsInStock AS `inStock`, 
    p.UnitsOnOrder AS `onOrder`, 
    p.ReorderLevel AS `reorderLevel`, 
    p.Discontinued AS `discontinued` 
FROM 
    Products p  
```

## One Field

Selecting only the 'name' field from the Products entity

**Lambda:**

``` ts
Products.map(p => p.name)
```

**SQL Result:**

``` sql
-- SQL query to select only the 'ProductName' field from the Products table
SELECT p.ProductName FROM Products p 
```

## First

Selecting the first record from the Products entity

**Lambda:**

``` ts
Products.first()
```

**SQL Result:**

``` sql
-- SQL query to select the first record from the Products table
SELECT 
    p.ProductID AS `id`, 
    p.ProductName AS `name`, 
    p.SupplierID AS `supplierId`, 
    p.CategoryID AS `categoryId`, 
    p.QuantityPerUnit AS `quantity`, 
    p.UnitPrice AS `price`, 
    p.UnitsInStock AS `inStock`, 
    p.UnitsOnOrder AS `onOrder`, 
    p.ReorderLevel AS `reorderLevel`, 
    p.Discontinued AS `discontinued`
FROM Products p  
ORDER BY `id` 
LIMIT 0,1
```

## Last

Selecting the last record from the Products entity

**Lambda:**

``` ts
Products.last()
```

**SQL Result:**

``` sql
-- SQL query to select the last record from the Products table
SELECT 
    p.ProductID AS `id`, 
    p.ProductName AS `name`, 
    p.SupplierID AS `supplierId`, 
    p.CategoryID AS `categoryId`, 
    p.QuantityPerUnit AS `quantity`, 
    p.UnitPrice AS `price`, 
    p.UnitsInStock AS `inStock`, 
    p.UnitsOnOrder AS `onOrder`, 
    p.ReorderLevel AS `reorderLevel`, 
    p.Discontinued AS `discontinued` 
FROM Products p  
ORDER BY `id` desc 
LIMIT 0,1 
```

## Take

Selecting a single record from the Products entity

**Lambda:**

``` ts
Products.take()
```

**SQL Result:**

```sql
-- SQL query to select a single record from the Products table
SELECT 
    p.ProductID AS `id`, 
    p.ProductName AS `name`, 
    p.SupplierID AS `supplierId`, 
    p.CategoryID AS `categoryId`, 
    p.QuantityPerUnit AS `quantity`, 
    p.UnitPrice AS `price`, 
    p.UnitsInStock AS `inStock`, 
    p.UnitsOnOrder AS `onOrder`, 
    p.ReorderLevel AS `reorderLevel`, 
    p.Discontinued AS `discontinued` 
FROM Products p  
LIMIT 0,1 
```

## Distinct

Selecting distinct values of quantity and category name from the Products entity

**Lambda:**

``` ts
Products
	.distinct(p => ({ quantity: p.quantity, category: p.category.name }))
	.sort(p => p.category)
```

**SQL Result:**

```sql
-- SQL query to select distinct values of quantity and category name from the Products table
SELECT DISTINCT p.QuantityPerUnit AS `quantity`, c.CategoryName AS `category` 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
ORDER BY `category` 
```

## Pagination

Selecting records with price greater than 10, mapping to name and category, sorting by category, and paginating

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
-- Selección de productos y categorías por precio unitario
-- Selecciona el nombre del producto y categoría
-- Filtra productos con precio superior a ?
-- Ordena por categoría ascendente
-- Limita a 10 resultados
SELECT 
	p.ProductName AS name, 
	c.CategoryName AS category 
FROM Products p 
INNER JOIN Categories c ON c.CategoryID = p.CategoryID 
WHERE p.UnitPrice > ? 
ORDER BY category asc  
LIMIT 0,10
```

## Usage

### Node

```Typescript
import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'
(async () => {	
	try {		
		await orm.init('./config/northwind.yaml')
		// Defining a query function that accepts a maximum price parameter
		// Filtering products based on price greater than the maximum price parameter
		// Mapping the results to extract name and category
		// Sorting the results by category
		// Paginating the results to get the first 10 items
		const query = (maxPrice:number) => Products
						.filter(p => p.price > maxPrice)
						.map(p => ({ name: p.name, category: p.category.name}))
						.sort(p => p.category)
						.page(1, 10)
		const result = await orm.execute(query, {maxPrice:10})
		console.log(JSON.stringify(result, null, 2))		
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		// Ending the ORM connection
		await orm.end()
	}
})()
```

### CLI

```bash
lambdaorm execute -q "Products.filter(p=>p.price>10).map(p=>({name:p.name,category:p.category.name})).sort(p=>p.category).page(1, 10)" -d "{\"maxPrice\":10}"
```

### Service

```bash
curl -X POST "http://localhost:9291/plan?format=beautiful" -H "Content-Type: application/json" -d '{"query": "Products.filter(p=>p.price>10).map(p=>({name:p.name,category:p.category.name})).sort(p=>p.category).page(1, 10)", "data": "{\"maxPrice\":10}" }'
```
