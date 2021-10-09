import { orm } from '../../orm'

(async () => {
	await orm.init()
	const expression = (country:string) => Products
		.filter(p => (p.price > 5 && p.supplier.country === country) || (p.inStock < 3))
		.having(p => max(p.price) > 50)
		.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
		.sort(p => desc(p.largestPrice))

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
