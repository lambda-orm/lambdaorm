import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {
		await orm.init('./config/northwind.yaml')
		const stage = 'MongoDB'
		const query = () => Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
		const plan = orm.plan(query, { stage })
		console.log(JSON.stringify(plan, null, 2))
		// const result = await orm.execute(query, {}, { stage })
		// console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}
apply(function () { console.log('end') })
