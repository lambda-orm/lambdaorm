import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('query 1', () => {
		const source = 'Products'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 2', () => {
		const source = 'Products.map(p=>p).page(1,1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 3', () => {
		const source = 'Products.page(1,1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 4', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>p).sort(p=>p.id)'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>p.id)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 5', () => {
		const source = 'Products.filter(p=>(p.id===id)).sort(p=>p.id)'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>p.id)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 6', () => {
		const source = 'Products.map(p=>p.category.name)'
		const expected = 'Products.map(p=>{category_name:p.category.name})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 7', () => {
		const source = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>p.name)'
		const expected = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>p.name)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 8', () => {
		const source = 'Products.filter(p=>(p.discontinued!==false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const expected = 'Products.filter(p=>(p.discontinued!==false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 9', () => {
		const source = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const expected = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 10', () => {
		const source = 'OrderDetails.map(p=>{orderId:p.orderId,subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.orderId)'
		const expected = 'OrderDetails.map(p=>{orderId:p.orderId,subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.orderId)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 11', () => {
		const source = 'Products.page(1,1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 12', () => {
		const source = 'Products.first(p=>p)'
		const expected = 'Products.sort(p=>p.id).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 13', () => {
		const source = 'Products.last(p=>p)'
		const expected = 'Products.sort(p=>desc(p.id)).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 14', () => {
		const source = 'Products.take(p=>p)'
		const expected = 'Products.page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 15', () => {
		const source = 'Products.page(1,1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 16', () => {
		const source = 'Products.first(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const expected = 'Products.sort(p=>p.id).page(1,1).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 17', () => {
		const source = 'Products.filter(p=>(p.discontinued!==false)).last(p=>p)'
		const expected = 'Products.filter(p=>(p.discontinued!==false)).sort(p=>desc(p.id)).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 18', () => {
		const source = 'Products.distinct(p=>p)'
		const expected = 'Products.map(p=>distinct({id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 19', () => {
		const source = 'Products.distinct(p=>p.category.name)'
		const expected = 'Products.map(p=>distinct({category_name:p.category.name}))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 20', () => {
		const source = 'Products.distinct(p=>{quantity:p.quantity,category:p.category.name}).sort(p=>p.category)'
		const expected = 'Products.map(p=>distinct({quantity:p.quantity,category:p.category.name})).sort(p=>p.category)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 21', () => {
		const source = 'Products.distinct(p=>{category:p.category.name}).sort(p=>p.category)'
		const expected = 'Products.map(p=>distinct({category:p.category.name})).sort(p=>p.category)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('query 1', async () => {
		const expression = 'Products'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 2', async () => {
		const expression = 'Products.map(p=>p).page(1,1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"select","classtype":"Sentence","children":[{"name":"Products.p1","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p1"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p1"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p1"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]},{"name":1,"classtype":"Constant2","children":[],"type":"number"},{"name":1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 3', async () => {
		const expression = 'Products.page(1,1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"select","classtype":"Sentence","children":[{"name":"Products.p1","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p1"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p1"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p1"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]},{"name":1,"classtype":"Constant2","children":[],"type":"number"},{"name":1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 4', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>p).sort(p=>p.id)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
	test('query 5', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).sort(p=>p.id)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
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
	test('query 6', async () => {
		const expression = 'Products.map(p=>p.category.name)'
		const modelExpected :any= [{"name":"category_name","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category_name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category_name","type":"string"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>p.name)'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 8', async () => {
		const expression = 'Products.filter(p=>(p.discontinued!==false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"!==","classtype":"Operator","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"},{"name":false,"classtype":"Constant2","children":[],"type":"boolean"}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"array","classtype":"List","children":[{"name":"category","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"},{"name":"desc","classtype":"FunctionRef","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"}],"type":"array"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 9', async () => {
		const expression = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"product","type":"string"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"}]
		const parametersExpected:any = [{"name":"from","type":"datetime"},{"name":"to","type":"datetime"},{"name":"minValue","type":"decimal"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"&&","classtype":"Operator","children":[{"name":"between","classtype":"FunctionRef","children":[{"name":"shippedDate","classtype":"Field","children":[],"type":"datetime","entity":"Orders","alias":"o1"},{"name":"from","classtype":"Variable","children":[],"type":"datetime","number":1},{"name":"to","classtype":"Variable","children":[],"type":"datetime","number":2}],"type":"any"},{"name":">","classtype":"Operator","children":[{"name":"unitPrice","classtype":"Field","children":[],"type":"decimal","entity":"OrderDetails","alias":"o"},{"name":"minValue","classtype":"Variable","children":[],"type":"decimal","number":3}],"type":"any"}],"type":"any"}],"type":"any"},{"name":"OrderDetails.o","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"},{"name":"product","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"unitPrice","classtype":"KeyValue","children":[{"name":"unitPrice","classtype":"Field","children":[],"type":"decimal","entity":"OrderDetails","alias":"o"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"decimal","entity":"OrderDetails","alias":"o"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"array","classtype":"List","children":[{"name":"category","classtype":"Field","children":[],"type":"string","entity":"OrderDetails","alias":"o"},{"name":"product","classtype":"Field","children":[],"type":"string","entity":"OrderDetails","alias":"o"}],"type":"array"}],"type":"any"},{"name":"Orders.o1","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Orders","alias":"o1"},{"name":"orderId","classtype":"Field","children":[],"type":"integer","entity":"OrderDetails","alias":"o"}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"productId","classtype":"Field","children":[],"type":"integer","entity":"OrderDetails","alias":"o"}],"type":"any"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category","type":"string"},{"name":"product","type":"string"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"}],"parameters":[{"name":"from","type":"datetime"},{"name":"to","type":"datetime"},{"name":"minValue","type":"decimal"}],"entity":"OrderDetails","constraints":[]}
		const constraintsExpected :any= {"entity":"OrderDetails","constraints":[]}
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
		const expression = 'OrderDetails.map(p=>{orderId:p.orderId,subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.orderId)'
		const modelExpected :any= [{"name":"orderId","type":"integer"},{"name":"subTotal","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"OrderDetails.o","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"orderId","classtype":"KeyValue","children":[{"name":"orderId","classtype":"Field","children":[],"type":"integer","entity":"OrderDetails","alias":"o"}],"type":"any"},{"name":"subTotal","classtype":"KeyValue","children":[{"name":"sum","classtype":"FunctionRef","children":[{"name":"*","classtype":"Operator","children":[{"name":"*","classtype":"Operator","children":[{"name":"*","classtype":"Operator","children":[{"name":"unitPrice","classtype":"Field","children":[],"type":"decimal","entity":"OrderDetails","alias":"o"},{"name":"quantity","classtype":"Field","children":[],"type":"decimal","entity":"OrderDetails","alias":"o"}],"type":"any"},{"name":"-","classtype":"Operator","children":[{"name":1,"classtype":"Constant2","children":[],"type":"number"},{"name":"/","classtype":"Operator","children":[{"name":"discount","classtype":"Field","children":[],"type":"decimal","entity":"OrderDetails","alias":"o"},{"name":100,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"any"},{"name":100,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"groupBy","classtype":"GroupBy","children":[{"name":"orderId","classtype":"Field","children":[],"type":"integer","entity":"OrderDetails","alias":"o"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"orderId","classtype":"Field","children":[],"type":"integer","entity":"OrderDetails","alias":"o"}],"type":"any"}],"type":"any","columns":[{"name":"orderId","type":"integer"},{"name":"subTotal","type":"any"}],"parameters":[],"entity":"OrderDetails","constraints":[]}
		const constraintsExpected :any= {"entity":"OrderDetails","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('query 11', async () => {
		const expression = 'Products.page(1,1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"select","classtype":"Sentence","children":[{"name":"Products.p1","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p1"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p1"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p1"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]},{"name":1,"classtype":"Constant2","children":[],"type":"number"},{"name":1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 12', async () => {
		const expression = 'Products.first(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"","classtype":"Sentence","children":[{"name":"Products.p1","classtype":"From","children":[],"type":"any"}],"type":"any","columns":[],"parameters":[],"entity":"Products","constraints":[]},{"name":"1","classtype":"Constant2","children":[],"type":"string"},{"name":"1","classtype":"Constant2","children":[],"type":"string"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 13', async () => {
		const expression = 'Products.last(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"desc","classtype":"FunctionRef","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"","classtype":"Sentence","children":[{"name":"Products.p1","classtype":"From","children":[],"type":"any"}],"type":"any","columns":[],"parameters":[],"entity":"Products","constraints":[]},{"name":"1","classtype":"Constant2","children":[],"type":"string"},{"name":"1","classtype":"Constant2","children":[],"type":"string"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 14', async () => {
		const expression = 'Products.take(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"Products","classtype":"Variable","children":[],"type":"any"},{"name":"1","classtype":"Constant2","children":[],"type":"string"},{"name":"1","classtype":"Constant2","children":[],"type":"string"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 15', async () => {
		const expression = 'Products.page(1,1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"select","classtype":"Sentence","children":[{"name":"Products.p1","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p1"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p1"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p1"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p1"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p1"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]},{"name":1,"classtype":"Constant2","children":[],"type":"number"},{"name":1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 16', async () => {
		const expression = 'Products.first(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"","classtype":"Sentence","children":[{"name":"Products.p1","classtype":"From","children":[],"type":"any"}],"type":"any","columns":[],"parameters":[],"entity":"Products","constraints":[]},{"name":"1","classtype":"Constant2","children":[],"type":"string"},{"name":"1","classtype":"Constant2","children":[],"type":"string"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 17', async () => {
		const expression = 'Products.filter(p=>(p.discontinued!==false)).last(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"!==","classtype":"Operator","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"},{"name":false,"classtype":"Constant2","children":[],"type":"boolean"}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"desc","classtype":"FunctionRef","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"},{"name":"page","classtype":"Page","children":[{"name":"","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"!==","classtype":"Operator","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p1"},{"name":false,"classtype":"Constant2","children":[],"type":"boolean"}],"type":"any"}],"type":"any"},{"name":"Products.p1","classtype":"From","children":[],"type":"any"}],"type":"any","columns":[],"parameters":[],"entity":"Products","constraints":[]},{"name":"1","classtype":"Constant2","children":[],"type":"string"},{"name":"1","classtype":"Constant2","children":[],"type":"string"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 18', async () => {
		const expression = 'Products.distinct(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"distinct","classtype":"FunctionRef","children":[{"name":"obj","classtype":"Obj","children":[{"name":"id","classtype":"KeyValue","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"supplierId","classtype":"KeyValue","children":[{"name":"supplierId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"categoryId","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"price","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"inStock","classtype":"KeyValue","children":[{"name":"inStock","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"onOrder","classtype":"KeyValue","children":[{"name":"onOrder","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"reorderLevel","classtype":"KeyValue","children":[{"name":"reorderLevel","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"discontinued","classtype":"KeyValue","children":[{"name":"discontinued","classtype":"Field","children":[],"type":"boolean","entity":"Products","alias":"p"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 19', async () => {
		const expression = 'Products.distinct(p=>p.category.name)'
		const modelExpected :any= [{"name":"category_name","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"distinct","classtype":"FunctionRef","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category_name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category_name","type":"string"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 20', async () => {
		const expression = 'Products.distinct(p=>{quantity:p.quantity,category:p.category.name}).sort(p=>p.category)'
		const modelExpected :any= [{"name":"quantity","type":"string"},{"name":"category","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"distinct","classtype":"FunctionRef","children":[{"name":"obj","classtype":"Obj","children":[{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"category","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"category","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"quantity","type":"string"},{"name":"category","type":"string"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 21', async () => {
		const expression = 'Products.distinct(p=>{category:p.category.name}).sort(p=>p.category)'
		const modelExpected :any= [{"name":"category","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"distinct","classtype":"FunctionRef","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any"},{"name":"sort","classtype":"Sort","children":[{"name":"category","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category","type":"string"}],"parameters":[],"entity":"Products","constraints":[]}
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
	test('query 1', async () => {
		const expression = 'Products'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 2', async () => {
		const expression = 'Products.map(p=>p).page(1,1)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p   OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 3', async () => {
		const expression = 'Products.page(1,1)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p   OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 4', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>p).sort(p=>p.id)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.ProductID = $1 ORDER BY p.ProductID ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 5', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).sort(p=>p.id)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.ProductID = $1 ORDER BY p.ProductID ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 6', async () => {
		const expression = 'Products.map(p=>p.category.name)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category_name` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category_name\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT c.CategoryName AS `category_name` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>p.name)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 8', async () => {
		const expression = 'Products.filter(p=>(p.discontinued!==false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> FALSE ORDER BY category, p.ProductName desc ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> FALSE ORDER BY category, p.ProductName desc ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> FALSE ORDER BY category, p.ProductName desc ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 9', async () => {
		const expression = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const mysqlExpected = {"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `product`, o.UnitPrice AS `unitPrice`, o.Quantity AS `quantity` FROM `Order Details` o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN ? AND ? AND o.UnitPrice > ?) ORDER BY category, product ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"product\", o.UnitPrice AS \"unitPrice\", o.Quantity AS \"quantity\" FROM \"Order Details\" o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN $1 AND $2 AND o.UnitPrice > $3) ORDER BY category, product ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"OrderDetails","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `product`, o.UnitPrice AS `unitPrice`, o.Quantity AS `quantity` FROM `Order Details` o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN ? AND ? AND o.UnitPrice > ?) ORDER BY category, product ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 10', async () => {
		const expression = 'OrderDetails.map(p=>{orderId:p.orderId,subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.orderId)'
		const mysqlExpected = {"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"SELECT o.OrderID AS `orderId`, SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS `subTotal` FROM `Order Details` o  GROUP BY o.OrderID ORDER BY o.OrderID ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"SELECT o.OrderID AS \"orderId\", SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS \"subTotal\" FROM \"Order Details\" o  GROUP BY o.OrderID ORDER BY o.OrderID ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"OrderDetails","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT o.OrderID AS `orderId`, SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS `subTotal` FROM `Order Details` o  GROUP BY o.OrderID ORDER BY o.OrderID ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 11', async () => {
		const expression = 'Products.page(1,1)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p   OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 12', async () => {
		const expression = 'Products.first(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ORDER BY p.ProductID  LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID  OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ORDER BY p.ProductID  LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 13', async () => {
		const expression = 'Products.last(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ORDER BY p.ProductID desc  LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID desc  OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ORDER BY p.ProductID desc  LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 14', async () => {
		const expression = 'Products.take(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p   OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 15', async () => {
		const expression = 'Products.page(1,1)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p   OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p   LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 16', async () => {
		const expression = 'Products.first(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductID  LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductID  OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductID  LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 17', async () => {
		const expression = 'Products.filter(p=>(p.discontinued!==false)).last(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.Discontinued <> FALSE ORDER BY p.ProductID desc  LIMIT 0,1 ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.Discontinued <> FALSE ORDER BY p.ProductID desc  OFFSET 0 LIMIT 1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.Discontinued <> FALSE ORDER BY p.ProductID desc  LIMIT 0,1 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 18', async () => {
		const expression = 'Products.distinct(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT DISTINCT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT DISTINCT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT DISTINCT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 19', async () => {
		const expression = 'Products.distinct(p=>p.category.name)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT DISTINCT c.CategoryName AS `category_name` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT DISTINCT c.CategoryName AS \"category_name\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT DISTINCT c.CategoryName AS `category_name` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 20', async () => {
		const expression = 'Products.distinct(p=>{quantity:p.quantity,category:p.category.name}).sort(p=>p.category)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT DISTINCT p.QuantityPerUnit AS `quantity`, c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT DISTINCT p.QuantityPerUnit AS \"quantity\", c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT DISTINCT p.QuantityPerUnit AS `quantity`, c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('query 21', async () => {
		const expression = 'Products.distinct(p=>{category:p.category.name}).sort(p=>p.category)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT DISTINCT c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let mysql = orm.sentence(expression,'default','MySQL')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT DISTINCT c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let postgres = orm.sentence(expression,'default','PostgreSQL')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT DISTINCT c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let mariadb = orm.sentence(expression,'default','MariaDB')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
})