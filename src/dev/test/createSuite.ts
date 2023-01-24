import { QueryBuildTest } from './builders'
import { orm, QueryOptions } from '../../lib'
import { h3lp } from 'h3lp'

; (async () => {
	try {
		await orm.init('./lambdaORM.yaml')
		const options:QueryOptions = { stage: 'MySQL' }

		await h3lp.test
		.createSuiteBuilder()
		.add(new QueryBuildTest(orm, options))		
		.build('./src/dev/test/suites/unittest')

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
	}
	
})()