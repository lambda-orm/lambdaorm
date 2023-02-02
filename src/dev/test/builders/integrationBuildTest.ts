/* eslint-disable no-template-curly-in-string */
import { IOrm } from '../../../lib'
import { TestSuiteRequest, IBuildTest, TestCaseRequest } from 'h3lp'

export abstract class IntegrationBuildTest implements IBuildTest {

	public constructor(private readonly orm:IOrm){}

	protected abstract tests():string[]
	public abstract build(): TestSuiteRequest 
	protected cases(): TestCaseRequest[] {
		return [
			{
				name: 'MySQL',
				func: async (expression: string,context:any)  => { 
					return  await this.orm.execute(expression,context,{stage:'MySQL'})
				},
				tests: this.tests()
			},
			{
				name: 'MariaDB',
				func: async (expression: string,context:any)  => { 
					return  await this.orm.execute(expression,context,{stage:'MariaDB'})
				},
				tests: this.tests()
			},
			{
				name: 'PostgreSQL',
				func: async (expression: string,context:any)  => { 
					return  await this.orm.execute(expression,context,{stage:'PostgreSQL'})
				},
				tests: this.tests()
			},
			{
				name: 'SqlServer',
				func: async (expression: string,context:any)  => { 
					return  await this.orm.execute(expression,context,{stage:'SqlServer'})
				},
				tests: this.tests()
			},
			{
				name: 'Oracle',
				func: async (expression: string,context:any)  => { 
					return  await this.orm.execute(expression,context,{stage:'Oracle'})
				},
				tests: this.tests()
			},
			{
				name: 'MongoDB',
				func: async (expression: string,context:any)  => { 
					return  await this.orm.execute(expression,context,{stage:'MongoDB'})
				},
				tests: this.tests()
			}
		]
	}
}