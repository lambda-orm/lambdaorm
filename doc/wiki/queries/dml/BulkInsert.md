# BulkInsert

**BulkInsert** is a database operation that allows inserting multiple records into a table at once, rather than inserting them one by one. This operation is particularly useful when dealing with large datasets or when performance optimization is needed.

## Advantages of BulkInsert:

1. **Improved Performance**: BulkInsert significantly reduces the number of round trips between the application and the database, resulting in improved performance. Instead of executing multiple individual insert statements, a single bulk insert statement is executed, which reduces overhead and latency.

2. **Reduced Database Load**: By minimizing the number of database transactions, BulkInsert helps in reducing the load on the database server, which can improve overall system performance, especially in high-traffic environments.

3. **Atomicity**: BulkInsert operations are typically atomic, meaning that either all records are inserted successfully, or none are. This ensures data integrity and consistency in the database.

4. **Simplicity**: Using BulkInsert simplifies the application code by reducing the number of database interactions required. This leads to cleaner and more maintainable code.

5. **Scalability**: BulkInsert is well-suited for handling large datasets, making it scalable for applications that need to process and insert a significant amount of data efficiently.

Overall, BulkInsert is a powerful database operation that can significantly improve the performance and efficiency of data insertion tasks in applications dealing with large volumes of data.

## BulkInsert in one entity

**Lambda:**

```Typescript
// Bulk insert operation for Categories entity
Categories.bulkInsert()
```

**SQL Result:**

```sql
-- Bulk insertion into Categories table with provided values
INSERT INTO Categories(CategoryName,Description) VALUES ?
```

## BulkInsert with include related entity

**Lambda:**

```Typescript
// Bulk insert operation for Orders entity and including details
Orders.bulkInsert().include(p => p.details)
```

**SQL Result:**

```sql
-- Bulk insertion into Orders table with provided values
INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES ?

-- Bulk insertion into Order Details table with provided values
INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES ?
```

## Code example

```Typescript
import { orm } from '../../lib'
import { Categories } from '../northwind/model/__model'
(async () => {	
	try {		
		await orm.init('./config/northwind.yaml')
		const categories = [
			{
				name: 'Beverages4',
				description: 'Soft drinks, coffees, teas, beers, and ales',
				id: 12
			},
			{
				name: 'Condiments4',
				description: 'Sweet and savory sauces, relishes, spreads, and seasonings',
				id: 13
			}
		]
		// Define a query for bulk insert operation for categories
		const query = () => Categories.bulkInsert()
		// Execute the query using the ORM, passing the query function and the categories data
		const result = await orm.execute(query, categories)
		// return ids of records inserted
		console.log(JSON.stringify(result, null, 2))		
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		// Ending the ORM connection
		await orm.end()
	}
})()
```
