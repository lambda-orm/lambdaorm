/* eslint-disable no-case-declarations */
import { SintaxisError, IOrmExpressions } from '../../../shared/domain'
import { SentenceAction, Property, Behavior, Constraint, Entity } from '../../../schema/domain'
import { Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, BulkInsert, Update, Delete, SentenceInclude } from '../../domain/operands'
import { Operand, Parameter, OperandType, Position, ITypeService } from '3xpr'
import { Type, Primitive } from 'typ3s'
import { SentenceTypeService } from './typeService'
import { SentenceHelper } from './helper'
import { ModelConfigService, SchemaService } from '../../../schema/application'

interface AsteriskField {
	index:number
	relation?: string
	fields:Field[]
}
class EntityContext {
	// eslint-disable-next-line no-use-before-define
	public parent?: EntityContext
	public entityName: string
	public alias: string
	// eslint-disable-next-line no-use-before-define
	public children: EntityContext[]
	public joins: any
	public fields: Property[]
	public groupByFields: Field[]
	public arrowVar: string
	// eslint-disable-next-line no-use-before-define
	constructor (parent?: EntityContext) {
		this.parent = parent
		if (parent) parent.children.push(this)
		this.entityName = ''
		this.alias = ''
		this.arrowVar = ''
		this.children = []
		this.joins = {}
		this.fields = []
		this.groupByFields = []
	}
}
class ExpressionContext {
	public aliases: any
	public current: EntityContext
	constructor (current: EntityContext) {
		this.current = current
		this.aliases = {}
	}
}
class SentenceSolveConstraints {
	private helper: SentenceHelper
	private modelConfig: ModelConfigService
	private expressions: IOrmExpressions

	constructor (modelConfig: ModelConfigService, helper: SentenceHelper, expressions: IOrmExpressions) {
		this.modelConfig = modelConfig
		this.helper = helper
		this.expressions = expressions
	}

	public solve (sentence:Sentence): void {
		if (sentence.name === SentenceAction.update ||
			sentence.name === SentenceAction.insert ||
			sentence.name === SentenceAction.bulkInsert) {
			sentence.constraints = this.getConstraints(sentence.entity, sentence.parameters)
		}
	}

	private getConstraints (entityName: string, parameters: Parameter[]): Constraint[] {
		const queryProperties = this.helper.getPropertiesFromParameters(entityName, parameters)
		const entity = this.modelConfig.getEntity(entityName)
		if (entity === undefined) {
			return []
		}
		const constraints: Constraint[] = []
		this.addEntityConstraints(entity, queryProperties, constraints)
		this.addPropertiesConstraints(entityName, queryProperties, constraints)
		return constraints
	}

	private addEntityConstraints (entity: Entity, queryProperties: Property[], constraints:Constraint[]): void {
		if (entity.constraints) {
			for (const constraint of entity.constraints) {
				const conditionProperties = this.expressions.parameters(constraint.condition)
				let all = true
				for (const conditionParameter of conditionProperties) {
					if (!queryProperties.find(p => p.name === conditionParameter.name)) {
						all = false
						break
					}
				}
				if (all) {
					constraints.push(constraint)
				}
			}
		}
	}

	private addPropertiesConstraints (entityName: string, queryProperties: Property[], constraints:Constraint[]): void {
		for (const property of queryProperties) {
			if (property.required && property.default === undefined && property.key === undefined) {
				const constraint: Constraint = {
					message: `Cannot be null property ${property.name} in entity ${entityName}`,
					condition: `isNotNull(${property.name})`
				}
				constraints.push(constraint)
			}
			if (property.enum) {
				const _enum = this.modelConfig.getEnum(property.enum)
				if (_enum && _enum.values) {
					const values = _enum.values.map(p => typeof p.value === Primitive.number ? p.value : '"' + p.value + '"').join(',')
					const constraint: Constraint = {
						message: `invalid value for property ${property.name} in entity ${entityName}`,
						condition: `${property.name}.in(${values})`
					}
					constraints.push(constraint)
				}
			}
		}
	}
}
class SentenceSolveBehaviors {
	private helper: SentenceHelper
	private modelConfig: ModelConfigService

	constructor (modelConfig: ModelConfigService, helper: SentenceHelper) {
		this.modelConfig = modelConfig
		this.helper = helper
	}

	public solve (sentence:Sentence): void {
		switch (sentence.name) {
		case SentenceAction.select:
			this.solveSelect(sentence)
			break
		case SentenceAction.insert:
		case SentenceAction.bulkInsert:
			this.solveInsert(sentence)
			break
		case SentenceAction.update:
			this.solveUpdate(sentence)
			break
		}
	}

	private solveSelect (sentence:Sentence): void {
		const map = sentence.children.find(p => p.name === 'map') as Map
		sentence.values = this.getBehaviorReadValues(sentence.entity, map)
	}

	private solveInsert (sentence:Sentence): void {
		sentence.values = this.getBehaviorWriteValues(sentence.entity, sentence.parameters)
		sentence.defaults = this.getBehaviorDefaults(sentence.entity)
	}

	private solveUpdate (sentence:Sentence): void {
		sentence.values = this.getBehaviorWriteValues(sentence.entity, sentence.parameters)
	}

	private getBehaviorDefaults (entityName: string): Behavior[] {
		const behaviors: Behavior[] = []
		const entity = this.modelConfig.getEntity(entityName)
		if (entity && entity.properties) {
			for (const i in entity.properties) {
				const property = entity.properties[i]
				if (property.default) {
					behaviors.push({ property: property.name, expression: property.default })
				}
			}
		}
		return behaviors
	}

	private getBehaviorReadValues (entityName: string, operand: Operand): Behavior[] {
		const entity = this.modelConfig.getEntity(entityName)
		if (entity === undefined || operand.children.length !== 1) {
			return []
		}
		const child = (operand.children[0].type === OperandType.CallFunc && operand.children[0].name === 'distinct')
			? operand.children[0].children[0]
			: operand.children[0]

		if (!(child.type === OperandType.Obj)) {
			return []
		}
		const behaviors: Behavior[] = []
		const obj = child
		for (const keyVal of obj.children) {
			if (!(keyVal.children[0] instanceof Field)) {
				continue
			}
			const field = keyVal.children[0]
			const property = entity.properties.find(q => q.name === field.name)
			if (property && property.readValue) {
				const behavior = { alias: keyVal.name, property: property.name, expression: property.readValue }
				behaviors.push(behavior)
			}
		}
		return behaviors
	}

	private getBehaviorWriteValues (entityName: string, parameters: Parameter[]): Behavior[] {
		const behaviors: Behavior[] = []
		const properties = this.helper.getPropertiesFromParameters(entityName, parameters)
		if (properties) {
			for (const property of properties) {
				if (property.writeValue) {
					behaviors.push({ property: property.name, expression: property.writeValue })
				}
			}
		}
		return behaviors
	}
}
export class SentenceBuilder {
	private typeService: ITypeService
	private solveBehaviors: SentenceSolveBehaviors
	private solveConstraints : SentenceSolveConstraints

	constructor (private readonly schema: SchemaService, private readonly expressions: IOrmExpressions, private readonly helper:SentenceHelper) {
		this.typeService = new SentenceTypeService(this.schema.model)
		this.solveBehaviors = new SentenceSolveBehaviors(this.schema.model, this.helper)
		this.solveConstraints = new SentenceSolveConstraints(this.schema.model, this.helper, expressions)
	}

	public build (operand: Operand): Sentence {
		// it clones the operand because it is going to modify it and it should not alter the operand passed by parameter
		const cloned = this.expressions.clone(operand)
		const sentence = this.createSentence(cloned, new ExpressionContext(new EntityContext())) as Sentence
		return sentence
	}

	private createSentence (operand: Operand, expressionContext: ExpressionContext): Sentence {
		expressionContext.current = new EntityContext(expressionContext.current)
		const clauses: any = this.helper.getClauses(operand)
		expressionContext.current.entityName = clauses.from.name
		// expressionContext.curreOrders.bulkInsert().include(p => [p.details, p.customer])nt.metadata = this.modelConfig.getEntity(expressionContext.current.entityName)
		expressionContext.current.alias = this.createAlias(expressionContext, expressionContext.current.entityName)

		const children: Operand[] = []
		let child:Operand| undefined

		if (clauses.filter) {
			// TODO: If the statement is Select, Update or Delete and the entity has one or more properties with key.
			// The filter must be added by this key
			const clause = clauses.filter
			child = this.createClause(clause, expressionContext)
			children.push(child)
		}
		if (clauses.from) {
			child = new From(operand.pos, 'from', [], expressionContext.current.entityName, expressionContext.current.alias)
			children.push(child)
		}

		let sentence:Sentence|undefined
		if (clauses.map) {
			sentence = this.createSentenceSelect(operand.pos, clauses, expressionContext, children)
		} else if (clauses.insert) {
			sentence = this.createSentenceModify(operand.pos, SentenceAction.insert, clauses, expressionContext, children)
		} else if (clauses.bulkInsert) {
			sentence = this.createSentenceModify(operand.pos, SentenceAction.bulkInsert, clauses, expressionContext, children)
		} else if (clauses.update) {
			sentence = this.createSentenceModify(operand.pos, SentenceAction.update, clauses, expressionContext, children)
		} else if (clauses.delete) {
			sentence = this.createSentenceDelete(operand.pos, clauses, expressionContext, children)
		}
		expressionContext.current = expressionContext.current.parent ? expressionContext.current.parent : new EntityContext()
		if (!sentence) {
			throw new SintaxisError('Sentence incomplete')
		}
		this.typeService.getType(sentence)
		// Solve columns
		sentence.columns = this.helper.getColumns(sentence)
		sentence.parameters = this.helper.getParameters(sentence)
		this.solveBehaviors.solve(sentence)
		this.solveConstraints.solve(sentence)
		return sentence
	}

	private createSentenceSelect (pos: Position, clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		const mapOperand = this.createMapClause(clauses.map, expressionContext)
		this.solveAsteriskFields(mapOperand, expressionContext)
		expressionContext.current.fields = this.helper.fieldsInSelect(mapOperand)
		expressionContext.current.groupByFields = this.helper.groupByFields(mapOperand)
		children.push(mapOperand)
		const entityName = expressionContext.current.entityName
		const alias = expressionContext.current.alias

		if (expressionContext.current.groupByFields.length > 0) {
			const fields:Field[] = []
			for (const groupByField of expressionContext.current.groupByFields) {
				fields.push(groupByField.clone())
			}
			if (fields.length === 1) {
				children.push(new GroupBy(pos, 'groupBy', fields, entityName, alias))
			} else {
				// TODO: chequear este caso
				const array: Operand = new Operand(pos, 'array', OperandType.List, fields)
				children.push(new GroupBy(pos, 'groupBy', [array], entityName, alias))
			}
		}
		if (clauses.having) {
			children.push(this.createClause(clauses.having, expressionContext))
		}
		if (clauses.sort) {
			children.push(this.createClause(clauses.sort, expressionContext))
		}
		if (clauses.page) {
			if (!clauses.sort) {
				throw new SintaxisError('Sort clause is required when using Page clause')
			}
			const pageChildren = clauses.page.children.filter((p: Operand) => p.type !== OperandType.Arrow).map((q: Operand) => this.solveFields(q, expressionContext, false)) as Operand[]
			children.push(new Page(pos, clauses.page.name, pageChildren, entityName, alias))
		}

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createSelectInclude, children)
		}
		this.createSentenceAddJoins(mapOperand.pos, expressionContext, children)

		return new Sentence(
			pos,
			SentenceAction.select,
			children,
			expressionContext.current.entityName,
			expressionContext.current.alias
		)
	}

	private createSentenceModify (pos:Position, name:SentenceAction, clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		// TODO: If the entity has one or more properties with key.
		// These properties must be added using the key
		let operand:Operand|undefined
		if (name === SentenceAction.insert) {
			operand = this.createInsertClause(clauses.insert as Operand, expressionContext)
		} else if (name === SentenceAction.bulkInsert) {
			operand = this.createInsertClause(clauses.bulkInsert as Operand, expressionContext)
		} else if (name === SentenceAction.update) {
			operand = this.createUpdateClause(clauses.update as Operand, expressionContext)
		} else {
			throw new SintaxisError('clause modify undefined')
		}
		expressionContext.current.fields = this.helper.fieldsInModify(operand, expressionContext.current.entityName)
		children.push(operand)

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createInclude, children)
		}
		return new Sentence(
			pos,
			name,
			children,
			expressionContext.current.entityName,
			expressionContext.current.alias
		)
	}

	private createSentenceDelete (pos:Position, clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		const operand = new Delete(pos, 'delete', [], expressionContext.current.entityName, expressionContext.current.alias)
		children.push(operand)

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createInclude, children)
		}
		return new Sentence(
			pos,
			SentenceAction.update,
			children,
			expressionContext.current.entityName,
			expressionContext.current.alias
		)
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	private createSentenceAddIncludes (expressionContext: ExpressionContext, clauses: any, createInclude:Function, children: Operand[]):void {
		if (!createInclude) {
			throw new SintaxisError('Include not implemented!!!')
		}
		expressionContext.current.arrowVar = clauses.include.children[1].name
		const body = clauses.include.children[2]
		if (body.type === 'List') {
			for (const child of body.children) {
				const include = createInclude.bind(this)(child, expressionContext)
				children.push(include)
			}
		} else {
			const include = createInclude.bind(this)(body, expressionContext)
			children.push(include)
		}
	}

	private createSentenceAddJoins (pos:Position, expressionContext: ExpressionContext, children: Operand[]):void {
		for (const key in expressionContext.current.joins) {
			const info = this.schema.model.getRelation(expressionContext.current.entityName, key)
			const relatedEntity = info.previousEntity.name
			const relatedAlias = info.previousRelation !== '' ? expressionContext.current.joins[info.previousRelation] : expressionContext.current.alias
			const relatedProperty = info.previousEntity.properties.find(p => p.name === info.relation.from) as Property
			const relationEntity = info.entity.name
			const relationAlias = expressionContext.current.joins[key]
			const relationProperty = info.entity.properties.find(p => p.name === info.relation.to) as Property
			// TODO: Here use the key to add the corresponding filter
			// if an entity has one or more properties with a key, a filter must be added by the key
			const relatedField = new Field(pos, relatedEntity, info.relation.from, Type.to(relatedProperty.type), relatedAlias)
			const relationField = new Field(pos, relationEntity, info.relation.to, Type.to(relationProperty.type), relationAlias)
			const equal = new Operand(pos, '==', OperandType.Operator, [relationField, relatedField], Type.boolean)
			const operand = new Join(pos, relationEntity, [equal], relatedEntity, relationAlias)
			children.push(operand)
		}
	}

	private createClause (clause: Operand, expressionContext: ExpressionContext): Operand {
		expressionContext.current.arrowVar = clause.children[1].name
		const child = this.solveFields(clause.children[2], expressionContext, false)
		switch (clause.name) {
		case 'filter': return new Filter(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
		case 'having': return new Having(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
		case 'sort': return new Sort(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
		default: throw new SintaxisError('clause : ' + clause.name + ' not supported')
		}
	}

	private createMapClause (clause: Operand, expressionContext: ExpressionContext): Operand {
		if (clause.children.length === 3) {
			expressionContext.current.arrowVar = clause.children[1].name
			const child = this.solveFields(clause.children[2], expressionContext, true)
			return new Map(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
		}
		throw new SintaxisError('Sentence Map incorrect!!!')
	}

	private createInsertClause (clause: Operand, expressionContext: ExpressionContext): Operand {
		if (clause.children.length === 2 && clause.children[1].type === OperandType.Obj) {
			// Example: Categories.insert({ name: name, description: description })
			const child = this.solveFields(clause.children[1], expressionContext, false)
			if (clause.name === 'bulkInsert') {
				return new BulkInsert(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
			} else {
				return new Insert(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
			}
		}
		throw new SintaxisError('Sentence Insert incorrect!!!')
	}

	private createUpdateClause (clause: Operand, expressionContext: ExpressionContext): Operand {
		if (clause.children.length === 3 && clause.children[2].type === OperandType.Obj) {
			// Example: Categories.update(p=>{name:entity.name,description:entity.description})
			expressionContext.current.arrowVar = clause.children[1].name
			const child = this.solveFields(clause.children[2], expressionContext, false)
			return new Update(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
		}
		throw new SintaxisError('Sentence Update incorrect!!!')
	}

	private createSelectInclude (operand: Operand, expressionContext: ExpressionContext): SentenceInclude {
		let current = operand
		while (current) {
			if (current.type === OperandType.Var) {
				// p.details
				const parts = current.name.split('.')
				const relationName = parts[1]
				const relationInfo = this.schema.model.getRelation(expressionContext.current.entityName, relationName)
				current.name = relationInfo.entity.name
				const child = this.createSentence(operand, expressionContext)
				return new SentenceInclude(current.pos, relationInfo.relation.name, [child], relationInfo.relation)
			}
			if (current.children.length > 0) {
				current = current.children[0]
			} else {
				break
			}
		}
		throw new SintaxisError('Error to create SentenceInclude')
	}

	private createInclude (operand: Operand, expressionContext: ExpressionContext): SentenceInclude {
		let current = operand

		while (current) {
			if (current.type === OperandType.Var) {
				// p.details
				const parts = current.name.split('.')
				const relationName = parts[1]
				const relationInfo = this.schema.model.getRelation(expressionContext.current.entityName, relationName)
				current.name = relationInfo.entity.name
				const child = this.createSentence(operand, expressionContext)
				return new SentenceInclude(current.pos, relationName, [child], relationInfo.relation)
			}
			if (current.children.length > 0) {
				current = current.children[0]
			} else { break }
		}
		throw new SintaxisError('Error to create SentenceInclude')
	}

	private solveFields (operand: Operand, expressionContext: ExpressionContext, enableAsteriskField:boolean): Operand {
		if (operand.type === OperandType.Var && !(operand instanceof Field)) {
			const parts = operand.name.split('.')
			if (parts[0] === expressionContext.current.arrowVar) {
				if (parts.length === 1) {
					if (!enableAsteriskField) {
						throw new SintaxisError(`${expressionContext.current.entityName}.* fields are not allowed`)
					}
					return new Field(operand.pos, expressionContext.current.entityName, '*', Type.any, expressionContext.current.alias, true)
				} else if (parts.length === 2) {
					return this.createSimpleField(operand.pos, parts, expressionContext, enableAsteriskField)
				} else {
					return this.createRelationField(operand.pos, parts, expressionContext, enableAsteriskField)
				}
			}
		} else if (operand instanceof Field) {
			const parts = operand.name.split('.')
			if (parts.length > 1 && parts[0] === expressionContext.current.arrowVar && expressionContext.current.arrowVar !== expressionContext.current.alias) {
				operand.alias = expressionContext.current.alias
				operand.name = `${expressionContext.current.alias}.${parts.slice(1).join('.')}`
			}
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				operand.children[i] = this.solveFields(operand.children[i], expressionContext, enableAsteriskField)
			}
		}
		return operand
	}

	private createSimpleField (pos: Position, parts: string[], expressionContext: ExpressionContext, enableAsteriskField:boolean): Operand {
		const _field = expressionContext.current.fields.find(p => p.name === parts[1])
		if (_field) {
			return new Field(pos, expressionContext.current.entityName, _field.name, Type.to(_field.type), expressionContext.current.alias, true)
		} else {
			if (this.schema.model.existsProperty(expressionContext.current.entityName, parts[1])) {
				const property = this.schema.model.getProperty(expressionContext.current.entityName, parts[1])
				return new Field(pos, expressionContext.current.entityName, property.name, Type.to(property.type), expressionContext.current.alias, true)
			} else {
				const relationInfo = this.schema.model.getRelation(expressionContext.current.entityName, parts[1])
				if (relationInfo) {
					const relation = this.addJoins(parts, parts.length, expressionContext)
					const relationAlias = expressionContext.current.joins[relation]
					if (!enableAsteriskField) {
						throw new SintaxisError(`${relation}.* fields are not allowed`)
					}
					return new Field(pos, relation, '*', Type.any, relationAlias, true)
				} else {
					throw new SintaxisError('Property ' + parts[1] + ' not fount in ' + expressionContext.current.entityName)
				}
			}
		}
	}

	private createRelationField (pos: Position, parts: string[], expressionContext: ExpressionContext, enableAsteriskField:boolean): Operand {
		const propertyName = parts[parts.length - 1]
		const relation = this.addJoins(parts, parts.length - 1, expressionContext)
		const info = this.schema.model.getRelation(expressionContext.current.entityName, relation)
		const relationAlias = expressionContext.current.joins[relation]
		const property = info.entity.properties.find(p => p.name === propertyName)
		if (property) {
			return new Field(pos, info.entity.name, property.name, Type.to(property.type), relationAlias, false)
		} else {
			const childRelation = info.entity.relations.find(p => p.name === propertyName)
			if (childRelation) {
				const relation2 = this.addJoins(parts, parts.length, expressionContext)
				const relationAlias2 = expressionContext.current.joins[relation2]
				if (!enableAsteriskField) {
					throw new SintaxisError(`${relation2}.* fields are not allowed`)
				}
				return new Field(pos, relation2, '*', Type.any, relationAlias2, false)
			} else {
				throw new SintaxisError('Property ' + propertyName + ' not fount in ' + relation)
			}
		}
	}

	private solveAsteriskFields (mapOperand:Operand, expressionContext: ExpressionContext) {
		if (mapOperand.children[0].type === OperandType.Obj) {
			const obj = mapOperand.children[0]
			const asteriskFields:AsteriskField[] = []
			for (let i = 0; i < obj.children.length; i++) {
				const keyVal = obj.children[i]
				if (keyVal.children[0] instanceof Field && keyVal.children[0].name === '*') {
					const field = keyVal.children[0]
					if (expressionContext.current.alias === field.alias) {
						const asteriskField:AsteriskField = { index: i, fields: [] }
						const entity = this.schema.model.getEntity(expressionContext.current.entityName)
						if (entity === undefined) {
							throw new SintaxisError(`entity ${expressionContext.current.entityName} not found`)
						}
						for (const property of entity.properties) {
							const newField = new Field(field.pos, entity.name, property.name, Type.to(property.type), field.alias, false)
							asteriskField.fields.push(newField)
						}
						asteriskFields.push(asteriskField)
					} else {
						const asteriskField:AsteriskField = { index: i, relation: field.entity, fields: [] }
						const relationInfo = this.schema.model.getRelation(expressionContext.current.entityName, field.entity)
						for (const relationProperty of relationInfo.entity.properties) {
							const newField = new Field(field.pos, relationInfo.entity.name, relationProperty.name, Type.to(relationProperty.type), field.alias, false)
							asteriskField.fields.push(newField)
						}
						asteriskFields.push(asteriskField)
					}
				}
			}
			if (asteriskFields.length > 0) {
				for (const asteriskField of asteriskFields.sort(p => p.index).reverse()) {
					obj.children.splice(asteriskField.index, 1)
					for (let i = 0; i < asteriskField.fields.length; i++) {
						const newField = asteriskField.fields[i]
						const name = (asteriskField.relation !== undefined ? asteriskField.relation + '.' : '') + newField.name
						const keyVal = new Operand(newField.pos, name, OperandType.KeyVal, [newField], newField.returnType)
						obj.children.splice(asteriskField.index + i, 0, keyVal)
					}
				}
			}
		}
	}

	private addJoins (parts: string[], to: number, expressionContext: ExpressionContext): string {
		let relation = ''
		for (let i = 1; i < to; i++) {
			relation = (i > 1 ? relation + '.' : '') + parts[i]
			if (!expressionContext.current.joins[relation]) {
				expressionContext.current.joins[relation] = this.createAlias(expressionContext, parts[i], relation)
			}
		}
		return relation
	}

	private createAlias (expressionContext: ExpressionContext, name: string, relation?: string): string {
		const c = name.charAt(0).toLowerCase()
		let alias = c
		let i = 1
		while (expressionContext.aliases[alias]) {
			alias = alias + i
			i++
		}
		expressionContext.aliases[alias] = relation || name
		return alias
	}
}
