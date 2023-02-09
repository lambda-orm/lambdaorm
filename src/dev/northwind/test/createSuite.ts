import { QueryBuildTest, NumericBuildTest, GroupByBuildTest, IncludeBuildTest, 
	InsertBuildTest, UpdateBuildTest, DeleteBuildTest, 
	QueryIntegrationBuildTest, NumericIntegrationBuildTest, GroupByIntegrationBuildTest, IncludeIntegrationBuildTest  } from './builders'
import { orm, QueryOptions } from '../../../lib'
import { h3lp } from 'h3lp'

; (async () => {
	try {
		require('dotenv').config({ path: './northwind.env' })
		await orm.init('./northwind.yaml')

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
		.build('./src/dev/test/northwind/suites/unittest')		

		const stages = ['MySQL', 'MariaDB', 'PostgreSQL', 'SqlServer']
		// ['MySQL', 'MariaDB', 'PostgreSQL','SqlServer','Oracle', 'MongoDB']
		await h3lp.test
		.createSuiteBuilder()
		.add(new QueryIntegrationBuildTest(orm,stages))
		.add(new NumericIntegrationBuildTest(orm,stages))
		.add(new GroupByIntegrationBuildTest(orm,stages))	
		.add(new IncludeIntegrationBuildTest(orm,stages))	
		.build('./src/dev/test/northwind/suites/integration')

	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
	}
	
})()