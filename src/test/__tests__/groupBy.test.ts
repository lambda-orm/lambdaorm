import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})
describe('Complete Expression', () => {
	test('groupBy 1', () => {
		const source = 'Products.map(p => ({ maxPrice: max(p.price) }))'
		const expected = 'Products.map(p=>{maxPrice:max(p.price)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 2', () => {
		const source = 'Products.map(p => ({ minPrice: min(p.price) }))'
		const expected = 'Products.map(p=>{minPrice:min(p.price)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 3', () => {
		const source = 'Products.map(p => ({ total: sum(p.price) }))'
		const expected = 'Products.map(p=>{total:sum(p.price)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 4', () => {
		const source = 'Products.map(p => ({ average: avg(p.price) }))'
		const expected = 'Products.map(p=>{average:avg(p.price)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 5', () => {
		const source = 'Products.map(p => ({ count: count(1) }))'
		const expected = 'Products.map(p=>{count:count(1)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 6', () => {
		const source = 'Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))'
		const expected = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 7', () => {
		const source = 'Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const expected = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 8', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 9', () => {
		const source = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const expected = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 10', () => {
		const source = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		const expected = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)}).sort(p=>desc(p.largestPrice))'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('groupBy 11', () => {
		const source = 'Products.filter(p => p.price > 5).having(p => max(p.price) > 50).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		const expected = 'Products.filter(p=>(p.price>5)).having(p=>(max(p.price)>50)).map(p=>{category:p.category.name,largestPrice:max(p.price)}).sort(p=>desc(p.largestPrice))'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('groupBy 1', async () => {
		const expression = 'Products.map(p => ({ maxPrice: max(p.price) }))'
		const modelExpected :any= {"maxPrice":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"maxPrice","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p => ({ minPrice: min(p.price) }))'
		const modelExpected :any= {"minPrice":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"minPrice","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p => ({ total: sum(p.price) }))'
		const modelExpected :any= {"total":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"total","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p => ({ average: avg(p.price) }))'
		const modelExpected :any= {"average":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"average","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p => ({ count: count(1) }))'
		const modelExpected :any= {"count":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"count","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))'
		const modelExpected :any= {"category":"integer","largestPrice":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"integer"},{"name":"largestPrice","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const modelExpected :any= {"category":"string","largestPrice":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))'
		const modelExpected :any= {"name":"string","source":"decimal","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"decimal"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const modelExpected :any= {"category":"string","largestPrice":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 10', async () => {
		const expression = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		const modelExpected :any= {"category":"string","largestPrice":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('groupBy 11', async () => {
		const expression = 'Products.filter(p => p.price > 5).having(p => max(p.price) > 50).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		const modelExpected :any= {"category":"string","largestPrice":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
})
describe('Sentences', () => {
	test('groupBy 1', async () => {
		const expression = 'Products.map(p => ({ maxPrice: max(p.price) }))'
		const mariadbExpected = 'SELECT MAX(p.UnitPrice) AS `maxPrice` FROM Products p  '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT MAX(p.UnitPrice) AS [maxPrice] FROM Products p  '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT MAX(p.UnitPrice) AS `maxPrice` FROM Products p  '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT MAX(p.UnitPrice) AS "maxPrice" FROM Products p  '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT MAX(p.UnitPrice) AS "maxPrice" FROM Products p  '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p => ({ minPrice: min(p.price) }))'
		const mariadbExpected = 'SELECT MIN(p.UnitPrice) AS `minPrice` FROM Products p  '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT MIN(p.UnitPrice) AS [minPrice] FROM Products p  '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT MIN(p.UnitPrice) AS `minPrice` FROM Products p  '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT MIN(p.UnitPrice) AS "minPrice" FROM Products p  '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT MIN(p.UnitPrice) AS "minPrice" FROM Products p  '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p => ({ total: sum(p.price) }))'
		const mariadbExpected = 'SELECT SUM(p.UnitPrice) AS `total` FROM Products p  '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT SUM(p.UnitPrice) AS [total] FROM Products p  '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT SUM(p.UnitPrice) AS `total` FROM Products p  '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT SUM(p.UnitPrice) AS "total" FROM Products p  '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT SUM(p.UnitPrice) AS "total" FROM Products p  '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p => ({ average: avg(p.price) }))'
		const mariadbExpected = 'SELECT AVG(p.UnitPrice) AS `average` FROM Products p  '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT AVG(p.UnitPrice) AS [average] FROM Products p  '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT AVG(p.UnitPrice) AS `average` FROM Products p  '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT AVG(p.UnitPrice) AS "average" FROM Products p  '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT AVG(p.UnitPrice) AS "average" FROM Products p  '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p => ({ count: count(1) }))'
		const mariadbExpected = 'SELECT COUNT(1) AS `count` FROM Products p  '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT COUNT(1) AS [count] FROM Products p  '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT COUNT(1) AS `count` FROM Products p  '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT COUNT(1) AS "count" FROM Products p  '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT COUNT(1) AS "count" FROM Products p  '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))'
		const mariadbExpected = 'SELECT p.CategoryID AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p  GROUP BY p.CategoryID '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.CategoryID AS [category], MAX(p.UnitPrice) AS [largestPrice] FROM Products p  GROUP BY p.CategoryID '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.CategoryID AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p  GROUP BY p.CategoryID '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.CategoryID AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p  GROUP BY p.CategoryID '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.CategoryID AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p  GROUP BY p.CategoryID '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const mariadbExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT c.CategoryName AS [category], MAX(p.UnitPrice) AS [largestPrice] FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, p.UnitPrice AS `source`, ABS(p.UnitPrice) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], p.UnitPrice AS [source], ABS(p.UnitPrice) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, p.UnitPrice AS `source`, ABS(p.UnitPrice) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", p.UnitPrice AS "source", ABS(p.UnitPrice) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", p.UnitPrice AS "source", ABS(p.UnitPrice) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const mariadbExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT c.CategoryName AS [category], MAX(p.UnitPrice) AS [largestPrice] FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 10', async () => {
		const expression = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		const mariadbExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ORDER BY `largestPrice` desc '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT c.CategoryName AS [category], MAX(p.UnitPrice) AS [largestPrice] FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ORDER BY [largestPrice] desc '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ORDER BY `largestPrice` desc '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ORDER BY "largestPrice" desc '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ORDER BY "largestPrice" desc '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 11', async () => {
		const expression = 'Products.filter(p => p.price > 5).having(p => max(p.price) > 50).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		const mariadbExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.UnitPrice > 5 GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 50 ORDER BY `largestPrice` desc '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT c.CategoryName AS [category], MAX(p.UnitPrice) AS [largestPrice] FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.UnitPrice > 5 GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 50 ORDER BY [largestPrice] desc '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.UnitPrice > 5 GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 50 ORDER BY `largestPrice` desc '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.UnitPrice > 5 GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 50 ORDER BY "largestPrice" desc '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.UnitPrice > 5 GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 50 ORDER BY "largestPrice" desc '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
})