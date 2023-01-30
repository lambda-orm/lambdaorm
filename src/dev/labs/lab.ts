import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')
		// const stage = 'Source'	
		// const query = 'Products.filter(p=> in(prices,p.price)).distinct(p => p).sort(p => p.id)'
		// const context = { prices:[18,19,25]}
		const options = {stage:'MySQL'}	
		const query = 'Orders.bulkInsert().include(p => [p.details, p.customer])'
		// Categories.insert({name:name,description:description})
		// Categories.insert([name,description])
		// Orders.insert()
		// Orders.insert().include(p => p.details)
		// Orders.insert().include(p => p.details.insert())
		// Orders.insert().include(p => [p.details, p.customer])
		// Orders.bulkInsert().include(p => p.details)
		// Orders.bulkInsert().include(p => [p.details, p.customer])
		console.log( orm.normalize(query))		
		console.log(JSON.stringify(orm.model(query)))
		console.log(JSON.stringify(orm.parameters(query)))
		console.log(JSON.stringify(orm.constraints(query)))
		console.log(JSON.stringify(orm.metadata(query)))
		console.log(JSON.stringify(orm.getInfo(query,options)))

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
