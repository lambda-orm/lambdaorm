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
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":"*","classtype":"Operator","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"},{"name":-1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"abs","classtype":"FunctionRef","children":[{"name":"*","classtype":"Operator","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"},{"name":-1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"any"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":0.25,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"acos","classtype":"FunctionRef","children":[{"name":0.25,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":0.25,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"asin","classtype":"FunctionRef","children":[{"name":0.25,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":0.25,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"atan","classtype":"FunctionRef","children":[{"name":0.25,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":0.5,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"atan2","classtype":"FunctionRef","children":[{"name":0.25,"classtype":"Constant2","children":[],"type":"number"},{"name":1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":25.75,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"ceil","classtype":"FunctionRef","children":[{"name":25.75,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(cos(2),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":2,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"cos","classtype":"FunctionRef","children":[{"name":2,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1,result:round(exp(1),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"exp","classtype":"FunctionRef","children":[{"name":1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":25.75,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"floor","classtype":"FunctionRef","children":[{"name":25.75,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(ln(2),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":2,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"ln","classtype":"FunctionRef","children":[{"name":2,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"m","type":"number"},{"name":"n","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"m","classtype":"KeyValue","children":[{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"n","classtype":"KeyValue","children":[{"name":20,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"log","classtype":"FunctionRef","children":[{"name":10,"classtype":"Constant2","children":[],"type":"number"},{"name":20,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"m","type":"number"},{"name":"n","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":135.375,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":135.375,"classtype":"Constant2","children":[],"type":"number"},{"name":2,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":255.5,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"sign","classtype":"FunctionRef","children":[{"name":255.5,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":1.75,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"tan","classtype":"FunctionRef","children":[{"name":1.75,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":135.375,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"round","classtype":"FunctionRef","children":[{"name":"trunc","classtype":"FunctionRef","children":[{"name":135.375,"classtype":"Constant2","children":[],"type":"number"},{"name":2,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"},{"name":10,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"number"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:(p.price*-1),result:round(abs((p.price*-1)),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, (p.UnitPrice * -1) AS `source`, ROUND(ABS((p.UnitPrice * -1)),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", (p.UnitPrice * -1) AS \"source\", ROUND(CAST(ABS((p.UnitPrice * -1)) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, (p.UnitPrice * -1) AS `source`, ROUND(ABS((p.UnitPrice * -1)),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function acos', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(acos(0.25),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ACOS(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 0.25 AS \"source\", ROUND(CAST(ACOS(0.25) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ACOS(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function asin', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(asin(0.25),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ASIN(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 0.25 AS \"source\", ROUND(CAST(ASIN(0.25) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ASIN(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function atan', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.25,result:round(atan(0.25),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ATAN(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 0.25 AS \"source\", ROUND(CAST(ATAN(0.25) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 0.25 AS `source`, ROUND(ATAN(0.25),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function atan2', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:0.5,result:round(atan2(0.25,1),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 0.5 AS `source`, ROUND(ATAN(0.25,1),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 0.5 AS \"source\", ROUND(CAST(ATAN2(0.25,1) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 0.5 AS `source`, ROUND(ATAN(0.25,1),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function ceil', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(ceil(25.75),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 25.75 AS `source`, ROUND(CEIL(25.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 25.75 AS \"source\", ROUND(CAST(CEIL(25.75) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 25.75 AS `source`, ROUND(CEIL(25.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function cos', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(cos(2),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 2 AS `source`, ROUND(COS(2),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 2 AS \"source\", ROUND(CAST(COS(2) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 2 AS `source`, ROUND(COS(2),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function exp', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1,result:round(exp(1),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 1 AS `source`, ROUND(EXP(1),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 1 AS \"source\", ROUND(CAST(EXP(1) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 1 AS `source`, ROUND(EXP(1),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function floor', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:25.75,result:round(floor(25.75),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 25.75 AS `source`, ROUND(FLOOR(25.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 25.75 AS \"source\", ROUND(CAST(FLOOR(25.75) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 25.75 AS `source`, ROUND(FLOOR(25.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function ln', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:2,result:round(ln(2),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 2 AS `source`, ROUND(LN(2),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 2 AS \"source\", ROUND(CAST(LN(2) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 2 AS `source`, ROUND(LN(2),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function log', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,m:10,n:20,result:round(log(10,20),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 10 AS `m`, 20 AS `n`, ROUND(LOG(10,20),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 10 AS \"m\", 20 AS \"n\", ROUND(CAST(LOG(10,20) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 10 AS `m`, 20 AS `n`, ROUND(LOG(10,20),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function round', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(135.375,2) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 135.375 AS \"source\", ROUND(CAST(135.375 AS DECIMAL),2) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(135.375,2) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function sign', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:255.5,result:round(sign(255.5),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 255.5 AS `source`, ROUND(SIGN(255.5),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 255.5 AS \"source\", ROUND(CAST(SIGN(255.5) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 255.5 AS `source`, ROUND(SIGN(255.5),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function tan', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:1.75,result:round(tan(1.75),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 1.75 AS `source`, ROUND(TAN(1.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 1.75 AS \"source\", ROUND(CAST(TAN(1.75) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 1.75 AS `source`, ROUND(TAN(1.75),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('function trunc', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:135.375,result:round(trunc(135.375,2),10)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(TRUNCATE(135.375,2),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", 135.375 AS \"source\", ROUND(CAST(TRUNC(135.375,2) AS DECIMAL),10) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, 135.375 AS `source`, ROUND(TRUNCATE(135.375,2),10) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
})