import { FunctionAdditionalInfo, IExpressions, IModelService, Operand, OperatorAdditionalInfo, Parameter } from '3xpr'
import { IOrmExpressions } from '../domain/expressions'

export class OrmExpressions implements IOrmExpressions {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly _expressions:IExpressions) {}

	public get model (): IModelService {
		return this._expressions.model
	}

	public addOperator (sing: string, source: any, additionalInfo: OperatorAdditionalInfo): void {
		this._expressions.addOperator(sing, source, additionalInfo)
	}

	public addFunction (sing: string, source: any, additionalInfo?: FunctionAdditionalInfo): void {
		this._expressions.addFunction(sing, source, additionalInfo)
	}

	public addOperatorAlias (alias: string, reference: string): void {
		this._expressions.addOperatorAlias(alias, reference)
	}

	public addFunctionAlias (alias: string, reference: string): void {
		this._expressions.addFunctionAlias(alias, reference)
	}

	public addEnum (key: string, values: [string, any][] | any): void {
		this._expressions.addEnum(key, values)
	}

	public addFormat (key: string, pattern: string): void {
		this._expressions.addFormat(key, pattern)
	}

	public addConstant (key: string, value: any): void {
		this._expressions.addConstant(key, value)
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		return this._expressions.convert(func, 'function')[0]
	}

	public clone (operand: Operand): Operand {
		return this._expressions.clone(operand)
	}

	public build (expression: string, useCache:boolean): Operand {
		return this._expressions.build(expression, useCache)
	}

	public parameters (expression: string): Parameter[] {
		return this._expressions.parameters(expression)
	}

	public type (expression: string): string {
		return this._expressions.type(expression)
	}

	public eval (expression: string, data?: any): any {
		return this._expressions.eval(expression, data)
	}
}
