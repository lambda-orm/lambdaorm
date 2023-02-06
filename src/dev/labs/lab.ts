import { orm } from '../../lib'
import { Categories, Customers, Products, Orders } from '../model/__model'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')		
		const options = {stage:'SqlServer'}	
		const query = (id: number) => Orders.filter(p => p.id === id).include(p => p.customer) 
		const context = { id: 1 }
		// console.log(orm.normalize(query))
		// console.log(JSON.stringify(orm.model(query)))
		console.log(JSON.stringify(orm.parameters(query)))
		// console.log(JSON.stringify(orm.metadata(query)))
		console.log(JSON.stringify(orm.getInfo(query,options)))
		console.log(JSON.stringify( await orm.execute(query,context,options)))

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
