import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './northwind.env' })
	await orm.init('./northwind.yaml')
})
describe('Normalize Expression', () => {
	test('function abs', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price * -1, result: round(abs(p.price * -1), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:(p.price*-1),result:round(abs((p.price*-1)),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function acos', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(acos(0.25), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function asin', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(asin(0.25), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function atan', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(atan(0.25), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function atan2', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.50, result: round(atan2(0.25, 1), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function ceil', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 25.75, result: round(ceil(25.75), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function cos', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 2, result: round(cos(2), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:2,result:round(cos(2),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function exp', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 1, result: round(exp(1), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:1,result:round(exp(1),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function floor', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 25.75, result: round(floor(25.75), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function ln', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 2, result: round(ln(2), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:2,result:round(ln(2),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function log', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, m: 10, n: 20, result: round(log(10, 20), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function round', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
		const expected = 'Products.map(p=>{name:p.name,source:135.375,result:round(135.375,2)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function sign', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 255.5, result: round(sign(255.5), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function tan', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 1.75, result: round(tan(1.75), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function trunc', () => {
		const source = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 135.375, result: round(trunc(135.375, 2), 10) }))'
		const expected = 'Products.map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('function abs', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price * -1, result: round(abs(p.price * -1), 10) }))'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"number"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":38},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"number"}],"parameters":[{"name":"id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
	test('function acos', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(acos(0.25), 10) }))'
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
	test('function asin', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(asin(0.25), 10) }))'
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
	test('function atan', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(atan(0.25), 10) }))'
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
	test('function atan2', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.50, result: round(atan2(0.25, 1), 10) }))'
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
	test('function ceil', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 25.75, result: round(ceil(25.75), 10) }))'
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
	test('function cos', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 2, result: round(cos(2), 10) }))'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"integer"},{"name":"result","type":"number"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":38},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"name","type":"string"},{"name":"source","type":"integer"},{"name":"result","type":"number"}],"parameters":[{"name":"id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
	test('function exp', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 1, result: round(exp(1), 10) }))'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"integer"},{"name":"result","type":"number"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":38},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"name","type":"string"},{"name":"source","type":"integer"},{"name":"result","type":"number"}],"parameters":[{"name":"id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
	test('function floor', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 25.75, result: round(floor(25.75), 10) }))'
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
	test('function ln', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 2, result: round(ln(2), 10) }))'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"integer"},{"name":"result","type":"number"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":38},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"name","type":"string"},{"name":"source","type":"integer"},{"name":"result","type":"number"}],"parameters":[{"name":"id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
	test('function log', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, m: 10, n: 20, result: round(log(10, 20), 10) }))'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"m","type":"integer"},{"name":"n","type":"integer"},{"name":"result","type":"number"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":38},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"name","type":"string"},{"name":"m","type":"integer"},{"name":"n","type":"integer"},{"name":"result","type":"number"}],"parameters":[{"name":"id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
	test('function round', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
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
	test('function sign', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 255.5, result: round(sign(255.5), 10) }))'
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
	test('function tan', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 1.75, result: round(tan(1.75), 10) }))'
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
	test('function trunc', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 135.375, result: round(trunc(135.375, 2), 10) }))'
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
})
describe('Sentences', () => {
	test('function abs', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price * -1, result: round(abs(p.price * -1), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, (p.UnitPrice * -1) AS source, ROUND(ABS((p.UnitPrice * -1)),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", (p.UnitPrice * -1) AS \"source\", ROUND(CAST(ABS((p.UnitPrice * -1)) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, (p.UnitPrice * -1) AS source, ROUND(ABS((p.UnitPrice * -1)),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, (p.UnitPrice * -1) AS source, ROUND(ABS((p.UnitPrice * -1)),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function acos', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(acos(0.25), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ACOS(0.25),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 0.25 AS \"source\", ROUND(CAST(ACOS(0.25) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ACOS(0.25),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ACOS(0.25),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function asin', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(asin(0.25), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ASIN(0.25),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 0.25 AS \"source\", ROUND(CAST(ASIN(0.25) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ASIN(0.25),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ASIN(0.25),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function atan', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(atan(0.25), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ATAN(0.25),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 0.25 AS \"source\", ROUND(CAST(ATAN(0.25) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ATAN(0.25),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 0.25 AS source, ROUND(ATAN(0.25),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function atan2', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.50, result: round(atan2(0.25, 1), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 0.5 AS source, ROUND(ATAN(0.25,1),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 0.5 AS \"source\", ROUND(CAST(ATAN2(0.25,1) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 0.5 AS source, ROUND(ATAN(0.25,1),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 0.5 AS source, ROUND(ATN2(0.25,1),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function ceil', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 25.75, result: round(ceil(25.75), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 25.75 AS source, ROUND(CEIL(25.75),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 25.75 AS \"source\", ROUND(CAST(CEIL(25.75) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 25.75 AS source, ROUND(CEIL(25.75),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 25.75 AS source, ROUND(CEILING(25.75),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function cos', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 2, result: round(cos(2), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 2 AS source, ROUND(COS(2),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 2 AS \"source\", ROUND(CAST(COS(2) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 2 AS source, ROUND(COS(2),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 2 AS source, ROUND(COS(2),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function exp', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 1, result: round(exp(1), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 1 AS source, ROUND(EXP(1),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 1 AS \"source\", ROUND(CAST(EXP(1) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 1 AS source, ROUND(EXP(1),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 1 AS source, ROUND(EXP(1),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function floor', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 25.75, result: round(floor(25.75), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 25.75 AS source, ROUND(FLOOR(25.75),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 25.75 AS \"source\", ROUND(CAST(FLOOR(25.75) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 25.75 AS source, ROUND(FLOOR(25.75),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 25.75 AS source, ROUND(FLOOR(25.75),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function ln', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 2, result: round(ln(2), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 2 AS source, ROUND(LN(2),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 2 AS \"source\", ROUND(CAST(LN(2) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 2 AS source, ROUND(LN(2),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 2 AS source, ROUND(LOG(2),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function log', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, m: 10, n: 20, result: round(log(10, 20), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 10 AS m, 20 AS n, ROUND(LOG(10,20),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 10 AS \"m\", 20 AS \"n\", ROUND(CAST(LOG(10,20) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 10 AS m, 20 AS n, ROUND(LOG(10,20),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 10 AS m, 20 AS n, ROUND(LOG(20,10),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function round', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 135.375 AS source, ROUND(135.375,2) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 135.375 AS \"source\", ROUND(CAST(135.375 AS DECIMAL),2) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 135.375 AS source, ROUND(135.375,2) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 135.375 AS source, ROUND(135.375,2) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function sign', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 255.5, result: round(sign(255.5), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 255.5 AS source, ROUND(SIGN(255.5),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 255.5 AS \"source\", ROUND(CAST(SIGN(255.5) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 255.5 AS source, ROUND(SIGN(255.5),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 255.5 AS source, ROUND(SIGN(255.5),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function tan', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 1.75, result: round(tan(1.75), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 1.75 AS source, ROUND(TAN(1.75),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 1.75 AS \"source\", ROUND(CAST(TAN(1.75) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 1.75 AS source, ROUND(TAN(1.75),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 1.75 AS source, ROUND(TAN(1.75),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
	test('function trunc', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 135.375, result: round(trunc(135.375, 2), 10) }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, 135.375 AS source, ROUND(TRUNCATE(135.375,2),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", 135.375 AS \"source\", ROUND(CAST(TRUNC(135.375,2) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, 135.375 AS source, ROUND(TRUNCATE(135.375,2),10) AS result FROM Products p  WHERE p.ProductID = ? ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, 135.375 AS source, ROUND(ROUND(135.375,2,1),10) AS result FROM Products p  WHERE p.ProductID = @id ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
	})
})