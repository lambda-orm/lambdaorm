import { orm, Respository } from '../../orm'

class Customers extends Respository<Customer, QryCustomer> {
	constructor (database: string) {
		super('Customers', database)
	}

	async findByName (firstName: string, lastName: string):Promise<Customer[]> {
		return await this.query.filter(p => p.name === firstName).execute({ firstName: firstName, lastName: lastName })
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
		const customers = new Customers('mysql')
		const customer = new Customer()
		customer.name = 'a'
		customer.orders.push(new Order())
		customers.insert.include(p => p.orders).execute(customer)

		// const orderRespository = new OrderRepository('mysql')
		// orderRespository.save(customer.orders, p => p.details)

		const result2 = await customers.query.filter(p => p.name !== 'XX').include(p => p.orders.map(p => p.orderDate)).execute()

		// const a = 'a'
		// customerRepository.filter(p => p.name === a)

		// customerRepository.query().filter(p => p.name === a).include(p => p.orders)

		console.log(JSON.stringify(result2, null, 2))

		const query = () => Customers
		const result = await orm.lambda(query).execute('mysql')
		console.log(JSON.stringify(result, null, 2))
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
