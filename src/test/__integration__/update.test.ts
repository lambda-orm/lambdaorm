import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const context = {"a":{"id":7,"customerId":"ANATR","employeeId":7,"orderDate":"1996-09-17T22:00:00.000Z","requiredDate":"1996-10-15T22:00:00.000Z","shippedDate":"1996-09-23T22:00:00.000Z","shipViaId":3,"freight":"1.6100","name":"Ana Trujillo Emparedados y helados","address":"Avda. de la Constitucin 2222","city":"Mxico D.F.","region":null,"postalCode":"5021","country":"Mexico","details":[{"orderId":7,"productId":69,"unitPrice":"28.8000","quantity":"1.0000","discount":"0.0000"},{"orderId":7,"productId":70,"unitPrice":"12.0000","quantity":"5.0000","discount":"0.0000"}]},"b":{"entity":{"id":8,"customerId":"ANATR","employeeId":3,"orderDate":"1997-08-07T22:00:00.000Z","requiredDate":"1997-09-04T22:00:00.000Z","shippedDate":"1997-08-13T22:00:00.000Z","shipViaId":1,"freight":"43.9000","name":"Ana Trujillo Emparedados y helados","address":"Avda. de la Constitucin 2222","city":"Mxico D.F.","region":null,"postalCode":"5021","country":"Mexico","details":[{"orderId":8,"productId":14,"unitPrice":"23.2500","quantity":"3.0000","discount":"0.0000"},{"orderId":8,"productId":42,"unitPrice":"14.0000","quantity":"5.0000","discount":"0.0000"},{"orderId":8,"productId":60,"unitPrice":"34.0000","quantity":"10.0000","discount":"0.0000"}]}},"c":{"postalCode":"xxx"},"d":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","orders":[{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":"29.4600","name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":1,"productId":28,"unitPrice":"45.6000","quantity":"15.0000","discount":"0.0000"},{"orderId":1,"productId":39,"unitPrice":"18.0000","quantity":"21.0000","discount":"0.0000"},{"orderId":1,"productId":46,"unitPrice":"12.0000","quantity":"2.0000","discount":"0.0000"}]},{"id":2,"customerId":"ALFKI","employeeId":4,"orderDate":"1997-10-02T22:00:00.000Z","requiredDate":"1997-10-30T23:00:00.000Z","shippedDate":"1997-10-12T22:00:00.000Z","shipViaId":2,"freight":"61.0200","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":2,"productId":63,"unitPrice":"43.9000","quantity":"20.0000","discount":"0.0000"}]},{"id":3,"customerId":"ALFKI","employeeId":4,"orderDate":"1997-10-12T22:00:00.000Z","requiredDate":"1997-11-23T23:00:00.000Z","shippedDate":"1997-10-20T22:00:00.000Z","shipViaId":1,"freight":"23.9400","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":3,"productId":3,"unitPrice":"10.0000","quantity":"6.0000","discount":"0.0000"},{"orderId":3,"productId":76,"unitPrice":"18.0000","quantity":"15.0000","discount":"0.0000"}]},{"id":4,"customerId":"ALFKI","employeeId":1,"orderDate":"1998-01-14T23:00:00.000Z","requiredDate":"1998-02-11T23:00:00.000Z","shippedDate":"1998-01-20T23:00:00.000Z","shipViaId":3,"freight":"69.5300","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":4,"productId":59,"unitPrice":"55.0000","quantity":"15.0000","discount":"0.0000"},{"orderId":4,"productId":77,"unitPrice":"13.0000","quantity":"2.0000","discount":"0.0000"}]},{"id":5,"customerId":"ALFKI","employeeId":1,"orderDate":"1998-03-15T23:00:00.000Z","requiredDate":"1998-04-26T22:00:00.000Z","shippedDate":"1998-03-23T23:00:00.000Z","shipViaId":1,"freight":"40.4200","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":5,"productId":6,"unitPrice":"25.0000","quantity":"16.0000","discount":"0.0000"},{"orderId":5,"productId":28,"unitPrice":"45.6000","quantity":"2.0000","discount":"0.0000"}]},{"id":6,"customerId":"ALFKI","employeeId":3,"orderDate":"1998-04-08T22:00:00.000Z","requiredDate":"1998-05-06T22:00:00.000Z","shippedDate":"1998-04-12T22:00:00.000Z","shipViaId":1,"freight":"1.2100","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":6,"productId":58,"unitPrice":"13.2500","quantity":"40.0000","discount":"0.0000"},{"orderId":6,"productId":71,"unitPrice":"21.5000","quantity":"20.0000","discount":"0.0000"}]}]}}
	test('update 1', async () => {
		const expression = 'northwind_1.Orders.update()'
		const expected = 0
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('update 2', async () => {
		const expression = 'northwind_1.Orders.update(entity)'
		const expected = 0
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('update 4', async () => {
		const expression = 'northwind_1.Orders.update(p=>{name:entity.name}).filter(p=>(p.id===entity.id))'
		const expected = 1
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('update 8', async () => {
		const expression = 'northwind_1.Orders.update().include(p=>p.details)'
		const expected = 0
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('update 9', async () => {
		const expression = 'northwind_1.Customers.update().include(p=>p.orders.include(p=>p.details))'
		const expected = 0
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
})