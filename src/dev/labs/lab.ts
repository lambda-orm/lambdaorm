import { orm } from '../../lib'
import { Categories } from '../../model'

export async function apply (callback: any) {
	try {
		await orm.init()

		// const query = () => Products.filter(p => p.price > 10).map(p => ({ name: p.name, category: p.category.name })).sort(p => p.category).page(1, 10)
		const query = () => Categories

		const sentence = await orm.sentence(query, 'source')
		console.log(sentence)
		const result = await orm.execute(query, {}, 'source')
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
