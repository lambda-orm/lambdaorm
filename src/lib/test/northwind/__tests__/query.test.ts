import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/northwind.env' })
	await orm.init('./config/northwind.yaml')
})
describe('Normalize Expression', () => {
	test('query 1', () => {
		const source = 'Products.sort(p => p.name)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>asc(p.name))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 2', () => {
		const source = 'Products.map(p => p).sort(p => p.id).page(1, 1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>asc(p.id)).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 3', () => {
		const source = 'Products.sort(p => p.id).page(1, 1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>asc(p.id)).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 4', () => {
		const source = 'Products.filter(p => p.id === id).map(p => p).sort(p => p.id)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).filter(p=>(p.id==id)).sort(p=>asc(p.id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 5', () => {
		const source = 'Products.filter(p => p.id === id).sort(p => p.id)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).filter(p=>(p.id==id)).sort(p=>asc(p.id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 6', () => {
		const source = 'Products.map(p => ({ category: p.category.name })).sort(p => p.category)'
		const expected = 'Products.map(p=>{category:p.category.name}).sort(p=>asc(p.category))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 7', () => {
		const source = 'Products.map(p => ({ name: p.name, category: p.category.name })).sort(p => [p.category, p.name])'
		const expected = 'Products.map(p=>{name:p.name,category:p.category.name}).sort(p=>[asc(p.category),asc(p.name)])'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 8', () => {
		const source = 'Products.map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => p.name)'
		const expected = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>asc(p.name))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 9', () => {
		const source = 'Products.filter(p => p.discontinued !== false).map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => [p.category, desc(p.name)])'
		const expected = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).filter(p=>(p.discontinued!=false)).sort(p=>[asc(p.category),desc(p.name)])'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 10', () => {
		const source = 'Orders.details.filter(p => between(p.order.shippedDate, fromDate, toDate) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product, p.unitPrice, p.quantity])'
		const expected = 'Orders.details.map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).filter(p=>(between(p.order.shippedDate,fromDate,toDate)&&(p.unitPrice>minValue))).sort(p=>[asc(p.category),asc(p.product),asc(p.unitPrice),asc(p.quantity)])'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 11', () => {
		const source = 'Products.sort(p => p.id).page(1, 1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>asc(p.id)).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 12', () => {
		const source = 'Products.first(p => p)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>asc(p.id)).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 13', () => {
		const source = 'Products.last(p => p)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>desc(p.id)).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 14', () => {
		const source = 'Products.first(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock }))'
		const expected = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>asc(p.category)).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 15', () => {
		const source = 'Products.filter(p => p.discontinued !== false).last(p => p.id)'
		const expected = 'Products.map(p=>{id:p.id}).filter(p=>(p.discontinued!=false)).sort(p=>desc(p.id)).page(1,1)'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 16', () => {
		const source = 'Products.distinct(p => p).sort(p => p.id)'
		const expected = 'Products.map(p=>distinct({id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})).sort(p=>asc(p.id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 17', () => {
		const source = 'Products.distinct(p => ({ category: p.category.name })).sort(p => p.category)'
		const expected = 'Products.map(p=>distinct({category:p.category.name})).sort(p=>asc(p.category))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('query 18', () => {
		const source = 'Products.distinct(p => ({ quantity: p.quantity, category: p.category.name })).sort(p => [p.quantity, p.category])'
		const expected = 'Products.map(p=>distinct({quantity:p.quantity,category:p.category.name})).sort(p=>[asc(p.quantity),asc(p.category)])'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('query 1', async () => {
		const expression = 'Products.sort(p => p.name)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":14},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.map(p => p).sort(p => p.id).page(1, 1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":42},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.sort(p => p.id).page(1, 1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":30},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.filter(p => p.id === id).map(p => p).sort(p => p.id)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":51},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[{"name":"id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.filter(p => p.id === id).sort(p => p.id)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":39},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[{"name":"id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.map(p => ({ category: p.category.name })).sort(p => p.category)'
		const modelExpected :any= [{"name":"category","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":56},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"category","type":"string"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.map(p => ({ name: p.name, category: p.category.name })).sort(p => [p.category, p.name])'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"category","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":70},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"name","type":"string"},{"name":"category","type":"string"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => p.name)'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":112},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.filter(p => p.discontinued !== false).map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => [p.category, desc(p.name)])'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":150},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Orders.details.filter(p => between(p.order.shippedDate, fromDate, toDate) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product, p.unitPrice, p.quantity])'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"product","type":"string"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"}]
		const parametersExpected:any = [{"name":"fromDate","type":"date"},{"name":"toDate","type":"date"},{"name":"minValue","type":"decimal"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":227},"name":"select","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"category","type":"string"},{"name":"product","type":"string"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"}],"parameters":[{"name":"fromDate","type":"date"},{"name":"toDate","type":"date"},{"name":"minValue","type":"decimal"}],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"o"}
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
	test('query 11', async () => {
		const expression = 'Products.sort(p => p.id).page(1, 1)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":30},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.first(p => p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":15},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.last(p => p)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":14},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.first(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock }))'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":15},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"category","type":"string"},{"name":"name","type":"string"},{"name":"quantity","type":"string"},{"name":"inStock","type":"decimal"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.filter(p => p.discontinued !== false).last(p => p.id)'
		const modelExpected :any= [{"name":"id","type":"integer"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":52},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.distinct(p => p).sort(p => p.id)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":31},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"supplierId","type":"integer"},{"name":"categoryId","type":"integer"},{"name":"quantity","type":"string"},{"name":"price","type":"decimal"},{"name":"inStock","type":"decimal"},{"name":"onOrder","type":"decimal"},{"name":"reorderLevel","type":"decimal"},{"name":"discontinued","type":"boolean"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.distinct(p => ({ category: p.category.name })).sort(p => p.category)'
		const modelExpected :any= [{"name":"category","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":61},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"category","type":"string"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.distinct(p => ({ quantity: p.quantity, category: p.category.name })).sort(p => [p.quantity, p.category])'
		const modelExpected :any= [{"name":"quantity","type":"string"},{"name":"category","type":"string"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":83},"name":"select","children":[],"type":"any","entity":"Products","columns":[{"name":"quantity","type":"string"},{"name":"category","type":"string"}],"parameters":[],"constraints":[],"values":[],"defaults":[],"clause":"select","alias":"p"}
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
		const expression = 'Products.sort(p => p.name)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductName asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductName asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductName asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductName asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }} , { \"$sort\" :{ \"ProductName\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductName asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 2', async () => {
		const expression = 'Products.map(p => p).sort(p => p.id).page(1, 1)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  LIMIT 0,1 ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  LIMIT 0,1 ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 LIMIT 1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }} , { \"$sort\" :{ \"_id\":1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 3', async () => {
		const expression = 'Products.sort(p => p.id).page(1, 1)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  LIMIT 0,1 ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  LIMIT 0,1 ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 LIMIT 1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }} , { \"$sort\" :{ \"_id\":1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 4', async () => {
		const expression = 'Products.filter(p => p.id === id).map(p => p).sort(p => p.id)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.ProductID = $1 ORDER BY p.ProductID asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  WHERE p.ProductID = @id ORDER BY p.ProductID asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$match\" : { \"_id\":{{id}} } }, { \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }} , { \"$sort\" :{ \"_id\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.ProductID = :id ORDER BY p.ProductID asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 5', async () => {
		const expression = 'Products.filter(p => p.id === id).sort(p => p.id)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  WHERE p.ProductID = ? ORDER BY p.ProductID asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.ProductID = $1 ORDER BY p.ProductID asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  WHERE p.ProductID = @id ORDER BY p.ProductID asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$match\" : { \"_id\":{{id}} } }, { \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }} , { \"$sort\" :{ \"_id\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  WHERE p.ProductID = :id ORDER BY p.ProductID asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 6', async () => {
		const expression = 'Products.map(p => ({ category: p.category.name })).sort(p => p.category)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY \"category\" asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$lookup\" :{ \"from\": \"Categories\", \"localField\": \"CategoryID\" , \"foreignField\": \"_id\", \"as\": \"c\" }}, { \"$project\" :{ \"_id\": 0 , \"category\":{ \"$arrayElemAt\": [\"$c.CategoryName\", 0] } }} , { \"$sort\" :{ \"category\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY \"category\" asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 7', async () => {
		const expression = 'Products.map(p => ({ name: p.name, category: p.category.name })).sort(p => [p.category, p.name])'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductName AS name, c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc, p.ProductName asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductName AS name, c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc, p.ProductName asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductName AS \"name\", c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY \"category\" asc, p.ProductName asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductName AS name, c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc, p.ProductName asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$lookup\" :{ \"from\": \"Categories\", \"localField\": \"CategoryID\" , \"foreignField\": \"_id\", \"as\": \"c\" }}, { \"$project\" :{ \"_id\": 0 , \"name\":\"$ProductName\", \"category\":{ \"$arrayElemAt\": [\"$c.CategoryName\", 0] } }} , { \"$sort\" :{ \"category\":1, \"ProductName\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductName AS \"name\", c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY \"category\" asc, p.ProductName asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 8', async () => {
		const expression = 'Products.map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => p.name)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$lookup\" :{ \"from\": \"Categories\", \"localField\": \"CategoryID\" , \"foreignField\": \"_id\", \"as\": \"c\" }}, { \"$project\" :{ \"_id\": 0 , \"category\":{ \"$arrayElemAt\": [\"$c.CategoryName\", 0] }, \"name\":\"$ProductName\", \"quantity\":\"$QuantityPerUnit\", \"inStock\":\"$UnitsInStock\" }} , { \"$sort\" :{ \"ProductName\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.ProductName asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 9', async () => {
		const expression = 'Products.filter(p => p.discontinued !== false).map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => [p.category, desc(p.name)])'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> FALSE ORDER BY category asc, p.ProductName desc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> FALSE ORDER BY category asc, p.ProductName desc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> FALSE ORDER BY \"category\" asc, p.ProductName desc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> 0 ORDER BY category asc, p.ProductName desc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$lookup\" :{ \"from\": \"Categories\", \"localField\": \"CategoryID\" , \"foreignField\": \"_id\", \"as\": \"c\" }}, { \"$match\" : { \"Discontinued\": { \"$ne\": false } } }, { \"$project\" :{ \"_id\": 0 , \"category\":{ \"$arrayElemAt\": [\"$c.CategoryName\", 0] }, \"name\":\"$ProductName\", \"quantity\":\"$QuantityPerUnit\", \"inStock\":\"$UnitsInStock\" }} , { \"$sort\" :{ \"category\":1, \"ProductName\":-1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE p.Discontinued <> 'N' ORDER BY \"category\" asc, p.ProductName desc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 10', async () => {
		const expression = 'Orders.details.filter(p => between(p.order.shippedDate, fromDate, toDate) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product, p.unitPrice, p.quantity])'
		const MySQLExpected = {"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"SELECT c.CategoryName AS category, p.ProductName AS product, o.UnitPrice AS unitPrice, o.Quantity AS quantity FROM `Order Details` o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN ? AND ? AND o.UnitPrice > ?) ORDER BY category asc, product asc, o.UnitPrice asc, o.Quantity asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT c.CategoryName AS category, p.ProductName AS product, o.UnitPrice AS unitPrice, o.Quantity AS quantity FROM `Order Details` o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN ? AND ? AND o.UnitPrice > ?) ORDER BY category asc, product asc, o.UnitPrice asc, o.Quantity asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"product\", o.UnitPrice AS \"unitPrice\", o.Quantity AS \"quantity\" FROM \"Order Details\" o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN $1 AND $2 AND o.UnitPrice > $3) ORDER BY \"category\" asc, \"product\" asc, o.UnitPrice asc, o.Quantity asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT c.CategoryName AS category, p.ProductName AS product, o.UnitPrice AS unitPrice, o.Quantity AS quantity FROM [Order Details] o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN @fromDate AND @toDate AND o.UnitPrice > @minValue) ORDER BY category asc, product asc, o.UnitPrice asc, o.Quantity asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$unwind\" : \"$\\\"Order Details\\\"\" }, { \"$replaceRoot\": { \"newRoot\": \"$\\\"Order Details\\\"\" } }, { \"$lookup\" :{ \"from\": \"Orders\", \"localField\": \"OrderID\" , \"foreignField\": \"_id\", \"as\": \"o1\" }}, { \"$lookup\" :{ \"from\": \"Products\", \"localField\": \"ProductID\" , \"foreignField\": \"_id\", \"as\": \"p\" }}, { \"$lookup\" :{ \"from\": \"Categories\", \"localField\": \"CategoryID\" , \"foreignField\": \"p._id\", \"as\": \"c\" }}, { \"$match\" : { \"$and\" :[{ \"o1.ShippedDate\": { \"$gte\": {{fromDate}} , \"$lt\": {{toDate}} } },{ \"UnitPrice\": { \"$gt\": {{minValue}} } }] } }, { \"$project\" :{ \"_id\": 0 , \"category\":{ \"$arrayElemAt\": [\"$c.CategoryName\", 0] }, \"product\":{ \"$arrayElemAt\": [\"$p.ProductName\", 0] }, \"unitPrice\":\"$UnitPrice\", \"quantity\":\"$Quantity\" }} , { \"$sort\" :{ \"category\":1, \"product\":1, \"UnitPrice\":1, \"Quantity\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders.details","dialect":"Oracle","source":"Oracle","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"product\", o.UnitPrice AS \"unitPrice\", o.Quantity AS \"quantity\" FROM \"Order Details\" o INNER JOIN Orders o1 ON o1.OrderID = o.OrderID INNER JOIN Products p ON p.ProductID = o.ProductID INNER JOIN Categories c ON c.CategoryID = p.CategoryID WHERE (o1.ShippedDate BETWEEN :fromDate AND :toDate AND o.UnitPrice > :minValue) ORDER BY \"category\" asc, \"product\" asc, o.UnitPrice asc, o.Quantity asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 11', async () => {
		const expression = 'Products.sort(p => p.id).page(1, 1)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  LIMIT 0,1 ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  LIMIT 0,1 ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 LIMIT 1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }} , { \"$sort\" :{ \"_id\":1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 12', async () => {
		const expression = 'Products.first(p => p)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  LIMIT 0,1 ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  LIMIT 0,1 ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 LIMIT 1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }} , { \"$sort\" :{ \"_id\":1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 13', async () => {
		const expression = 'Products.last(p => p)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID desc  LIMIT 0,1 ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID desc  LIMIT 0,1 ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID desc  OFFSET 0 LIMIT 1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID desc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }} , { \"$sort\" :{ \"_id\":-1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID desc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 14', async () => {
		const expression = 'Products.first(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock }))'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc  LIMIT 0,1 ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc  LIMIT 0,1 ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY \"category\" asc  OFFSET 0 LIMIT 1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT c.CategoryName AS category, p.ProductName AS name, p.QuantityPerUnit AS quantity, p.UnitsInStock AS inStock FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$lookup\" :{ \"from\": \"Categories\", \"localField\": \"CategoryID\" , \"foreignField\": \"_id\", \"as\": \"c\" }}, { \"$project\" :{ \"_id\": 0 , \"category\":{ \"$arrayElemAt\": [\"$c.CategoryName\", 0] }, \"name\":\"$ProductName\", \"quantity\":\"$QuantityPerUnit\", \"inStock\":\"$UnitsInStock\" }} , { \"$sort\" :{ \"category\":1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT c.CategoryName AS \"category\", p.ProductName AS \"name\", p.QuantityPerUnit AS \"quantity\", p.UnitsInStock AS \"inStock\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY \"category\" asc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 15', async () => {
		const expression = 'Products.filter(p => p.discontinued !== false).last(p => p.id)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT p.ProductID AS id FROM Products p  WHERE p.Discontinued <> FALSE ORDER BY p.ProductID desc  LIMIT 0,1 ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT p.ProductID AS id FROM Products p  WHERE p.Discontinued <> FALSE ORDER BY p.ProductID desc  LIMIT 0,1 ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT p.ProductID AS \"id\" FROM Products p  WHERE p.Discontinued <> FALSE ORDER BY p.ProductID desc  OFFSET 0 LIMIT 1 ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT p.ProductID AS id FROM Products p  WHERE p.Discontinued <> 0 ORDER BY p.ProductID desc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$match\" : { \"Discontinued\": { \"$ne\": false } } }, { \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\" }} , { \"$sort\" :{ \"_id\":-1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT p.ProductID AS \"id\" FROM Products p  WHERE p.Discontinued <> 'N' ORDER BY p.ProductID desc  OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 16', async () => {
		const expression = 'Products.distinct(p => p).sort(p => p.id)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT DISTINCT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT DISTINCT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT DISTINCT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT DISTINCT p.ProductID AS id, p.ProductName AS name, p.SupplierID AS supplierId, p.CategoryID AS categoryId, p.QuantityPerUnit AS quantity, p.UnitPrice AS price, p.UnitsInStock AS inStock, p.UnitsOnOrder AS onOrder, p.ReorderLevel AS reorderLevel, p.Discontinued AS discontinued FROM Products p  ORDER BY p.ProductID asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$group\" :{ \"_id\" : null , \"__distinct\":{ \"$addToSet\": { \"id\":\"$_id\", \"name\":\"$ProductName\", \"supplierId\":\"$SupplierID\", \"categoryId\":\"$CategoryID\", \"quantity\":\"$QuantityPerUnit\", \"price\":\"$UnitPrice\", \"inStock\":\"$UnitsInStock\", \"onOrder\":\"$UnitsOnOrder\", \"reorderLevel\":\"$ReorderLevel\", \"discontinued\":\"$Discontinued\" }}}}, { \"$sort\" :{ \"_id\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT DISTINCT p.ProductID AS \"id\", p.ProductName AS \"name\", p.SupplierID AS \"supplierId\", p.CategoryID AS \"categoryId\", p.QuantityPerUnit AS \"quantity\", p.UnitPrice AS \"price\", p.UnitsInStock AS \"inStock\", p.UnitsOnOrder AS \"onOrder\", p.ReorderLevel AS \"reorderLevel\", p.Discontinued AS \"discontinued\" FROM Products p  ORDER BY p.ProductID asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 17', async () => {
		const expression = 'Products.distinct(p => ({ category: p.category.name })).sort(p => p.category)'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT DISTINCT c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT DISTINCT c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT DISTINCT c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY \"category\" asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT DISTINCT c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY category asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$lookup\" :{ \"from\": \"Categories\", \"localField\": \"CategoryID\" , \"foreignField\": \"_id\", \"as\": \"c\" }}, { \"$group\" :{ \"_id\" : null , \"__distinct\":{ \"$addToSet\": { \"category\":{ \"$arrayElemAt\": [\"$c.CategoryName\", 0] } }}}}, { \"$sort\" :{ \"category\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT DISTINCT c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY \"category\" asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('query 18', async () => {
		const expression = 'Products.distinct(p => ({ quantity: p.quantity, category: p.category.name })).sort(p => [p.quantity, p.category])'
		const MySQLExpected = {"entity":"Products","dialect":"MySQL","source":"MySQL","sentence":"SELECT DISTINCT p.QuantityPerUnit AS quantity, c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.QuantityPerUnit asc, category asc ","children":[]}
		let MySQL = orm.getInfo(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Products","dialect":"MariaDB","source":"MariaDB","sentence":"SELECT DISTINCT p.QuantityPerUnit AS quantity, c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.QuantityPerUnit asc, category asc ","children":[]}
		let MariaDB = orm.getInfo(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Products","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"SELECT DISTINCT p.QuantityPerUnit AS \"quantity\", c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.QuantityPerUnit asc, \"category\" asc ","children":[]}
		let PostgreSQL = orm.getInfo(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Products","dialect":"SqlServer","source":"SqlServer","sentence":"SELECT DISTINCT p.QuantityPerUnit AS quantity, c.CategoryName AS category FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.QuantityPerUnit asc, category asc ","children":[]}
		let SqlServer = orm.getInfo(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Products","dialect":"MongoDB","source":"MongoDB","sentence":"[{ \"$lookup\" :{ \"from\": \"Categories\", \"localField\": \"CategoryID\" , \"foreignField\": \"_id\", \"as\": \"c\" }}, { \"$group\" :{ \"_id\" : null , \"__distinct\":{ \"$addToSet\": { \"quantity\":\"$QuantityPerUnit\", \"category\":{ \"$arrayElemAt\": [\"$c.CategoryName\", 0] } }}}}, { \"$sort\" :{ \"QuantityPerUnit\":1, \"category\":1 } }, { \"$project\": { \"_id\": 0 } }]","children":[]}
		let MongoDB = orm.getInfo(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Products","dialect":"Oracle","source":"Oracle","sentence":"SELECT DISTINCT p.QuantityPerUnit AS \"quantity\", c.CategoryName AS \"category\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID ORDER BY p.QuantityPerUnit asc, \"category\" asc ","children":[]}
		let Oracle = orm.getInfo(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
})