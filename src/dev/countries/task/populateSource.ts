import { orm, helper } from '../../../lib'

export async function apply (callback: any) {
	try {
		require('dotenv').config({ path: './config/countries.env' })
		await orm.init('./config/countries.yaml')

		await orm.stage.clean().execute()
		await orm.stage.sync().execute()
		const content = await helper.fs.read('./src/dev/countries/db/data.json')
		const data = JSON.parse(content as string)
		await orm.execute('Countries.bulkInsert().include(p => p.states)', data)
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}
// apply(function () { console.log('end') })
