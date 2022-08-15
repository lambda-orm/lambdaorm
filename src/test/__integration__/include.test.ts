import { orm } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":{"id":1}}
	test('include 1', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>p.customer)'
		const expected = [{"id":1,"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","customer":{"id":"VINET","name":"Vins et alcools Chevalier","contact":"Paul Henriot","phone":"Accounting Manager","address":"59 rue de l'Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France"}}]
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
	test('include 2', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>p.details)'
		const expected = [{"id":1,"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"orderId":1,"productId":11,"unitPrice":14,"quantity":12,"discount":0},{"orderId":1,"productId":42,"unitPrice":9.8,"quantity":10,"discount":0},{"orderId":1,"productId":72,"unitPrice":34.8,"quantity":5,"discount":0}]}]
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
	test('include 3', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details,p.customer])'
		const expected = [{"id":1,"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"orderId":1,"productId":11,"unitPrice":14,"quantity":12,"discount":0},{"orderId":1,"productId":42,"unitPrice":9.8,"quantity":10,"discount":0},{"orderId":1,"productId":72,"unitPrice":34.8,"quantity":5,"discount":0}],"customer":{"id":"VINET","name":"Vins et alcools Chevalier","contact":"Paul Henriot","phone":"Accounting Manager","address":"59 rue de l'Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France"}}]
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
	test('include 4', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product),p.customer])'
		const expected = [{"id":1,"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"orderId":1,"productId":11,"unitPrice":14,"quantity":12,"discount":0,"product":{"id":11,"name":"Queso Cabrales","supplierId":5,"categoryId":4,"quantity":"1 kg pkg.","price":21,"inStock":22,"onOrder":30,"reorderLevel":30,"discontinued":false}},{"orderId":1,"productId":42,"unitPrice":9.8,"quantity":10,"discount":0,"product":{"id":42,"name":"Singaporean Hokkien Fried Mee","supplierId":20,"categoryId":5,"quantity":"32 - 1 kg pkgs.","price":14,"inStock":26,"onOrder":0,"reorderLevel":0,"discontinued":true}},{"orderId":1,"productId":72,"unitPrice":34.8,"quantity":5,"discount":0,"product":{"id":72,"name":"Mozzarella di Giovanni","supplierId":14,"categoryId":4,"quantity":"24 - 200 g pkgs.","price":34.8,"inStock":14,"onOrder":0,"reorderLevel":0,"discontinued":false}}],"customer":{"id":"VINET","name":"Vins et alcools Chevalier","contact":"Paul Henriot","phone":"Accounting Manager","address":"59 rue de l'Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France"}}]
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
	test('include 5', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product.include(p=>p.category)),p.customer])'
		const expected = [{"id":1,"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"orderId":1,"productId":11,"unitPrice":14,"quantity":12,"discount":0,"product":{"id":11,"name":"Queso Cabrales","supplierId":5,"categoryId":4,"quantity":"1 kg pkg.","price":21,"inStock":22,"onOrder":30,"reorderLevel":30,"discontinued":false,"category":{"id":4,"name":"Dairy Products","description":"Cheeses"}}},{"orderId":1,"productId":42,"unitPrice":9.8,"quantity":10,"discount":0,"product":{"id":42,"name":"Singaporean Hokkien Fried Mee","supplierId":20,"categoryId":5,"quantity":"32 - 1 kg pkgs.","price":14,"inStock":26,"onOrder":0,"reorderLevel":0,"discontinued":true,"category":{"id":5,"name":"Grains/Cereals","description":"Breads, crackers, pasta, and cereal"}}},{"orderId":1,"productId":72,"unitPrice":34.8,"quantity":5,"discount":0,"product":{"id":72,"name":"Mozzarella di Giovanni","supplierId":14,"categoryId":4,"quantity":"24 - 200 g pkgs.","price":34.8,"inStock":14,"onOrder":0,"reorderLevel":0,"discontinued":false,"category":{"id":4,"name":"Dairy Products","description":"Cheeses"}}}],"customer":{"id":"VINET","name":"Vins et alcools Chevalier","contact":"Paul Henriot","phone":"Accounting Manager","address":"59 rue de l'Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France"}}]
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
	test('include 6', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.map(p=>{quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId}),p.customer])'
		const expected = [{"id":1,"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"quantity":12,"unitPrice":14,"productId":11},{"quantity":10,"unitPrice":9.8,"productId":42},{"quantity":5,"unitPrice":34.8,"productId":72}],"customer":{"id":"VINET","name":"Vins et alcools Chevalier","contact":"Paul Henriot","phone":"Accounting Manager","address":"59 rue de l'Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France"}}]
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
	test('include 7', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product).map(p=>{quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId}),p.customer])'
		const expected = [{"id":1,"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","details":[{"quantity":12,"unitPrice":14,"productId":11,"product":{"id":11,"name":"Queso Cabrales","supplierId":5,"categoryId":4,"quantity":"1 kg pkg.","price":21,"inStock":22,"onOrder":30,"reorderLevel":30,"discontinued":false}},{"quantity":10,"unitPrice":9.8,"productId":42,"product":{"id":42,"name":"Singaporean Hokkien Fried Mee","supplierId":20,"categoryId":5,"quantity":"32 - 1 kg pkgs.","price":14,"inStock":26,"onOrder":0,"reorderLevel":0,"discontinued":true}},{"quantity":5,"unitPrice":34.8,"productId":72,"product":{"id":72,"name":"Mozzarella di Giovanni","supplierId":14,"categoryId":4,"quantity":"24 - 200 g pkgs.","price":34.8,"inStock":14,"onOrder":0,"reorderLevel":0,"discontinued":false}}],"customer":{"id":"VINET","name":"Vins et alcools Chevalier","contact":"Paul Henriot","phone":"Accounting Manager","address":"59 rue de l'Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France"}}]
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
	test('include 8', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.customer.map(p=>p.name),p.details.include(p=>p.product.include(p=>p.category.map(p=>p.name)).map(p=>p.name)).map(p=>[p.quantity,p.unitPrice])])'
		const expected = [{"id":1,"customerId":"VINET","employeeId":5,"orderDate":"1996-07-03T22:00:00.000Z","requiredDate":"1996-07-31T22:00:00.000Z","shippedDate":"1996-07-15T22:00:00.000Z","shipViaId":3,"freight":32.38,"name":"Vins et alcools Chevalier","address":"59 rue de l-Abbaye","city":"Reims","region":null,"postalCode":"51100","country":"France","customer":{"name":"Vins et alcools Chevalier"},"details":[{"quantity":12,"unitPrice":14,"product":{"name":"Queso Cabrales","category":{"name":"Dairy Products"}}},{"quantity":10,"unitPrice":9.8,"product":{"name":"Singaporean Hokkien Fried Mee","category":{"name":"Grains/Cereals"}}},{"quantity":5,"unitPrice":34.8,"product":{"name":"Mozzarella di Giovanni","category":{"name":"Dairy Products"}}}]}]
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