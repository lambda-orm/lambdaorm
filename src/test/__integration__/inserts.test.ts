import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":{"name":"Beverages20","description":"Soft drinks, coffees, teas, beers, and ales"},"b":{"name":"Beverages21","description":"Soft drinks, coffees, teas, beers, and ales"},"c":{"entity":{"name":"Beverages22","description":"Soft drinks, coffees, teas, beers, and ales"},"id":11},"order":{"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"productId":11,"unitPrice":14,"quantity":12,"discount":10,"orderId":null},{"productId":42,"unitPrice":9.8,"quantity":10,"discount":10,"orderId":833},{"productId":72,"unitPrice":34.8,"quantity":5,"discount":10,"orderId":833}]}}
	const context = {}
	test('insert 1', async () => {
		const expression = 'Categories.insert()'
		const expected = 9
		const mysqlResult =  await orm.execute(expression, data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('insert 2', async () => {
		const expression = 'Categories.insert(=>{name:name,description:description})'
		const expected = 10
		const mysqlResult =  await orm.execute(expression, data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('insert 3', async () => {
		const expression = 'Categories.insert(entity)'
		const expected = 11
		const mysqlResult =  await orm.execute(expression, data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('insert 4', async () => {
		const expression = 'Orders.insert()'
		const expected = 831
		const mysqlResult =  await orm.execute(expression, data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('insert 5', async () => {
		const expression = 'Orders.insert().include(p=>p.details)'
		const expected = 832
		const mysqlResult =  await orm.execute(expression, data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('insert 6', async () => {
		const expression = 'Orders.insert().include(p=>[p.details,p.customer])'
		const expected = 833
		const mysqlResult =  await orm.execute(expression, data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.execute(expression, data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.execute(expression, data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
})