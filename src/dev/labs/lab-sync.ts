import { Orm, Helper } from '../../lib'
import path from 'path'

(async () => {
	const workspace = './labs/countries'
	const orm = new Orm(workspace)
	try {
		let result:any
		const schema = await orm.schema.get(workspace)
		await orm.init(schema)
		await orm.stage.sync({stage:orm.defaultStage.name}).execute()

		result = await orm.execute('Countries.deleteAll()')
		result = await orm.execute('States.deleteAll()')

		const strData = await Helper.fs.read(path.join(process.cwd(), '/labs/countries/data.json' as string))
		const data = JSON.parse(strData as string)

		result = await orm.execute('Countries.bulkInsert().include(p => p.states)', data)

		result = await orm.execute('Countries.map(p=>p).include(p => p.states)', data)
		console.log(JSON.stringify(result, null, 2))
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
