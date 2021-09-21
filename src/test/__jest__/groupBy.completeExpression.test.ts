import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})
test('groupBy 1', () => {
	const source = 'Products.map(p => ({ maxPrice: max(p.price) }))'
	const expected = 'Products.map(p=>{maxPrice:max(p.price)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 2', () => {
	const source = 'Products.map(p => ({ minPrice: min(p.price) }))'
	const expected = 'Products.map(p=>{minPrice:min(p.price)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 3', () => {
	const source = 'Products.map(p => ({ total: sum(p.price) }))'
	const expected = 'Products.map(p=>{total:sum(p.price)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 4', () => {
	const source = 'Products.map(p => ({ average: avg(p.price) }))'
	const expected = 'Products.map(p=>{average:avg(p.price)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 5', () => {
	const source = 'Products.map(p => ({ count: count(1) }))'
	const expected = 'Products.map(p=>{count:count(1)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 6', () => {
	const source = 'Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))'
	const expected = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 7', () => {
	const source = 'Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
	const expected = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 8', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 9', () => {
	const source = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))'
	const expected = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 10', () => {
	const source = 'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
	const expected = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)}).sort(p=>desc(p.largestPrice))'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('groupBy 11', () => {
	const source = 'Products.filter(p => p.price > 5).having(p => max(p.price) > 50).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
	const expected = 'Products.filter(p=>(p.price>5)).having(p=>(max(p.price)>50)).map(p=>{category:p.category.name,largestPrice:max(p.price)}).sort(p=>desc(p.largestPrice))'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})