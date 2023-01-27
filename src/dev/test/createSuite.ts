import { QueryBuildTest, NumericBuildTest, GroupByBuildTest, IncludeBuildTest, 
	InsertBuildTest, UpdateBuildTest, DeleteBuildTest } from './builders'
import { orm, QueryOptions } from '../../lib'
import { h3lp } from 'h3lp'

; (async () => {
	try {
		await orm.init('./lambdaORM.yaml')
		const options:QueryOptions = { stage: 'MySQL' }

		await h3lp.test
		.createSuiteBuilder()
		.add(new QueryBuildTest(orm, options))
		.add(new NumericBuildTest(orm, options))
		.add(new GroupByBuildTest(orm, options))
		.add(new IncludeBuildTest(orm, options))
		.add(new InsertBuildTest(orm, options))	
		// .add(new UpdateBuildTest(orm, options))	
		// .add(new DeleteBuildTest(orm, options))
		.build('./src/dev/test/suites/unittest')

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
	}
	
})()