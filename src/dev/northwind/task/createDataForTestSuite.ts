import {
	QueryBuildTest, NumericBuildTest, GroupByBuildTest, IncludeBuildTest, InsertBuildTest, UpdateBuildTest, DeleteBuildTest,
	QueryIntegrationBuildTest, NumericIntegrationBuildTest, GroupByIntegrationBuildTest, IncludeIntegrationBuildTest
} from '../test/builders'
import { orm, QueryOptions } from '../../../lib'
import { h3lp } from 'h3lp'

export async function apply (stages: string[], callback: any) {
	try {
		require('dotenv').config({ path: './config/northwind.env' })
		await orm.init('./config/northwind.yaml')

		const options:QueryOptions = { stage: 'MySQL' }
		await h3lp.test
			.createSuiteBuilder()
			.add(new QueryBuildTest(orm, options))
			.add(new NumericBuildTest(orm, options))
			.add(new GroupByBuildTest(orm, options))
			.add(new IncludeBuildTest(orm, options))
			.add(new InsertBuildTest(orm, options))
			.add(new UpdateBuildTest(orm, options))
			.add(new DeleteBuildTest(orm, options))
			.build('./src/dev/northwind/test/suites/unittest')

		await h3lp.test
			.createSuiteBuilder()
			.add(new QueryIntegrationBuildTest(orm, stages))
			.add(new NumericIntegrationBuildTest(orm, stages))
			.add(new GroupByIntegrationBuildTest(orm, stages))
			.add(new IncludeIntegrationBuildTest(orm, stages))
			.build('./src/dev/northwind/test/suites/integration')
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
	}
	callback()
}
// apply(['MySQL', 'MariaDB', 'PostgreSQL', 'SqlServer'], function () { console.log('end') })
