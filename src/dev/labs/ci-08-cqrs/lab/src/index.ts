import { ExecuteResult, LogLevel, orm } from '../../../../../lib'
import { h3lp } from 'h3lp'


const showResults = async (results: ExecuteResult[]) => {
	for(const result of results){
		if(result.error){
			await orm.logger.log(`${result.description} ${result.error}`, LogLevel.ERROR)
		} else {
			await orm.logger.log(result.description, LogLevel.INFO)
		}
		
	}
}

(async () => {
	try {
		const workspace = __dirname.replace('/build/','/src/')
		await orm.init(workspace + '/../lambdaORM.yaml')
		const content = await h3lp.fs.read(workspace + '/../data.json') || ''
		const data = JSON.parse(content)
		await showResults(await orm.stage.drop( { stage:"default", tryAllCan:true }).execute())
		await showResults(await orm.stage.drop( { stage:"insights", tryAllCan:true }).execute())
		await showResults(await orm.stage.push({ stage:"default"}).execute())
		await showResults(await orm.stage.push({ stage:"insights"}).execute())
		await orm.stage.import({ stage:"default"}).execute(data)
		
		const query =  
		`Orders.filter(p => p.customerId == customerId)
		.include(p => [p.details.include(p=> p.product.map(p=>p.name))
			              .map(p=> {subTotal: p.quantity * p.unitPrice}) ,
						      p.customer.map(p => p.name)
									])
		.order(p=> p.orderDate)							
		.page(1,1)
	`
		
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
