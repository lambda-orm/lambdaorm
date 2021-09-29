import { orm,Helper } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})
describe('Complete Expression', () => {
	test('function abs', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price * -1, result: round(abs(p.price * -1), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:(p.price*-1),result:round(abs((p.price*-1)),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function acos', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(acos(0.25), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function asin', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(asin(0.25), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function atan', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(atan(0.25), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function atan2', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.50, result: round(atan2(0.25, 1), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function ceil', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: round(ceil(25.75), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function cos', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: round(cos(2), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:2,result:round(cos(2),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function exp', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1, result: round(exp(1), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:1,result:round(exp(1),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function floor', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: round(floor(25.75), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function ln', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: round(ln(2), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:2,result:round(ln(2),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function log', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, m: 10, n: 20, result: round(log(10, 20), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)})'
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
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 255.5, result: round(sign(255.5), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function tan', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1.75, result: round(tan(1.75), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
	test('function trunc', () => {
		const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(trunc(135.375, 2), 10) }))'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('function abs', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price * -1, result: round(abs(p.price * -1), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function acos', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(acos(0.25), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function asin', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(asin(0.25), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function atan', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(atan(0.25), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function atan2', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.50, result: round(atan2(0.25, 1), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function ceil', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: round(ceil(25.75), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function cos', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: round(cos(2), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function exp', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1, result: round(exp(1), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function floor', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: round(floor(25.75), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function ln', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: round(ln(2), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function log', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, m: 10, n: 20, result: round(log(10, 20), 10) }))'
		const modelExpected :any= {"name":"string","m":"any","n":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"m","type":"any"},{"name":"n","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function round', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function sign', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 255.5, result: round(sign(255.5), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function tan', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1.75, result: round(tan(1.75), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
	test('function trunc', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(trunc(135.375, 2), 10) }))'
		const modelExpected :any= {"name":"string","source":"any","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const model = await orm.expression(expression).model('northwind:0.0.2')
		const serialize = await orm.expression(expression).serialize('northwind:0.0.2')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(serialize.f)
	})
})
describe('Sentences', () => {
	test('function abs', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price * -1, result: round(abs(p.price * -1), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, (p.UnitPrice * -1) AS `source`, ROUND(ABS((p.UnitPrice * -1)),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], (p.UnitPrice * -1) AS [source], ROUND(ABS((p.UnitPrice * -1)),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, (p.UnitPrice * -1) AS `source`, ROUND(ABS((p.UnitPrice * -1)),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", (p.UnitPrice * -1) AS "source", ROUND(ABS((p.UnitPrice * -1)),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", (p.UnitPrice * -1) AS "source", ROUND(CAST(ABS((p.UnitPrice * -1)) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function acos', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(acos(0.25), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ACOS(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 0.25 AS [source], ROUND(ACOS(0.25),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ACOS(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ROUND(ACOS(0.25),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ROUND(CAST(ACOS(0.25) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function asin', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(asin(0.25), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ASIN(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 0.25 AS [source], ROUND(ASIN(0.25),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ASIN(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ROUND(ASIN(0.25),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ROUND(CAST(ASIN(0.25) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function atan', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: round(atan(0.25), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ATAN(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 0.25 AS [source], ROUND(ATAN(0.25),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ATAN(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ROUND(ATAN(0.25),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 0.25 AS "source", ROUND(CAST(ATAN(0.25) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function atan2', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.50, result: round(atan2(0.25, 1), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 0.5 AS `source`, ROUND(ATAN(0.25,1),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 0.5 AS [source], ROUND(ATAN2(0.25,1),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 0.5 AS `source`, ROUND(ATAN(0.25,1),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 0.5 AS "source", ROUND(ATAN2(0.25,1),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 0.5 AS "source", ROUND(CAST(ATAN2(0.25,1) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function ceil', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: round(ceil(25.75), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 25.75 AS `source`, ROUND(CEIL(25.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 25.75 AS [source], ROUND(CEIL(25.75),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 25.75 AS `source`, ROUND(CEIL(25.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 25.75 AS "source", ROUND(CEIL(25.75),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 25.75 AS "source", ROUND(CAST(CEIL(25.75) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function cos', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: round(cos(2), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 2 AS `source`, ROUND(COS(2),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 2 AS [source], ROUND(COS(2),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 2 AS `source`, ROUND(COS(2),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 2 AS "source", ROUND(COS(2),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 2 AS "source", ROUND(CAST(COS(2) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function exp', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1, result: round(exp(1), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 1 AS `source`, ROUND(EXP(1),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 1 AS [source], ROUND(EXP(1),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 1 AS `source`, ROUND(EXP(1),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 1 AS "source", ROUND(EXP(1),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 1 AS "source", ROUND(CAST(EXP(1) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function floor', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: round(floor(25.75), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 25.75 AS `source`, ROUND(FLOOR(25.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 25.75 AS [source], ROUND(FLOOR(25.75),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 25.75 AS `source`, ROUND(FLOOR(25.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 25.75 AS "source", ROUND(FLOOR(25.75),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 25.75 AS "source", ROUND(CAST(FLOOR(25.75) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function ln', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: round(ln(2), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 2 AS `source`, ROUND(LN(2),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 2 AS [source], ROUND(LN(2),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 2 AS `source`, ROUND(LN(2),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 2 AS "source", ROUND(LN(2),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 2 AS "source", ROUND(CAST(LN(2) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function log', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, m: 10, n: 20, result: round(log(10, 20), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 10 AS `m`, 20 AS `n`, ROUND(LOG(10,20),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 10 AS [m], 20 AS [n], ROUND(LOG(10,20),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 10 AS `m`, 20 AS `n`, ROUND(LOG(10,20),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 10 AS "m", 20 AS "n", ROUND(LOG(10,20),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 10 AS "m", 20 AS "n", ROUND(CAST(LOG(10,20) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function round', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(135.375,2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 135.375 AS [source], ROUND(135.375,2) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(135.375,2) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 135.375 AS "source", ROUND(135.375,2) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 135.375 AS "source", ROUND(CAST(135.375 AS DECIMAL),2) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function sign', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 255.5, result: round(sign(255.5), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 255.5 AS `source`, ROUND(SIGN(255.5),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 255.5 AS [source], ROUND(SIGN(255.5),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 255.5 AS `source`, ROUND(SIGN(255.5),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 255.5 AS "source", ROUND(SIGN(255.5),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 255.5 AS "source", ROUND(CAST(SIGN(255.5) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function tan', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1.75, result: round(tan(1.75), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 1.75 AS `source`, ROUND(TAN(1.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 1.75 AS [source], ROUND(TAN(1.75),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 1.75 AS `source`, ROUND(TAN(1.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 1.75 AS "source", ROUND(TAN(1.75),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 1.75 AS "source", ROUND(CAST(TAN(1.75) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('function trunc', async () => {
		const expression = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(trunc(135.375, 2), 10) }))'
		const mariadbExpected = 'SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(TRUNCATE(135.375,2),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind:0.0.2')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'SELECT p.ProductName AS [name], 135.375 AS [source], ROUND(TRUNC(135.375,2),10) AS [result] FROM Products p  WHERE p.ProductID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind:0.0.2')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(TRUNCATE(135.375,2),10) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind:0.0.2')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'SELECT p.ProductName AS "name", 135.375 AS "source", ROUND(TRUNC(135.375,2),10) AS "result" FROM Products p  WHERE p.ProductID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind:0.0.2')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'SELECT p.ProductName AS "name", 135.375 AS "source", ROUND(CAST(TRUNC(135.375,2) AS DECIMAL),10) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind:0.0.2')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
})