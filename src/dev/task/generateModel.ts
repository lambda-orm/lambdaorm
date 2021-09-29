import { orm } from '../../orm'
const fs = require('fs')

export async function apply (callback: any) {
	try {
		await orm.init()
		const content = orm.database.model('source')
		fs.writeFileSync('src/test/model.d.ts', content)
	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
		callback()
	}
}
// apply(function () {console.log('end') })
