import {
	IExpressions, IModelManager, Format, OperatorMetadata, OperatorAdditionalInfo, FunctionAdditionalInfo,
	Operand, Parameter, ActionObserver,
	IOperandBuilder, IOperandNormalizer, IOperandReducer, Parser,
	OperandNormalizer, OperandReducer, OperandSerializer
} from '3xpr'
import { MemoryCache, ICache, h3lp } from 'h3lp'

export class OperandBuilderWithoutEvaluatorFactory implements IOperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly model: IModelManager, protected readonly normalizer:IOperandNormalizer, protected readonly reducer:IOperandReducer) {}

	public build (expression: string): Operand {
		const operand = new Parser(this.model, expression).parse()
		const normalized = this.normalizer.normalize(operand)
		this.complete(normalized)
		return this.reducer.reduce(normalized)
	}

	public clone (source: Operand): Operand {
		const children: Operand[] = []
		for (const child of source.children) {
			children.push(this.clone(child))
		}
		const target = new Operand(source.pos, source.name, source.type, children, source.returnType)
		target.id = source.id
		return target
	}

	protected complete (operand: Operand, index = 0, parentId?:string): void {
		const id = parentId ? parentId + '.' + index : index.toString()
		if (operand.children) {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				this.complete(child, i, id)
			}
		}
		operand.id = id
	}
}

export class ExpressionsWrapper implements IExpressions {
	private cache: ICache<number, string>
	private basic:IOperandBuilder
	private serializer:OperandSerializer
	public constructor (private readonly _expressions:IExpressions) {
		const normalizer = new OperandNormalizer(this._expressions.model)
		const reducer = new OperandReducer(this._expressions.model)
		this.serializer = new OperandSerializer()
		this.basic = new OperandBuilderWithoutEvaluatorFactory(this._expressions.model, normalizer, reducer)
		this.cache = new MemoryCache<number, string>()
	}

	public get model (): IModelManager {
		return this._expressions.model
	}

	public get enums (): [string, [string, any][]][] {
		return this._expressions.enums
	}

	public get formats (): [string, Format][] {
		return this._expressions.formats
	}

	public get constants (): [string, any][] {
		return this._expressions.constants
	}

	public get operators (): [string, OperatorMetadata][] {
		return this._expressions.operators
	}

	public get functions (): [string, OperatorMetadata][] {
		return this._expressions.functions
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
		return this._expressions.toExpression(func)
	}

	public clone (operand: Operand): Operand {
		return this._expressions.clone(operand)
	}

	public build (expression: string, useCache:boolean): Operand {
		try {
			if (!useCache) {
				return this.basic.build(expression)
			}
			const key = h3lp.utils.hashCode(expression)
			const value = this.cache.get(key)
			if (value) {
				return this.serializer.deserialize(value)
			}
			const operand = this.basic.build(expression)
			this.cache.set(key, this.serializer.serialize(operand))
			return operand
		} catch (error: any) {
			throw new Error('expression: ' + expression + ' error: ' + error.toString())
		}
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

	public run (expression: string, data?: any): any {
		return this._expressions.run(expression, data)
	}

	public subscribe (observer: ActionObserver): void {
		return this._expressions.subscribe(observer)
	}

	public unsubscribe (observer: ActionObserver): void {
		return this._expressions.unsubscribe(observer)
	}
}
