import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('function abs', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:(p.price*-1),result:round(abs((p.price*-1)),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:(p.price*-1),result:round(abs((p.price*-1)),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function acos', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function asin', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function atan', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function atan2', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function ceil', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function cos', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(cos(2),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(cos(2),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function exp', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1,result:round(exp(1),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1,result:round(exp(1),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function floor', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function ln', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(ln(2),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(ln(2),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function log', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function round', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function sign', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function tan', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('function trunc', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('function abs', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:(p.price*-1),result:round(abs((p.price*-1)),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":"*","type":"Operator","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":-1,"type":"Constant2","children":[]}]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"abs","type":"FunctionRef","children":[{"name":"*","type":"Operator","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":-1,"type":"Constant2","children":[]}]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function acos', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":0.25,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"acos","type":"FunctionRef","children":[{"name":0.25,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function asin', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":0.25,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"asin","type":"FunctionRef","children":[{"name":0.25,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function atan', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":0.25,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"atan","type":"FunctionRef","children":[{"name":0.25,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function atan2', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":0.5,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"atan2","type":"FunctionRef","children":[{"name":0.25,"type":"Constant2","children":[]},{"name":1,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function ceil', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":25.75,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"ceil","type":"FunctionRef","children":[{"name":25.75,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function cos', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(cos(2),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":2,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"cos","type":"FunctionRef","children":[{"name":2,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function exp', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1,result:round(exp(1),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":1,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"exp","type":"FunctionRef","children":[{"name":1,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function floor', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":25.75,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"floor","type":"FunctionRef","children":[{"name":25.75,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function ln', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(ln(2),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":2,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"ln","type":"FunctionRef","children":[{"name":2,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function log', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"m","type":"number"},{"name":"n","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"m","type":"KeyValue","children":[{"name":10,"type":"Constant2","children":[]}]},{"name":"n","type":"KeyValue","children":[{"name":20,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"log","type":"FunctionRef","children":[{"name":10,"type":"Constant2","children":[]},{"name":20,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"m","type":"number"},{"name":"n","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function round', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":135.375,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":135.375,"type":"Constant2","children":[]},{"name":2,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function sign', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":255.5,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"sign","type":"FunctionRef","children":[{"name":255.5,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function tan', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":1.75,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"tan","type":"FunctionRef","children":[{"name":1.75,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('function trunc', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":135.375,"type":"Constant2","children":[]}]},{"name":"result","type":"KeyValue","children":[{"name":"round","type":"FunctionRef","children":[{"name":"trunc","type":"FunctionRef","children":[{"name":135.375,"type":"Constant2","children":[]},{"name":2,"type":"Constant2","children":[]}]},{"name":10,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
})
describe('Sentences', () => {
	test('function abs', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:(p.price*-1),result:round(abs((p.price*-1)),10)})'
	})
	test('function acos', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)})'
	})
	test('function asin', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)})'
	})
	test('function atan', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)})'
	})
	test('function atan2', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)})'
	})
	test('function ceil', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)})'
	})
	test('function cos', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(cos(2),10)})'
	})
	test('function exp', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1,result:round(exp(1),10)})'
	})
	test('function floor', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)})'
	})
	test('function ln', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(ln(2),10)})'
	})
	test('function log', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)})'
	})
	test('function round', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
	})
	test('function sign', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)})'
	})
	test('function tan', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)})'
	})
	test('function trunc', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)})'
	})
})