import { orm, Helper } from '../../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('C:/personal/develop/lambdaorm/src/dev/labs/countries/country.yaml')

		await orm.stage.clean('stage1').execute(true)
		await orm.stage.sync('stage1').execute()

		const content = await Helper.readFile('C:/personal/develop/lambdaorm/src/dev/labs/countries/data.json')
		const data = JSON.parse(content as string)
		await orm.execute('Countries.bulkInsert().include(p => p.states)', data)

		const query = 'Countries.filter(p=> p.region == region).page(1,3).map(p=> [p.name,p.subregion,p.latitude,p.longitude]).include(p => p.states.filter(p=> substr(p.name,1,1)=="F").map(p=> [p.name,p.latitude,p.longitude]))'

		const sentence = await orm.sentence(query)
		console.log(sentence)

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
