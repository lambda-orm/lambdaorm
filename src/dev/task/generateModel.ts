import { orm } from '../../orm'
const fs = require('fs')

export async function apply (configPath: string, callback: any) {
	try {
		await orm.init(configPath)
		const content = orm.database.model('source')
		fs.writeFileSync('src/test/model.d.ts', content)
	} catch (error) {
		console.log(error)
	} finally {
		await orm.end()
		callback()
	}
}
// apply('./lambdaorm.yaml'), function () {console.log('end') })
