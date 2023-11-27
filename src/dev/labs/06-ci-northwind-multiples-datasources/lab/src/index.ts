import { orm } from '../../../../../lib'
import { h3lp } from 'h3lp'


(async () => {
	try {	
		await orm.init('./src/dev/labs/06-ci-northwind-multiples-datasources/lab/lambdaORM.yaml')
		const content = await h3lp.fs.read('./src/dev/labs/06-ci-northwind-multiples-datasources/lab/data.json') || ''
		const data = JSON.parse(content)
		await orm.stage.clean( {tryAllCan:true }).execute()
		await orm.stage.sync().execute()
		await orm.stage.import().execute(data)
		const query = `Orders.filter(p => p.customerId == customerId)
												 .include(p => [p.customer.map(p => p.name), 
													  p.details.include(p => p.product.include(p => p.category.map(p => p.name))
													    .map(p => p.name))
													.map(p => [p.quantity, p.unitPrice])])
													.page(1,1)
		`
		const plan = orm.plan(query)
		console.log(JSON.stringify(plan,null,2))
		const result = await orm.execute(query, { customerId: 'HANAR' })
		console.log(JSON.stringify(result,null,2))		
	} catch (error: any) {
		console.error(error)
	} finally{
    await orm.end()
  }
})()
