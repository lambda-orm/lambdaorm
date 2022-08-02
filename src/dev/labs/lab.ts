import { orm } from '../../lib'
// import { Categories } from '../../model'

export async function apply (callback: any) {
	try {
		await orm.init()
		const stage = 'SqlServer'		
		const query = 'Orders.update().include(p=>p.details)'
		const context = {
			id: 7,
			customerId: 'ANATR',
			employeeId: 7,
			orderDate: '1996-09-17T22:00:00.000Z',
			requiredDate: '1996-10-15T22:00:00.000Z',
			shippedDate: '1996-09-23T22:00:00.000Z',
			shipViaId: 3,
			freight: '1.6100',
			name: 'Ana Trujillo Emparedados y helados',
			address: 'Avda. de la Constitución 2222',
			city: 'Mexico D.F.',
			region: null,
			postalCode: '5021',
			country: 'Mexico',
			details: [
				{
					orderId: 7,
					productId: 69,
					unitPrice: '28.8000',
					quantity: '1.0000',
					discount: '0.0000'
				},
				{
					orderId: 7,
					productId: 70,
					unitPrice: '12.0000',
					quantity: '5.0000',
					discount: '0.0000'
				}
			]
		}

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
