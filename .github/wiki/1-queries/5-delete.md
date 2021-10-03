# Delete

## Examples

### A

Lambda

``` ts
OrderDetails.delete().filter(p => p.orderId === id)
```

SQL

``` sql
DELETE o FROM `Order Details` AS o WHERE o.OrderID = ?

```

### A1

Lambda

``` ts
OrderDetails.delete()
```

SQL

``` sql
DELETE o FROM `Order Details` AS o WHERE o.OrderID = ?

```

### B

Lambda

``` ts
OrderDetails.deleteAll()

```

SQL

``` sql
DELETE o FROM `Order Details` AS o 

```

### C

Lambda

``` ts
Orders.delete().include(p => p.details

```

SQL

``` sql
DELETE o FROM Orders AS o WHERE o.OrderID = ? 

DELETE o1 FROM `Order Details` AS o1 WHERE (o1.OrderID = ? AND o1.ProductID = ?)

```

## Code example

Lambda

``` ts
import { orm } from 'lambda-orm'

async function example () {
	await orm.init()

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

	const _delete = () => Orders.delete().include(p => p.details)
	const result = await orm.lambda(_delete).execute(order, 'mysql')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
}

```
