import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./src/dev/labs/lab01/lambdaORM.yaml')
		const stage = 'default'	
			// UPDATE e SET ReportsTo = @reportsToId FROM Employees e WHERE (e.LastName = @lastName AND e.FirstName = @firstName)
		const query = 'Countries.filter(p=> in(p.iso3,codes)).page(1,10).include(p=>p.states)'
		// const query = 'Countries'
		const context = { codes: ['MAF','VCT','PRT'] }
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
