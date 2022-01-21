import { Parameter } from '../../lib'

export interface ExecutionTest {
	stage: string
	result?: any
	error?: string
}
export interface ExecutionResult {
	stage: string
	result?: any
}
export interface SentenceTest {
	stage: string
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
	data: any
	context: any
	test: ExpressionTest[]
	errors?: number
}
export interface Test {
	stage: string
	categories: CategoryTest[]
}
