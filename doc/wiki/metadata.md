# Metadata

Lambda ORM has the following methods to extract metadata information from expressions.

To execute these methods it is not necessary to connect to the database.

|method    		|Description          															|Path                         						  						|
|:------------|:--------------------------------------------------|:------------------------------------------------------|
|	parameters	| returns the list of parameters in the expression	| orm.lambda(query).parameters(schema) 									|
|	model				| returns the model of the result in an execution		| orm.lambda(query).model(schema)												|
|	metadata		| returns the metadata of the expression						| orm.lambda(query).metadata(schema)										|
|	sentence		| returns the sentence in the specified dialect			| orm.lambda(query).sentence('mysql','northwind')				|

## Example:

```ts
import { orm } from 'lambdaorm'

(async () => {
await orm.init()

try {
	const query = (id:number) => Orders.filter(p => p.id === id).include(p => p.details).map(p => ({ name: p.orderDate, customer: p.customer.name }))

	const parameters = await orm.lambda(query).parameters('northwind')
	const model = await orm.lambda(query).model('northwind')
	const metadata = await orm.lambda(query).metadata('northwind')
	const sql = await orm.lambda(query).sentence('mysql', 'northwind')

	console.log(JSON.stringify(parameters, null, 2))
	console.log(JSON.stringify(model, null, 2))
	console.log(JSON.stringify(metadata))
	console.log(sql)
} catch (error) {
	console.log(error)
} finally {
	await orm.end()
}
})()
```

### Results:

Parameters:

```json
{
  "id": "integer"
}
```

Model:

```json
{
  "name": "datetime",
  "customer": "string",
  "details": [
    {
      "orderId": "integer",
      "productId": "integer",
      "unitPrice": "decimal",
      "quantity": "decimal",
      "discount": "decimal"
    }
  ]
}
```

Metadata:

```json
{"n":"select","t":"Sentence","c":[{"n":"filter","t":"Filter","c":[{"n":"===","t":"Operator","c":[{"n":"id","t":"Field","c":[],"e":"Orders","m":"o.OrderID"},{"n":"id","t":"Variable","c":[],"u":1}]}]},{"n":"Orders.o","t":"From","c":[]},{"n":"map","t":"Map","c":[{"n":"obj","t":"Obj","c":[{"n":"name","t":"KeyValue","c":[{"n":"orderDate","t":"Field","c":[],"e":"Orders","m":"o.OrderDate"}]},{"n":"customer","t":"KeyValue","c":[{"n":"name","t":"Field","c":[],"e":"Customers","m":"c.CompanyName"}]},{"n":"__id","t":"KeyValue","c":[{"n":"id","t":"Field","c":[],"e":"Orders","m":"o.OrderID"}]}]}]},{"n":"details","t":"SentenceInclude","c":[{"n":"select","t":"Sentence","c":[{"n":"filter","t":"Filter","c":[{"n":"includes","t":"FunctionRef","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"},{"n":"__parentId","t":"Variable","c":[],"u":1}]}]},{"n":"Order Details.o1","t":"From","c":[]},{"n":"map","t":"Map","c":[{"n":"obj","t":"Obj","c":[{"n":"orderId","t":"KeyValue","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"}]},{"n":"productId","t":"KeyValue","c":[{"n":"productId","t":"Field","c":[],"e":"OrderDetails","m":"o1.ProductID"}]},{"n":"unitPrice","t":"KeyValue","c":[{"n":"unitPrice","t":"Field","c":[],"e":"OrderDetails","m":"o1.UnitPrice"}]},{"n":"quantity","t":"KeyValue","c":[{"n":"quantity","t":"Field","c":[],"e":"OrderDetails","m":"o1.Quantity"}]},{"n":"discount","t":"KeyValue","c":[{"n":"discount","t":"Field","c":[],"e":"OrderDetails","m":"o1.Discount"}]},{"n":"__parentId","t":"KeyValue","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"}]}]}]}],"f":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"},{"name":"__parentId","type":"integer"}],"p":[{"name":"__parentId","type":"array"}],"e":"OrderDetails"}],"r":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","to":"orderId"}},{"n":"Customers.c","t":"Join","c":[{"n":"==","t":"Operator","c":[{"n":"id","t":"Field","c":[],"e":"Customers","m":"c.CustomerID"},{"n":"customerId","t":"Field","c":[],"e":"Orders","m":"o.CustomerID"}]}]}],"f":[{"name":"name","type":"datetime"},{"name":"customer","type":"string"},{"name":"__id","type":"integer"}],"p":[{"name":"id","type":"integer"}],"e":"Orders","a":{"name":"id","mapping":"OrderID","type":"integer","nullable":false,"autoIncrement":true}}
```

Sentence:

```sql
SELECT o.OrderDate AS `name`, c.CompanyName AS `customer`, o.OrderID AS `__id` 
FROM Orders o 
INNER JOIN Customers c ON c.CustomerID = o.CustomerID 
WHERE o.OrderID = ? 

SELECT o1.OrderID AS `orderId`, o1.ProductID AS `productId`, o1.UnitPrice AS `unitPrice`, o1.Quantity AS `quantity`, o1.Discount AS `discount`, o1.OrderID AS `__parentId` 
FROM `Order Details` o1  
WHERE  o1.OrderID IN (?) 
```
