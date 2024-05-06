# Include

λORM includes the include method to load related entities, both for OneToMany, manyToOne, and oneToOne relationships.

We can also apply filters or bring us some fields from related entities.

For each include, a statement is executed that fetches all the necessary records, then the objects with relationships are assembled in memory. In this way, multiple executions are avoided, considerably improving performance.

Includes can be used in selects, inserts, updates, deletes, and bulkInserts.

## Include relation OneToMany

In this example the data of an Order and the customer is obtained

**Lambda:**

```Typescript
// Filters orders based on ID matching the provided parameter and includes customer details
Orders.filter(p => p.id == id).include(p => p.customer)
```

**SQL Result:**

```sql
-- Selects order details from the Orders table where the OrderID matches the provided parameter
SELECT o.OrderID AS `id`, o.CustomerID AS `customerId`, o.EmployeeID
AS `employeeId`, o.OrderDate AS `orderDate`, o.RequiredDate AS
`requiredDate`, o.ShippedDate AS `shippedDate`, o.ShipVia AS
`shipViaId`, o.Freight AS `freight`, o.ShipName AS `name`,
o.ShipAddress AS `address`, o.ShipCity AS `city`, o.ShipRegion AS
`region`, o.ShipPostalCode AS `postalCode`, o.ShipCountry AS `country`
FROM Orders o  WHERE o.OrderID = ? 

-- Selects customer details from the Customers table where the CustomerID matches the provided parameter
-- The CustomerID is expected to be in the result set of the previous query
SELECT c.CustomerID AS `id`, c.CompanyName AS `name`, c.ContactName AS
`contact`, c.ContactTitle AS `phone`, c.Address AS `address`, c.City
AS `city`, c.Region AS `region`, c.PostalCode AS `postalCode`,
c.Country AS `country` FROM Customers c  WHERE  c.CustomerID IN (?)
```

**Data Result:**

```json
[
  {
    "id": 10248,
    "customerId": "VINET",
    "employeeId": 5,
    "orderDate": "1996-07-03T22:00:00.000Z",
    "requiredDate": "1996-07-31T22:00:00.000Z",
    "shippedDate": "1996-07-15T22:00:00.000Z",
    "shipViaId": 3,
    "freight": 32.38,
    "name": "Vins et alcools Chevalier",
    "address": "59 rue de l-Abbaye",
    "city": "Reims",
    "region": null,
    "postalCode": "51100",
    "country": "France",
    "customer": {
      "id": "VINET",
      "name": "Vins et alcools Chevalier",
      "contact": "Paul Henriot",
      "phone": "Accounting Manager",
      "address": "59 rue de l'Abbaye",
      "city": "Reims",
      "region": null,
      "postalCode": "51100",
      "country": "France"
    }
  }
]
```

## Include relation OneToMany and manyToOne

In this example, the data of an Order, the customer and the details of the related Order are obtained.

**Lambda:**

```Typescript
// Filters orders based on the provided ID and includes details and customers
Orders.filter(p => p.id == id).include(p => [p.details,p.customer])
```

**SQL Result:**

```sql
-- Selects order details from the Orders table where OrderID matches the provided parameter
SELECT o.OrderID AS `id`, o.CustomerID AS `customerId`, o.EmployeeID
AS `employeeId`, o.OrderDate AS `orderDate`, o.RequiredDate AS
`requiredDate`, o.ShippedDate AS `shippedDate`, o.ShipVia AS
`shipViaId`, o.Freight AS `freight`, o.ShipName AS `name`,
o.ShipAddress AS `address`, o.ShipCity AS `city`, o.ShipRegion AS
`region`, o.ShipPostalCode AS `postalCode`, o.ShipCountry AS `country`
FROM Orders o  WHERE o.OrderID = ? 

-- Selects order details from the Order Details table where OrderID is in the result set of the previous query
SELECT o1.OrderID AS `orderId`, o1.ProductID AS `productId`,
o1.UnitPrice AS `unitPrice`, o1.Quantity AS `quantity`, o1.Discount AS
`discount` FROM `Order Details` o1  WHERE  o1.OrderID IN (?) 

-- Selects customer details from the Customers table where CustomerID is in the result set of the previous query
-- CustomerID is expected to be in the result set of the previous query
SELECT c.CustomerID AS `id`, c.CompanyName AS `name`, c.ContactName AS
`contact`, c.ContactTitle AS `phone`, c.Address AS `address`, c.City
AS `city`, c.Region AS `region`, c.PostalCode AS `postalCode`,
c.Country AS `country` FROM Customers c  WHERE  c.CustomerID IN (?)
```

**Data Result:**

```json
[
  {
    "id": 10248,
    "customerId": "VINET",
    "employeeId": 5,
    "orderDate": "1996-07-03T22:00:00.000Z",
    "requiredDate": "1996-07-31T22:00:00.000Z",
    "shippedDate": "1996-07-15T22:00:00.000Z",
    "shipViaId": 3,
    "freight": 32.38,
    "name": "Vins et alcools Chevalier",
    "address": "59 rue de l-Abbaye",
    "city": "Reims",
    "region": null,
    "postalCode": "51100",
    "country": "France",
    "details": [
      {
        "orderId": 10248,
        "productId": 11,
        "unitPrice": 14,
        "quantity": 12,
        "discount": 0
      },
      {
        "orderId": 10248,
        "productId": 42,
        "unitPrice": 9.8,
        "quantity": 10,
        "discount": 0
      },
      {
        "orderId": 10248,
        "productId": 72,
        "unitPrice": 34.8,
        "quantity": 5,
        "discount": 0
      }
    ],
    "customer": {
      "id": "VINET",
      "name": "Vins et alcools Chevalier",
      "contact": "Paul Henriot",
      "phone": "Accounting Manager",
      "address": "59 rue de l'Abbaye",
      "city": "Reims",
      "region": null,
      "postalCode": "51100",
      "country": "France"
    }
  }
]
```

## Nested includes

In this example, in the relationship with Orders detail, its relationship with Product is brought and in turn for each product its relationship with Category is brought.

**Lambda:**

```Typescript
// Filters orders based on the provided ID and includes details (with product and category) and customers
Orders
	.filter(p => p.id == id)
	.include(p => [p.details.include(q => q.product.include(r => r.category)), p.customer])
```

**SQL Result:**

```sql
-- Selects order details from the Orders table where OrderID matches the provided parameter
SELECT o.OrderID AS `id`, o.CustomerID AS `customerId`, o.EmployeeID
AS `employeeId`, o.OrderDate AS `orderDate`, o.RequiredDate AS
`requiredDate`, o.ShippedDate AS `shippedDate`, o.ShipVia AS
`shipViaId`, o.Freight AS `freight`, o.ShipName AS `name`,
o.ShipAddress AS `address`, o.ShipCity AS `city`, o.ShipRegion AS
`region`, o.ShipPostalCode AS `postalCode`, o.ShipCountry AS `country`
FROM Orders o  WHERE o.OrderID = ? 

-- Selects order details from the Order Details table where OrderID is in the result set of the previous query
SELECT o1.OrderID AS `orderId`, o1.ProductID AS `productId`,
o1.UnitPrice AS `unitPrice`, o1.Quantity AS `quantity`, o1.Discount AS
`discount` FROM `Order Details` o1  WHERE  o1.OrderID IN (?) 

-- Selects product details from the Products table where ProductID is in the result set of the previous query
-- ProductID is expected to be in the result set of the previous query
SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS
`supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS
`quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`,
p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`,
p.Discontinued AS `discontinued` FROM Products p  WHERE  p.ProductID
IN (?) 

-- Selects category details from the Categories table where CategoryID is in the result set of the previous query
-- CategoryID is expected to be in the result set of the previous query
SELECT c.CategoryID AS `id`, c.CategoryName AS `name`, c.Description
AS `description` FROM Categories c  WHERE  c.CategoryID IN (?) 

-- Selects customer details from the Customers table where CustomerID is in the result set of the previous query
-- CustomerID is expected to be in the result set of the previous query
SELECT c1.CustomerID AS `id`, c1.CompanyName AS `name`, c1.ContactName
AS `contact`, c1.ContactTitle AS `phone`, c1.Address AS `address`,
c1.City AS `city`, c1.Region AS `region`, c1.PostalCode AS
`postalCode`, c1.Country AS `country` FROM Customers c1  WHERE 
c1.CustomerID IN (?) 
```

**Data Result:**

```json
[
  {
    "id": 10248,
    "customerId": "VINET",
    "employeeId": 5,
    "orderDate": "1996-07-03T22:00:00.000Z",
    "requiredDate": "1996-07-31T22:00:00.000Z",
    "shippedDate": "1996-07-15T22:00:00.000Z",
    "shipViaId": 3,
    "freight": 32.38,
    "name": "Vins et alcools Chevalier",
    "address": "59 rue de l-Abbaye",
    "city": "Reims",
    "region": null,
    "postalCode": "51100",
    "country": "France",
    "details": [
      {
        "orderId": 10248,
        "productId": 11,
        "unitPrice": 14,
        "quantity": 12,
        "discount": 0,
        "product": {
          "id": 11,
          "name": "Queso Cabrales",
          "supplierId": 5,
          "categoryId": 4,
          "quantity": "1 kg pkg.",
          "price": 21,
          "inStock": 22,
          "onOrder": 30,
          "reorderLevel": 30,
          "discontinued": false,
          "category": {
            "id": 4,
            "name": "Dairy Products",
            "description": "Cheeses"
          }
        }
      },
      {
        "orderId": 10248,
        "productId": 42,
        "unitPrice": 9.8,
        "quantity": 10,
        "discount": 0,
        "product": {
          "id": 42,
          "name": "Singaporean Hokkien Fried Mee",
          "supplierId": 20,
          "categoryId": 5,
          "quantity": "32 - 1 kg pkgs.",
          "price": 14,
          "inStock": 26,
          "onOrder": 0,
          "reorderLevel": 0,
          "discontinued": true,
          "category": {
            "id": 5,
            "name": "Grains/Cereals",
            "description": "Breads, crackers, pasta, and cereal"
          }
        }
      },
      {
        "orderId": 10248,
        "productId": 72,
        "unitPrice": 34.8,
        "quantity": 5,
        "discount": 0,
        "product": {
          "id": 72,
          "name": "Mozzarella di Giovanni",
          "supplierId": 14,
          "categoryId": 4,
          "quantity": "24 - 200 g pkgs.",
          "price": 34.8,
          "inStock": 14,
          "onOrder": 0,
          "reorderLevel": 0,
          "discontinued": false,
          "category": {
            "id": 4,
            "name": "Dairy Products",
            "description": "Cheeses"
          }
        }
      }
    ],
    "customer": {
      "id": "VINET",
      "name": "Vins et alcools Chevalier",
      "contact": "Paul Henriot",
      "phone": "Accounting Manager",
      "address": "59 rue de l'Abbaye",
      "city": "Reims",
      "region": null,
      "postalCode": "51100",
      "country": "France"
    }
  }
]
```

### includes with some fields

In this example some fields are brought from the main entity as well as from the included entities.
This allows us to create queries that return only the data we need.

**Lambda:**

```Typescript
// Filters orders based on the provided ID and includes customer details, order details (with product category), and order date
Orders.filter(p => p.id === id)
      .include(p => [
          // Includes customer name and concatenated address
          p.customer.map(p => (
              { name:p.name, 
                address:concat(p.address,', ',p.city,' (', p.postalCode,')  ', 
                p.country) 
              })),
          // Includes order details with product names and quantities    
          p.details.include(p => p.product
                                    .include(p => p.category.map(p => p.name))
                                    .map(p => p.name))
                    .map(p => [p.quantity, p.unitPrice])])
      // Maps to retrieve order dates
      .map(p => p.orderDate)
```

**SQL Result:**

```sql
-- Selects order dates from the Orders table where OrderID matches the provided parameter
 -- Parameterized query: OrderID is replaced with the provided parameter
SELECT o.OrderDate AS `orderDate`
FROM Orders o  
WHERE o.OrderID = ? 

-- Selects customer company name and concatenated address from the Customers table where CustomerID is in the result set of the previous query
-- Parameterized query: CustomerID is replaced with the result set of the previous query
SELECT c.CompanyName AS `name`, CONCAT(c.Address,', ',c.City,' (',c.PostalCode,')  ',c.Country) AS `address`
FROM Customers c  
WHERE  c.CustomerID IN (?) 

-- Selects order details (quantity and unit price) from the Order Details table where OrderID is in the result set of the previous query
 -- Parameterized query: OrderID is replaced with the result set of the previous query
SELECT o1.Quantity AS `quantity`, o1.UnitPrice AS `unitPrice`
FROM `Order Details` o1  WHERE  o1.OrderID IN (?) 

-- Selects product names from the Products table where ProductID is in the result set of the previous query
-- Parameterized query: ProductID is replaced with the result set of the previous query
SELECT p.ProductName AS `name` 
FROM Products p  
WHERE  p.ProductID IN (?) 

-- Parameterized query: ProductID is replaced with the result set of the previous query
-- Parameterized query: CategoryID is replaced with the result set of the previous query
SELECT c1.CategoryName AS `name`
FROM Categories c1  
WHERE  c1.CategoryID IN (?) 
```

**Data Result:**

```json
[
  [
		{
			"orderDate": "1996-07-03T22:00:00.000Z",
			"customer": {
				"name": "Vins et alcools Chevalier",
				"address": "59 rue de l'Abbaye, Reims (51100)  France"
			},
			"details": [
				{
					"quantity": 12,
					"unitPrice": 14,
					"product": {
						"name": "Queso Cabrales",
						"category": {
							"name": "Dairy Products"
						}
					}
				},
				{
					"quantity": 10,
					"unitPrice": 9.8,
					"product": {
						"name": "Singaporean Hokkien Fried Mee",
						"category": {
							"name": "Grains/Cereals"
						}
					}
				},
				{
					"quantity": 5,
					"unitPrice": 34.8,
					"product": {
						"name": "Mozzarella di Giovanni",
						"category": {
							"name": "Dairy Products"
						}
					}
				}
			]
		}
	]
]
```

## Code example

```Typescript
import { orm } from '../../lib'
import { Orders } from '../northwind/model/__model'
(async () => {	
	try {		
		await orm.init('./config/northwind.yaml')
    // Defining a query function that accepts an order ID parameter
    // Filtering orders based on ID matching the provided parameter
    // Including related entities such as customer details and order details
    // Including customer details
    // Including order details with product information
		const query = (id:number) => Orders
		                  .filter(p => p.id === id)
		                  .include(p => [
                          p.customer.map(p => (
                              { name:p.name, 
                                address:concat(p.address,', ',p.city,' (', p.postalCode,')  ', 
                                p.country) 
                              })),
			                    p.details.include(p => p.product
                                                    .include(p => p.category.map(p => p.name))
                                                    .map(p => p.name))
				                            .map(p => [p.quantity, p.unitPrice])])
		                  .map(p => p.orderDate)
		// Executing the query with an order ID parameter of 830
    const result = await orm.execute(query, {id: 830})
		console.log(JSON.stringify(result, null, 2))		
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		// Ending the ORM connection
		await orm.end()
	}
})()
```
