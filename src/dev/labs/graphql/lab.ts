import { orm} from '../../../lib'
import { Orders } from '../../northwind/model/__model'

export async function apply (callback: any) {
	try {
		await orm.init('./config/northwind.yaml')
		const options = {stage:'MySQL'}	
		// expect(orm.parameters('Products.filter(p => p.id === id).map(p => p).sort(p => p.id)')).toStrictEqual([{'name':'id','type':'integer'}])

		const query = 'Products.filter(p => p.id === id).map(p => p).sort(p => p.id)'	
		const context = { id :1 }		
		console.log(JSON.stringify(orm.normalize(query)))
		const ql = 'Product(id:1){ name supplier { name contact phone } }'

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })

