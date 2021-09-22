import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})
describe('Complete Expression', () => {
	test('function abs', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price * -1, result: abs(p.price * -1) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:(p.price*-1),result:abs((p.price*-1))})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function acos', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: acos(0.25) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:acos(0.25)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function asin', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: asin(0.25) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:asin(0.25)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function atan', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: atan(0.25) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:atan(0.25)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function atan2', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.50, result: atan2(0.25, 1) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.5,result:atan2(0.25,1)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function ceil', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: ceil(25.75) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:25.75,result:ceil(25.75)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function cos', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: cos(2) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:2,result:cos(2)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function exp', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1, result: exp(1) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:1,result:exp(1)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function floor', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: floor(25.75) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:25.75,result:floor(25.75)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function ln', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: ln(2) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:2,result:ln(2)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function log', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, m: 10, n: 20, result: log(10, 20) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,m:10,n:20,result:log(10,20)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function round', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function sign', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 255.5, result: sign(255.5) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:255.5,result:sign(255.5)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function tan', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1.75, result: tan(1.75) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:1.75,result:tan(1.75)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function trunc', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: trunc(135.375, 2) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:135.375,result:trunc(135.375,2)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('function abs', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price * -1, result: abs(p.price * -1) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function acos', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: acos(0.25) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function asin', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: asin(0.25) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function atan', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: atan(0.25) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function atan2', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.50, result: atan2(0.25, 1) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function ceil', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: ceil(25.75) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function cos', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: cos(2) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function exp', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1, result: exp(1) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function floor', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: floor(25.75) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function ln', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: ln(2) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function log', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, m: 10, n: 20, result: log(10, 20) }))'
		const modelExpected :any= {"name":"string","m":"any","n":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"m","type":"any"},{"name":"n","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function round', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function sign', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 255.5, result: sign(255.5) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function tan', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1.75, result: tan(1.75) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
	test('function trunc', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: trunc(135.375, 2) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
		expect(parametersExpected).toStrictEqual(serialize.p)
	})
})
describe('Sentences', () => {
	test('function abs', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price * -1, result: abs(p.price * -1) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, (p.UnitPrice * -1) AS `source`, ABS((p.UnitPrice * -1)) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], (p.UnitPrice * -1) AS [source], ABS((p.UnitPrice * -1)) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, (p.UnitPrice * -1) AS `source`, ABS((p.UnitPrice * -1)) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", (p.UnitPrice * -1) AS "source", ABS((p.UnitPrice * -1)) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", (p.UnitPrice * -1) AS "source", ABS((p.UnitPrice * -1)) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function acos', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: acos(0.25) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ACOS(0.25) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 0.25 AS [source], ACOS(0.25) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ACOS(0.25) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ACOS(0.25) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ACOS(0.25) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function asin', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: asin(0.25) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ASIN(0.25) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 0.25 AS [source], ASIN(0.25) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ASIN(0.25) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ASIN(0.25) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ASIN(0.25) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function atan', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: atan(0.25) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ATAN(0.25) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 0.25 AS [source], ATAN(0.25) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ATAN(0.25) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ATAN(0.25) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ATAN(0.25) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function atan2', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.50, result: atan2(0.25, 1) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 0.5 AS `source`, ATAN(0.25,1) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 0.5 AS [source], ATAN2(0.25,1) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 0.5 AS `source`, ATAN(0.25,1) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 0.5 AS "source", ATAN2(0.25,1) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 0.5 AS "source", ATAN2(0.25,1) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function ceil', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: ceil(25.75) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 25.75 AS `source`, CEIL(25.75) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 25.75 AS [source], CEIL(25.75) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 25.75 AS `source`, CEIL(25.75) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 25.75 AS "source", CEIL(25.75) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 25.75 AS "source", CEIL(25.75) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function cos', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: cos(2) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 2 AS `source`, COS(2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 2 AS [source], COS(2) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 2 AS `source`, COS(2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 2 AS "source", COS(2) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 2 AS "source", COS(2) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function exp', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1, result: exp(1) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 1 AS `source`, EXP(1) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 1 AS [source], EXP(1) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 1 AS `source`, EXP(1) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 1 AS "source", EXP(1) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 1 AS "source", EXP(1) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function floor', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: floor(25.75) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 25.75 AS `source`, FLOOR(25.75) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 25.75 AS [source], FLOOR(25.75) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 25.75 AS `source`, FLOOR(25.75) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 25.75 AS "source", FLOOR(25.75) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 25.75 AS "source", FLOOR(25.75) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function ln', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: ln(2) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 2 AS `source`, LN(2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 2 AS [source], LN(2) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 2 AS `source`, LN(2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 2 AS "source", LN(2) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 2 AS "source", LN(2) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function log', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, m: 10, n: 20, result: log(10, 20) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 10 AS `m`, 20 AS `n`, LOG(10,20) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 10 AS [m], 20 AS [n], LOG(10,20) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 10 AS `m`, 20 AS `n`, LOG(10,20) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 10 AS "m", 20 AS "n", LOG(10,20) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 10 AS "m", 20 AS "n", LOG(10,20) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function round', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(135.375,2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 135.375 AS [source], ROUND(135.375,2) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(135.375,2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 135.375 AS "source", ROUND(135.375,2) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 135.375 AS "source", ROUND(135.375,2) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function sign', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 255.5, result: sign(255.5) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 255.5 AS `source`, SIGN(255.5) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 255.5 AS [source], SIGN(255.5) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 255.5 AS `source`, SIGN(255.5) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 255.5 AS "source", SIGN(255.5) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 255.5 AS "source", SIGN(255.5) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function tan', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1.75, result: tan(1.75) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 1.75 AS `source`, TAN(1.75) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 1.75 AS [source], TAN(1.75) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 1.75 AS `source`, TAN(1.75) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 1.75 AS "source", TAN(1.75) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 1.75 AS "source", TAN(1.75) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
	test('function trunc', async () => {
		const expression = ' Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: trunc(135.375, 2) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 135.375 AS `source`, TRUNCATE(135.375,2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 135.375 AS [source], TRUNC(135.375,2) AS [result] FROM Products p  WHERE p.ProductID = :id '
		const mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 135.375 AS `source`, TRUNCATE(135.375,2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		const mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 135.375 AS "source", TRUNC(135.375,2) AS "result" FROM Products p  WHERE p.ProductID = :id '
		const oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 135.375 AS "source", TRUNC(135.375,2) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		const postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		expect(postgresExpected).toBe(postgres)
	})
})