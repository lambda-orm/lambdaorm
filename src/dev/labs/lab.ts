import { orm } from '../../lib'
import { Categories, Customers, Products, Orders } from '../model/__model'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')		
		const options = {stage:'MongoDB'}	
		const query = () => Customers.update().include(p => p.orders.include(p => p.details))   
		// const query = () => Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
		// const query = () => Products.map(p => ({ average: round(avg(p.price), 4) }))
		const context = {
			id: 'ALFKI',
			name: 'Alfreds Futterkiste',
			contact: 'Maria Anders',
			phone: 'Sales Representative',
			address: 'Obere Str. 57',
			city: 'Berlin',
			region: null,
			postalCode: '12209',
			country: 'Germany',
			orders: [
				{
					id: 1,
					customerId: 'ALFKI',
					employeeId: 6,
					orderDate: '1997-08-24T22:00:00.000Z',
					requiredDate: '1997-09-21T22:00:00.000Z',
					shippedDate: '1997-09-01T22:00:00.000Z',
					shipViaId: 1,
					freight: '29.4600',
					name: 'Alfreds Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							orderId: 1,
							productId: 28,
							unitPrice: '45.6000',
							quantity: '15.0000',
							discount: '0.0000'
						},
						{
							orderId: 1,
							productId: 39,
							unitPrice: '18.0000',
							quantity: '21.0000',
							discount: '0.0000'
						},
						{
							orderId: 1,
							productId: 46,
							unitPrice: '12.0000',
							quantity: '2.0000',
							discount: '0.0000'
						}
					]
				},
				{
					id: 2,
					customerId: 'ALFKI',
					employeeId: 4,
					orderDate: '1997-10-02T22:00:00.000Z',
					requiredDate: '1997-10-30T23:00:00.000Z',
					shippedDate: '1997-10-12T22:00:00.000Z',
					shipViaId: 2,
					freight: '61.0200',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							orderId: 2,
							productId: 63,
							unitPrice: '43.9000',
							quantity: '20.0000',
							discount: '0.0000'
						}
					]
				},
				{
					id: 3,
					customerId: 'ALFKI',
					employeeId: 4,
					orderDate: '1997-10-12T22:00:00.000Z',
					requiredDate: '1997-11-23T23:00:00.000Z',
					shippedDate: '1997-10-20T22:00:00.000Z',
					shipViaId: 1,
					freight: '23.9400',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							orderId: 3,
							productId: 3,
							unitPrice: '10.0000',
							quantity: '6.0000',
							discount: '0.0000'
						},
						{
							orderId: 3,
							productId: 76,
							unitPrice: '18.0000',
							quantity: '15.0000',
							discount: '0.0000'
						}
					]
				},
				{
					id: 4,
					customerId: 'ALFKI',
					employeeId: 1,
					orderDate: '1998-01-14T23:00:00.000Z',
					requiredDate: '1998-02-11T23:00:00.000Z',
					shippedDate: '1998-01-20T23:00:00.000Z',
					shipViaId: 3,
					freight: '69.5300',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							orderId: 4,
							productId: 59,
							unitPrice: '55.0000',
							quantity: '15.0000',
							discount: '0.0000'
						},
						{
							orderId: 4,
							productId: 77,
							unitPrice: '13.0000',
							quantity: '2.0000',
							discount: '0.0000'
						}
					]
				},
				{
					id: 5,
					customerId: 'ALFKI',
					employeeId: 1,
					orderDate: '1998-03-15T23:00:00.000Z',
					requiredDate: '1998-04-26T22:00:00.000Z',
					shippedDate: '1998-03-23T23:00:00.000Z',
					shipViaId: 1,
					freight: '40.4200',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							orderId: 5,
							productId: 6,
							unitPrice: '25.0000',
							quantity: '16.0000',
							discount: '0.0000'
						},
						{
							orderId: 5,
							productId: 28,
							unitPrice: '45.6000',
							quantity: '2.0000',
							discount: '0.0000'
						}
					]
				},
				{
					id: 6,
					customerId: 'ALFKI',
					employeeId: 3,
					orderDate: '1998-04-08T22:00:00.000Z',
					requiredDate: '1998-05-06T22:00:00.000Z',
					shippedDate: '1998-04-12T22:00:00.000Z',
					shipViaId: 1,
					freight: '1.2100',
					name: 'Alfred-s Futterkiste',
					address: 'Obere Str. 57',
					city: 'Berlin',
					region: null,
					postalCode: '12209',
					country: 'Germany',
					details: [
						{
							orderId: 6,
							productId: 58,
							unitPrice: '13.2500',
							quantity: '40.0000',
							discount: '0.0000'
						},
						{
							orderId: 6,
							productId: 71,
							unitPrice: '21.5000',
							quantity: '20.0000',
							discount: '0.0000'
						}
					]
				}
			]
		}
		// [{ "$match" : { "_id":{{id}} } }, { "$project" :{ "_id": 0 , "name":"$ProductName", "source":255.5, "result":{ "$round" :[{ "$cond": [ { 255.5: { "$gt": 0 } } , 1, { "$cond": [ { 255.5: { "$lt": 0 } }, -1, 0] }] },10] } }} ]
		// console.log(orm.normalize(query))
		// console.log(JSON.stringify(orm.model(query)))
		// console.log(JSON.stringify(orm.parameters(query)))
		// console.log(JSON.stringify(orm.metadata(query)))
		// console.log(JSON.stringify(orm.getInfo(query,options)))
		console.log(JSON.stringify( await orm.execute(query,context,options)))

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })

