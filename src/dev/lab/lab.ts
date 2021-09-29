import { orm } from '../../orm'
const path = require('path')

export async function apply (configPath: string, callback: any) {
	try {
		await orm.init(configPath)

		const query = () => Products.filter(p => p.price > 10).map(p => ({ name: p.name, category: p.category.name })).sort(p => p.category).page(1, 10)
		const sentence = await orm.lambda(query).sentence('mysql', 'northwind:0.0.2')
		console.log(sentence)
	} catch (error) {
		console.error(error)
	} finally {
		await orm.end()
		callback()
	}
}
apply(path.join(process.cwd(), 'src/test/config.yaml'), function () { console.log('end') })
