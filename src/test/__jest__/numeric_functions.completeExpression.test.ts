import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './src/test/test.env' })
	await orm.init('./src/test/config.yaml')
})

describe('some testing', () => {
test('function abs', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: p.price * -1, result: abs(p.price * -1) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:(p.price*-1),result:abs((p.price*-1))})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function acos', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: acos(0.25) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:acos(0.25)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function asin', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: asin(0.25) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:asin(0.25)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function atan', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.25, result: atan(0.25) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.25,result:atan(0.25)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function atan2', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 0.50, result: atan2(0.25, 1) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:0.5,result:atan2(0.25,1)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function ceil', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: ceil(25.75) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:25.75,result:ceil(25.75)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function cos', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: cos(2) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:2,result:cos(2)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function exp', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1, result: exp(1) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:1,result:exp(1)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function floor', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 25.75, result: floor(25.75) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:25.75,result:floor(25.75)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function ln', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 2, result: ln(2) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:2,result:ln(2)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function log', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, m: 10, n: 20, result: log(10, 20) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,m:10,n:20,result:log(10,20)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function round', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:135.375,result:round(135.375,2)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function sign', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 255.5, result: sign(255.5) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:255.5,result:sign(255.5)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function tan', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 1.75, result: tan(1.75) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:1.75,result:tan(1.75)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})
test('function trunc', () => {
	const source = 'Products.filter(p => p.id == id).map(p => ({ name: p.name, source: 135.375, result: trunc(135.375, 2) }))'
	const expected = 'Products.filter(p=>(p.id==id)).map(p=>{name:p.name,source:135.375,result:trunc(135.375,2)})'
	const target = orm.expression(source).complete('northwind:0.0.2')
	expect(expected).toBe(target);
})

})