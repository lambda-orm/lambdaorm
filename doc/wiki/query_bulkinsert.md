## Examples

Lambda

``` ts
Categories.bulkInsert()
```

SQL

``` sql
INSERT INTO Categories(CategoryName,Description) VALUES ?

```

Lambda

``` ts
Orders.bulkInsert().include(p => p.details)

```

SQL

``` sql
INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES ?

INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES ?

```

## Code example

Lambda

``` ts
import { orm } from 'lambdaorm'

async function example () {
	await orm.init()

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

	const insert = () => Categories.bulkInsert()
	const result = await orm.lambda(insert).execute('mysql',categories)
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
}

```
