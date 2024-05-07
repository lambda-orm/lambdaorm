# Metadata

Lambda ORM has the following methods to extract metadata information from queries.

To execute these methods it is not necessary to connect to the database.

|method    		|Description          													| Path                     		|
|:------------|:----------------------------------------------|:----------------------------|
|	parameters	| Get parameters in the query									  | orm.parameters(query)	      |
|	model				| Get model of the result in an execution			  | orm.model(query)				    |
|	metadata		| Get metadata of the query										  | orm.metadata(query)		      |
|	plan		    | Get plan in the dialect of the physical model	| orm.plan(query)		          |
|	constraints	| Get constraints of query											| orm.constraints(query)	    |

## Example:

```ts
import { orm } from 'lambdaorm'

(async () => {
try {
  await orm.init()  
	const query = (id:number) => Orders.filter(p => p.id === id).include(p => p.details).map(p => ({ name: p.orderDate, customer: p.customer.name }))

	const parameters = await orm.parameters(query)
	const model = await orm.model(query)	
	const sentences = await orm.sentence(query)
  const constraints = await orm.constraints(query)
  const plan = await orm.plan(query)

	console.log(JSON.stringify(parameters, null, 2))
	console.log(JSON.stringify(model, null, 2))
  console.log(JSON.stringify(sentences, null, 2))
  console.log(JSON.stringify(constraints, null, 2))
	console.log(JSON.stringify(plan, null, 2))
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
  "name": "dateTime",
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
{"n":"select","t":"Sentence","c":[{"n":"filter","t":"Filter","c":[{"n":"===","t":"Operator","c":[{"n":"id","t":"Field","c":[],"e":"Orders","m":"o.OrderID"},{"n":"id","t":"Variable","c":[],"u":1}]}]},{"n":"Orders.o","t":"From","c":[]},{"n":"map","t":"Map","c":[{"n":"obj","t":"Obj","c":[{"n":"name","t":"KeyValue","c":[{"n":"orderDate","t":"Field","c":[],"e":"Orders","m":"o.OrderDate"}]},{"n":"customer","t":"KeyValue","c":[{"n":"name","t":"Field","c":[],"e":"Customers","m":"c.CompanyName"}]},{"n":"__id","t":"KeyValue","c":[{"n":"id","t":"Field","c":[],"e":"Orders","m":"o.OrderID"}]}]}]},{"n":"details","t":"SentenceInclude","c":[{"n":"select","t":"Sentence","c":[{"n":"filter","t":"Filter","c":[{"n":"includes","t":"FunctionRef","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"},{"n":"__parentId","t":"Variable","c":[],"u":1}]}]},{"n":"Order Details.o1","t":"From","c":[]},{"n":"map","t":"Map","c":[{"n":"obj","t":"Obj","c":[{"n":"orderId","t":"KeyValue","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"}]},{"n":"productId","t":"KeyValue","c":[{"n":"productId","t":"Field","c":[],"e":"OrderDetails","m":"o1.ProductID"}]},{"n":"unitPrice","t":"KeyValue","c":[{"n":"unitPrice","t":"Field","c":[],"e":"OrderDetails","m":"o1.UnitPrice"}]},{"n":"quantity","t":"KeyValue","c":[{"n":"quantity","t":"Field","c":[],"e":"OrderDetails","m":"o1.Quantity"}]},{"n":"discount","t":"KeyValue","c":[{"n":"discount","t":"Field","c":[],"e":"OrderDetails","m":"o1.Discount"}]},{"n":"__parentId","t":"KeyValue","c":[{"n":"orderId","t":"Field","c":[],"e":"OrderDetails","m":"o1.OrderID"}]}]}]}],"f":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"},{"name":"__parentId","type":"integer"}],"p":[{"name":"__parentId","type":"array"}],"e":"OrderDetails"}],"r":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","to":"orderId"}},{"n":"Customers.c","t":"Join","c":[{"n":"==","t":"Operator","c":[{"n":"id","t":"Field","c":[],"e":"Customers","m":"c.CustomerID"},{"n":"customerId","t":"Field","c":[],"e":"Orders","m":"o.CustomerID"}]}]}],"f":[{"name":"name","type":"dateTime"},{"name":"customer","type":"string"},{"name":"__id","type":"integer"}],"p":[{"name":"id","type":"integer"}],"e":"Orders","a":{"name":"id","mapping":"OrderID","type":"integer","autoIncrement":true}}
```

Plan:

```sql
SELECT o.OrderDate AS `name`, c.CompanyName AS `customer`, o.OrderID AS `__id` 
FROM Orders o 
INNER JOIN Customers c ON c.CustomerID = o.CustomerID 
WHERE o.OrderID = ? 

SELECT o1.OrderID AS `orderId`, o1.ProductID AS `productId`, o1.UnitPrice AS `unitPrice`, o1.Quantity AS `quantity`, o1.Discount AS `discount`, o1.OrderID AS `__parentId` 
FROM `Order Details` o1  
WHERE  o1.OrderID IN (?) 
```
