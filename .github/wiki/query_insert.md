
## Examples

### Insert Simple

In the case that the fields to be inserted are not specified, it is assumed that an object with all fields will be passed.

Lambda

``` ts
Categories.insert()
```

SQL

``` sql
INSERT INTO Categories(CategoryName,Description) VALUES(?,?)

```

### Insert specific

In this case, only the fields that are specified will be inserted

Lambda

``` ts
Categories.insert({ name: name })

```

SQL

``` sql
INSERT INTO Categories(CategoryName) VALUES(?)

```

### Insert with include

In the case that we need to insert an object which in turn has a relation, we can insert the set using include.

Lambda

``` ts
Orders.insert().include(p => p.details)
```

SQL

``` sql
INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) 
VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)

INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) 
VALUES(?,?,?,?,?)
```

## Code example

``` ts
import { orm } from 'lambdaorm'

async function example () {
	await orm.init()

	const order = {
		customerId: 'VINET',
		employeeId: 5,
		orderDate: '1996-07-03T22:00:00.000Z',
		requiredDate: '1996-07-31T22:00:00.000Z',
		shippedDate: '1996-07-15T22:00:00.000Z',
		shipViaId: 3,
		freight: 32.38,
		name: 'Vins et alcools Chevalier',
		address: '59 rue de l-Abbaye',
		city: 'Reims',
		postalCode: '51100',
		country: 'France',
		details: [
			{
				productId: 11,
				unitPrice: 14,
				quantity: 12,
				discount: 10,
				orderId: 833
			},
			{
				productId: 42,
				unitPrice: 9.8,
				quantity: 10,
				discount: 10,
				orderId: 833
			}
		]
	}
	const insert = () => Orders.insert().include(p => p.details)

	const result = await orm.lambda(insert).execute('mysql',order)
	console.log(result)
	await orm.end()
}
```

Result:

```sh
831
```
