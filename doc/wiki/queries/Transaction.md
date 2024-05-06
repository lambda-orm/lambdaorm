# Transaction

To work with transactions use the orm.transaction method.

This method receives the name of the database as the first argument and as the second it is a callback function that does not pass a Transaction object, in the example we name it tr.

We use the lambda or expression method to execute the sentence (as we found it written).

When we reach the end and return the callback, the orm will internally execute the COMMIT, if there is an exception, internally the ROLLBACK will be executed

**Example:**

```Typescript
import { orm } from '../../lib'
import { Orders } from '../northwind/model/__model'
(async () => {	
	try {		
		await orm.init('./config/northwind.yaml')
		const order = { customerId: 'VINET', employeeId: 5, orderDate: '1996-07-03T22:00:00.000Z', requiredDate: '1996-07-31T22:00:00.000Z', shippedDate: '1996-07-15T22:00:00.000Z', shipViaId: 3, freight: 32.38, name: 'Vins et alcools Chevalier', address: '59 rue de l-Abbaye', city: 'Reims', region: null, postalCode: '51100', country: 'France', details: [{ productId: 11, unitPrice: 14, quantity: 12, discount: !1 }, { productId: 42, unitPrice: 9.8, quantity: 10, discount: !1 }, { productId: 72, unitPrice: 34.8, quantity: 5, discount: !1 }] }

		orm.transaction({ stage: 'source' }, async (tr) => {
		// create order
		const orderId = await tr.execute(() => Orders.insert().include(p => p.details), order)
		// get order
		const result = await tr.execute((id: number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
		const order2 = result[0]
		// updated order
		order2.address = 'changed 59 rue de l-Abbaye'
		order2.details[0].discount = true
		order2.details[1].unitPrice = 10
		order2.details[2].quantity = 7
		const updateCount = await tr.execute(() => Orders.update().include(p => p.details), order2)
		console.log(updateCount)
		// get order
		const order3 = await tr.execute((id: number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
		console.log(JSON.stringify(order3))
		// delete
		const deleteCount = await tr.execute(() => Orders.delete().include(p => p.details), order3[0])
		console.log(deleteCount)
		// get order
		const order4 = await tr.execute((id: number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
		console.log(JSON.stringify(order4))
	})	
} catch (error:any) {
	console.error(error.stack)
} finally {
	// Ending the ORM connection
	await orm.end()
}
})()
```
