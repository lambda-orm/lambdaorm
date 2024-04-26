import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {
		await orm.init('./config/northwind.yaml')
		const stage = 'MongoDB'
		const query = () => Products.map(p => distinct({ category: p.category.name })).sort(p => asc(p.category))
		// const plan = orm.plan(query, { stage })
		// console.log(JSON.stringify(plan, null, 2))
		const result = await orm.execute(query, { id: 1 }, { stage })
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}
apply(function () { console.log('end') })
