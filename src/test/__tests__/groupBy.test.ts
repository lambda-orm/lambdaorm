import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('groupBy 1', () => {
		const source = 'Products.map(p=>{maxPrice:max(p.price)})'
		const expected = 'Products.map(p=>{maxPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 2', () => {
		const source = 'Products.map(p=>{minPrice:min(p.price)})'
		const expected = 'Products.map(p=>{minPrice:min(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 3', () => {
		const source = 'Products.map(p=>{total:sum(p.price)})'
		const expected = 'Products.map(p=>{total:sum(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 4', () => {
		const source = 'Products.map(p=>{average:avg(p.price)})'
		const expected = 'Products.map(p=>{average:avg(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 5', () => {
		const source = 'Products.map(p=>{count:count(1)})'
		const expected = 'Products.map(p=>{count:count(1)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 6', () => {
		const source = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const expected = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 7', () => {
		const source = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 8', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 9', () => {
		const source = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('groupBy 1', async () => {
		const expression = 'Products.map(p=>{maxPrice:max(p.price)})'
		const modelExpected :any= [{"name":"maxPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"maxPrice","type":"KeyValue","children":[{"name":"max","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]}],"fields":[{"name":"maxPrice","type":"decimal"}],"parameters":[],"entity":"Products"}
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
	test('groupBy 2', async () => {
		const expression = 'Products.map(p=>{minPrice:min(p.price)})'
		const modelExpected :any= [{"name":"minPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"minPrice","type":"KeyValue","children":[{"name":"min","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]}],"fields":[{"name":"minPrice","type":"decimal"}],"parameters":[],"entity":"Products"}
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
	test('groupBy 3', async () => {
		const expression = 'Products.map(p=>{total:sum(p.price)})'
		const modelExpected :any= [{"name":"total","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"total","type":"KeyValue","children":[{"name":"sum","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]}],"fields":[{"name":"total","type":"any"}],"parameters":[],"entity":"Products"}
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
	test('groupBy 4', async () => {
		const expression = 'Products.map(p=>{average:avg(p.price)})'
		const modelExpected :any= [{"name":"average","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"average","type":"KeyValue","children":[{"name":"avg","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]}],"fields":[{"name":"average","type":"any"}],"parameters":[],"entity":"Products"}
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
	test('groupBy 5', async () => {
		const expression = 'Products.map(p=>{count:count(1)})'
		const modelExpected :any= [{"name":"count","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"count","type":"KeyValue","children":[{"name":"count","type":"FunctionRef","children":[{"name":1,"type":"Constant2","children":[]}]}]}]}]}],"fields":[{"name":"count","type":"any"}],"parameters":[],"entity":"Products"}
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
	test('groupBy 6', async () => {
		const expression = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const modelExpected :any= [{"name":"category","type":"integer"},{"name":"largestPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"category","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"largestPrice","type":"KeyValue","children":[{"name":"max","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]},{"name":"groupBy","type":"GroupBy","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}],"fields":[{"name":"category","type":"integer"},{"name":"largestPrice","type":"decimal"}],"parameters":[],"entity":"Products"}
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
	test('groupBy 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"category","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]},{"name":"largestPrice","type":"KeyValue","children":[{"name":"max","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]},{"name":"groupBy","type":"GroupBy","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}],"parameters":[],"entity":"Products"}
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
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"decimal"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"source","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"result","type":"KeyValue","children":[{"name":"abs","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]}],"fields":[{"name":"name","type":"string"},{"name":"source","type":"decimal"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products"}
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
	test('groupBy 9', async () => {
		const expression = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"category","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]},{"name":"largestPrice","type":"KeyValue","children":[{"name":"max","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]},{"name":"groupBy","type":"GroupBy","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]},{"name":"having","type":"Having","children":[{"name":">","type":"Operator","children":[{"name":"max","type":"FunctionRef","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":100,"type":"Constant2","children":[]}]}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}],"parameters":[],"entity":"Products"}
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
	test('groupBy 1', async () => {
		const expression = 'Products.map(p=>{maxPrice:max(p.price)})'
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p=>{minPrice:min(p.price)})'
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p=>{total:sum(p.price)})'
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p=>{average:avg(p.price)})'
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p=>{count:count(1)})'
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
	})
})