import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {		
		await orm.init('./config/northwind.yaml')
		const options = {stage:'MongoDB'}	
		
		const query = () => Products.map(p => ({ maxPrice: max(p.price) }))
		const result = await orm.execute(query, {}, options)
		console.log(JSON.stringify(result, null, 2))
		
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })

