import { orm } from '../../orm'
require('dotenv').config({ path: './src/test/test.env' })

beforeAll(async () => {
	await orm.init('./src/test/config.yaml')
});

test('My Greeter', () => {
	const source = 'Products.map(p => p)'
	const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
});