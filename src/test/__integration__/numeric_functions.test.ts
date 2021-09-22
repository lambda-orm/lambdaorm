import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})
describe('Execute', () => {
	const context = {"a":{"id":1}}
	test('function abs', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price * -1, result: abs(p.price * -1) }))'
		const expected = [{"name":"Chai","source":"-18.0000","result":"18.0000"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function acos', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: acos(0.25) }))'
		const expected = [{"name":"Chai","source":"0.25","result":1.318116071652818}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function asin', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: asin(0.25) }))'
		const expected = [{"name":"Chai","source":"0.25","result":0.25268025514207865}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function atan', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: atan(0.25) }))'
		const expected = [{"name":"Chai","source":"0.25","result":0.24497866312686414}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function atan2', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.50, result: atan2(0.25, 1) }))'
		const expected = [{"name":"Chai","source":"0.5","result":0.24497866312686414}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function ceil', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: ceil(25.75) }))'
		const expected = [{"name":"Chai","source":"25.75","result":26}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function cos', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: cos(2) }))'
		const expected = [{"name":"Chai","source":2,"result":-0.4161468365471424}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function exp', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1, result: exp(1) }))'
		const expected = [{"name":"Chai","source":1,"result":2.718281828459045}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function floor', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: floor(25.75) }))'
		const expected = [{"name":"Chai","source":"25.75","result":25}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function ln', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: ln(2) }))'
		const expected = [{"name":"Chai","source":2,"result":0.6931471805599453}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function log', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, m: 10, n: 20, result: log(10, 20) }))'
		const expected = [{"name":"Chai","m":10,"n":20,"result":1.301029995663981}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function round', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
		const expected = [{"name":"Chai","source":"135.375","result":"135.38"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function sign', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 255.5, result: sign(255.5) }))'
		const expected = [{"name":"Chai","source":"255.5","result":1}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function tan', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1.75, result: tan(1.75) }))'
		const expected = [{"name":"Chai","source":"1.75","result":-5.52037992250933}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
	test('function trunc', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: trunc(135.375, 2) }))'
		const expected = [{"name":"Chai","source":"135.375","result":"135.37"}]
		const mysqlResult =  await orm.expression(expression).execute(context, 'mysql')
		expect(expected).toBe(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(context, 'postgres')
		expect(expected).toBe(postgresResult)
	})
})