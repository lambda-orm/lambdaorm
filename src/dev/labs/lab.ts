import { orm } from '../../lib'
// import { Categories } from '../../model'

export async function apply (callback: any) {
	try {
		await orm.init()
		const stage = 'SqlServer'		
		const query = 'Orders.update(entity)'
		const context = {
			entity: {
				id: 8,
				customerId: 'ANATR',
				employeeId: 3,
				orderDate: '1997-08-07T22:00:00.000Z',
				requiredDate: '1997-09-04T22:00:00.000Z',
				shippedDate: '1997-08-13T22:00:00.000Z',
				shipViaId: 1,
				freight: '43.9000',
				name: 'Ana Trujillo Emparedados y helados',
				address: 'Avda. de la Constitución 2222',
				city: 'Mexico D.F.',
				region: null,
				postalCode: '5021',
				country: 'Mexico',
				details: [
					{
						orderId: 8,
						productId: 14,
						unitPrice: '23.2500',
						quantity: '3.0000',
						discount: '0.0000'
					},
					{
						orderId: 8,
						productId: 42,
						unitPrice: '14.0000',
						quantity: '5.0000',
						discount: '0.0000'
					},
					{
						orderId: 8,
						productId: 60,
						unitPrice: '34.0000',
						quantity: '10.0000',
						discount: '0.0000'
					}
				]
			}
		}

		const sentence = await orm.sentence(query,{stage: stage})
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
