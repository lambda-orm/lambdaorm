import { Orm } from '../../../lib'
import path from 'path'

(async () => {
	const workspace = path.join(process.cwd(), '/src/dev/labs/devicenet-sync')
	const orm = new Orm(workspace)
	try {
		const schema = await orm.schema.get(workspace)
		await orm.init(schema)
		await orm.stage.sync(orm.defaultStage.name).execute()
		await orm.stage.clean(orm.defaultStage.name).execute()
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
