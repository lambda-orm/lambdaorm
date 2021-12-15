import { Parameter } from './../../orm'

export interface ExecutionTest {
	dataSource: string
	result?: any
	error?: string
}
export interface ExecutionResult {
	dataSource: string
	result?: any
}
export interface SentenceTest {
	dataSource: string
	sentence?: any
	error?: string
}
export interface ExpressionTest {
	name: string
	lambda: any
	data?: string
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
	// dataSource: string
	data: any
	context: any
	test: ExpressionTest[]
	errors?: number
}
export interface Test {
	dataSource: string
	categories: CategoryTest[]
}
