import { orm } from '../../lib'
// import { Categories } from '../../model'

export async function apply (callback: any) {
	try {
		await orm.init()

		// const query = () => Products.filter(p => p.price > 10).map(p => ({ name: p.name, category: p.category.name })).sort(p => p.category).page(1, 10)
		// const query = 'Orders.details.filter(p=>(between(p.order.shippedDate,from,to)&&(p.unitPrice>minValue))).map(p=>{category:p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity}).sort(p=>[p.category,p.product])'
		// const query = 'Products.sort(p=> p.id).page(1,1)'
		const query = 'Products.first(p=>p)'
		const context = { minValue: 10, from: '1997-01-01', to: '1997-12-31' }

		const sentence = await orm.sentence(query,{stage: 'SqlServer'})
		console.log(sentence)
		const result = await orm.execute(query, context, {stage: 'SqlServer'})
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
