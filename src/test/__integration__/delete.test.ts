import { orm } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":{"id":9},"b":{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":"29.4600","name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":1,"productId":28,"unitPrice":"45.6000","quantity":"15.0000","discount":"0.0000"},{"orderId":1,"productId":39,"unitPrice":"18.0000","quantity":"21.0000","discount":"0.0000"},{"orderId":1,"productId":46,"unitPrice":"12.0000","quantity":"2.0000","discount":"0.0000"}]},"c":{"id":2,"customerId":"ALFKI","employeeId":4,"orderDate":"1997-10-02T22:00:00.000Z","requiredDate":"1997-10-30T23:00:00.000Z","shippedDate":"1997-10-12T22:00:00.000Z","shipViaId":2,"freight":"61.0200","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":2,"productId":63,"unitPrice":"43.9000","quantity":"20.0000","discount":"0.0000"}]},"d":{"id":4,"customerId":"ALFKI","employeeId":1,"orderDate":"1998-01-14T23:00:00.000Z","requiredDate":"1998-02-11T23:00:00.000Z","shippedDate":"1998-01-20T23:00:00.000Z","shipViaId":3,"freight":"69.5300","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":4,"productId":59,"unitPrice":"55.0000","quantity":"15.0000","discount":"0.0000"},{"orderId":4,"productId":77,"unitPrice":"13.0000","quantity":"2.0000","discount":"0.0000"}]},"e":{"entity":{"orderId":5,"productId":6,"unitPrice":"25.0000","quantity":"16.0000","discount":"0.0000"}},"f":{"entity":{"id":5,"customerId":"ALFKI","employeeId":1,"orderDate":"1998-03-15T23:00:00.000Z","requiredDate":"1998-04-26T22:00:00.000Z","shippedDate":"1998-03-23T23:00:00.000Z","shipViaId":1,"freight":"40.4200","name":"Alfred-s Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":5,"productId":6,"unitPrice":"25.0000","quantity":"16.0000","discount":"0.0000"},{"orderId":5,"productId":28,"unitPrice":"45.6000","quantity":"2.0000","discount":"0.0000"}]}}}
	test('delete 1', async () => {
		const expression = 'OrderDetails.delete().filter(p=>(p.orderId===id))'
		const expected = 1
		const mysqlResult =  await orm.execute(expression, data,'default','MySQL')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'default','PostgreSQL')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,'default','MariaDB')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,'default','SqlServer')
		expect(expected).toEqual(mssqlResult)
	})
	test('delete 2', async () => {
		const expression = 'Orders.delete().include(p=>p.details)'
		const expected = 1
		const mysqlResult =  await orm.execute(expression, data,'default','MySQL')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'default','PostgreSQL')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,'default','MariaDB')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,'default','SqlServer')
		expect(expected).toEqual(mssqlResult)
	})
	test('delete 3', async () => {
		const expression = 'Orders.delete().filter(p=>(p.id===id)).include(p=>p.details)'
		const expected = 1
		const mysqlResult =  await orm.execute(expression, data,'default','MySQL')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'default','PostgreSQL')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,'default','MariaDB')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,'default','SqlServer')
		expect(expected).toEqual(mssqlResult)
	})
	test('delete 4', async () => {
		const expression = 'Orders.delete().include(p=>p.details)'
		const expected = 1
		const mysqlResult =  await orm.execute(expression, data,'default','MySQL')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'default','PostgreSQL')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,'default','MariaDB')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,'default','SqlServer')
		expect(expected).toEqual(mssqlResult)
	})
	test('delete 4', async () => {
		const expression = 'OrderDetails.delete(entity)'
		const expected = 0
		const mysqlResult =  await orm.execute(expression, data,'default','MySQL')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'default','PostgreSQL')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,'default','MariaDB')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,'default','SqlServer')
		expect(expected).toEqual(mssqlResult)
	})
	test('delete 5', async () => {
		const expression = 'Orders.delete(entity).include(p=>p.details)'
		const expected = 0
		const mysqlResult =  await orm.execute(expression, data,'default','MySQL')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'default','PostgreSQL')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,'default','MariaDB')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,'default','SqlServer')
		expect(expected).toEqual(mssqlResult)
	})
	test('delete 6', async () => {
		const expression = 'OrderDetails.deleteAll()'
		const expected = 2154
		const mysqlResult =  await orm.execute(expression, data,'default','MySQL')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'default','PostgreSQL')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,'default','MariaDB')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,'default','SqlServer')
		expect(expected).toEqual(mssqlResult)
	})
})