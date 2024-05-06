# Delete

## Delete record for filter

**Lambda:**

```Typescript
// Deleting records from OrderDetails where orderId matches the provided id
OrderDetails.delete().filter(p => p.orderId === id)
```

**SQL Result:**

```sql
-- Deleting records from Order Details where OrderID matches the provided id
DELETE o FROM `Order Details` AS o WHERE o.OrderID = ?
```

## Delete with default filter

In the case that delete() is used and no filter is specified, it is assumed that it will be filtered by the primary key

**Lambda:**

```Typescript
// Deleting records from OrderDetails filtered by the primary key (OrderID)
OrderDetails.delete()
```

**SQL Result:**

```sql
-- Deleting records from Order Details where OrderID matches the primary key
DELETE o FROM `Order Details` AS o WHERE o.OrderID = ?
```

## Delete all records

If you want to delete all the records of an entity, you should use deleteAll instead of delete.
This is done to avoid deleting all records by mistake.

**Lambda:**

```Typescript
// Deleting all records from OrderDetails
OrderDetails.deleteAll()
```

**SQL Result:**

```sql
-- Deleting all records from Order Details
DELETE o FROM `Order Details` AS o 
```

## Delete entity an related entity

**Lambda:**

```Typescript
// Deleting orders and their details
Orders.delete().include(p => p.details)
```

**SQL Result:**

```sql
-- Deleting orders where OrderID matches the provided id
DELETE o FROM Orders AS o WHERE o.OrderID = ? 

-- Deleting order details where OrderID and ProductID match the provided ids
DELETE o1 FROM `Order Details` AS o1 WHERE (o1.OrderID = ? AND o1.ProductID = ?)
```

## Code example

```Typescript
import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'
(async () => {	
	try {		
		await orm.init('./config/northwind.yaml')
		const order = {
			id: 1,
			customerId: 'ALFKI',
			employeeId: 6,
			orderDate: '1997-08-24T22:00:00.000Z',
			requiredDate: '1997-09-21T22:00:00.000Z',
			shippedDate: '1997-09-01T22:00:00.000Z',
			shipViaId: 1,
			freight: '29.4600',
			name: 'Alfreds Futterkiste',
			address: 'Obere Str. 57',
			city: 'Berlin',
			region: null,
			postalCode: '12209',
			country: 'Germany',
			details: [
				{
					orderId: 1,
					productId: 28,
					unitPrice: '45.6000',
					quantity: '15.0000',
					discount: '0.0000'
				},
				{
					orderId: 1,
					productId: 39,
					unitPrice: '18.0000',
					quantity: '21.0000',
					discount: '0.0000'
				}
			]
		}
		// Defining a query to delete orders and include details
		const query = () => Orders.delete().include(p => p.details)
		// Executing the query using the ORM with the specified order parameter
		await orm.execute(query, order)
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		// Ending the ORM connection
		await orm.end()
	}
})()
```
