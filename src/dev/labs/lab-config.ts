import { LoggerBuilder, Orm, OrmH3lp } from '../../lib'
import { h3lp } from 'h3lp'

(async () => {
	const orm = new Orm()
	const helper = new OrmH3lp(h3lp, new LoggerBuilder().build())	
	try {
		const schema = await orm.init('./')
		h3lp.fs.write('./labs/schema/resultConfig.yaml', helper.yaml.dump(schema, { noRefs: true }))
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
