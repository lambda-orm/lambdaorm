import { orm } from '../../lib'

export async function apply (callback: any) {
	try {
		require('dotenv').config({ path: './config/countries.env' })
		await orm.init('./config/countries.yaml')

		const query = `Countries.filter(p=> p.region == region)
		.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
		.include(p => p.states
		.filter(p=> substr(p.name,1,1)=="F")
		.map(p=> [p.name,p.latitude,p.longitude])
		)
		.sort(p=> p.name)
		.page(1,3)`
		const info = orm.plan(query)
		console.log(info)
		const result = await orm.execute(query, { region: 'Asia' })
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}
apply(function () { console.log('end') })
