import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {
		await orm.init('./config/northwind.yaml')
		const stage = 'MongoDB'
		const query = (id:number) => Products.filter(p => (p.id === id)).map(p => [{ name: p.name, source: 25.75, result: round(floor(25.75), 10) }])
		const plan = orm.plan(query, { stage })
		console.log(JSON.stringify(plan, null, 2))
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
