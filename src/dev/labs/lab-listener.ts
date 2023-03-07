import { orm ,ActionObserver ,SentenceAction, ActionObserverArgs } from '../../lib'

class EmployeeUpdateObserver extends ActionObserver {
	constructor() {
		super([SentenceAction.update],'query.entity=="Employees"',true)
	}

	public async before(args:ActionObserverArgs): Promise<void> {
		console.log(`before expression: ${args.expression}`)
	}

	public async after(args:ActionObserverArgs): Promise<void>  {
		console.log(`after result: ${JSON.stringify(args.result)}`)
	}

	public async error(args:ActionObserverArgs): Promise<void>  {
		console.log(`error: ${args.error.message}`)
	}	
}


export async function apply (callback: any) {
	try {
		await orm.init('./config/northwind.yaml')
		orm.subscribe(new EmployeeUpdateObserver())

		const options = {stage:'MySQL'}		
		const query = 'Employees.filter(p=> p.firstName== firstName && p.lastName== lastName).update({reportsToId:reportsToId})'
		const context = {reportsToId: 1, firstName: 'test', lastName: 'xxx'}

		const info = orm.getInfo(query,options)
		console.log(info)
		const result = await orm.execute(query, context, options)
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
