import { Orm } from '../../orm'

(async () => {
	const workspace = './labs/countries'
	const orm = new Orm(workspace)
	try {
		const config = await orm.lib.getConfig(workspace)
		const db = orm.lib.getDatabase(undefined, config)
		await orm.init(config)

		await orm.database.sync(db.name).execute()
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
