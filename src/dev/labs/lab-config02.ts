import { Orm } from '../../lib'

(async () => {
	const workspace = './dev/labs'
	const orm = new Orm(workspace)
	try {
		const schema = await orm.init(workspace)
		console.log(JSON.stringify(schema))
	} catch (error:any) {
		console.error(`error: ${error}`)
		console.error(error.stack)
	} finally {
		orm.end()
	}
})()
