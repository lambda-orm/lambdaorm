import { orm } from '../../../lib'
import { h3lp } from 'h3lp'

export async function apply (callback: any) {
	try {
		require('dotenv').config({ path: './config/countries.env' })
		await orm.init('./config/countries.yaml')

		await orm.stage.drop().execute()
		await orm.stage.push().execute()
		const content = await h3lp.fs.read('./src/dev/countries/db/data.json')
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
