/* eslint-disable no-template-curly-in-string */
import { IOrm } from '../../lib'
import { TestSuiteRequest, IBuildTest, TestCaseRequest } from 'h3lp'

export abstract class IntegrationBuildTest implements IBuildTest {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly orm:IOrm, protected readonly stages:string[]) {}

	protected abstract tests():string[]
	public abstract build(): TestSuiteRequest
	protected cases (): TestCaseRequest[] {
		const cases:TestCaseRequest[] = []
		for (const stage of this.stages) {
			cases.push({
				name: stage,
				func: async (expression: string, context:any) => {
					return await this.orm.execute(expression, context, { stage })
				},
				tests: this.tests()
			})
		}
		return cases
	}
}
