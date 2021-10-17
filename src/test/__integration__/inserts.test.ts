import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const context = {"a":{"name":"Beverages20","description":"Soft drinks, coffees, teas, beers, and ales","id":9},"b":{"name":"Beverages21","description":"Soft drinks, coffees, teas, beers, and ales","id":10},"c":{"entity":{"name":"Beverages22","description":"Soft drinks, coffees, teas, beers, and ales"},"id":11},"order":{"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"productId":11,"unitPrice":14,"quantity":12,"discount":10,"orderId":833},{"productId":42,"unitPrice":9.8,"quantity":10,"discount":10,"orderId":833},{"productId":72,"unitPrice":34.8,"quantity":5,"discount":10,"orderId":833}],"id":833}}
	test('insert 1', async () => {
		const expression = 'northwind_1.Categories.insert()'
		const expected = 9
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('insert 2', async () => {
		const expression = 'northwind_1.Categories.insert(() => ({ name: name, description: description }))'
		const expected = 10
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('insert 3', async () => {
		const expression = 'northwind_1.Categories.insert(entity)'
		const expected = 11
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('insert 4', async () => {
		const expression = 'northwind_1.Orders.insert()'
		const expected = 831
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('insert 5', async () => {
		const expression = 'northwind_1.Orders.insert().include(p => p.details)'
		const expected = 832
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('insert 6', async () => {
		const expression = 'northwind_1.Orders.insert().include(p => [p.details, p.customer])'
		const expected = 833
		const mysqlResult =  await orm.expression(expression).execute('context,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('context,postgres')
		expect(expected).toEqual(postgresResult)
	})
})