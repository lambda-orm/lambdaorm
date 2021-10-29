import { Parameter } from '../../orm'

export interface ExecutionTest {
	database: string
	result?: any
	error?: string
}
export interface ExecutionResult {
	database: string
	result?: any
}
export interface SentenceTest {
	dialect: string
	sentence?: any
	error?: string
}
export interface ExpressionTest {
	name: string
	lambda: any
	context?: any
	expression?: string
	completeExpression?: string
	model?: any
	fields?: any
	parameters?: Parameter[]
	sentences?: SentenceTest[]
	executions?: ExecutionTest[]
	error?: string
	errors?: number
	result?: any
}
export interface CategoryTest {
	name: string
	database: string
	context: any
	test: ExpressionTest[]
	errors?: number
}
export interface Test {
	database: string
	categories: CategoryTest[]
}
