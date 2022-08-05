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
	test('groupBy 2', async () => {
		const expression = 'Products.map(p=>{minPrice:min(p.price)})'
		const expected = [{"minPrice":2.5}]
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
	test('groupBy 3', async () => {
		const expression = 'Products.map(p=>{total:sum(p.price)})'
		const expected = [{"total":2222.71}]
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
	test('groupBy 4', async () => {
		const expression = 'Products.map(p=>{average:round(avg(p.price),4)})'
		const expected = [{"average":28.8664}]
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
	test('groupBy 5', async () => {
		const expression = 'Products.map(p=>{count:count(1)})'
		const expected = [{"count":77}]
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
	test('groupBy 6', async () => {
		const expression = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const expected = [{"category":1,"largestPrice":263.5},{"category":2,"largestPrice":43.9},{"category":3,"largestPrice":81},{"category":4,"largestPrice":55},{"category":5,"largestPrice":38},{"category":6,"largestPrice":123.79},{"category":7,"largestPrice":53},{"category":8,"largestPrice":62.5}]
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
	test('groupBy 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = [{"category":"Beverages","largestPrice":263.5},{"category":"Condiments","largestPrice":43.9},{"category":"Confections","largestPrice":81},{"category":"Dairy Products","largestPrice":55},{"category":"Grains/Cereals","largestPrice":38},{"category":"Meat/Poultry","largestPrice":123.79},{"category":"Produce","largestPrice":53},{"category":"Seafood","largestPrice":62.5}]
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
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const expected = [{"name":"Chai","source":18,"result":18}]
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
	test('groupBy 9', async () => {
		const expression = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = [{"category":"Beverages","largestPrice":263.5},{"category":"Meat/Poultry","largestPrice":123.79}]
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
	test('query 10', async () => {
		const expression = 'Orders.details.map(p=>{subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.subTotal)'
		const expected = [{"subTotal":135445859}]
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