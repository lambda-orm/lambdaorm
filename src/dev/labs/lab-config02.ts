import { Orm } from '../../lib'

(async () => {
	const workspace = './dev/labs'
	const orm = new Orm(workspace)
	try {
		let schema = await orm.schema.get(workspace)
		schema = await orm.init(schema)
		console.log(JSON.stringify(schema))
	} catch (error:any) {
		console.error(`error: ${error}`)
		console.error(error.stack)
	} finally {
		orm.end()
	}
})()
