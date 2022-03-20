import { orm } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":[{"name":"Beverages4","description":"Soft drinks, coffees, teas, beers, and ales"},{"name":"Condiments4","description":"Sweet and savory sauces, relishes, spreads, and seasonings"}],"b":[{"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":"29.4600","name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"productId":28,"unitPrice":"45.6000","quantity":15,"discount":0},{"productId":39,"unitPrice":"18.0000","quantity":21,"discount":0},{"productId":46,"unitPrice":"12.0000","quantity":2,"discount":0}]},{"customerId":"ALFKI","employeeId":4,"orderDate":"1997-10-02T22:00:00.000Z","requiredDate":"1997-10-30T23:00:00.000Z","shippedDate":"1997-10-12T22:00:00.000Z","shipViaId":2,"freight":"61.0200","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"productId":63,"unitPrice":"43.9000","quantity":20,"discount":0}]},{"customerId":"ALFKI","employeeId":4,"orderDate":"1997-10-12T22:00:00.000Z","requiredDate":"1997-11-23T23:00:00.000Z","shippedDate":"1997-10-20T22:00:00.000Z","shipViaId":1,"freight":"23.9400","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"productId":3,"unitPrice":"10.0000","quantity":6,"discount":0},{"productId":76,"unitPrice":"18.0000","quantity":15,"discount":0}]}]}
	test('bulkInsert 1', async () => {
		const expression = 'Categories.bulkInsert()'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('bulkInsert 2', async () => {
		const expression = 'Orders.bulkInsert().include(p=>p.details)'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
})