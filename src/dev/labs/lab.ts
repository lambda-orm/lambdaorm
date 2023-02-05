import { orm } from '../../lib'
import { Categories, Customers, Products, Orders } from '../model/__model'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')		
		const options = {stage:'Oracle'}	
		const query = () => Products.filter(p => p.discontinued !== false).map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => [p.category, desc(p.name)])
		const context = {	}
		// console.log(orm.normalize(query))
		// console.log(JSON.stringify(orm.model(query)))
		// console.log(JSON.stringify(orm.parameters(query)))
		// console.log(JSON.stringify(orm.metadata(query)))
		console.log(JSON.stringify(orm.getInfo(query,options)))
		// console.log( await orm.execute(query,context,options))

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
