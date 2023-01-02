import { ModelConfig } from '../manager'
import { Operand, OperandType, Type, IModelManager, TypeManager } from '3xpr'
import { Insert, Update } from '../contract/operands'

export class SentenceTypeManager extends TypeManager {
	private config: ModelConfig
	constructor (config: ModelConfig, model: IModelManager) {
		super(model)
		this.config = config
	}

	protected override solveArrow (arrow: Operand): void {
		if (arrow instanceof Update || arrow instanceof Insert) {
			this.solveTypeInsertUpdateFromModel(arrow)
		} else {
			super.solveArrow(arrow)
		}
	}

	private solveTypeInsertUpdateFromModel (operand: Operand):void {
		if (operand.children.length === 1) {
			if (operand.children[0].type === OperandType.Obj) {
				const obj = operand.children[0]
				for (const p in obj.children) {
					const keyVal = obj.children[p]
					const entityName = operand.name
					const property = this.config.getProperty(entityName, keyVal.name)
					if (keyVal.children[0].returnType === Type.any) {
						keyVal.children[0].returnType = property.type
					}
				}
			}
		}
	}
}

// export class SentenceTypeManagerOLd implements ITypeManager {
// private modelConfig: ModelConfig
// private modelManager: IModelManager

// constructor (modelConfig: ModelConfig, modelManager: IModelManager) {
// this.modelConfig = modelConfig
// this.modelManager = modelManager
// }

// public type (operand: Operand): Type {
// for (const child of operand.children) {
// this.solveTypes(child)
// }
// return operand.returnType || Type.any
// }

// /**
//  * determine the type of the variable according to the expression.
//  * if used in an operator that is being compared to.
//  * if it is used in a function, which type corresponds according to the position it is occupying.
//  * let type = this.solveType(operand,childNumber)
//  * @param operand Operand
//  * @param expressionContext ExpressionContext
//  * @returns type of operand
//  */
// private solveTypes (operand: Operand): string {
// if (operand instanceof Constant2 || operand instanceof Field) {
// return operand.type
// }
// if (operand instanceof Variable) {
// return operand.type
// }
// this.solveTypeFromMetadata(operand)
// if ((operand instanceof Operator || operand instanceof FunctionRef) && !(operand instanceof Sentence || operand instanceof ArrowFunction || operand instanceof ChildFunction)) {
// this.solveTemplateType(operand)
// }
// // else {
// // // loop through all children to resolve type
// // for (const child of operand.children) {
// // this.solveTypes(child, expressionContext)
// // }
// // }
// // loop through all children to resolve type
// for (const child of operand.children) {
// this.solveTypes(child)
// }
// return operand.type
// }

// /**
//  * resolves the types of the operands using the metadata and the model
//  * @param operand Operand
//  * @param expressionContext ExpressionContext
//  */
// private solveTypeFromMetadata (operand: Operand) {
// if (operand instanceof Update || operand instanceof Insert) {
// this.solveTypeInsertUpdateFromModel(operand)
// }
// if (!(operand instanceof Sentence || operand instanceof ArrowFunction || operand instanceof ChildFunction) && (operand instanceof Operator || operand instanceof FunctionRef)) {
// this.solveTypeFunctionFromMetadata(operand)
// }
// for (const child of operand.children) {
// this.solveTypeFromMetadata(child)
// }
// }

// private solveTypeInsertUpdateFromModel (operand: Operand):void {
// if (operand.children.length === 1) {
// if (operand.children[0] instanceof Object) {
// const obj = operand.children[0]
// for (const p in obj.children) {
// const keyVal = obj.children[p] as KeyValue
// const entityName = operand.name
// const property = this.modelConfig.getProperty(entityName, keyVal.name)
// if (keyVal.children[0].type === 'any') {
// keyVal.children[0].type = property.type
// }
// }
// }
// }
// }

// private solveTypeFunctionFromMetadata (operand: Operand):void {
// // get metadata of operand
// const metadata = operand instanceof Operator
// ? this.modelManager.getOperator(operand.name, operand.children.length)
// : this.modelManager.getFunction(operand.name)

// if (!['T', 'T[]', 'any', 'any[]'].includes(metadata.return) && operand.type === 'any') {
// operand.type = metadata.return
// }

// // loop through all parameters
// if (metadata.params !== undefined) {
// for (let i = 0; i < metadata.params.length; i++) {
// const param = metadata.params[i]
// const child = operand.children[i]
// if (['T', 'T[]', 'any', 'any[]'].includes(param.type) && child.type === 'any') {
// // in case the parameter has a defined type and the child does not, assign the type of the parameter to the child
// child.type = param.type
// }
// }
// }

// const templateType = this.getTemplateType(operand, metadata)
// // in the case that it has been possible to solve T
// if (metadata.return === 'T' && operand.type === 'any' && (templateType !== undefined && templateType !== 'any')) {
// // in case the operand is T assigns the type corresponding to the operand
// operand.type = templateType

// if (metadata.params === undefined || metadata.params.length === 0) {
// return
// }
// // look for the parameters that are T and the children have not yet been defined to assign the corresponding type
// for (let i = 0; i < metadata.params.length; i++) {
// const param = metadata.params[i]
// const child = operand.children[i]
// if (param.type === 'T' && child.type === 'any') {
// child.type = templateType
// }
// }
// }
// }

// private solveTemplateType (operand: Operand):void {
// if (!(operand instanceof Sentence || operand instanceof ArrowFunction || operand instanceof ChildFunction) && (operand instanceof Operator || operand instanceof FunctionRef)) {
// // get metadata of operand
// const metadata = operand instanceof Operator
// ? this.modelManager.getOperator(operand.name, operand.children.length)
// : this.modelManager.getFunction(operand.name)
// const templateType = this.getTemplateType(operand, metadata)
// // in the case that it has been possible to solve T
// if (templateType !== undefined && templateType !== 'any') {
// if (metadata.return === 'T' && operand.type === 'any') {
// // in case the operand is T assigns the type corresponding to the operand
// operand.type = templateType
// }
// // look for the parameters that are T and the children have not yet been defined to assign the corresponding type
// for (let i = 0; i < metadata.params.length; i++) {
// const param = metadata.params[i]
// const child = operand.children[i]
// if (param.type === 'T' && (child.type === 'any' || child.type === 'T')) {
// child.type = templateType
// }
// }
// }
// }
// for (const child of operand.children) {
// this.solveTemplateType(child)
// }
// }

// /**
//  * Get template (T) type
//  * @param operand
//  * @param expressionContext
//  * @param metadata
//  * @returns type of template if exists
//  */
// private getTemplateType (operand: Operand, metadata:OperatorMetadata):string|undefined {
// if (metadata.params === undefined || metadata.params.length === 0) {
// return undefined
// }
// // recorre todos los parámetros buscando resolver T por child.type
// for (let i = 0; i < metadata.params.length; i++) {
// const param = metadata.params[i]
// const child = operand.children[i]
// if (param.type === 'T' && child.type !== 'any') {
// // in the case that the parameter is T and the child has a defined type, it determines that T is the type of the child
// return child.type
// }
// }
// // recorre todos los parámetros buscando resolver T por la resolución del operando
// let unsolvedTemplateType = false
// for (let i = 0; i < metadata.params.length; i++) {
// const param = metadata.params[i]
// const child = operand.children[i]
// if (param.type === 'T') {
// // in case the parameter is T and the child has no defined type, try to resolve the child
// // if successful, it determines that T is the type of child
// const childType = this.solveTypes(child)
// if (childType !== 'any') {
// return childType
// } else {
// unsolvedTemplateType = true
// }
// }
// }
// if (unsolvedTemplateType) {
// return 'any'
// } else {
// return undefined
// }
// }
// }
