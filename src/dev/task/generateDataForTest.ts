/* eslint-disable @typescript-eslint/no-unused-vars */
import { orm } from './../../orm'
import { Categories, Customers, Employees, Shippers, Products, Orders, OrderDetails } from './../../models/northwind'
import { CategoryTest, ExpressionTest, ExecutionResult } from './testModel'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

async function exec (fn: any) {
	const t1 = Date.now()
	const result = await fn()
	const t2 = Date.now()
	console.log(t2 - t1)
	if (result) {
		if (typeof result === 'string' || result instanceof String) console.log(result)
		else console.log(JSON.stringify(result))
	}
	return result
}

async function writeTest (databases: string[], category: CategoryTest): Promise<number> {
	category.errors = 0
	for (const q in category.test) {
		const expressionTest = category.test[q] as ExpressionTest

		expressionTest.sentences = []
		expressionTest.errors = 0
		try {
			expressionTest.expression = orm.lambda(expressionTest.lambda).expression
			console.log(expressionTest.expression)
			// expressionTest.lambda = expressionTest.lambda.toString()
			expressionTest.completeExpression = orm.expression(expressionTest.expression).complete(category.database)
			expressionTest.model = await orm.expression(expressionTest.expression).model(category.database)
			const metadata: any = await orm.expression(expressionTest.expression).metadata(category.database)
			expressionTest.parameters = metadata.p
			expressionTest.fields = metadata.f
			for (const r in databases) {
				const database = databases[r]
				let sentence
				let error
				try {
					sentence = await orm.expression(expressionTest.expression).sentence(database)
				} catch (err: any) {
					error = err.toString()
				} finally {
					if (error !== undefined) {
						expressionTest.sentences.push({ database: database, error: error })
						expressionTest.errors++
					} else if (sentence !== undefined) {
						expressionTest.sentences.push({ database: database, sentence: sentence })
					} else {
						console.error('error sentence ' + database + ' ' + category.name + ':' + expressionTest.name)
					}
				}
			}
			expressionTest.executions = []
			const results: ExecutionResult[] = []
			for (const p in databases) {
				const database = databases[p]
				let result
				let error
				try {
					const context = expressionTest.context !== undefined ? category.context[expressionTest.context] : {}
					result = await orm.lambda(expressionTest.lambda).execute(context, database)
				} catch (err: any) {
					error = err.toString()
				} finally {
					if (error !== undefined) {
						expressionTest.executions.push({ database: database, error: error })
						expressionTest.errors++
					} else if (result !== undefined) { results.push({ database: database, result: result }) } else { console.error('error execution ' + database + ' ' + category.name + ':' + expressionTest.name) }
				}
			}
			if (results.length === 1) {
				expressionTest.result = results[0].result
				expressionTest.executions.push({ database: results[0].database })
			} else if (results.length > 1) {
				expressionTest.result = results[0].result
				expressionTest.executions.push({ database: results[0].database })
				const pattern = JSON.stringify(results[0].result)
				for (let i = 1; i < results.length; i++) {
					const result = JSON.stringify(results[i].result)
					if (result === pattern) {
						expressionTest.executions.push({ database: results[i].database })
					} else {
						expressionTest.executions.push({ database: results[i].database, error: `not equal ${results[0].database}`, result: results[i].result })
						expressionTest.errors++
					}
				}
			}
		} catch (err: any) {
			expressionTest.error = err.toString()
			expressionTest.errors++
		}
		category.errors += expressionTest.errors
	}
	try {
		const yamlStr = yaml.dump(JSON.parse(JSON.stringify(category)))
		fs.writeFileSync(path.join('src/test/dataForTest', category.name.replace(' ', '_') + '.yaml'), yamlStr)
	} catch (error) {
		console.error(error)
		for (const q in category.test) {
			try {
				const expressionTest = category.test[q] as ExpressionTest
				const yamlStr = yaml.dump(expressionTest)
			} catch (error) {
				console.error(error)
			}
		}
	}
	return category.errors
}
async function writeQueryTest (databases: string[]): Promise<number> {
	return await writeTest(databases, {
		name: 'query',
		database: 'source',
		context: {
			a: { id: 1 },
			b: { minValue: 10, from: '1997-01-01', to: '1997-12-31' }
		},
		test: [
			{ name: 'query 1', lambda: () => Products },
			{ name: 'query 2', lambda: () => Products.map(p => p).page(1, 1) },
			{ name: 'query 3', lambda: () => Products.page(1, 1) },
			{ name: 'query 4', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => p).sort(p => p.id) },
			{ name: 'query 5', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).sort(p => p.id) },
			{ name: 'query 6', context: 'a', lambda: () => Products.map(p => p.category.name) },
			{ name: 'query 7', lambda: () => Products.map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => p.name) },
			{ name: 'query 8', lambda: () => Products.filter(p => p.discontinued !== false).map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => [p.category, desc(p.name)]) },
			{ name: 'query 9', context: 'b', lambda: (minValue: number, from: Date, to: Date) => OrderDetails.filter(p => between(p.order.shippedDate, from, to) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product]) },
			{ name: 'query 10', lambda: () => OrderDetails.map(p => ({ orderId: p.orderId, subTotal: sum((p.unitPrice * p.quantity * (1 - p.discount / 100)) * 100) })).sort(p => p.orderId) },
			{ name: 'query 11', lambda: () => Products.page(1, 1) },
			{ name: 'query 12', lambda: () => Products.first(p => p) },
			{ name: 'query 13', lambda: () => Products.last(p => p) },
			{ name: 'query 14', lambda: () => Products.take(p => p) },
			{ name: 'query 15', lambda: () => Products.page(1, 1) },
			{ name: 'query 16', lambda: () => Products.first(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })) },
			{ name: 'query 17', lambda: () => Products.filter(p => p.discontinued !== false).last(p => p) },
			{ name: 'query 18', lambda: () => Products.distinct(p => p) },
			{ name: 'query 19', context: 'a', lambda: () => Products.distinct(p => p.category.name) },
			{ name: 'query 20', context: 'a', lambda: () => Products.distinct(p => ({ quantity: p.quantity, category: p.category.name })).sort(p => p.category) },
			{ name: 'query 21', context: 'a', lambda: () => Products.distinct(p => ({ category: p.category.name })).sort(p => p.category) }
		]
	})
}
async function writeNumeriFunctionsTest (databases: string[]): Promise<number> {
	return await writeTest(databases, {
		name: 'numeric functions',
		database: 'source',
		context: { a: { id: 1 } },
		test:
			[
				{ name: 'function abs', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price * -1, result: round(abs(p.price * -1), 10) })) },
				{ name: 'function acos', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(acos(0.25), 10) })) },
				{ name: 'function asin', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(asin(0.25), 10) })) },
				{ name: 'function atan', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.25, result: round(atan(0.25), 10) })) },
				{ name: 'function atan2', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 0.50, result: round(atan2(0.25, 1), 10) })) },
				{ name: 'function ceil', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 25.75, result: round(ceil(25.75), 10) })) },
				{ name: 'function cos', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 2, result: round(cos(2), 10) })) },
				{ name: 'function exp', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 1, result: round(exp(1), 10) })) },
				{ name: 'function floor', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 25.75, result: round(floor(25.75), 10) })) },
				{ name: 'function ln', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 2, result: round(ln(2), 10) })) },
				{ name: 'function log', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, m: 10, n: 20, result: round(log(10, 20), 10) })) },
				{ name: 'function round', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 135.375, result: round(135.375, 2) })) },
				{ name: 'function sign', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 255.5, result: round(sign(255.5), 10) })) },
				{ name: 'function tan', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 1.75, result: round(tan(1.75), 10) })) },
				{ name: 'function trunc', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: 135.375, result: round(trunc(135.375, 2), 10) })) }
			]
	})
}
async function writeGroupByTest (databases: string[]): Promise<number> {
	return await writeTest(databases, {
		name: 'groupBy',
		database: 'source',
		context: { a: { id: 1 } },
		test:
			[{ name: 'groupBy 1', lambda: () => Products.map(p => ({ maxPrice: max(p.price) })) },
				{ name: 'groupBy 2', lambda: () => Products.map(p => ({ minPrice: min(p.price) })) },
				{ name: 'groupBy 3', lambda: () => Products.map(p => ({ total: sum(p.price) })) },
				{ name: 'groupBy 4', lambda: () => Products.map(p => ({ average: avg(p.price) })) },
				{ name: 'groupBy 5', lambda: () => Products.map(p => ({ count: count(1) })) },
				{ name: 'groupBy 6', lambda: () => Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) })) },
				{ name: 'groupBy 7', lambda: () => Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) })) },
				{ name: 'groupBy 8', context: 'a', lambda: (id: number) => Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) })) },
				{ name: 'groupBy 9', lambda: () => Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })) },
				{ name: 'groupBy 10', lambda: () => Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice)) },
				{ name: 'groupBy 11', lambda: () => Products.filter(p => p.price > 5).having(p => max(p.price) > 50).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice)) }
			]
	})
}
async function writeIncludeTest (databases: string[]): Promise<number> {
	return await writeTest(databases, {
		name: 'include',
		database: 'source',
		context: { a: { id: 1 } },
		test:
			[
				{ name: 'include 1', context: 'a', lambda: (id: number) => Orders.filter(p => p.id === id).include(p => p.customer) },
				{ name: 'include 2', context: 'a', lambda: (id: number) => Orders.filter(p => p.id === id).include(p => p.details) },
				{ name: 'include 3', context: 'a', lambda: (id: number) => Orders.filter(p => p.id === id).include(p => [p.details, p.customer]) },
				{ name: 'include 4', context: 'a', lambda: (id: number) => Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product), p.customer]) },
				{ name: 'include 5', context: 'a', lambda: (id: number) => Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product.include(p => p.category)), p.customer]) },
				{ name: 'include 6', context: 'a', lambda: (id: number) => Orders.filter(p => p.id === id).include(p => [p.details.map(p => ({ quantity: p.quantity, unitPrice: p.unitPrice, productId: p.productId })), p.customer]) },
				{ name: 'include 7', context: 'a', lambda: (id: number) => Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product).map(p => ({ quantity: p.quantity, unitPrice: p.unitPrice, productId: p.productId })), p.customer]) },
				{ name: 'include 8', context: 'a', lambda: (id: number) => Orders.filter(p => p.id === id).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]) }
			]
	})
}
async function writeInsertsTest (databases: string[]): Promise<number> {
	return await writeTest(databases, {
		name: 'inserts',
		database: 'source',
		context: {
			a: { name: 'Beverages20', description: 'Soft drinks, coffees, teas, beers, and ales' },
			b: { name: 'Beverages21', description: 'Soft drinks, coffees, teas, beers, and ales' },
			c: { entity: { name: 'Beverages22', description: 'Soft drinks, coffees, teas, beers, and ales' } },
			order: {
				customerId: 'VINET',
				employeeId: 5,
				orderDate: '1996-07-03T22:00:00.000Z',
				requiredDate: '1996-07-31T22:00:00.000Z',
				shippedDate: '1996-07-15T22:00:00.000Z',
				shipViaId: 3,
				freight: 32.38,
				name: 'Vins et alcools Chevalier',
				address: '59 rue de l-Abbaye',
				city: 'Reims',
				region: null,
				postalCode: '51100',
				country: 'France',
				details: [
					{
						productId: 11,
						unitPrice: 14,
						quantity: 12,
						discount: 10
					},
					{
						productId: 42,
						unitPrice: 9.8,
						quantity: 10,
						discount: 10
					},
					{
						productId: 72,
						unitPrice: 34.8,
						quantity: 5,
						discount: 10
					}
				]
			}
		},
		test:
			[
				{ name: 'insert 1', context: 'a', lambda: () => Categories.insert() },
				{ name: 'insert 2', context: 'b', lambda: (name: string, description: string) => Categories.insert(() => ({ name: name, description: description })) },
				// { name: 'insert 3', context: 'c', lambda: (entity: Category) => Categories.insert(entity) },
				{ name: 'insert 3', context: 'c', lambda: (entity: any) => Categories.insert(entity) },
				{ name: 'insert 4', context: 'order', lambda: () => Orders.insert() },
				{ name: 'insert 5', context: 'order', lambda: () => Orders.insert().include(p => p.details) },
				{ name: 'insert 6', context: 'order', lambda: () => Orders.insert().include(p => [p.details, p.customer]) }
			]
	})
}
async function writeUpdateTest (databases: string[]): Promise<number> {
	return await writeTest(databases, {
		name: 'update',
		database: 'source',
		context: {
			a: {
				id: 7,
				customerId: 'ANATR',
				employeeId: 7,
				orderDate: '1996-09-17T22:00:00.000Z',
				requiredDate: '1996-10-15T22:00:00.000Z',
				shippedDate: '1996-09-23T22:00:00.000Z',
				shipViaId: 3,
				freight: '1.6100',
				name: 'Ana Trujillo Emparedados y helados',
				address: 'Avda. de la Constitucin 2222',
				city: 'Mxico D.F.',
				region: null,
				postalCode: '5021',
				country: 'Mexico',
				details: [
					{
						orderId: 7,
						productId: 69,
						unitPrice: '28.8000',
						quantity: '1.0000',
						discount: '0.0000'
					},
					{
						orderId: 7,
						productId: 70,
						unitPrice: '12.0000',
						quantity: '5.0000',
						discount: '0.0000'
					}
				]
			},
			b: {
				entity: {
					id: 8,
					customerId: 'ANATR',
					employeeId: 3,
					orderDate: '1997-08-07T22:00:00.000Z',
					requiredDate: '1997-09-04T22:00:00.000Z',
					shippedDate: '1997-08-13T22:00:00.000Z',
					shipViaId: 1,
					freight: '43.9000',
					name: 'Ana Trujillo Emparedados y helados',
					address: 'Avda. de la Constitucin 2222',
					city: 'Mxico D.F.',
					region: null,
					postalCode: '5021',
					country: 'Mexico',
					details: [
						{
							orderId: 8,
							productId: 14,
							unitPrice: '23.2500',
							quantity: '3.0000',
							discount: '0.0000'
						},
						{
							orderId: 8,
							productId: 42,
							unitPrice: '14.0000',
							quantity: '5.0000',
							discount: '0.0000'
						},
						{
							orderId: 8,
							productId: 60,
							unitPrice: '34.0000',
							quantity: '10.0000',
							discount: '0.0000'
						}
					]
				}
			},
			c: { postalCode: 'xxx' },
			d: {
				id: 'ALFKI',
				name: 'Alfreds Futterkiste',
				contact: 'Maria Anders',
				phone: 'Sales Representative',
				address: 'Obere Str. 57',
				city: 'Berlin',
				region: null,
				postalCode: '12209',
				country: 'Germany',
				orders: [
					{
						id: 1,
						customerId: 'ALFKI',
						employeeId: 6,
						orderDate: '1997-08-24T22:00:00.000Z',
						requiredDate: '1997-09-21T22:00:00.000Z',
						shippedDate: '1997-09-01T22:00:00.000Z',
						shipViaId: 1,
						freight: '29.4600',
						name: 'Alfreds Futterkiste',
						address: 'Obere Str. 57',
						city: 'Berlin',
						region: null,
						postalCode: '12209',
						country: 'Germany',
						details: [
							{
								orderId: 1,
								productId: 28,
								unitPrice: '45.6000',
								quantity: '15.0000',
								discount: '0.0000'
							},
							{
								orderId: 1,
								productId: 39,
								unitPrice: '18.0000',
								quantity: '21.0000',
								discount: '0.0000'
							},
							{
								orderId: 1,
								productId: 46,
								unitPrice: '12.0000',
								quantity: '2.0000',
								discount: '0.0000'
							}
						]
					},
					{
						id: 2,
						customerId: 'ALFKI',
						employeeId: 4,
						orderDate: '1997-10-02T22:00:00.000Z',
						requiredDate: '1997-10-30T23:00:00.000Z',
						shippedDate: '1997-10-12T22:00:00.000Z',
						shipViaId: 2,
						freight: '61.0200',
						name: 'Alfred-s Futterkiste',
						address: 'Obere Str. 57',
						city: 'Berlin',
						region: null,
						postalCode: '12209',
						country: 'Germany',
						details: [
							{
								orderId: 2,
								productId: 63,
								unitPrice: '43.9000',
								quantity: '20.0000',
								discount: '0.0000'
							}
						]
					},
					{
						id: 3,
						customerId: 'ALFKI',
						employeeId: 4,
						orderDate: '1997-10-12T22:00:00.000Z',
						requiredDate: '1997-11-23T23:00:00.000Z',
						shippedDate: '1997-10-20T22:00:00.000Z',
						shipViaId: 1,
						freight: '23.9400',
						name: 'Alfred-s Futterkiste',
						address: 'Obere Str. 57',
						city: 'Berlin',
						region: null,
						postalCode: '12209',
						country: 'Germany',
						details: [
							{
								orderId: 3,
								productId: 3,
								unitPrice: '10.0000',
								quantity: '6.0000',
								discount: '0.0000'
							},
							{
								orderId: 3,
								productId: 76,
								unitPrice: '18.0000',
								quantity: '15.0000',
								discount: '0.0000'
							}
						]
					},
					{
						id: 4,
						customerId: 'ALFKI',
						employeeId: 1,
						orderDate: '1998-01-14T23:00:00.000Z',
						requiredDate: '1998-02-11T23:00:00.000Z',
						shippedDate: '1998-01-20T23:00:00.000Z',
						shipViaId: 3,
						freight: '69.5300',
						name: 'Alfred-s Futterkiste',
						address: 'Obere Str. 57',
						city: 'Berlin',
						region: null,
						postalCode: '12209',
						country: 'Germany',
						details: [
							{
								orderId: 4,
								productId: 59,
								unitPrice: '55.0000',
								quantity: '15.0000',
								discount: '0.0000'
							},
							{
								orderId: 4,
								productId: 77,
								unitPrice: '13.0000',
								quantity: '2.0000',
								discount: '0.0000'
							}
						]
					},
					{
						id: 5,
						customerId: 'ALFKI',
						employeeId: 1,
						orderDate: '1998-03-15T23:00:00.000Z',
						requiredDate: '1998-04-26T22:00:00.000Z',
						shippedDate: '1998-03-23T23:00:00.000Z',
						shipViaId: 1,
						freight: '40.4200',
						name: 'Alfred-s Futterkiste',
						address: 'Obere Str. 57',
						city: 'Berlin',
						region: null,
						postalCode: '12209',
						country: 'Germany',
						details: [
							{
								orderId: 5,
								productId: 6,
								unitPrice: '25.0000',
								quantity: '16.0000',
								discount: '0.0000'
							},
							{
								orderId: 5,
								productId: 28,
								unitPrice: '45.6000',
								quantity: '2.0000',
								discount: '0.0000'
							}
						]
					},
					{
						id: 6,
						customerId: 'ALFKI',
						employeeId: 3,
						orderDate: '1998-04-08T22:00:00.000Z',
						requiredDate: '1998-05-06T22:00:00.000Z',
						shippedDate: '1998-04-12T22:00:00.000Z',
						shipViaId: 1,
						freight: '1.2100',
						name: 'Alfred-s Futterkiste',
						address: 'Obere Str. 57',
						city: 'Berlin',
						region: null,
						postalCode: '12209',
						country: 'Germany',
						details: [
							{
								orderId: 6,
								productId: 58,
								unitPrice: '13.2500',
								quantity: '40.0000',
								discount: '0.0000'
							},
							{
								orderId: 6,
								productId: 71,
								unitPrice: '21.5000',
								quantity: '20.0000',
								discount: '0.0000'
							}
						]
					}
				]
			}
		},
		test:
			[
				{ name: 'update 1', context: 'a', lambda: () => Orders.update() },
				// { name: 'update 2', context: 'b', lambda: (entity: Order) => Orders.update(entity) },
				{ name: 'update 2', context: 'b', lambda: (entity: any) => Orders.update(entity) },
				{ name: 'update 3', context: 'c', lambda: (postalCode: string) => Orders.updateAll(() => ({ postalCode: postalCode })) },
				// { name: 'update 4', context: 'b', lambda: (entity: QryOrder) => Orders.update({ name: entity.name }).filter(p => p.id === entity.id) },
				// { name: 'update 5', context: 'b', lambda: (entity: QryOrder) => Orders.update({ name: entity.name }).include(p => p.details.update(p => p)).filter(p => p.id === entity.id) },
				// { name: 'update 6', context: 'b', lambda: (entity: QryOrder) => Orders.update({ name: entity.name }).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => p.id === entity.id) },
				{ name: 'update 4', context: 'b', lambda: (entity: any) => Orders.update(p => ({ name: entity.name })).filter(p => p.id === entity.id) },
				{ name: 'update 5', context: 'b', lambda: (entity: any) => Orders.update(() => ({ name: entity.name })).include(p => p.details).filter(p => p.id === entity.id) },
				{ name: 'update 6', context: 'b', lambda: (entity: any) => Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => p)).filter(p => p.id === entity.id) },
				{ name: 'update 7', context: 'b', lambda: (entity: any) => Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => p.id === entity.id) },
				{ name: 'update 8', context: 'a', lambda: () => Orders.update().include(p => p.details) },
				{ name: 'update 9', context: 'c', lambda: () => Customers.update().include(p => p.orders.include(p => p.details)) }
			]
	})
}
async function writeDeleteTest (databases: string[]): Promise<number> {
	return await writeTest(databases, {
		name: 'delete',
		database: 'source',
		context: {
			a: { id: 9 },
			b: {
				id: 1,
				customerId: 'ALFKI',
				employeeId: 6,
				orderDate: '1997-08-24T22:00:00.000Z',
				requiredDate: '1997-09-21T22:00:00.000Z',
				shippedDate: '1997-09-01T22:00:00.000Z',
				shipViaId: 1,
				freight: '29.4600',
				name: 'Alfreds Futterkiste',
				address: 'Obere Str. 57',
				city: 'Berlin',
				region: null,
				postalCode: '12209',
				country: 'Germany',
				details: [
					{
						orderId: 1,
						productId: 28,
						unitPrice: '45.6000',
						quantity: '15.0000',
						discount: '0.0000'
					},
					{
						orderId: 1,
						productId: 39,
						unitPrice: '18.0000',
						quantity: '21.0000',
						discount: '0.0000'
					},
					{
						orderId: 1,
						productId: 46,
						unitPrice: '12.0000',
						quantity: '2.0000',
						discount: '0.0000'
					}
				]
			},
			c: {
				id: 2,
				customerId: 'ALFKI',
				employeeId: 4,
				orderDate: '1997-10-02T22:00:00.000Z',
				requiredDate: '1997-10-30T23:00:00.000Z',
				shippedDate: '1997-10-12T22:00:00.000Z',
				shipViaId: 2,
				freight: '61.0200',
				name: 'Alfred-s Futterkiste',
				address: 'Obere Str. 57',
				city: 'Berlin',
				region: null,
				postalCode: '12209',
				country: 'Germany',
				details: [
					{
						orderId: 2,
						productId: 63,
						unitPrice: '43.9000',
						quantity: '20.0000',
						discount: '0.0000'
					}
				]
			},
			d: {
				id: 4,
				customerId: 'ALFKI',
				employeeId: 1,
				orderDate: '1998-01-14T23:00:00.000Z',
				requiredDate: '1998-02-11T23:00:00.000Z',
				shippedDate: '1998-01-20T23:00:00.000Z',
				shipViaId: 3,
				freight: '69.5300',
				name: 'Alfred-s Futterkiste',
				address: 'Obere Str. 57',
				city: 'Berlin',
				region: null,
				postalCode: '12209',
				country: 'Germany',
				details: [
					{
						orderId: 4,
						productId: 59,
						unitPrice: '55.0000',
						quantity: '15.0000',
						discount: '0.0000'
					},
					{
						orderId: 4,
						productId: 77,
						unitPrice: '13.0000',
						quantity: '2.0000',
						discount: '0.0000'
					}
				]
			},
			e: {
				entity: {
					orderId: 5,
					productId: 6,
					unitPrice: '25.0000',
					quantity: '16.0000',
					discount: '0.0000'
				}
			},
			f: {
				entity: {
					id: 5,
					customerId: 'ALFKI',
					employeeId: 1,
					orderDate: '1998-03-15T23:00:00.000Z',
					requiredDate: '1998-04-26T22:00:00.000Z',
					shippedDate: '1998-03-23T23:00:00.000Z',
					shipViaId: 1,
					freight: '40.4200',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							orderId: 5,
							productId: 6,
							unitPrice: '25.0000',
							quantity: '16.0000',
							discount: '0.0000'
						},
						{
							orderId: 5,
							productId: 28,
							unitPrice: '45.6000',
							quantity: '2.0000',
							discount: '0.0000'
						}
					]
				}
			}
		},
		test:
			[{ name: 'delete 1', context: 'a', lambda: (id: number) => OrderDetails.delete().filter(p => p.orderId === id) },
				{ name: 'delete 2', context: 'b', lambda: () => Orders.delete().include(p => p.details) },
				{ name: 'delete 3', context: 'c', lambda: (id: number) => Orders.delete().filter(p => p.id === id).include(p => p.details) },
				{ name: 'delete 4', context: 'd', lambda: () => Orders.delete().include(p => p.details) },
				{ name: 'delete 4', context: 'd', lambda: (entity: any) => OrderDetails.delete(entity) },
				{ name: 'delete 5', context: 'e', lambda: (entity: any) => Orders.delete(entity).include(p => p.details) },
				{ name: 'delete 6', lambda: () => OrderDetails.deleteAll() }
			]
	})
}
// TODO: add delete on cascade , example Orders.delete().cascade(p=> p.details)
async function writeBulkInsertTest (databases: string[]): Promise<number> {
	return await writeTest(databases, {
		name: 'bulkInsert',
		database: 'source',
		context: {
			a: [{
				name: 'Beverages4',
				description: 'Soft drinks, coffees, teas, beers, and ales'
			},
			{
				name: 'Condiments4',
				description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
			}
			],
			b: [
				{

					customerId: 'ALFKI',
					employeeId: 6,
					orderDate: '1997-08-24T22:00:00.000Z',
					requiredDate: '1997-09-21T22:00:00.000Z',
					shippedDate: '1997-09-01T22:00:00.000Z',
					shipViaId: 1,
					freight: '29.4600',
					name: 'Alfreds Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							productId: 28,
							unitPrice: '45.6000',
							quantity: 15,
							discount: 0
						},
						{
							productId: 39,
							unitPrice: '18.0000',
							quantity: 21,
							discount: 0
						},
						{
							productId: 46,
							unitPrice: '12.0000',
							quantity: 2,
							discount: 0
						}
					]
				},
				{
					customerId: 'ALFKI',
					employeeId: 4,
					orderDate: '1997-10-02T22:00:00.000Z',
					requiredDate: '1997-10-30T23:00:00.000Z',
					shippedDate: '1997-10-12T22:00:00.000Z',
					shipViaId: 2,
					freight: '61.0200',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							productId: 63,
							unitPrice: '43.9000',
							quantity: 20,
							discount: 0
						}
					]
				},
				{
					customerId: 'ALFKI',
					employeeId: 4,
					orderDate: '1997-10-12T22:00:00.000Z',
					requiredDate: '1997-11-23T23:00:00.000Z',
					shippedDate: '1997-10-20T22:00:00.000Z',
					shipViaId: 1,
					freight: '23.9400',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							productId: 3,
							unitPrice: '10.0000',
							quantity: 6,
							discount: 0
						},
						{
							productId: 76,
							unitPrice: '18.0000',
							quantity: 15,
							discount: 0
						}
					]
				}
			]

		},
		test:
			[{ name: 'bulkInsert 1', context: 'a', lambda: () => Categories.bulkInsert() },
				{ name: 'bulkInsert 2', context: 'b', lambda: () => Orders.bulkInsert().include(p => p.details) }
			]
	})
}
async function crud () {
	const order = { customerId: 'VINET', employeeId: 5, orderDate: '1996-07-03T22:00:00.000Z', requiredDate: '1996-07-31T22:00:00.000Z', shippedDate: '1996-07-15T22:00:00.000Z', shipViaId: 3, freight: 32.38, name: 'Vins et alcools Chevalier', address: '59 rue de l-Abbaye', city: 'Reims', region: null, postalCode: '51100', country: 'France', details: [{ productId: 11, unitPrice: 14, quantity: 12, discount: !1 }, { productId: 42, unitPrice: 9.8, quantity: 10, discount: !1 }, { productId: 72, unitPrice: 34.8, quantity: 5, discount: !1 }] }

	try {
		orm.transaction('source', async (tr) => {
			// create order
			const orderId = await tr.lambda(() => Orders.insert().include(p => p.details), order)
			// get order
			const result = await tr.lambda((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
			const order2 = result[0]
			// updated order
			order2.address = 'changed 59 rue de l-Abbaye'
			order2.details[0].discount = true
			order2.details[1].unitPrice = 10
			order2.details[2].quantity = 7
			const updateCount = await tr.lambda(() => Orders.update().include(p => p.details), order2)
			console.log(updateCount)
			// get order
			const order3 = await tr.lambda((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
			console.log(JSON.stringify(order3))
			// delete
			const deleteCount = await tr.lambda(() => Orders.delete().include(p => p.details), order3[0])
			console.log(deleteCount)
			// get order
			const order4 = await tr.lambda((id:number) => Orders.filter(p => p.id === id).include(p => p.details), { id: orderId })
			console.log(JSON.stringify(order4))
		})
	} catch (error) {
		console.log(error)
	}
}
async function bulkInsert () {
	const expression = 'Categories.bulkInsert()'
	const categories = [
		{
			name: 'Beverages2',
			description: 'Soft drinks, coffees, teas, beers, and ales'
		},
		{
			name: 'Condiments2',
			description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
		}
	]

	// await exec( async()=>(await orm.expression(expression).parse()).serialize())
	// await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
	// await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
	// await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())
	const result = await exec(async () => (await orm.expression(expression).execute(categories, 'source')))
}
async function bulkInsert2 () {
	const expression = 'Orders.bulkInsert().include(p=> p.details)'
	const orders = [
		{

			customerId: 'ALFKI',
			employeeId: 6,
			orderDate: '1997-08-24T22:00:00.000Z',
			requiredDate: '1997-09-21T22:00:00.000Z',
			shippedDate: '1997-09-01T22:00:00.000Z',
			shipViaId: 1,
			freight: '29.4600',
			name: 'Alfreds Futterkiste',
			address: 'Obere Str. 57',
			city: 'Berlin',
			region: null,
			postalCode: '12209',
			country: 'Germany',
			details: [
				{
					productId: 28,
					unitPrice: '45.6000',
					quantity: 15,
					discount: 0
				},
				{
					productId: 39,
					unitPrice: '18.0000',
					quantity: 21,
					discount: 0
				},
				{
					productId: 46,
					unitPrice: '12.0000',
					quantity: 2,
					discount: 0
				}
			]
		},
		{
			customerId: 'ALFKI',
			employeeId: 4,
			orderDate: '1997-10-02T22:00:00.000Z',
			requiredDate: '1997-10-30T23:00:00.000Z',
			shippedDate: '1997-10-12T22:00:00.000Z',
			shipViaId: 2,
			freight: '61.0200',
			name: 'Alfred-s Futterkiste',
			address: 'Obere Str. 57',
			city: 'Berlin',
			region: null,
			postalCode: '12209',
			country: 'Germany',
			details: [
				{
					productId: 63,
					unitPrice: '43.9000',
					quantity: 20,
					discount: 0
				}
			]
		},
		{
			customerId: 'ALFKI',
			employeeId: 4,
			orderDate: '1997-10-12T22:00:00.000Z',
			requiredDate: '1997-11-23T23:00:00.000Z',
			shippedDate: '1997-10-20T22:00:00.000Z',
			shipViaId: 1,
			freight: '23.9400',
			name: 'Alfred-s Futterkiste',
			address: 'Obere Str. 57',
			city: 'Berlin',
			region: null,
			postalCode: '12209',
			country: 'Germany',
			details: [
				{
					productId: 3,
					unitPrice: '10.0000',
					quantity: 6,
					discount: 0
				},
				{
					productId: 76,
					unitPrice: '18.0000',
					quantity: 15,
					discount: 0
				}
			]
		}
	]

	// await exec( async()=>(await orm.expression(expression).parse()).serialize())
	// await exec( async()=>(await orm.expression(expression).compile('mysql','northwind')).serialize())
	// await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).sentence())
	// await exec(async()=>(await orm.expression(expression).compile('mysql','northwind')).schema())
	const result = await exec(async () => (await orm.expression(expression).execute(orders, 'source')))
}

export async function apply (databases: string[], callback: any) {
	await orm.init()
	let errors = 0

	errors = +await writeQueryTest(databases)
	errors = +await writeNumeriFunctionsTest(databases)
	errors = +await writeGroupByTest(databases)
	errors = +await writeIncludeTest(databases)
	errors = +await writeInsertsTest(databases)
	errors = +await writeUpdateTest(databases)
	errors = +await writeDeleteTest(databases)
	errors = +await writeBulkInsertTest(databases)
	// //operators comparation , matematica
	// //string functions
	// //datetime functions
	// //nullables functions
	// OLDS
	// await modify(orm)
	// await crud(orm)
	// await scriptsByDialect('northwind')
	// await applySchema(schemas)
	// await bulkInsert2(orm)

	await orm.end()

	console.log(`INFO: ${errors} errors`)
	callback()
}
// apply(['mysql'], function () { console.log('end') })
// apply(['mysql', 'postgres'], function () { console.log('end') })
