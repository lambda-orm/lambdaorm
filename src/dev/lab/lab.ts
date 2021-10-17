import { orm, Respository } from '../../orm'
import { Customer, Order } from '../../model'

class CustomerRespository extends Respository<Customer, QryCustomer> {
	constructor (database: string) {
		super('Customers', database)
	}

	async findByName (firstName: string, lastName: string):Promise<Customer[]> {
		return await this.query().filter(p => p.name === firstName).execute({ firstName: firstName, lastName: lastName })
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public lambda (func: Function):string {
		return orm.lambda(func).complete('')
	}
}
// class OrderRepository extends Respository<Order, QryOrder> {
// constructor (database: string) {
// super('Orders', database)
// }
// }

(async () => {
	try {
		await orm.init()
		const customerRepository = new CustomerRespository('mysql')
		const customer = new Customer()
		customer.name = 'a'
		customer.orders.push(new Order())
		const name = 'a'
		let complete = customerRepository.insert(() => ({ name: name })).include(p => p.orders).complete()
		console.log(complete)
		const query = (name: string, description: string) => Categories.insert(() => ({ name: name, description: description }))
		complete = orm.lambda(query).complete('northwind')
		console.log(complete)

		const result = await orm.lambda(query).execute({ name: 'test1', description: 'test1' })
		console.log(result)
		// complete = customerRepository.update(p => [p.name, p.id]).include(p => p.orders).complete()
		// console.log(complete)

		// // const orderRespository = new OrderRepository('mysql')
		// // orderRespository.save(customer.orders, p => p.details)

		// complete = customerRepository.query().filter(p => p.name !== 'XX').include(p => p.orders.map(p => p.orderDate)).complete()
		// console.log(complete)

		// const result2 = await customerRepository.query().filter(p => p.name !== 'XX').include(p => p.orders.map(p => p.orderDate)).execute()

		// // const a = 'a'
		// // customerRepository.filter(p => p.name === a)

		// // customerRepository.query().filter(p => p.name === a).include(p => p.orders)

		// console.log(JSON.stringify(result2, null, 2))

		// const query2 = () => Customers
		// const result = await orm.lambda(query2).execute({}, 'mysql')
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
