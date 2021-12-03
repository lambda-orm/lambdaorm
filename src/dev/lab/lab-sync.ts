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

		result = await orm.execute('Countries.deleteAll()')
		result = await orm.execute('States.deleteAll()')

		const strData = await Helper.readFile(path.join(process.cwd(), '/labs/countries/data.json' as string))
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
