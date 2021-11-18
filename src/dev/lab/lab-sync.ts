import { Orm, Helper } from '../../orm'
import path from 'path'

(async () => {
	const workspace = './labs/countries'
	const orm = new Orm(workspace)
	try {
		let result:any
		const config = await orm.lib.getConfig(workspace)
		const ds = orm.lib.getDatastore(undefined, config)
		await orm.init(config)

		await orm.datastore.sync(ds.name).execute()

		result = await orm.expression('Countries.deleteAll()').execute({}, ds.name)
		result = await orm.expression('States.deleteAll()').execute({}, ds.name)

		const strData = await Helper.readFile(path.join(process.cwd(), '/labs/countries/data.json' as string))
		const data = JSON.parse(strData as string)

		result = await orm.expression('Countries.bulkInsert().include(p => p.states)').execute(data, ds.name)

		result = await orm.expression('Countries.map(p=>p).include(p => p.states)').execute(data, ds.name)
		console.log(JSON.stringify(result, null, 2))
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
