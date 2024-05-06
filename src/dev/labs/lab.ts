
import { orm } from '../../lib'
import { Products } from '../northwind/model/__model'
(async () => {
	try {		
		await orm.init('./config/northwind.yaml')		
		const query = (country:string) => Products						
						.filter(p => (p.price > 5 && p.supplier.country == country) || (p.inStock < 3))						
						.having(p => max(p.price) > 50)						
						.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))						
						.sort(p => desc(p.largestPrice))
		const result = await orm.execute(query, {country:'ARG'}, {stage:'MySQL'})
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
	}
})()
