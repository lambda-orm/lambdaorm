import { Orm } from '../../../lib'
import path from 'path'

(async () => {
	const workspace = path.join(process.cwd(), '/src/dev/labs/devicenet-sync')
	const orm = new Orm(workspace)
	try {
		const schema = await orm.schema.get(workspace)
		await orm.init(schema)
		await orm.stage.clean(orm.defaultStage.name).execute()
		await orm.stage.sync(orm.defaultStage.name).execute()
		const users = [{ username: 'flaviolrita', email: 'FLAVIOLIONELRITA@HOTMAIL.COM', firstname: 'Flavio Lionel', lastname: 'Rita' }]
		await orm.execute('Users.bulkInsert()', users)
		const result = await orm.execute('Users.map(p=> {name: concat(p.firstname," ",p.lastname),mail:p.email,createdDate:p.created})')
		console.log(JSON.stringify(result))
		const result2 = await orm.execute('Users.map(p=> p.email)')
		console.log(JSON.stringify(result2))
		const result3 = await orm.execute('Users.map(p=> [p.firstname,p.lastname,p.email,p.created])')
		console.log(JSON.stringify(result3))
		// await orm.stage.clean(orm.defaultStage.name).execute()
	} catch (error:any) {
		console.error(`error: ${error}`)
		console.error(`error: ${error.stack}`)
	} finally {
		orm.end()
	}
})()
