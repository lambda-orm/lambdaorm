import { orm} from '../../lib'
import { Orders } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {

		// const a = test2(['a', 1])('dds')

		await orm.init('./config/northwind.yaml')
		const options = {stage:'MySQL'}	
		// expect(orm.parameters('Products.filter(p => p.id === id).map(p => p).sort(p => p.id)')).toStrictEqual([{'name':'id','type':'integer'}])

		const query = 'Products.filter(p => p.id === id).map(p => p).sort(p => p.id)'	
		const context = { id :1 }		
		console.log(JSON.stringify(orm.parameters(query)))
		// console.log(JSON.stringify(orm.metadata(query)))
		// console.log(JSON.stringify(orm.getInfo(query,options),null,2))
		// console.log(JSON.stringify( await orm.execute(query,context,options),null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })

