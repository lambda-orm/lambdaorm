import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')
		const stage = 'Source'	
		const query = 'Products.distinct(p => p).sort(p => p.id)'
		const context = {}
		const parameters = orm.parameters(query)
		console.log(JSON.stringify(parameters))		
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
