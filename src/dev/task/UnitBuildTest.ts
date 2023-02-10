/* eslint-disable no-template-curly-in-string */
import { IOrm, QueryOptions } from '../../lib'
import { TestSuiteRequest, IBuildTest } from 'h3lp'

export abstract class UnitBuildTest implements IBuildTest {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly orm:IOrm, private readonly options:QueryOptions) {}

	protected abstract tests():string[]
	protected abstract get name():string
	public build (): TestSuiteRequest {
		return {
			name: this.name,
			cases: [
				{
					name: 'normalize',
					func: (expression: string) => this.orm.normalize(expression),
					tests: this.tests()
				},
				{
					name: 'model',
					func: (expression: string) => this.orm.model(expression),
					tests: this.tests()
				},
				{
					name: 'parameters',
					func: (expression: string) => this.orm.parameters(expression),
					tests: this.tests()
				},
				{
					name: 'constraints',
					func: (expression: string) => this.orm.constraints(expression),
					tests: this.tests()
				},
				{
					name: 'metadata',
					func: (expression: string) => this.orm.metadata(expression),
					tests: this.tests()
				},
				{
					name: 'getInfo',
					func: (expression: string) => this.orm.getInfo(expression, this.options),
					tests: this.tests()
				}
			]
		}
	}
}
