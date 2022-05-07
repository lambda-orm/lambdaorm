import { orm} from '../../../lib'
import { Orders } from './../../../model/__model'

async function apply () {
	try {
		const stage = 'MongoDB'
		await orm.init()

		const context = { minValue: 10, from: '1997-01-01', to: '1997-12-31' }		
		const lambdaExpression = (minValue: number, from: Date, to: Date) => Orders.details.filter(p => between(p.order.shippedDate, from, to) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product]) 
		
		const result =orm.sentence(lambdaExpression,undefined,stage)
		console.log(result.sentence)

	} catch (error:any) {
		console.error(error)
	}finally{
		await orm.end()
	}
}

apply()