import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')
		// const stage = 'Source'	
		// const query = 'Products.filter(p=> in(prices,p.price)).distinct(p => p).sort(p => p.id)'
		// const context = { prices:[18,19,25]}
		const stage = 'SqlServer'	
		const query = 'Employees.update({reportsToId:reportsToId}).filter(p=> p.lastName==lastName && p.firstName==firstName)'
		const context = {reportsToId:2,lastName:"Davolio",firstName:"Nancy"}
		
		console.log(JSON.stringify(orm.parameters(query), null, 2))
		console.log(JSON.stringify(orm.getInfo(query,{stage: stage}), null, 2))
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
