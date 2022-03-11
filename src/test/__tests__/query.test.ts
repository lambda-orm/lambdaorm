import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('query 1', () => {
		const source = 'Products'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 2', () => {
		const source = 'Products.map(p=>p).page(1,1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 3', () => {
		const source = 'Products.page(1,1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 4', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>p).sort(p=>p.id)'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>p.id)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 5', () => {
		const source = 'Products.filter(p=>(p.id===id)).sort(p=>p.id)'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>p.id)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 6', () => {
		const source = 'Products.map(p=>p.category.name)'
		const expected = 'Products.map(p=>{category_name:p.category.name})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 7', () => {
		const source = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>p.name)'
		const expected = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>p.name)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 8', () => {
		const source = 'Products.filter(p=>(p.discontinued!==false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const expected = 'Products.filter(p=>(p.discontinued!==false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 9', () => {
		const source = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const expected = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 10', () => {
		const source = 'OrderDetails.map(p=>{orderId:p.orderId,subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.orderId)'
		const expected = 'OrderDetails.map(p=>{orderId:p.orderId,subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.orderId)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 11', () => {
		const source = 'Products.page(1,1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 12', () => {
		const source = 'Products.first(p=>p)'
		const expected = 'Products.sort(p=>p.id).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 13', () => {
		const source = 'Products.last(p=>p)'
		const expected = 'Products.sort(p=>desc(p.id)).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 14', () => {
		const source = 'Products.take(p=>p)'
		const expected = 'Products.page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 15', () => {
		const source = 'Products.page(1,1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 16', () => {
		const source = 'Products.first(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const expected = 'Products.sort(p=>p.id).page(1,1).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 17', () => {
		const source = 'Products.filter(p=>(p.discontinued!==false)).last(p=>p)'
		const expected = 'Products.filter(p=>(p.discontinued!==false)).sort(p=>desc(p.id)).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 18', () => {
		const source = 'Products.distinct(p=>p)'
		const expected = 'Products.map(p=>distinct({id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 19', () => {
		const source = 'Products.distinct(p=>p.category.name)'
		const expected = 'Products.map(p=>distinct({category_name:p.category.name}))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 20', () => {
		const source = 'Products.distinct(p=>{quantity:p.quantity,category:p.category.name}).sort(p=>p.category)'
		const expected = 'Products.map(p=>distinct({quantity:p.quantity,category:p.category.name})).sort(p=>p.category)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('query 21', () => {
		const source = 'Products.distinct(p=>{category:p.category.name}).sort(p=>p.category)'
		const expected = 'Products.map(p=>distinct({category:p.category.name})).sort(p=>p.category)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('query 1', async () => {
		const expression = 'Products'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 2', async () => {
		const expression = 'Products.map(p=>p).page(1,1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"page","type":"Page","children":[{"name":"select","type":"Sentence","children":[{"name":"Products.p1","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p1"}]}]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"},{"name":1,"type":"Constant2","children":[]},{"name":1,"type":"Constant2","children":[]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 3', async () => {
		const expression = 'Products.page(1,1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"page","type":"Page","children":[{"name":"select","type":"Sentence","children":[{"name":"Products.p1","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p1"}]}]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"},{"name":1,"type":"Constant2","children":[]},{"name":1,"type":"Constant2","children":[]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 4', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>p).sort(p=>p.id)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[{"name":"id","type":"integer","value":1}],"entity":"Products"}
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
	test('query 5', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).sort(p=>p.id)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[{"name":"id","type":"integer","value":1}],"entity":"Products"}
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
	test('query 6', async () => {
		const expression = 'Products.map(p=>p.category.name)'
		const modelExpected :any= [{"name":"category_name","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"category_name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]}]}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category_name","type":"string"}],"parameters":[],"entity":"Products"}
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
	test('query 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>p.name)'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"category","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"entity":"Products"}
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
	test('query 8', async () => {
		const expression = 'Products.filter(p=>(p.discontinued!==false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"!==","type":"Operator","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":false,"type":"Constant2","children":[]}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"category","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"array","type":"List","children":[{"name":"category","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"desc","type":"FunctionRef","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"entity":"Products"}
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
	test('query 9', async () => {
		const expression = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"product","type":"string"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"}]
		const parametersExpected:any = [{"name":"from","type":"datetime"},{"name":"to","type":"datetime"},{"name":"minValue","type":"decimal"}]
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"&&","type":"Operator","children":[{"name":"between","type":"FunctionRef","children":[{"name":"shippedDate","type":"Field","children":[],"entity":"Orders","alias":"o1"},{"name":"from","type":"Variable","children":[],"number":1},{"name":"to","type":"Variable","children":[],"number":2}]},{"name":">","type":"Operator","children":[{"name":"unitPrice","type":"Field","children":[],"entity":"OrderDetails","alias":"o"},{"name":"minValue","type":"Variable","children":[],"number":3}]}]}]},{"name":"OrderDetails.o","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"category","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]},{"name":"product","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"unitPrice","type":"KeyValue","children":[{"name":"unitPrice","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"array","type":"List","children":[{"name":"category","type":"Field","children":[],"entity":"OrderDetails","alias":"o"},{"name":"product","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]}]},{"name":"Orders.o1","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Orders","alias":"o1"},{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]}]},{"name":"Products.p","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":"productId","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category","type":"string"},{"name":"product","type":"string"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"}],"parameters":[{"name":"from","type":"datetime","value":"1997-01-01 00:00:00"},{"name":"to","type":"datetime","value":"1997-12-31 00:00:00"},{"name":"minValue","type":"decimal","value":10}],"entity":"OrderDetails"}
		const constraintsExpected :any= {"entity":"OrderDetails","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('query 10', async () => {
		const expression = 'OrderDetails.map(p=>{orderId:p.orderId,subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.orderId)'
		const modelExpected :any= [{"name":"orderId","type":"integer"},{"name":"subTotal","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"OrderDetails.o","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"orderId","type":"KeyValue","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]},{"name":"subTotal","type":"KeyValue","children":[{"name":"sum","type":"FunctionRef","children":[{"name":"*","type":"Operator","children":[{"name":"*","type":"Operator","children":[{"name":"*","type":"Operator","children":[{"name":"unitPrice","type":"Field","children":[],"entity":"OrderDetails","alias":"o"},{"name":"quantity","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]},{"name":"-","type":"Operator","children":[{"name":1,"type":"Constant2","children":[]},{"name":"/","type":"Operator","children":[{"name":"discount","type":"Field","children":[],"entity":"OrderDetails","alias":"o"},{"name":100,"type":"Constant2","children":[]}]}]}]},{"name":100,"type":"Constant2","children":[]}]}]}]}]}]},{"name":"groupBy","type":"GroupBy","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]},{"name":"sort","type":"Sort","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o"}]}],"fields":[{"name":"orderId","type":"integer"},{"name":"subTotal","type":"any"}],"parameters":[],"entity":"OrderDetails"}
		const constraintsExpected :any= {"entity":"OrderDetails","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('query 11', async () => {
		const expression = 'Products.page(1,1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"page","type":"Page","children":[{"name":"select","type":"Sentence","children":[{"name":"Products.p1","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p1"}]}]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"},{"name":1,"type":"Constant2","children":[]},{"name":1,"type":"Constant2","children":[]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 12', async () => {
		const expression = 'Products.first(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"page","type":"Page","children":[{"name":"","type":"Sentence","children":[{"name":"Products.p1","type":"From","children":[]}],"fields":[],"parameters":[],"entity":"Products"},{"name":"1","type":"Constant2","children":[]},{"name":"1","type":"Constant2","children":[]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 13', async () => {
		const expression = 'Products.last(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"desc","type":"FunctionRef","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]}]},{"name":"page","type":"Page","children":[{"name":"","type":"Sentence","children":[{"name":"Products.p1","type":"From","children":[]}],"fields":[],"parameters":[],"entity":"Products"},{"name":"1","type":"Constant2","children":[]},{"name":"1","type":"Constant2","children":[]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 14', async () => {
		const expression = 'Products.take(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"page","type":"Page","children":[{"name":"Products","type":"Variable","children":[]},{"name":"1","type":"Constant2","children":[]},{"name":"1","type":"Constant2","children":[]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 15', async () => {
		const expression = 'Products.page(1,1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"page","type":"Page","children":[{"name":"select","type":"Sentence","children":[{"name":"Products.p1","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p1"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p1"}]}]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"},{"name":1,"type":"Constant2","children":[]},{"name":1,"type":"Constant2","children":[]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 16', async () => {
		const expression = 'Products.first(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"category","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"page","type":"Page","children":[{"name":"","type":"Sentence","children":[{"name":"Products.p1","type":"From","children":[]}],"fields":[],"parameters":[],"entity":"Products"},{"name":"1","type":"Constant2","children":[]},{"name":"1","type":"Constant2","children":[]}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"entity":"Products"}
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
	test('query 17', async () => {
		const expression = 'Products.filter(p=>(p.discontinued!==false)).last(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"!==","type":"Operator","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"},{"name":false,"type":"Constant2","children":[]}]}]},{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"desc","type":"FunctionRef","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]}]},{"name":"page","type":"Page","children":[{"name":"","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"!==","type":"Operator","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p1"},{"name":false,"type":"Constant2","children":[]}]}]},{"name":"Products.p1","type":"From","children":[]}],"fields":[],"parameters":[],"entity":"Products"},{"name":"1","type":"Constant2","children":[]},{"name":"1","type":"Constant2","children":[]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 18', async () => {
		const expression = 'Products.distinct(p=>p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"distinct","type":"FunctionRef","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"supplierId","type":"KeyValue","children":[{"name":"supplierId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"categoryId","type":"KeyValue","children":[{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"price","type":"KeyValue","children":[{"name":"price","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"inStock","type":"KeyValue","children":[{"name":"inStock","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"onOrder","type":"KeyValue","children":[{"name":"onOrder","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"reorderLevel","type":"KeyValue","children":[{"name":"reorderLevel","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"discontinued","type":"KeyValue","children":[{"name":"discontinued","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}]}]}],"fields":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"entity":"Products"}
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
	test('query 19', async () => {
		const expression = 'Products.distinct(p=>p.category.name)'
		const modelExpected :any= [{"name":"category_name","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"distinct","type":"FunctionRef","children":[{"name":"obj","type":"Obj","children":[{"name":"category_name","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]}]}]}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category_name","type":"string"}],"parameters":[],"entity":"Products"}
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
	test('query 20', async () => {
		const expression = 'Products.distinct(p=>{quantity:p.quantity,category:p.category.name}).sort(p=>p.category)'
		const modelExpected :any= [{"name":"quantity","type":"string"},{"name":"category","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"distinct","type":"FunctionRef","children":[{"name":"obj","type":"Obj","children":[{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"category","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"category","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"quantity","type":"string"},{"name":"category","type":"string"}],"parameters":[],"entity":"Products"}
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
	test('query 21', async () => {
		const expression = 'Products.distinct(p=>{category:p.category.name}).sort(p=>p.category)'
		const modelExpected :any= [{"name":"category","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","type":"Sentence","children":[{"name":"Products.p","type":"From","children":[]},{"name":"map","type":"Map","children":[{"name":"distinct","type":"FunctionRef","children":[{"name":"obj","type":"Obj","children":[{"name":"category","type":"KeyValue","children":[{"name":"name","type":"Field","children":[],"entity":"Categories","alias":"c"}]}]}]}]},{"name":"sort","type":"Sort","children":[{"name":"category","type":"Field","children":[],"entity":"Products","alias":"p"}]},{"name":"Categories.c","type":"Join","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Categories","alias":"c"},{"name":"categoryId","type":"Field","children":[],"entity":"Products","alias":"p"}]}]}],"fields":[{"name":"category","type":"string"}],"parameters":[],"entity":"Products"}
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
	test('query 1', async () => {
		const expression = 'Products'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 2', async () => {
		const expression = 'Products.map(p=>p).page(1,1)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 3', async () => {
		const expression = 'Products.page(1,1)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 4', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>p).sort(p=>p.id)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.ProductID = $1 ORDER BY p.ProductID ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 5', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).sort(p=>p.id)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.ProductID = $1 ORDER BY p.ProductID ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 6', async () => {
		const expression = 'Products.map(p=>p.category.name)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category_name` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category_name\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>p.name)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 8', async () => {
		const expression = 'Products.filter(p=>(p.discontinued!==false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> FALSE ORDER BY category, p.ProductName desc ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> FALSE ORDER BY category, p.ProductName desc ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 9', async () => {
		const expression = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const mysqlExpected = {"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `product`, o.UnitPrice AS `unitPrice`, o.Quantity AS `quantity` FROM `Order Details` o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN ? AND ? AND o.UnitPrice > ?) ORDER BY category, product ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"product\", o.UnitPrice AS \"unitPrice\", o.Quantity AS \"quantity\" FROM \"Order Details\" o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN $1 AND $2 AND o.UnitPrice > $3) ORDER BY category, product ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 10', async () => {
		const expression = 'OrderDetails.map(p=>{orderId:p.orderId,subTotal:sum((((p.unitPrice*p.quantity)*(1-(p.discount/100)))*100))}).sort(p=>p.orderId)'
		const mysqlExpected = {"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"SELECT o.OrderID AS `orderId`, SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS `subTotal` FROM `Order Details` o  GROUP BY o.OrderID ORDER BY o.OrderID ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"SELECT o.OrderID AS \"orderId\", SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS \"subTotal\" FROM \"Order Details\" o  GROUP BY o.OrderID ORDER BY o.OrderID ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 11', async () => {
		const expression = 'Products.page(1,1)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 12', async () => {
		const expression = 'Products.first(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ORDER BY p.ProductID LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 13', async () => {
		const expression = 'Products.last(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ORDER BY p.ProductID desc LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID desc OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 14', async () => {
		const expression = 'Products.take(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 15', async () => {
		const expression = 'Products.page(1,1)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 16', async () => {
		const expression = 'Products.first(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, p.ProductName AS `name`, p.QuantityPerUnit AS `quantity`, p.UnitsInStock AS `inStock` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductID LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductID OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 17', async () => {
		const expression = 'Products.filter(p=>(p.discontinued!==false)).last(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  WHERE p.Discontinued <> FALSE ORDER BY p.ProductID desc LIMIT 0,1  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.Discontinued <> FALSE ORDER BY p.ProductID desc OFFSET 0 LIMIT 1  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 18', async () => {
		const expression = 'Products.distinct(p=>p)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT DISTINCT p.ProductID AS `id`, p.ProductName AS `name`, p.SupplierID AS `supplierId`, p.CategoryID AS `categoryId`, p.QuantityPerUnit AS `quantity`, p.UnitPrice AS `price`, p.UnitsInStock AS `inStock`, p.UnitsOnOrder AS `onOrder`, p.ReorderLevel AS `reorderLevel`, p.Discontinued AS `discontinued` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT DISTINCT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 19', async () => {
		const expression = 'Products.distinct(p=>p.category.name)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT DISTINCT c.CategoryName AS `category_name` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT DISTINCT c.CategoryName AS \"category_name\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 20', async () => {
		const expression = 'Products.distinct(p=>{quantity:p.quantity,category:p.category.name}).sort(p=>p.category)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT DISTINCT p.QuantityPerUnit AS `quantity`, c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT DISTINCT p.QuantityPerUnit AS \"quantity\", c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('query 21', async () => {
		const expression = 'Products.distinct(p=>{category:p.category.name}).sort(p=>p.category)'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT DISTINCT c.CategoryName AS `category` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT DISTINCT c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
})