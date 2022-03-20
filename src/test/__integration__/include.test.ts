import { orm } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":{"id":1}}
	test('include 1', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>p.customer)'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('include 2', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>p.details)'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('include 3', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details,p.customer])'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('include 4', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product),p.customer])'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('include 5', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product.include(p=>p.category)),p.customer])'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('include 6', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.map(p=>{quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId}),p.customer])'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('include 7', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product).map(p=>{quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId}),p.customer])'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('include 8', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.customer.map(p=>p.name),p.details.include(p=>p.product.include(p=>p.category.map(p=>p.name)).map(p=>p.name)).map(p=>[p.quantity,p.unitPrice])])'
		const expected = undefined
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
})