import { Orm, helper } from '../../lib'

(async () => {
	const yaml = require('js-yaml')
	const workspace = './'
	const orm = new Orm(workspace)
	try {
		let schema = await orm.schema.get(workspace)
		schema = await orm.init(schema)
		helper.fs.write('./labs/schema/resultConfig.yaml', yaml.dump(schema, { noRefs: true }))
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
