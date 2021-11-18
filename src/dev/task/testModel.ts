import { Parameter } from './../../orm'

export interface ExecutionTest {
	datastore: string
	result?: any
	error?: string
}
export interface ExecutionResult {
	datastore: string
	result?: any
}
export interface SentenceTest {
	datastore: string
	sentence?: any
	error?: string
}
export interface ExpressionTest {
	name: string
	lambda: any
	data?: any
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
	datastore: string
	data: any
	test: ExpressionTest[]
	errors?: number
}
export interface Test {
	datastore: string
	categories: CategoryTest[]
}
