import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init()
		const stage = 'Oracle'		
		const query = 'Products.sort(p=>p.id).page(1,1)'
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
