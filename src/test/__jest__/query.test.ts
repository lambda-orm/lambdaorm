import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})
describe('Complete Expression', () => {
	test('query 1', () => {
		const source = 'Products.map(p => p)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 2', () => {
		const source = 'Products'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 3', () => {
		const source = 'Products.filter(p => p.id == id).map(p => p)'
		const expected = 'Products.filter(p=>(p.id==id)).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 4', () => {
		const source = 'Products.filter(p => p.id == id)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).filter(p=>(p.id==id))'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 5', () => {
		const source = 'Products.map(p => p.category.name)'
		const expected = 'Products.map(p=>p.category.name)'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 6', () => {
		const source = 'Products.map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock }))'
		const expected = 'Products.map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 7', () => {
		const source = 'Products.filter(p => p.discontinued != false).map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => [p.category, desc(p.name)])'
		const expected = 'Products.filter(p=>(p.discontinued!=false)).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}).sort(p=>[p.category,desc(p.name)])'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 8', () => {
		const source = 'OrderDetails.filter(p => between(p.order.shippedDate, from, to) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product])'
		const expected = 'OrderDetails.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 9', () => {
		const source = 'OrderDetails.map(p => ({ order: p.orderId, subTotal: sum((p.unitPrice * p.quantity * (1 - p.discount / 100)) * 100) }))'
		const expected = 'OrderDetails.map(p=>{order:p.orderId,subTotal:sum(((p.unitPrice*(p.quantity*(1-(p.discount/100))))*100))})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 10', () => {
		const source = 'Products.page(1, 1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 11', () => {
		const source = 'Products.first(p => p)'
		const expected = 'Products.sort(p=>p.id).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 12', () => {
		const source = 'Products.last(p => p)'
		const expected = 'Products.sort(p=>desc(p.id)).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 13', () => {
		const source = 'Products.take(p => p)'
		const expected = 'Products.page(1,1).map(p=>p)'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 14', () => {
		const source = 'Products.distinct(p => p)'
		const expected = 'Products.distinct(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 15', () => {
		const source = 'Products.page(1, 1)'
		const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).page(1,1)'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 16', () => {
		const source = 'Products.distinct(p => p.category.name)'
		const expected = 'Products.distinct(p=>p.category.name)'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 17', () => {
		const source = 'Products.first(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock }))'
		const expected = 'Products.sort(p=>p.id).page(1,1).map(p=>{category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
	test('query 18', () => {
		const source = 'Products.filter(p => p.discontinued != false).last(p => p)'
		const expected = 'Products.filter(p=>(p.discontinued!=false)).sort(p=>desc(p.id)).page(1,1).map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
		const target = orm.expression(source).complete('northwind:0.0.2')
		expect(expected).toBe(target);
	})
})