import { orm } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":{"id":1}}
	test('function abs', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:(p.price*-1),result:round(abs((p.price*-1)),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function acos', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function asin', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function atan', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function atan2', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function ceil', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function cos', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(cos(2),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function exp', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1,result:round(exp(1),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function floor', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function ln', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(ln(2),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function log', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function round', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function sign', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function tan', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('function trunc', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)})'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
})