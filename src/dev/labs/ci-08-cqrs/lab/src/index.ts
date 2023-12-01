import { orm } from '../../../../../lib'
import { h3lp } from 'h3lp'


(async () => {
	try {
		await orm.init('./src/dev/labs/ci-08-cqrs/lab/lambdaORM.yaml')
		const content = await h3lp.fs.read('./src/dev/labs/ci-08-cqrs/lab/data.json') || ''
		const data = JSON.parse(content)
		await orm.stage.drop( { stage:"default", tryAllCan:true }).execute()
		await orm.stage.drop( { stage:"insights", tryAllCan:true }).execute()
		await orm.stage.sync({ stage:"default"}).execute()
		await orm.stage.sync({ stage:"insights"}).execute()
		await orm.stage.import({ stage:"default"}).execute(data)
		
		const query =  
		`Orders.filter(p => p.customerId == customerId)
			.include(p => p.customer.map(p => p.name))
			.page(1,1)`
		
		let plan: any,result:any 
		plan = orm.plan(query,{ stage:"default"})
		console.log(JSON.stringify(plan,null,2))
		plan = orm.plan(query,{ stage:"insights"})
		console.log(JSON.stringify(plan,null,2))
		result = await orm.execute(query, { customerId: 'HANAR' },{ stage:"default"})
		console.log(JSON.stringify(result,null,2))
		// It waits one second since the expression executed by the listener in cqrs is asynchronous
		await (new Promise(resolve => setTimeout(resolve, 1000)))
		result = await orm.execute(query, { customerId: 'HANAR' },{ stage:"insights"})
		console.log(JSON.stringify(result,null,2))			
	} catch (error: any) {
		console.error(error)
	} finally{
    await orm.end()
  }
})()
