import { orm, helper } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './northwind.env' })
	await orm.init('./northwind.yaml')
})
describe('Normalize Expression', () => {
	test('groupBy 1', () => {
		const source = 'Products.map(p => ({ maxPrice: max(p.price) }))'
		const expected = 'Products.map(p=>{maxPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 2', () => {
		const source = 'Products.map(p => ({ minPrice: min(p.price) }))'
		const expected = 'Products.map(p=>{minPrice:min(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 3', () => {
		const source = 'Products.map(p => ({ total: sum(p.price) }))'
		const expected = 'Products.map(p=>{total:sum(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 4', () => {
		const source = 'Products.map(p => ({ average: round(avg(p.price), 4) }))'
		const expected = 'Products.map(p=>{average:round(avg(p.price),4)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 5', () => {
		const source = 'Products.map(p => ({ count: count(1) }))'
		const expected = 'Products.map(p=>{count:count(1)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 6', () => {
		const source = 'Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))'
		const expected = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 7', () => {
		const source = 'Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const expected = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 8', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))'
		const expected = 'Products.map(p=>{name:p.name,source:p.price,result:abs(p.price)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 9', () => {
		const source = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const expected = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)}).having(p=>(max(p.price)>100))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 10', () => {
		const source = 'Orders.details.map(p => ({ subTotal: sum((p.unitPrice * p.quantity * (1 - p.discount / 100)) * 100) })).sort(p => p.subTotal)'
		const expected = 'Orders.details.map(p=>{subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>asc(p.subTotal))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('groupBy 1', async () => {
		const expression = 'Products.map(p => ({ maxPrice: max(p.price) }))'
		const modelExpected :any= [{"name":"maxPrice","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":13},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"maxPrice","type":"any"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p => ({ minPrice: min(p.price) }))'
		const modelExpected :any= [{"name":"minPrice","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":13},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"minPrice","type":"any"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p => ({ total: sum(p.price) }))'
		const modelExpected :any= [{"name":"total","type":"number"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":13},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"total","type":"number"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p => ({ average: round(avg(p.price), 4) }))'
		const modelExpected :any= [{"name":"average","type":"number"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":13},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"average","type":"number"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p => ({ count: count(1) }))'
		const modelExpected :any= [{"name":"count","type":"integer"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":13},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"count","type":"integer"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))'
		const modelExpected :any= [{"name":"category","type":"integer"},{"name":"largestPrice","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":13},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"category","type":"integer"},{"name":"largestPrice","type":"any"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":13},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"decimal"},{"name":"result","type":"number"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":38},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"name","type":"string"},{"name":"source","type":"decimal"},{"name":"result","type":"number"}],"parameters":[{"name":"id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":45},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"category","type":"string"},{"name":"largestPrice","type":"any"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('query 10', async () => {
		const expression = 'Orders.details.map(p => ({ subTotal: sum((p.unitPrice * p.quantity * (1 - p.discount / 100)) * 100) })).sort(p => p.subTotal)'
		const modelExpected :any= [{"name":"subTotal","type":"number"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":109},"name":"select","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"subTotal","type":"number"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders.details","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
})
describe('Sentences', () => {
	test('groupBy 1', async () => {
		const expression = 'Products.map(p => ({ maxPrice: max(p.price) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT MAX(p.UnitPrice) AS maxPrice FROM Products p  ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT MAX(p.UnitPrice) AS \"maxPrice\" FROM Products p  ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT MAX(p.UnitPrice) AS maxPrice FROM Products p  ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT MAX(p.UnitPrice) AS maxPrice FROM Products p  ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p => ({ minPrice: min(p.price) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT MIN(p.UnitPrice) AS minPrice FROM Products p  ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT MIN(p.UnitPrice) AS \"minPrice\" FROM Products p  ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT MIN(p.UnitPrice) AS minPrice FROM Products p  ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT MIN(p.UnitPrice) AS minPrice FROM Products p  ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p => ({ total: sum(p.price) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT SUM(p.UnitPrice) AS total FROM Products p  ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT SUM(p.UnitPrice) AS \"total\" FROM Products p  ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT SUM(p.UnitPrice) AS total FROM Products p  ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT SUM(p.UnitPrice) AS total FROM Products p  ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p => ({ average: round(avg(p.price), 4) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT ROUND(AVG(p.UnitPrice),4) AS average FROM Products p  ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT ROUND(CAST(AVG(p.UnitPrice) AS DECIMAL),4) AS \"average\" FROM Products p  ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT ROUND(AVG(p.UnitPrice),4) AS average FROM Products p  ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT ROUND(AVG(p.UnitPrice),4) AS average FROM Products p  ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p => ({ count: count(1) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT COUNT(1) AS count FROM Products p  ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT COUNT(1) AS \"count\" FROM Products p  ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT COUNT(1) AS count FROM Products p  ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT COUNT(1) AS count FROM Products p  ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.CategoryID AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p  GROUP BY p.CategoryID ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.CategoryID AS \"category\", MAX(p.UnitPrice) AS \"largestPrice\" FROM Products p  GROUP BY p.CategoryID ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.CategoryID AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p  GROUP BY p.CategoryID ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.CategoryID AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p  GROUP BY p.CategoryID ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT c.CategoryName AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT c.CategoryName AS \"category\", MAX(p.UnitPrice) AS \"largestPrice\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT c.CategoryName AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT c.CategoryName AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, p.UnitPrice AS source, ABS(p.UnitPrice) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", p.UnitPrice AS \"source\", ABS(p.UnitPrice) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, p.UnitPrice AS source, ABS(p.UnitPrice) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, p.UnitPrice AS source, ABS(p.UnitPrice) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT c.CategoryName AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT c.CategoryName AS \"category\", MAX(p.UnitPrice) AS \"largestPrice\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT c.CategoryName AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT c.CategoryName AS category, MAX(p.UnitPrice) AS largestPrice FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('query 10', async () => {
		const expression = 'Orders.details.map(p => ({ subTotal: sum((p.unitPrice * p.quantity * (1 - p.discount / 100)) * 100) })).sort(p => p.subTotal)'
		const MySQLExpected = {"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"SELECT SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS subTotal FROM `Order Details` o  ORDER BY subTotal asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS \"subTotal\" FROM \"Order Details\" o  ORDER BY \"subTotal\" asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS subTotal FROM `Order Details` o  ORDER BY subTotal asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS subTotal FROM [Order Details] o  ORDER BY subTotal asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
})