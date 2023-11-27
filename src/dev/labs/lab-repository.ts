import { desc, max, orm } from '../../lib'
import { CategoryRepository, Category, ProductRepository } from '../northwind/model'

(async () => {
	try {
		await orm.init()

		const productRepository = new ProductRepository('MySQL')

		const country = 'USA'
		const result = await productRepository.query().filter(p => (p.price > 5 && p.supplier.country === country) || (p.inStock < 3))
			.having(p => max(p.price) > 50)
			.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
			.sort(p => desc(p.largestPrice))
			.execute({ country: country })

		console.log(JSON.stringify(result, null, 2))

		let category

		const categoryRepository = new CategoryRepository('MySQL')
		category = new Category()
		category.name = 'general21'
		category.description = 'general products 2'
		const id = await categoryRepository.insert(category)

		category = await categoryRepository.first({ id: id }, p => p.id === id)
		console.log(JSON.stringify(category, null, 2))

		if (category !== null) {
			await categoryRepository.delete(category)
		}

		// let complete = await customerRepository.insert(customer, p => p.orders.include(p=> p.details))
		// console.log(complete)
		// const query = (name: string, description: string) => Categories.insert(() => ({ name: name, description: description }))
		// complete = orm.lambda(query).complete('northwind')
		// console.log(complete)

		// const query2 = () => Customers
		// console.log(orm.lambda(query2).expression)
		// console.log(orm.lambda(query2).complete('northwind'))

		// const query3 = () => Products.map(p => p).page(1, 1)
		// console.log(orm.lambda(query3).expression)
		// console.log(orm.lambda(query3).complete('northwind'))
		// const query4 = (entity: any) => Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => (p.id === entity.id))
		// console.log(orm.lambda(query4).complete('northwind'))

		// const result = await orm.lambda(query).execute({ name: 'test1', description: 'test1' })
		// console.log(result)
		// complete = customerRepository.update(p => [p.name, p.id]).include(p => p.orders).complete()
		// console.log(complete)

		// // const orderRepository = new OrderRepository('MySQL')
		// // orderRepository.save(customer.orders, p => p.details)

		// complete = customerRepository.query().filter(p => p.name !== 'XX').include(p => p.orders.map(p => p.orderDate)).complete()
		// console.log(complete)

		// const result2 = await customerRepository.query().filter(p => p.name !== 'XX').include(p => p.orders.map(p => p.orderDate)).execute()

		// // const a = 'a'
		// // customerRepository.filter(p => p.name === a)

		// // customerRepository.query().filter(p => p.name === a).include(p => p.orders)

		// console.log(JSON.stringify(result2, null, 2))

		// const query2 = () => Customers
		// const result = await orm.lambda(query2).execute({}, 'MySQL')
		// console.log(JSON.stringify(result, null, 2))
	} catch (error) {
		console.error(error)
	} finally {
		await orm.end()
	}
})()

// export async function apply (callback: any) {
// try {
// await orm.init()

// const query = () => Products.filter(p => p.price > 10).map(p => ({ name: p.name, category: p.category.name })).sort(p => p.category).page(1, 10)
// const sentence = await orm.expression(query).plan('MySQL', 'northwind')
// console.log(sentence)
// } catch (error) {
// console.error(error)
// } finally {
// await orm.end()
// callback()
// }
// }

// apply(function () { console.log('end') })
