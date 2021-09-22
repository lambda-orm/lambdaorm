import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})
describe('Execute', () => {
	const context = {"a":{"id":1}}
	test('groupBy 1', async () => {
		const expression = ' Products.map(p => ({ maxPrice: max(p.price) }))'
		const expected = [{"maxPrice":"263.5000"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 2', async () => {
		const expression = ' Products.map(p => ({ minPrice: min(p.price) }))'
		const expected = [{"minPrice":"2.5000"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 3', async () => {
		const expression = ' Products.map(p => ({ total: sum(p.price) }))'
		const expected = [{"total":"2222.7100"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 4', async () => {
		const expression = ' Products.map(p => ({ average: avg(p.price) }))'
		const expected = [{"average":"28.86636364"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 5', async () => {
		const expression = ' Products.map(p => ({ count: count(1) }))'
		const expected = [{"count":77}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 6', async () => {
		const expression = ' Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))'
		const expected = [{"category":1,"largestPrice":"263.5000"},{"category":2,"largestPrice":"43.9000"},{"category":3,"largestPrice":"81.0000"},{"category":4,"largestPrice":"55.0000"},{"category":5,"largestPrice":"38.0000"},{"category":6,"largestPrice":"123.7900"},{"category":7,"largestPrice":"53.0000"},{"category":8,"largestPrice":"62.5000"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 7', async () => {
		const expression = ' Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const expected = [{"category":"Beverages","largestPrice":"263.5000"},{"category":"Condiments","largestPrice":"43.9000"},{"category":"Confections","largestPrice":"81.0000"},{"category":"Dairy Products","largestPrice":"55.0000"},{"category":"Grains/Cereals","largestPrice":"38.0000"},{"category":"Meat/Poultry","largestPrice":"123.7900"},{"category":"Produce","largestPrice":"53.0000"},{"category":"Seafood","largestPrice":"62.5000"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 8', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))'
		const expected = [{"name":"Chai","source":"18.0000","result":"18.0000"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 9', async () => {
		const expression = ' Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const expected = [{"category":"Beverages","largestPrice":"263.5000"},{"category":"Meat/Poultry","largestPrice":"123.7900"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 10', async () => {
		const expression = ' Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		const expected = [{"category":"Beverages","largestPrice":"263.5000"},{"category":"Meat/Poultry","largestPrice":"123.7900"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('groupBy 11', async () => {
		const expression = ' Products.filter(p => p.price > 5).having(p => max(p.price) > 50).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		const expected = [{"category":"Beverages","largestPrice":"263.5000"},{"category":"Meat/Poultry","largestPrice":"123.7900"},{"category":"Confections","largestPrice":"81.0000"},{"category":"Seafood","largestPrice":"62.5000"},{"category":"Dairy Products","largestPrice":"55.0000"},{"category":"Produce","largestPrice":"53.0000"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
})