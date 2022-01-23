import { Orm, Helper } from '../../lib'

(async () => {
	const yaml = require('js-yaml')
	const workspace = './'
	const orm = new Orm(workspace)
	try {
		let schema = await orm.lib.getConfig(workspace)
		schema = await orm.init(schema)
		Helper.writeFile('./labs/schema/resultConfig.yaml', yaml.dump(schema, { noRefs: true }))
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
