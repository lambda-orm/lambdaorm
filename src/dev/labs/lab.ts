import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./lambdaORM.yaml')
		// const stage = 'Source'	
		// const query = 'Products.filter(p=> in(prices,p.price)).distinct(p => p).sort(p => p.id)'
		// const context = { prices:[18,19,25]}
		const stage = 'MySql'	
		const query = 'Orders.details.filter(p => between(p.order.shippedDate, fromDate, toDate) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity }))'
		// const expected = 'Products.map(p=>{id:p.id,name:p.name,supplierId:p.supplierId,categoryId:p.categoryId,quantity:p.quantity,price:p.price,inStock:p.inStock,onOrder:p.onOrder,reorderLevel:p.reorderLevel,discontinued:p.discontinued}).sort(p=>asc(p.name))'
		// const context = {}
		// console.log( orm.normalize(query))		
		// console.log(JSON.stringify(orm.model(query)))
		console.log(JSON.stringify(orm.parameters(query)))

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
