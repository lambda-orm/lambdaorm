import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {
		await orm.init('./config/northwind.yaml')
		const query = () => Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
		const result = await orm.execute(query, {}, { stage: 'MySQL' })
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}
apply(function () { console.log('end') })
