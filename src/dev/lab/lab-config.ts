import { Orm, Helper } from '../../orm'

(async () => {
	const yaml = require('js-yaml')
	const workspace = './'
	const orm = new Orm(workspace)
	try {
		let config = await orm.lib.getConfig(workspace)
		config = await orm.init(config)
		Helper.writeFile('./labs/config/resultConfig.yaml', yaml.dump(config, { noRefs: true }))
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
