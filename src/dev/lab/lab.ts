import { orm } from '../../orm'

(async () => {
	await orm.init()

	try {
		// writing the statement as a lambda expression in javascript
		const query = (id: number) => Orders.filter(p => p.id === id).include(p => p.details)
		let result = await orm.lambda(query).execute({ id: 10248 }, 'source')
		console.log(JSON.stringify(result, null, 2))

		// writing the statement as a lambda expression to a text string
		const expression = 'Orders.filter(p => p.id === id).include(p => p.details)'
		result = await orm.expression(expression).execute({ id: 10248 }, 'source')
		console.log(JSON.stringify(result, null, 2))
	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
	}
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
