import { Orm } from '../../lib'

(async () => {
	const orm = new Orm()
	try {
		const schema = await orm.init('./dev/labs')
		console.log(JSON.stringify(schema))
	} catch (error:any) {
		console.error(`error: ${error}`)
		console.error(error.stack)
	} finally {
		orm.end()
	}
})()
