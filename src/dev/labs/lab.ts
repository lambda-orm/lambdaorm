import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')		
		const options = {stage:'MySQL'}	
		const query = 'Orders.update()'
		const context = { id: 1 , minValue: 10, fromDate: '1997-01-01', toDate: '1997-12-31' }			
		// console.log(JSON.stringify(orm.parameters(query)))
		const normalized = orm.normalize(query)
		console.log(normalized)
		console.log(JSON.stringify(orm.getInfo(query,options)))
		console.log(JSON.stringify(orm.getInfo(normalized,options)))
		// console.log( await orm.execute(query,context,options))

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
