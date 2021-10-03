
# Update

## Examples

### A

Lambda

``` ts
Orders.update()
```

SQL

``` sql
UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? 
WHERE o.OrderID = ?
```

### C

Lambda

``` ts
Orders.updateAll({ postalCode: postalCode })
```

SQL

``` sql
UPDATE Orders o SET ShipPostalCode = ?

```

### D

Lambda

``` ts
Orders.update({ name: entity.name }).filter(p => p.id === entity.id)
```

SQL

``` sql
UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ?
```

### E

Lambda

``` ts
Orders.update({ name: entity.name }).include(p => p.details.update(p => p)).filter(p => p.id === entity.id)
```

SQL

``` sql
UPDATE Orders o SET ShipName = ? 
WHERE o.OrderID = ? 

UPDATE `Order Details` o1 SET UnitPrice = o1.UnitPrice,Quantity = o1.Quantity,Discount = o1.Discount 
WHERE (o1.OrderID = ? AND o1.ProductID = ?)
```

### F

Lambda

``` ts
Orders.update({ name: entity.name }).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => p.id === entity.id)
```

SQL

``` sql
UPDATE Orders o SET ShipName = ?
WHERE o.OrderID = ?

UPDATE `Order Details` o1 SET UnitPrice = o1.UnitPrice,ProductID = o1.ProductID 
WHERE (o1.OrderID = ? AND o1.ProductID = ?)
```

### G

Lambda

``` ts
Customers.update().include(p => p.orders.include(p => p.details))
```

SQL

``` sql
UPDATE Customers c SET CustomerID = ?,CompanyName = ?,ContactName = ?,ContactTitle = ?,Address = ?,City = ?,Region = ?,PostalCode = ?,Country = ? 
WHERE c.CustomerID = ? 

UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? 
WHERE o.OrderID = ? 

UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? 
WHERE (o1.OrderID = ? AND o1.ProductID = ?)
```

## Code example

``` ts
import { orm } from 'lambda-orm'

async function example () {
	await orm.init()

	const customer = {
		d: {
			id: 'ALFKI',
			name: 'Alfreds Futterkiste',
			contact: 'Maria Anders',
			phone: 'Sales Representative',
			address: 'Obere Str. 57',
			city: 'Berlin',
			region: null,
			postalCode: '12209',
			country: 'Germany',
			orders: [
				{
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
						},
						{
							orderId: 1,
							productId: 46,
							unitPrice: '12.0000',
							quantity: '2.0000',
							discount: '0.0000'
						}
					]
				},
				{
					id: 2,
					customerId: 'ALFKI',
					employeeId: 4,
					orderDate: '1997-10-02T22:00:00.000Z',
					requiredDate: '1997-10-30T23:00:00.000Z',
					shippedDate: '1997-10-12T22:00:00.000Z',
					shipViaId: 2,
					freight: '61.0200',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							orderId: 2,
							productId: 63,
							unitPrice: '43.9000',
							quantity: '20.0000',
							discount: '0.0000'
						}
					]
				}
			]
		}
	}

	const update = () => Customers.update().include(p => p.orders.include(p => p.details))

	const result = await orm.lambda(update).execute(customer, 'mysql')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
}
```
