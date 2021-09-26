import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})
describe('Complete Expression', () => {
	test('query 17', () => {
		const source = 'Products.distinct(p => p)'
		const expected = 'Products.map(p=>distinct({id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}))'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('query 18', () => {
		const source = 'Products.distinct(p => p.category.name)'
		const expected = 'Products.map(p=>distinct(p.category.name))'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('query 19', () => {
		const source = 'Products.distinct(p => ({ quantity: p.quantity, category: p.category.name }))'
		const expected = 'Products.map(p=>distinct({quantity:p.quantity,category:p.category.name}))'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('query 20', () => {
		const source = 'Products.distinct(p => ({ category: p.category.name })).sort(p => p.category)'
		const expected = 'Products.map(p=>distinct({category:p.category.name})).sort(p=>p.category)'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('query 17', async () => {
		const expression = 'Products.distinct(p => p)'
		const modelExpected :any= {"id":"integer","name":"string","supplierId":"integer","categoryId":"integer","quantity":"string","price":"decimal","inStock":"decimal","onOrder":"decimal","reorderLevel":"decimal","discontinued":"boolean"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('query 18', async () => {
		const expression = 'Products.distinct(p => p.category.name)'
		const modelExpected :any= {"name":"string"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"name","type":"string"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('query 19', async () => {
		const expression = 'Products.distinct(p => ({ quantity: p.quantity, category: p.category.name }))'
		const modelExpected :any= {"quantity":"string","category":"string"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"quantity","type":"string"},{"name":"category","type":"string"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('query 20', async () => {
		const expression = 'Products.distinct(p => ({ category: p.category.name })).sort(p => p.category)'
		const modelExpected :any= {"category":"string"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"string"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
})
describe('Sentences', () => {
	test('query 17', async () => {
		const expression = 'Products.distinct(p => p)'
		const mariadbExpected = 'SELECT DISTINCT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT DISTINCT p.ProductID AS [id], p.ProductName AS [name], p.SupplierID AS [supplierId], p.CategoryID AS [categoryId], p.QuantityPerUnit AS [quantity], p.UnitPrice AS [price], p.UnitsInStock AS [inStock], p.UnitsOnOrder AS [onOrder], p.ReorderLevel AS [reorderLevel], p.Discontinued AS [discontinued] FROM Products p  '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT DISTINCT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT DISTINCT p.ProductID AS "id", p.ProductName AS "name", p.SupplierID AS "supplierId", p.CategoryID AS "categoryId", p.QuantityPerUnit AS "quantity", p.UnitPrice AS "price", p.UnitsInStock AS "inStock", p.UnitsOnOrder AS "onOrder", p.ReorderLevel AS "reorderLevel", p.Discontinued AS "discontinued" FROM Products p  '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT DISTINCT p.ProductID AS "id", p.ProductName AS "name", p.SupplierID AS "supplierId", p.CategoryID AS "categoryId", p.QuantityPerUnit AS "quantity", p.UnitPrice AS "price", p.UnitsInStock AS "inStock", p.UnitsOnOrder AS "onOrder", p.ReorderLevel AS "reorderLevel", p.Discontinued AS "discontinued" FROM Products p  '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('query 18', async () => {
		const expression = 'Products.distinct(p => p.category.name)'
		const mariadbExpected = 'SELECT DISTINCT c.CategoryName FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT DISTINCT c.CategoryName FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT DISTINCT c.CategoryName FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT DISTINCT c.CategoryName FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT DISTINCT c.CategoryName FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('query 19', async () => {
		const expression = 'Products.distinct(p => ({ quantity: p.quantity, category: p.category.name }))'
		const mariadbExpected = 'SELECT DISTINCT p.QuantityPerUnit AS `quantity`, c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT DISTINCT p.QuantityPerUnit AS [quantity], c.CategoryName AS [category] FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT DISTINCT p.QuantityPerUnit AS `quantity`, c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT DISTINCT p.QuantityPerUnit AS "quantity", c.CategoryName AS "category" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT DISTINCT p.QuantityPerUnit AS "quantity", c.CategoryName AS "category" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('query 20', async () => {
		const expression = 'Products.distinct(p => ({ category: p.category.name })).sort(p => p.category)'
		const mariadbExpected = 'SELECT DISTINCT c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY `category` '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT DISTINCT c.CategoryName AS [category] FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY [category] '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT DISTINCT c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY `category` '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT DISTINCT c.CategoryName AS "category" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY "category" '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT DISTINCT c.CategoryName AS "category" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY "category" '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
})