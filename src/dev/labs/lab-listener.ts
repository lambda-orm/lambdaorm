import { orm ,ActionObserver ,ObservableAction, OrmOptions, Query } from '../../lib'

class EmployeeUpdateObserver extends ActionObserver {
	constructor() {
		super(ObservableAction.update,'query.entity=="Employees"')
	}

	public before(query: Query, data: any, options: OrmOptions): void {
		console.log(`before sentence: ${query.sentence}`)
	}

	public after(query: Query, data: any, options: OrmOptions, result: any): void {
		console.log(`after result: ${JSON.stringify(result)}`)
	}

	public error(query: Query, data: any, options: OrmOptions, error: any): void {
		console.log(`error: ${error.message}`)
	}	
}


export async function apply (callback: any) {
	try {
		await orm.init()
		orm.subscribe(new EmployeeUpdateObserver())

		const stage = 'SqlServer'	
		const query = 'Employees.filter(p=> p.firstName== firstName && p.lastName== lastName).update({reportsToId:reportsToId})'
		const context = {reportsToId: 1, firstName: 'test', lastName: 'xxx'}

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
