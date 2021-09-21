import { Parameter } from '../../orm'

export interface Test {
	schema: string
	categories: CategoryTest[]
}
export interface CategoryTest {
	name: string
	schema: string
	context: any
	test: ExpressionTest[]
	errors?: number
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
export interface SentenceTest {
	dialect: string
	sentence?: any
	error?: string
}
export interface ExecutionTest {
	database: string
	result?: any
	error?: string
}
export interface ExecutionResult {
	database: string
	result?: any
}