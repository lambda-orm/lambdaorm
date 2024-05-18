import { orm } from '../../lib'
// import { Products } from '../northwind/model/__model'
(async () => {
	try {
		await orm.init('./config/northwind.yaml')
		const query =
		`Orders
			.filter(p => p.id === id)
			.include(p => 
				[ p.customer.map(p => p.name), 
					p.details.include(p => 
							p.product
							 .include(p => p.category.map(p => p.name))
							 .map(p => p.name))
					 .map(p => [p.quantity, p.unitPrice])
				]
			)
		`
		const params = { id: 102 }
		const result = await orm.execute(query, params, { stage: 'PostgreSQL' })
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.message)
	} finally {
		await orm.end()
	}
})()
