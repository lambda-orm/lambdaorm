import {
	BitwiseBuildTest, NumericBuildTest, ComparisonBuildTest, DateTimeBuildTest,
	GroupBuildTest, LogicalBuildTest, NullableBuildTest, SortBuildTest, StringBuildTest
} from '../test/builders'
import { orm, QueryOptions } from '../../../lib'
import { h3lp } from 'h3lp'

; (async () => {
	try {
		require('dotenv').config({ path: './config/countries.env' })
		await orm.init('./config/countries.yaml')

		const options:QueryOptions = { stage: 'stage1' }
		await h3lp.test
			.createSuiteBuilder()
			.add(new BitwiseBuildTest(orm, options))
			.add(new NumericBuildTest(orm, options))
			.add(new ComparisonBuildTest(orm, options))
			.add(new DateTimeBuildTest(orm, options))
			.add(new GroupBuildTest(orm, options))
			.add(new LogicalBuildTest(orm, options))
			.add(new NullableBuildTest(orm, options))
			.add(new SortBuildTest(orm, options))
			.add(new StringBuildTest(orm, options))
			.build('./src/dev/countries/test/suites/unittest')
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
	}
})()
