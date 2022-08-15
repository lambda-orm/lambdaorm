import { orm } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":{"name":"Beverages20","description":"Soft drinks, coffees, teas, beers, and ales","id":10},"b":{"name":"Beverages21","description":"Soft drinks, coffees, teas, beers, and ales","id":12},"c":{"entity":{"name":"Beverages22","description":"Soft drinks, coffees, teas, beers, and ales"},"id":11},"order":{"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"productId":11,"unitPrice":14,"quantity":12,"discount":10,"orderId":835},{"productId":42,"unitPrice":9.8,"quantity":10,"discount":10,"orderId":835},{"productId":72,"unitPrice":34.8,"quantity":5,"discount":10,"orderId":835}],"id":836}}
	test('insert 1', async () => {
		const expression = 'Categories.insert()'
		const expected = {"data":{"name":"Beverages20","description":"Soft drinks, coffees, teas, beers, and ales","id":10}}
		const MySQLResult =  await orm.execute(expression, data,{stage:'MySQL'})
		expect(expected).toEqual(MySQLResult)
		const MariaDBResult =  await orm.execute(expression, data,{stage:'MariaDB'})
		expect(expected).toEqual(MariaDBResult)
		const PostgreSQLResult =  await orm.execute(expression, data,{stage:'PostgreSQL'})
		expect(expected).toEqual(PostgreSQLResult)
		const SqlServerResult =  await orm.execute(expression, data,{stage:'SqlServer'})
		expect(expected).toEqual(SqlServerResult)
		const OracleResult =  await orm.execute(expression, data,{stage:'Oracle'})
		expect(expected).toEqual(OracleResult)
		const MongoDBResult =  await orm.execute(expression, data,{stage:'MongoDB'})
		expect(expected).toEqual(MongoDBResult)
	})
	test('insert 2', async () => {
		const expression = 'Categories.insert(=>{name:name,description:description})'
		const expected = {"data":{"name":"Beverages21","description":"Soft drinks, coffees, teas, beers, and ales","id":12}}
		const MySQLResult =  await orm.execute(expression, data,{stage:'MySQL'})
		expect(expected).toEqual(MySQLResult)
		const MariaDBResult =  await orm.execute(expression, data,{stage:'MariaDB'})
		expect(expected).toEqual(MariaDBResult)
		const PostgreSQLResult =  await orm.execute(expression, data,{stage:'PostgreSQL'})
		expect(expected).toEqual(PostgreSQLResult)
		const SqlServerResult =  await orm.execute(expression, data,{stage:'SqlServer'})
		expect(expected).toEqual(SqlServerResult)
		const OracleResult =  await orm.execute(expression, data,{stage:'Oracle'})
		expect(expected).toEqual(OracleResult)
		const MongoDBResult =  await orm.execute(expression, data,{stage:'MongoDB'})
		expect(expected).toEqual(MongoDBResult)
	})
	test('insert 3', async () => {
		const expression = 'Categories.insert(entity)'
		const expected = {"data":{"entity":{"name":"Beverages22","description":"Soft drinks, coffees, teas, beers, and ales"},"id":11}}
		const MySQLResult =  await orm.execute(expression, data,{stage:'MySQL'})
		expect(expected).toEqual(MySQLResult)
		const MariaDBResult =  await orm.execute(expression, data,{stage:'MariaDB'})
		expect(expected).toEqual(MariaDBResult)
		const PostgreSQLResult =  await orm.execute(expression, data,{stage:'PostgreSQL'})
		expect(expected).toEqual(PostgreSQLResult)
		const SqlServerResult =  await orm.execute(expression, data,{stage:'SqlServer'})
		expect(expected).toEqual(SqlServerResult)
		const OracleResult =  await orm.execute(expression, data,{stage:'Oracle'})
		expect(expected).toEqual(OracleResult)
		const MongoDBResult =  await orm.execute(expression, data,{stage:'MongoDB'})
		expect(expected).toEqual(MongoDBResult)
	})
	test('insert 4', async () => {
		const expression = 'Orders.insert()'
		const expected = {"data":{"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"productId":11,"unitPrice":14,"quantity":12,"discount":10,"orderId":835},{"productId":42,"unitPrice":9.8,"quantity":10,"discount":10,"orderId":835},{"productId":72,"unitPrice":34.8,"quantity":5,"discount":10,"orderId":835}],"id":836}}
		const MySQLResult =  await orm.execute(expression, data,{stage:'MySQL'})
		expect(expected).toEqual(MySQLResult)
		const MariaDBResult =  await orm.execute(expression, data,{stage:'MariaDB'})
		expect(expected).toEqual(MariaDBResult)
		const PostgreSQLResult =  await orm.execute(expression, data,{stage:'PostgreSQL'})
		expect(expected).toEqual(PostgreSQLResult)
		const SqlServerResult =  await orm.execute(expression, data,{stage:'SqlServer'})
		expect(expected).toEqual(SqlServerResult)
		const OracleResult =  await orm.execute(expression, data,{stage:'Oracle'})
		expect(expected).toEqual(OracleResult)
		const MongoDBResult =  await orm.execute(expression, data,{stage:'MongoDB'})
		expect(expected).toEqual(MongoDBResult)
	})
	test('insert 5', async () => {
		const expression = 'Orders.insert().include(p=>p.details)'
		const expected = {"data":{"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"productId":11,"unitPrice":14,"quantity":12,"discount":10,"orderId":835},{"productId":42,"unitPrice":9.8,"quantity":10,"discount":10,"orderId":835},{"productId":72,"unitPrice":34.8,"quantity":5,"discount":10,"orderId":835}],"id":836}}
		const MySQLResult =  await orm.execute(expression, data,{stage:'MySQL'})
		expect(expected).toEqual(MySQLResult)
		const MariaDBResult =  await orm.execute(expression, data,{stage:'MariaDB'})
		expect(expected).toEqual(MariaDBResult)
		const PostgreSQLResult =  await orm.execute(expression, data,{stage:'PostgreSQL'})
		expect(expected).toEqual(PostgreSQLResult)
		const SqlServerResult =  await orm.execute(expression, data,{stage:'SqlServer'})
		expect(expected).toEqual(SqlServerResult)
		const OracleResult =  await orm.execute(expression, data,{stage:'Oracle'})
		expect(expected).toEqual(OracleResult)
		const MongoDBResult =  await orm.execute(expression, data,{stage:'MongoDB'})
		expect(expected).toEqual(MongoDBResult)
	})
	test('insert 6', async () => {
		const expression = 'Orders.insert().include(p=>[p.details,p.customer])'
		const expected = {"data":{"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"productId":11,"unitPrice":14,"quantity":12,"discount":10,"orderId":835},{"productId":42,"unitPrice":9.8,"quantity":10,"discount":10,"orderId":835},{"productId":72,"unitPrice":34.8,"quantity":5,"discount":10,"orderId":835}],"id":836}}
		const MySQLResult =  await orm.execute(expression, data,{stage:'MySQL'})
		expect(expected).toEqual(MySQLResult)
		const MariaDBResult =  await orm.execute(expression, data,{stage:'MariaDB'})
		expect(expected).toEqual(MariaDBResult)
		const PostgreSQLResult =  await orm.execute(expression, data,{stage:'PostgreSQL'})
		expect(expected).toEqual(PostgreSQLResult)
		const SqlServerResult =  await orm.execute(expression, data,{stage:'SqlServer'})
		expect(expected).toEqual(SqlServerResult)
		const OracleResult =  await orm.execute(expression, data,{stage:'Oracle'})
		expect(expected).toEqual(OracleResult)
		const MongoDBResult =  await orm.execute(expression, data,{stage:'MongoDB'})
		expect(expected).toEqual(MongoDBResult)
	})
})