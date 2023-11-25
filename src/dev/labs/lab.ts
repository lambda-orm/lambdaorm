import { avg, orm} from '../../lib'
import { Orders } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {		
		await orm.init('./config/northwind.yaml')
		const options = {stage:'MongoDB'}	
		
		// const query = ()=> Orders.include(p=> [p.customer,p.details.include(p=> p.product.include(p=>p.category))]).page(1,1)
		// const result = await  orm.execute(query,null,options)
		// console.log(JSON.stringify(result))

		// const query = (ordNo: number) => Orders.details.filter(o => o.orderId == ordNo).map(o => ({ id: o.orderId, result: avg(o.unitPrice) }))
		const query = (customerId: string) => 
				Orders.filter(p => p.customerId == customerId)
							.include(p => [p.customer.map(p => p.name), p.details
									.include(p => p.product
											.include(p => p.category.map(p => p.name))
									.map(p => p.name))
							.map(p => [p.quantity, p.unitPrice])])
							.page(1,3)
		// const query = (customerId: string) => 
		// 		Orders.filter(p => p.customerId == customerId)
		// 					.include(p => p.details
		// 							.include(p => p.product
		// 							.map(p => p.name))
		// 					.map(p => [p.quantity, p.unitPrice]))
		// 					.page(1,3)
		// const queryInfo = await orm.getInfo(query)
		// console.log(JSON.stringify(queryInfo, null, 2))
		const result = await orm.execute(query, { customerId: 'HANAR' }, options)
		console.log(JSON.stringify(result, null, 2))
		
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })

