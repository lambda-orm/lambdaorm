import { orm, Helper } from '../../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('C:/personal/develop/lambdaorm/src/dev/labs/countries/country.yaml')

		await orm.stage.sync('stage1').execute()

		const content = await Helper.readFile('C:/personal/develop/lambdaorm/src/dev/labs/countries/data.json')
		const data = JSON.parse(content as string)
		await orm.execute('Countries.bulkInsert().include(p => p.states)', data)

		const query = 'Countries.page(1,10).include(p => p.states.map(p=> [p.name,p.latitude,p.longitude] ))'

		const result = await orm.execute(query)
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
