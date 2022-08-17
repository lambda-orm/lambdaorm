import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init()
		const stage = 'SqlServer'	
			// UPDATE e SET ReportsTo = @reportsToId FROM Employees e WHERE (e.LastName = @lastName AND e.FirstName = @firstName)
		const query = 'Employees.filter(p=> p.firstName== firstName && p.lastName== lastName).update({reportsToId:reportsToId})'
		const context = { reportsToId:1,firstName:'test',lastName:'xxx' }

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
