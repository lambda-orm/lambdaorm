import { orm} from '../../lib'
import { Orders } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {		
		await orm.init('./config/northwind.yaml')
		const options = {stage:'MySQL'}	
		
		// const query = ()=> Orders.include(p=> [p.customer,p.details.include(p=> p.product.include(p=>p.category))]).page(1,1)
		// const result = await  orm.execute(query,null,options)
		// console.log(JSON.stringify(result))

		const query = (ordNo: number) => Orders.details.filter(o => o.orderId == ordNo).map(o => ({ id: o.orderId, result: avg(o.unitPrice) }))
		const queryInfo = await orm.getInfo(query)
		console.log(JSON.stringify(queryInfo))
		// const result = await orm.execute(query, { ordNo: 5 }, options)
		// console.log(JSON.stringify(result))
		
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })

