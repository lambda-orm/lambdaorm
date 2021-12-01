import { Orm } from '../../orm'

(async () => {
	const workspace = './'
	const orm = new Orm(workspace)
	try {
		const config = await orm.lib.getConfig(workspace)
		console.log(JSON.stringify(config, null, 2))
		const ds = orm.lib.getDatastore(undefined, config)
		console.log(ds.name)
		await orm.init(config)
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
