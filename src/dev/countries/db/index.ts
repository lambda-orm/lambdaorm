import { orm, helper } from '../../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('./src/dev/labs/countries/country.yaml')

		await orm.stage.clean().execute()
		await orm.stage.sync().execute()
		const content = await helper.fs.read('./src/dev/labs/countries/data.json')
		const data = JSON.parse(content as string)
		await orm.execute('Countries.bulkInsert().include(p => p.states)', data)

		const query = `Countries.filter(p=> p.region == region)
														.map(p=> [p.name,p.subregion,p.latitude,p.longitude])
														.include(p => p.states
																					 .filter(p=> substr(p.name,1,1)=="F")
																					 .map(p=> [p.name,p.latitude,p.longitude])
																		)
														.sort(p=> p.name)
														.page(1,3)`

		const info = orm.getInfo(query)
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

apply(function () {
	console.log('end')
})
