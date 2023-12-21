import { orm} from '../../../lib'
import { max } from 'lambdaorm-base'
import { Products } from '../../northwind/model/__model'

async function apply () {
	try {
		const stage = 'MongoDB'
		await orm.init()

		// const context = { minValue: 10, from: '1997-01-01', to: '1997-12-31' }		
		// const lambdaExpression = (minValue: number, from: Date, to: Date) => Orders.details.filter(p => between(p.order.shippedDate, from, to) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product]) 
		
		const context = {}
		//const lambdaExpression =  () => Products.map( p => ({ maxPrice: max(p.price) }))
		const lambdaExpression =  () => Products.map(p => ({ category: p.categoryId,supplier: p.supplierId, largestPrice: max(p.price) })) 


		const result =orm.plan(lambdaExpression,{ stage: stage})
		console.log(result.sentence)
		const data = await orm.execute(lambdaExpression,context,{ stage: stage})
		console.log(JSON.stringify(data, null,2))

	} catch (error:any) {
		console.error(error)
	}finally{
		await orm.end()
	}
}

apply()