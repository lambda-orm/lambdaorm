import { orm } from '../../orm'

export async function apply () {
	await orm.init()

	const query = (id:number) => Orders.filter(p => p.id === id).include(p => [p.customer.map(p =>
		p.name), p.details.include(p => p.product.include(p => p.category.map(p =>
		p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])])

	const expression = await orm.lambda(query).complete('northwind')
	console.log(expression)

	const sentence = await orm.lambda(query).sentence('mysql', 'northwind')
	console.log(sentence)

	const result = await orm.lambda(query).execute({ id: 10248 }, 'source')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
}

apply()

// export async function apply (callback: any) {
// try {
// await orm.init()

// const query = () => Products.filter(p => p.price > 10).map(p => ({ name: p.name, category: p.category.name })).sort(p => p.category).page(1, 10)
// const sentence = await orm.expression(query).sentence('mysql', 'northwind')
// console.log(sentence)
// } catch (error) {
// console.error(error)
// } finally {
// await orm.end()
// callback()
// }
// }

// apply(function () { console.log('end') })
