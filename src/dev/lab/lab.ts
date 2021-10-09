import { orm } from '../../orm'

(async () => {
	await orm.init()
	const expression = (id:number) => Orders
		.filter(p => p.id === id)
		.include(p => [p.customer.map(p => ({ name: p.name, address: concat(p.address, ', ', p.city, ' (', p.postalCode, ')  ', p.country) })),
			p.details.include(p => p.product
				.include(p => p.category.map(p => p.name))
				.map(p => p.name))
				.map(p => [p.quantity, p.unitPrice])])
		.map(p => p.orderDate)

	const result = await orm.lambda(expression).execute('mysql')
	console.log(JSON.stringify(result, null, 2))
	await orm.end()
})()

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
