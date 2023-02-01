import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')
		// const stage = 'Source'	
		// const query = 'Products.filter(p=> in(prices,p.price)).distinct(p => p).sort(p => p.id)'
		// const context = { prices:[18,19,25]}
		const options = {stage:'MySQL'}	
		const query = 'Categories.delete()'
			// 'Categories.delete()',
			// 'Categories.delete(entity)',
			// 'Categories.delete(p => entity)'
			// 'Categories.delete(p => p)'
			// 'Categories.delete().filter(p => p.id === id)'
			// 'Categories.delete().filter(p => p.id === entity.id)'
			// 'Categories.deleteAll()',
			// 'Categories.deleteAll().filter(p=> substring(p.name,1,3) === "cat")',
			// 'Orders.details.delete().filter(p => p.orderId === id)',
			// 'Orders.delete().include(p => p.details)',
			// 'Orders.delete().filter(p => p.id === id).include(p => p.details)',
			// 'Orders.delete().include(p => p.details)',
			// 'Orders.details.delete(entity)',
			// 'Orders.delete(entity).include(p => p.details)',
			// 'Orders.details.deleteAll()'
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
