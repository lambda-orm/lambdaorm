import { orm } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":{"id":1}}
	test('groupBy 1', async () => {
		const expression = 'Products.map(p=>{maxPrice:max(p.price)})'
		const expected = [{"maxPrice":263.5}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p=>{minPrice:min(p.price)})'
		const expected = [{"minPrice":2.5}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p=>{total:sum(p.price)})'
		const expected = [{"total":2222.71}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p=>{average:avg(p.price)})'
		const expected = [{"average":28.86636364}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p=>{count:count(1)})'
		const expected = [{"count":77}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const expected = [{"category":1,"largestPrice":263.5},{"category":2,"largestPrice":43.9},{"category":3,"largestPrice":81},{"category":4,"largestPrice":55},{"category":5,"largestPrice":38},{"category":6,"largestPrice":123.79},{"category":7,"largestPrice":53},{"category":8,"largestPrice":62.5}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = [{"category":"Beverages","largestPrice":263.5},{"category":"Condiments","largestPrice":43.9},{"category":"Confections","largestPrice":81},{"category":"Dairy Products","largestPrice":55},{"category":"Grains/Cereals","largestPrice":38},{"category":"Meat/Poultry","largestPrice":123.79},{"category":"Produce","largestPrice":53},{"category":"Seafood","largestPrice":62.5}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const expected = [{"name":"Chai","source":18,"result":18}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = [{"category":"Beverages","largestPrice":263.5},{"category":"Meat/Poultry","largestPrice":123.79}]
		const mysqlResult =  await orm.execute(expression, data,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.execute(expression, data,'postgres')
		expect(expected).toEqual(postgresResult)
	})
})