import { Orm } from '../../lib'
import { h3lp } from 'h3lp'

(async () => {
	const yaml = require('js-yaml')
	const workspace = './'
	const orm = new Orm(workspace)
	try {
		const schema = await orm.init(workspace)
		h3lp.fs.write('./labs/schema/resultConfig.yaml', yaml.dump(schema, { noRefs: true }))
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
