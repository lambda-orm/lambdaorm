import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init()
		const stage = 'PostgreSQL'		
		const query = 'Products.sort(p=>p.name)'
		const context = { }

		const sentence = orm.sentence(query,{stage: stage})
		console.log(sentence)
		const result = await orm.execute(query, context, {stage: stage})
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
