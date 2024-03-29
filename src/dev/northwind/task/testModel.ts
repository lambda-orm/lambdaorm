import { Parameter } from '3xpr'

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
	info?: any
	error?: string
}
export interface ExpressionTest {
	name: string
	lambda: any
	data?: string
	expression?: string
	normalizeExpression?: string
	model?: any
	metadata?: any
	constraints?: any
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
	test: ExpressionTest[]
	errors?: number
}
export interface Test {
	stage: string
	categories: CategoryTest[]
}
