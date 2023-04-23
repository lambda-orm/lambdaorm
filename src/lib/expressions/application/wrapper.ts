import {
	IExpressions, IModelService, Format, OperatorMetadata, OperatorAdditionalInfo, FunctionAdditionalInfo,
	Operand, Parameter, ActionObserver, IOperandBuilder, OperandBuilder, EvaluatorFactory, IOperandService
} from '3xpr'

export class OperandBuilderWithoutEvaluatorFactory extends OperandBuilder {
	public constructor (model:IModelService) {
		super(new EvaluatorFactory(model), model)
	}

	public get key (): string {
		return 'withoutEvaluator'
	}

	public override clone (source: Operand): Operand {
		const children: Operand[] = []
		for (const child of source.children) {
			children.push(this.clone(child))
		}
		const target = new Operand(source.pos, source.name, source.type, children, source.returnType)
		target.id = source.id
		return target
	}

	protected override complete (operand: Operand, index = 0, parentId?:string): void {
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
	private builderWithoutEvaluator:IOperandBuilder
	public constructor (private readonly _expressions:IExpressions) {
		this.builderWithoutEvaluator = new OperandBuilderWithoutEvaluatorFactory(this._expressions.model)
		_expressions.addOperandBuilder(this.builderWithoutEvaluator)
	}

	public get operandService (): IOperandService {
		return this._expressions.operandService
	}

	public get model (): IModelService {
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

	public addOperandBuilder (builder: IOperandBuilder): void {
		this._expressions.addOperandBuilder(builder)
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		return this._expressions.toExpression(func)
	}

	public graphqlToExpression (graphql: string): [string, any] {
		return this._expressions.graphqlToExpression(graphql)
	}

	public clone (operand: Operand): Operand {
		return this._expressions.clone(operand)
	}

	public build (expression: string, useCache:boolean): Operand {
		return this._expressions.operandService.build(expression, 'withoutEvaluator', useCache)
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
