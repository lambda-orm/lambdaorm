/* eslint-disable no-case-declarations */

import { SentenceAction, Property, Behavior, Constraint, SintaxisError, Entity, SentenceCrudAction } from '../contract'
import { ModelConfig, SchemaManager } from '../manager'
import { Operand, Parameter, OperandType, Type, IExpressions, Position, helper, ITypeManager, Kind } from '3xpr'
import { MemoryCache, ICache } from 'h3lp'
import { Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete, SentenceInclude } from '../contract/operands'
import { SentenceNormalizer, SentenceTypeManager } from '.'

class SentenceHelper {
	private model: ModelConfig

	constructor (model: ModelConfig) {
		this.model = model
	}

	public getClauses (operand: Operand): any {
		const sentence: any = {}
		let current = operand
		while (current) {
			const name = current.type === OperandType.Var ? 'from' : current.name
			sentence[name] = current
			if (current.children.length > 0) {
				current = current.children[0]
			} else {
				break
			}
		}
		return sentence
	}

	public getPropertiesFromParameters (entityName: string, parameters: Parameter[]): Property[] {
		const entity = this.model.getEntity(entityName)
		const properties: Property[] = []
		if (entity && entity.properties && parameters) {
			for (const parameter of parameters) {
				const property = entity.properties.find(p => p.name === parameter.name)
				if (property) {
					properties.push(property)
				}
			}
		}
		return properties
	}

	public groupByFields (operand: Operand): Field[] {
		const data = { fields: [], groupBy: false }
		this._groupByFields(operand, data)
		return data.groupBy ? data.fields : []
	}

	private _groupByFields (operand: Operand, data: any): void {
		if (operand instanceof Field) {
			data.fields.push(operand)
		} else if (operand.type === OperandType.CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			data.groupBy = true
		} else if (!(operand instanceof Sentence)) {
			for (const k in operand.children) {
				const p = operand.children[k]
				this._groupByFields(p, data)
			}
		}
	}

	public fieldsInSelect (operand: Operand): Property[] {
		const fields: Property[] = []
		if (operand.children.length === 1) {
			let child: Operand
			if (operand.children[0].type === OperandType.CallFunc && operand.children[0].name === 'distinct') {
				child = operand.children[0].children[0]
			} else {
				child = operand.children[0]
			}
			if (child.type === OperandType.Obj) {
				const obj = child
				for (const keyVal of obj.children) {
					if (keyVal.returnType !== undefined && keyVal.returnType.kind !== Kind.any) {
						fields.push({ name: keyVal.name, type: keyVal.returnType.kind })
					// } else if (keyVal.children[0] instanceof Field) {
					// const _field = keyVal.children[0]
					// fields.push({ name: keyVal.name, type: Type.toString(_field.returnType) })
					} else {
						fields.push({ name: keyVal.name, type: Type.toString(keyVal.children[0].returnType) })
					}
				}
			}
		}
		return fields
	}

	public fieldsInModify (operand: Operand, entityName: string, addAutoIncrement = false): Property[] {
		const fields: Property[] = []
		if (operand.children.length === 1) {
			if (operand.children[0].type === OperandType.Obj) {
				const obj = operand.children[0]
				for (const p in obj.children) {
					const keyVal = obj.children[p]
					const property = this.model.getProperty(entityName, keyVal.name)
					const field = { name: keyVal.name, type: property.type }
					// keyVal.property = property.name // new Field(entity,property.name,property.type,property.mapping)
					fields.push(field)
				}
			}
		}
		if (addAutoIncrement) {
			const autoIncrement = this.model.getAutoIncrement(entityName)
			if (autoIncrement) {
				fields.unshift(autoIncrement)
			}
		}
		return fields
	}

	public getColumns (sentence: Sentence): Property[] {
		switch (sentence.crudAction) {
		case SentenceCrudAction.select:
			const map = sentence.children.find(p => p.name === 'map') as Map
			return this.fieldsInSelect(map)
		case SentenceCrudAction.insert:
			const insert = sentence.children.find(p => p instanceof Insert) as Insert
			return this.fieldsInModify(insert, sentence.entity, true)
		case SentenceCrudAction.update:
			const update = sentence.children.find(p => p instanceof Update) as Update
			return this.fieldsInModify(update, sentence.entity)
		case SentenceCrudAction.delete:
			const _delete = sentence.children.find(p => p instanceof Delete) as Delete
			return this.fieldsInModify(_delete, sentence.entity)
		default:
			throw new SintaxisError(`sentence crud action ${sentence.crudAction} not found`)
		}
	}

	public getParameters (sentence: Sentence): Parameter[] {
		const map = sentence.children.find(p => p instanceof Map) as Map | undefined
		const filter = sentence.children.find(p => p instanceof Filter) as Filter | undefined
		const groupBy = sentence.children.find(p => p instanceof GroupBy) as GroupBy | undefined
		const having = sentence.children.find(p => p instanceof Having) as Having | undefined
		const sort = sentence.children.find(p => p instanceof Sort) as Sort | undefined
		const insert = sentence.children.find(p => p instanceof Insert) as Insert | undefined
		const update = sentence.children.find(p => p instanceof Update) as Update | undefined
		const _delete = sentence.children.find(p => p instanceof Delete) as Delete | undefined

		const parameters: Parameter[] = []
		if (map) this.loadParameters(map, parameters)
		if (insert) this.loadParameters(insert, parameters)
		if (update) this.loadParameters(update, parameters)
		if (_delete) this.loadParameters(_delete, parameters)
		if (filter) this.loadParameters(filter, parameters)
		if (groupBy) this.loadParameters(groupBy, parameters)
		if (having) this.loadParameters(having, parameters)
		if (sort) this.loadParameters(sort, parameters)
		return parameters
	}

	private loadParameters (operand: Operand, parameters: Parameter[]) {
		if (operand.type === OperandType.Var && !(operand instanceof Field)) {
			parameters.push({ name: operand.name, type: Type.toString(operand.returnType) })
		}
		for (const child of operand.children) {
			this.loadParameters(child, parameters)
		}
	}
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
	private modelConfig: ModelConfig
	private expressions: IExpressions

	constructor (modelConfig: ModelConfig, helper: SentenceHelper, expressions: IExpressions) {
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
					const values = _enum.values.map(p => typeof p.value === 'number' ? p.value : '"' + p.value + '"').join(',')
					const constraint: Constraint = {
						message: `invalid value for property ${property.name} in entity ${entityName}`,
						condition: `in([${values}],${property.name})`
					}
					constraints.push(constraint)
				}
			}
		}
	}
}
class SentenceSolveBehaviors {
	private helper: SentenceHelper
	private modelConfig: ModelConfig

	constructor (modelConfig: ModelConfig, helper: SentenceHelper) {
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
	private schema: SchemaManager
	private typeManager: ITypeManager
	private solveBehaviors: SentenceSolveBehaviors
	private solveConstraints : SentenceSolveConstraints
	private normalizer: SentenceNormalizer
	private expressions: IExpressions
	private helper:SentenceHelper
	private cache: ICache<string, Sentence>

	constructor (schema: SchemaManager, expressions: IExpressions) {
		this.schema = schema
		this.expressions = expressions
		this.helper = new SentenceHelper(this.schema.model)
		this.typeManager = new SentenceTypeManager(this.schema.model, expressions.model)
		this.solveBehaviors = new SentenceSolveBehaviors(this.schema.model, this.helper)
		this.solveConstraints = new SentenceSolveConstraints(this.schema.model, this.helper, expressions)
		this.normalizer = new SentenceNormalizer(expressions.model, schema)
		this.cache = new MemoryCache<string, Sentence>()
	}

	public normalize (expression: string): string {
		try {
			const operand = this.expressions.build(expression)
			const cloned = this.expressions.clone(operand)
			const normalized = this.normalizer.normalize(cloned)
			return this.toExpression(normalized)
		} catch (error: any) {
			throw new SintaxisError('complete expression: ' + expression + ' error: ' + error.toString())
		}
	}

	private toExpression (operand: Operand): string {
		const clauses: any = this.helper.getClauses(operand)
		const list:string[] = []
		if (clauses.map) {
			const body = helper.operand.toExpression(clauses.map.children[2])
			list.push(`map(${clauses.map.children[1].name}=>${body})`)
		} else if (clauses.insert) {
			const body = helper.operand.toExpression(clauses.insert.children[1])
			list.push(`insert(${body})`)
		} else if (clauses.bulkInsert) {
			const body = helper.operand.toExpression(clauses.bulkInsert.children[1])
			list.push(`bulkInsert(${body})`)
		} else if (clauses.update) {
			const body = helper.operand.toExpression(clauses.update.children[2])
			list.push(`update(${clauses.update.children[1].name}=>${body})`)
		} else if (clauses.delete) {
			const body = helper.operand.toExpression(clauses.delete.children[2])
			list.push(`delete(${clauses.delete.children[1].name}=>${body})`)
		}
		if (clauses.filter) {
			const body = helper.operand.toExpression(clauses.filter.children[2])
			list.push(`filter(${clauses.filter.children[1].name}=>${body})`)
		}
		if (clauses.include) {
			const body = clauses.include.children[2]
			if (body.type === 'array') {
				const includes:string[] = []
				for (const child of body.children) {
					const include = this.toExpression(child)
					includes.push(include)
				}
				list.push(`include(${clauses.include.children[1].name}=>[${includes.join(',')}])`)
			} else {
				const include = this.toExpression(body)
				list.push(`include(${clauses.include.children[1].name}=>${include})`)
			}
		}

		if (clauses.groupBy) {
			const body = helper.operand.toExpression(clauses.groupBy.children[2])
			list.push(`groupBy(${clauses.groupBy.children[1].name}=>${body})`)
		}
		if (clauses.having) {
			const body = helper.operand.toExpression(clauses.having.children[2])
			list.push(`having(${clauses.having.children[1].name}=>${body})`)
		}
		if (clauses.sort) {
			const body = helper.operand.toExpression(clauses.sort.children[2])
			list.push(`sort(${clauses.sort.children[1].name}=>${body})`)
		}
		if (clauses.page) {
			const offset = helper.operand.toExpression(clauses.page.children[1])
			const limit = helper.operand.toExpression(clauses.page.children[2])
			list.push(`page(${offset},${limit})`)
		}
		// TODO: solve includes
		return `${clauses.from.name}.${list.join('.')}`
	}

	// public build (expression: string): Sentence {
	// const operand = this.expressions.build(expression)
	// const normalized = this.normalizer.normalize(operand)
	// const sentence = this.createSentence(normalized, new ExpressionContext(new EntityContext())) as Sentence
	// return sentence
	// }

	public build (expression: string): Sentence {
		const key = helper.utils.hashCode(expression)
		const value = this.cache.get(key.toString())
		if (value) {
			return value
		}
		const operand = this.expressions.build(expression)
		const normalized = this.normalizer.normalize(operand)
		const sentence = this.createSentence(normalized, new ExpressionContext(new EntityContext())) as Sentence
		this.cache.set(key.toString(), sentence)
		return sentence
	}

	private solveFields (operand: Operand, expressionContext: ExpressionContext): Operand {
		if (operand.type === OperandType.Var && !(operand instanceof Field)) {
			const parts = operand.name.split('.')
			if (parts[0] === expressionContext.current.arrowVar) {
				if (parts.length === 1) {
					// TODO: here the array of fields should be returned
					return new Field(operand.pos, expressionContext.current.entityName, '*', Type.any, expressionContext.current.alias, true)
				} else if (parts.length === 2) {
					return this.createSimpleField(operand.pos, parts, expressionContext)
				} else {
					return this.createRelationField(operand.pos, parts, expressionContext)
				}
			}
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				operand.children[i] = this.solveFields(operand.children[i], expressionContext)
			}
		}
		return operand
	}

	private createSimpleField (pos: Position, parts: string[], expressionContext: ExpressionContext): Operand {
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
					// TODO: here the array of fields should be returned
					return new Field(pos, relation, '*', Type.any, relationAlias + '.*', true)
				} else {
					throw new SintaxisError('Property ' + parts[1] + ' not fount in ' + expressionContext.current.entityName)
				}
			}
		}
	}

	private createRelationField (pos: Position, parts: string[], expressionContext: ExpressionContext): Operand {
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
				// TODO: here the array of fields should be returned
				return new Field(pos, relation2, '*', Type.any, relationAlias2 + '.*', false)
			} else {
				throw new SintaxisError('Property ' + propertyName + ' not fount in ' + relation)
			}
		}
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
		this.typeManager.type(sentence)
		// Solve columns
		sentence.columns = this.helper.getColumns(sentence)
		sentence.parameters = this.helper.getParameters(sentence)
		this.solveBehaviors.solve(sentence)
		this.solveConstraints.solve(sentence)
		return sentence
	}

	private createSentenceSelect (pos: Position, clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		const selectOperand = this.createMapClause(clauses.map, expressionContext)
		expressionContext.current.fields = this.helper.fieldsInSelect(selectOperand)
		expressionContext.current.groupByFields = this.helper.groupByFields(selectOperand)
		children.push(selectOperand)
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
			const pageChildren = clauses.page.children.filter((p: Operand) => p.type !== OperandType.Arrow).map((q: Operand) => this.solveFields(q, expressionContext)) as Operand[]
			children.push(new Page(pos, clauses.page.name, pageChildren, entityName, alias))
		}

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createSelectInclude, children)
		}
		this.createSentenceAddJoins(selectOperand.pos, expressionContext, children)

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
		if (body.type === 'array') {
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
		const child = this.solveFields(clause.children[2], expressionContext)
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
			const child = this.solveFields(clause.children[2], expressionContext)
			return new Map(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
		}
		throw new SintaxisError('Sentence Map incorrect!!!')
	}

	private createInsertClause (clause: Operand, expressionContext: ExpressionContext): Operand {
		if (clause.children.length === 2 && clause.children[1].type === OperandType.Obj) {
			// Example: Categories.insert({ name: name, description: description })
			const child = this.solveFields(clause.children[1], expressionContext)
			return new Insert(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias)
		}
		throw new SintaxisError('Sentence Insert incorrect!!!')
	}

	private createUpdateClause (clause: Operand, expressionContext: ExpressionContext): Operand {
		if (clause.children.length === 3 && clause.children[2].type === OperandType.Obj) {
			// Example: Categories.update(p=>{name:entity.name,description:entity.description})
			expressionContext.current.arrowVar = clause.children[1].name
			const child = this.solveFields(clause.children[2], expressionContext)
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
