import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')
		const stage = 'Source'	
		const query = 'Products.filter(p=> in(prices,p.price)).distinct(p => p).sort(p => p.id)'
		const context = { prices:[18,19,25]}
		console.log(JSON.stringify(orm.parameters(query), null, 2))
		console.log(JSON.stringify(orm.sentence(query,{stage: stage}), null, 2))
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
