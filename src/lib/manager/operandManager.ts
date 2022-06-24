
import { Property, Parameter, Data, Behavior, Constraint, SintaxisError, MetadataParameter, MetadataConstraint, MetadataModel, Metadata, Relation, Entity } from '../model'
import { ModelConfig } from '.'
import { Operand, Variable, Constant, KeyValue, List, Obj, Operator, FunctionRef, Block, ArrowFunction, ChildFunction, ExpressionConfig, Node, Expressions } from 'js-expressions'
import * as exp from 'js-expressions'
import { Constant2, Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete, SentenceInclude } from '../model/operands'

class EntityContext {
	public parent?: EntityContext
	public entityName: string
	public alias: string
	public children: EntityContext[]
	public joins: any
	public fields: Property[]
	public groupByFields: Field[]
	public arrowVar: string

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
export class OperandManager {
	private modelConfig: ModelConfig
	private expressionConfig: ExpressionConfig
	private expressions: Expressions

	constructor (modelConfig: ModelConfig, expressionConfig: ExpressionConfig, expressions: Expressions) {
		this.modelConfig = modelConfig
		this.expressionConfig = expressionConfig
		this.expressions = expressions
	}

	public build (node: Node): Sentence {
		const sentence = this.nodeToOperand(node, new ExpressionContext(new EntityContext())) as Sentence
		const reduced = this.reduce(sentence)
		return this.setParent(reduced) as Sentence
	}

	public model (sentence: Sentence): MetadataModel[] {
		const result: MetadataModel[] = []
		for (const column of sentence.columns) {
			if (!column.name.startsWith('__')) {
				result.push({ name: column.name, type: column.type })
			}
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const childType = include.relation.entity + (include.relation.type === 'manyToOne' ? '[]' : '')
			const child: MetadataModel = { name: include.relation.name, type: childType, children: [] }
			child.children = this.model(include.children[0] as Sentence)
			result.push(child)
		}
		return result
	}

	public parameters (sentence: Sentence): MetadataParameter[] {
		const parameters: MetadataParameter[] = []
		for (const parameter of sentence.parameters) {
			parameters.push({ name: parameter.name, type: parameter.type })
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const relationParameter: MetadataParameter = { name: include.relation.name, type: include.relation.entity, children: [] }
			const children = this.parameters(include.children[0] as Sentence)
			for (const q in children) {
				const child = children[q]
				relationParameter.children?.push(child)
			}
			parameters.push(relationParameter)
		}
		return parameters
	}

	public constraints (sentence: Sentence): MetadataConstraint {
		const result: MetadataConstraint = { entity: sentence.entity, constraints: sentence.constraints }
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const child = this.constraints(include.children[0] as Sentence)
			if (!result.children) {
				result.children = []
			}
			result.children.push(child)
		}
		return result
	}

	public clone (value: Operand): Operand {
		return this.deserialize(this.serialize(value))
	}

	public serialize (operand: Operand): string {
		return JSON.stringify(this._serialize(operand))
	}

	public deserialize (value: string): Operand {
		return (this._deserialize(JSON.parse(value)))
	}

	private _serialize (operand: Operand): Metadata {
		const children:Metadata[] = []
		for (const child of operand.children) {
			children.push(this._serialize(child))
		}
		if (operand instanceof Sentence) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, columns: operand.columns, parameters: operand.parameters, entity: operand.entity, constraints: operand.constraints }
		} else if (operand instanceof SentenceInclude) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, relation: operand.relation }
		} else if (operand instanceof Insert) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, clause: operand.clause }
		} else if (operand instanceof Update) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, alias: operand.alias }
		} else if (operand instanceof Delete) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, alias: operand.alias }
		} else if (operand instanceof KeyValue) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, property: operand.property }
		} else if (operand instanceof Field) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, entity: operand.entity, alias: operand.alias, isRoot: operand.isRoot }
		} else if (operand instanceof From) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, alias: operand.alias }
		} else if (operand instanceof Join) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, entity: operand.entity, alias: operand.alias }
		} else if (operand instanceof Variable) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, number: operand.number }
		} else {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type }
		}
	}

	private _deserialize (value: Metadata): Operand {
		const children:Operand[] = []
		if (value.children) {
			for (const k in value.children) {
				children.push(this._deserialize(value.children[k]))
			}
		}
		switch (value.classtype) {
		case 'Sentence':
			return new Sentence({
				name: value.name,
				children: children,
				entity: value.entity as string,
				alias: value.alias as string,
				columns: value.columns || [],
				parameters: value.parameters || [],
				constraints: value.constraints || [],
				values: value.values || [],
				defaults: value.defaults || []
			})
		case 'SentenceInclude':
			return new SentenceInclude(value.name, children, value.relation as Relation)
		case 'Delete':
			return new Delete(value.name, children, value.alias || '')
		case 'Update':
			return new Update(value.name, children, value.alias || '')
		case 'Insert':
			return new Insert(value.name, children, value.clause as string)
		case 'Page':
			return new Page(value.name, children, value.alias)
		case 'Sort':
			return new Sort(value.name, children, value.alias)
		case 'Having':
			return new Having(value.name, children, value.alias)
		case 'GroupBy':
			return new GroupBy(value.name, children, value.alias)
		case 'Filter':
			return new Filter(value.name, children, value.alias)
		case 'Map':
			return new Map(value.name, children, value.alias)
		case 'Join':
			return new Join(value.name, children, value.entity || '', value.alias || '')
		case 'From':
			return new From(value.name, value.alias || '')
		case 'Field':
			return new Field(value.entity as string, value.name, value.type as string, value.alias, value.isRoot)
		case 'Constant2':
			return new Constant2(value.name)
		case 'ArrowFunction':
			return new ArrowFunction(value.name, children)
		case 'ChildFunction':
			return new ChildFunction(value.name, children)
		case 'FunctionRef':
			return new FunctionRef(value.name, children)
		case 'Operator':
			return new Operator(value.name, children)
		case 'List':
			return new List(value.name, children)
		case 'Obj':
			return new Obj(value.name, children)
		case 'KeyValue':
			// eslint-disable-next-line no-case-declarations
			const keyValue = new KeyValue(value.name, children, value.type)
			keyValue.property = value.property
			return keyValue
		case 'Property':
			return new exp.Property(value.name, children, value.type)
		case 'Block':
			return new exp.Block(value.name, children, value.type)
		case 'If':
			return new exp.If(value.name, children, value.type)
		case 'ElseIf':
			return new exp.ElseIf(value.name, children, value.type)
		case 'Else':
			return new exp.Else(value.name, children, value.type)
		case 'While':
			return new exp.While(value.name, children, value.type)
		case 'For':
			return new exp.For(value.name, children, value.type)
		case 'ForIn':
			return new exp.ForIn(value.name, children, value.type)
		case 'Switch':
			return new exp.Switch(value.name, children, value.type)
		case 'Break':
			return new exp.Break(value.name, children, value.type)
		case 'Continue':
			return new exp.Continue(value.name, children, value.type)
		case 'Function':
			return new exp.Function(value.name, children, value.type)
		case 'Return':
			return new exp.Return(value.name, children, value.type)
		case 'Try':
			return new exp.Try(value.name, children, value.type)
		case 'Catch':
			return new exp.Catch(value.name, children, value.type)
		case 'Throw':
			return new exp.Throw(value.name, children, value.type)
		case 'Case':
			return new exp.Case(value.name, children, value.type)
		case 'Default':
			return new exp.Default(value.name, children, value.type)
		case 'Template':
			return new exp.Template(value.name, value.type)
		case 'Constant':
			return new Constant(value.name)
		case 'Variable':
			// eslint-disable-next-line no-case-declarations
			const variable = new Variable(value.name, value.type)
			variable.number = value.number
			return variable
		default:
			throw new SintaxisError(`Deserialize ${value.type} not implemented`)
		}
	}

	public eval (operand: Operand, data: Data): any {
		this.initialize(operand, new Data(data))
		return operand.eval()
	}

	private initialize (operand: Operand, data: Data) {
		let current = data
		if (operand instanceof ArrowFunction || operand instanceof ChildFunction) {
			const childData = current.newData()
			operand.data = childData
			operand.metadata = this.expressionConfig
			current = childData
		} else if (operand instanceof FunctionRef || operand instanceof Operator) {
			operand.metadata = this.expressionConfig
		} else if (operand instanceof Variable) {
			operand.data = current
		}
		for (const k in operand.children) {
			const p = operand.children[k]
			this.initialize(p, current)
		}
	}

	private reduce (operand: Operand): Operand {
		if (operand instanceof Operator) {
			return this.reduceOperand(operand)
		} else if (operand instanceof FunctionRef) {
			const funcMetadata = this.expressionConfig.getFunction(operand.name)
			if (funcMetadata && funcMetadata.deterministic) {
				return this.reduceOperand(operand)
			}
		}
		return operand
	}

	private reduceOperand (operand: Operand): Operand {
		let allConstants = true
		for (const k in operand.children) {
			const p = operand.children[k]
			if (!(p instanceof Constant2)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = this.eval(operand, new Data({}))
			const constant = new Constant2(value)
			constant.parent = operand.parent
			constant.index = operand.index
			return constant
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				const p = operand.children[i]
				operand.children[i] = this.reduce(p)
			}
		}
		return operand
	}

	private setParent (operand: Operand, index = 0, parent?: Operand) {
		try {
			if (parent) {
				operand.id = parent.id + '.' + index
				operand.parent = parent
				operand.index = index
				operand.level = parent.level ? parent.level + 1 : 0
			} else {
				operand.id = '0'
				operand.parent = undefined
				operand.index = 0
				operand.level = 0
			}
			for (let i = 0; i < operand.children.length; i++) {
				const p = operand.children[i]
				this.setParent(p, i, operand)
			}
			return operand
		} catch (error: any) {
			throw new SintaxisError('set parent: ' + operand.name + ' error: ' + error.toString())
		}
	}

	private nodeToOperand (node: Node, expressionContext: ExpressionContext): Operand {
		let operand: Operand
		if (node.type === 'arrow' || node.type === 'childFunc') {
			operand = this.createSentence(node, expressionContext)
		} else {
			const children: Operand[] = []
			if (node.children) {
				for (const i in node.children) {
					const p = node.children[i]
					const child = this.nodeToOperand(p, expressionContext)

					children.push(child)
				}
			}
			operand = this.createOperand(node, children, expressionContext)
			for (let i = 0; i < children.length; i++) {
				const child = children[i]
				child.parent = operand
				child.index = i
			}
		}
		return operand
	}

	private createOperand (node: Node, children: Operand[], expressionContext: ExpressionContext): Operand {
		switch (node.type) {
		case 'const':
			return new Constant2(node.name)
		case 'var':
			return this.createVariable(node, expressionContext)
		case 'keyVal':
			return new KeyValue(node.name, children)
		case 'array':
			return new List(node.name, children)
		case 'obj':
			return new Obj(node.name, children)
		case 'operator':
			return new Operator(node.name, children)
		case 'funcRef':
			return new FunctionRef(node.name, children)
		case 'block':
			return new Block(node.name, children)
		default:
			throw new SintaxisError('node name: ' + node.name + ' type: ' + node.type + ' not supported')
		}
	}

	private createVariable (node: Node, expressionContext: ExpressionContext): Operand {
		const parts = node.name.split('.')
		if (parts[0] === expressionContext.current.arrowVar) {
			if (parts.length === 1) {
				// TODO, aquí se debería retornar el array de fields
				return new Field(expressionContext.current.entityName, '*', 'any', expressionContext.current.alias, true)
			} else if (parts.length === 2) {
				return this.createSimpleField(parts, expressionContext)
			} else {
				return this.createRelationField(parts, expressionContext)
			}
		} else {
			return new Variable(node.name)
		}
	}

	private createSimpleField (parts: string[], expressionContext: ExpressionContext): Operand {
		const _field = expressionContext.current.fields.find(p => p.name === parts[1])
		if (_field) {
			return new Field(expressionContext.current.entityName, _field.name, _field.type, expressionContext.current.alias, true)
		} else {
			if (this.modelConfig.existsProperty(expressionContext.current.entityName, parts[1])) {
				const property = this.modelConfig.getProperty(expressionContext.current.entityName, parts[1])
				return new Field(expressionContext.current.entityName, property.name, property.type, expressionContext.current.alias, true)
			} else {
				const relationInfo = this.modelConfig.getRelation(expressionContext.current.entityName, parts[1])
				if (relationInfo) {
					const relation = this.addJoins(parts, parts.length, expressionContext)
					const relationAlias = expressionContext.current.joins[relation]
					// TODO, aquí se debería retornar el array de fields
					return new Field(relation, '*', 'any', relationAlias + '.*', true)
				} else {
					throw new SintaxisError('Property ' + parts[1] + ' not fount in ' + expressionContext.current.entityName)
				}
			}
		}
	}

	private createRelationField (parts: string[], expressionContext: ExpressionContext): Operand {
		const propertyName = parts[parts.length - 1]
		const relation = this.addJoins(parts, parts.length - 1, expressionContext)
		const info = this.modelConfig.getRelation(expressionContext.current.entityName, relation)
		const relationAlias = expressionContext.current.joins[relation]
		const property = info.entity.properties.find(p => p.name === propertyName)
		if (property) {
			return new Field(info.entity.name, property.name, property.type, relationAlias, false)
		} else {
			const childRelation = info.entity.relations.find(p => p.name === propertyName)
			if (childRelation) {
				const relation2 = this.addJoins(parts, parts.length, expressionContext)
				const relationAlias2 = expressionContext.current.joins[relation2]
				// TODO, aquí se debería retornar el array de fields
				return new Field(relation2, '*', 'any', relationAlias2 + '.*', false)
			} else {
				throw new SintaxisError('Property ' + propertyName + ' not fount in ' + relation)
			}
		}
	}

	private createSentence (node: Node, expressionContext: ExpressionContext): Sentence {
		expressionContext.current = new EntityContext(expressionContext.current)
		const clauses: any = this.getSentence(node)
		expressionContext.current.entityName = clauses.from.name
		// expressionContext.current.metadata = this.modelConfig.getEntity(expressionContext.current.entityName)
		expressionContext.current.alias = this.createAlias(expressionContext, expressionContext.current.entityName)

		const children: Operand[] = []
		let operand:Operand| undefined

		if (clauses.filter) {
			// TODO: Si la sentencia es Select, Update o Delete y la entidad tienen una o mas propiedades con key.
			// Se debe agregar el filtro por esta key
			const clause = clauses.filter
			operand = this.createClause(clause, expressionContext)
			children.push(operand)
		}
		if (clauses.from) {
			operand = new From(expressionContext.current.entityName, expressionContext.current.alias)
			children.push(operand)
		}

		let sentence:Sentence|undefined
		if (clauses.map) {
			sentence = this.createSentenceSelect(clauses, expressionContext, children)
		} else if (clauses.insert) {
			sentence = this.createSentenceInsert(clauses, expressionContext, children)
		} else if (clauses.bulkInsert) {
			sentence = this.createSentenceBulkInsert(clauses, expressionContext, children)
		} else if (clauses.update) {
			sentence = this.createSentenceUpdate(clauses, expressionContext, children)
		} else if (clauses.delete) {
			sentence = this.createSentenceDelete(clauses, expressionContext, children)
		}
		expressionContext.current = expressionContext.current.parent ? expressionContext.current.parent : new EntityContext()
		if (!sentence) {
			throw new SintaxisError('Sentence incomplete')
		}
		return sentence
	}

	private createSentenceSelect (clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		const selectOperand = this.createMapClause(clauses.map, expressionContext)
		expressionContext.current.fields = this.fieldsInSelect(selectOperand, expressionContext)
		expressionContext.current.groupByFields = this.groupByFields(selectOperand)
		children.push(selectOperand)

		if (expressionContext.current.groupByFields.length > 0) {
			const fields:Field[] = []
			for (const groupByField of expressionContext.current.groupByFields) {
				fields.push(groupByField.clone())
			}
			if (fields.length === 1) {
				children.push(new GroupBy('groupBy', fields))
			} else {
				const array: Operand = new List('array', fields)
				children.push(new GroupBy('groupBy', [array]))
			}
		}
		if (clauses.having) {
			children.push(this.createClause(clauses.having, expressionContext))
		}
		if (clauses.sort) {
			children.push(this.createClause(clauses.sort, expressionContext))
		}
		if (clauses.page) {
			const pageChildren = clauses.page.children.map((p: Node) => this.nodeToOperand(p, expressionContext))
			children.push(new Page(clauses.page.name, pageChildren))
		}

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createSelectInclude, children)
		}
		this.createSentenceAddJoins(expressionContext, children)
		for (const child of children) {
			this.solveTypes(child, expressionContext)
		}

		return new Sentence({
			name: 'select',
			children: children,
			entity: expressionContext.current.entityName,
			alias: expressionContext.current.alias,
			columns: expressionContext.current.fields,
			parameters: this.parametersInSentence(children),
			values: this.getBehaviorReadValues(expressionContext.current.entityName, selectOperand),
			constraints: [],
			defaults: []
		})
	}

	private createSentenceInsert (clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		// TODO: Si la entidad tienen una o mas propiedades con key.
		// Se debe agregar estas propiedades usando el key
		const clause = clauses.insert as Node
		const operand = this.createInsertClause(clause, expressionContext)
		expressionContext.current.fields = this.fieldsInModify(operand, expressionContext)
		children.push(operand)

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createInclude, children)
		}
		for (const child of children) {
			this.solveTypes(child, expressionContext)
		}
		const parameters = this.parametersInSentence(children)
		return new Sentence({
			name: 'insert',
			children: children,
			entity: expressionContext.current.entityName,
			alias: expressionContext.current.alias,
			columns: expressionContext.current.fields,
			parameters: parameters,
			constraints: this.getConstraints(expressionContext.current.entityName, parameters),
			values: this.getBehaviorWriteValues(expressionContext.current.entityName, parameters),
			defaults: this.getBehaviorDefaults(expressionContext.current.entityName)
		})
	}

	private createSentenceBulkInsert (clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		const clause = clauses.bulkInsert as Node
		const operand = this.createInsertClause(clause, expressionContext)
		expressionContext.current.fields = this.fieldsInModify(operand, expressionContext)
		children.push(operand)

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createInclude, children)
		}
		for (const child of children) {
			this.solveTypes(child, expressionContext)
		}
		const parameters = this.parametersInSentence(children)
		return new Sentence({
			name: 'bulkInsert',
			children: children,
			entity: expressionContext.current.entityName,
			alias: expressionContext.current.alias,
			columns: expressionContext.current.fields,
			parameters: parameters,
			constraints: this.getConstraints(expressionContext.current.entityName, parameters),
			values: this.getBehaviorWriteValues(expressionContext.current.entityName, parameters),
			defaults: this.getBehaviorDefaults(expressionContext.current.entityName)
		})
	}

	private createSentenceUpdate (clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		const clause = clauses.update as Node
		const operand = this.createUpdateClause(clause, expressionContext)
		expressionContext.current.fields = this.fieldsInModify(operand, expressionContext)
		children.push(operand)

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createInclude, children)
		}
		for (const child of children) {
			this.solveTypes(child, expressionContext)
		}
		const parameters = this.parametersInSentence(children)
		return new Sentence({
			name: 'update',
			children: children,
			entity: expressionContext.current.entityName,
			alias: expressionContext.current.alias,
			columns: expressionContext.current.fields,
			parameters: parameters,
			constraints: this.getConstraints(expressionContext.current.entityName, parameters),
			values: this.getBehaviorWriteValues(expressionContext.current.entityName, parameters),
			defaults: []
		})
	}

	private createSentenceDelete (clauses: any, expressionContext: ExpressionContext, children: Operand[]): Sentence {
		const operand = new Delete(expressionContext.current.entityName, [], expressionContext.current.alias)
		children.push(operand)

		if (clauses.include) {
			this.createSentenceAddIncludes(expressionContext, clauses, this.createInclude, children)
		}
		for (const child of children) {
			this.solveTypes(child, expressionContext)
		}
		return new Sentence({
			name: 'update',
			children: children,
			entity: expressionContext.current.entityName,
			alias: expressionContext.current.alias,
			columns: expressionContext.current.fields,
			parameters: this.parametersInSentence(children),
			constraints: [],
			values: [],
			defaults: []
		})
	}

	private createSentenceAddIncludes (expressionContext: ExpressionContext, clauses: any, createInclude:any, children: Operand[]):void {
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

	private createSentenceAddJoins (expressionContext: ExpressionContext, children: Operand[]):void {
		for (const key in expressionContext.current.joins) {
			const info = this.modelConfig.getRelation(expressionContext.current.entityName, key)
			const relatedEntity = info.previousEntity.name
			const relatedAlias = info.previousRelation !== '' ? expressionContext.current.joins[info.previousRelation] : expressionContext.current.alias
			const relatedProperty = info.previousEntity.properties.find(p => p.name === info.relation.from) as Property
			const relationEntity = info.entity.name
			const relationAlias = expressionContext.current.joins[key]
			const relationProperty = info.entity.properties.find(p => p.name === info.relation.to) as Property

			// TODO: Aquí usar el key para agregar el filtro que corresponda
			// si una entidad tiene uno o mas propiedades con key, se debe agregar un filtro por el key
			const relatedField = new Field(relatedEntity, info.relation.from, relatedProperty.type, relatedAlias)
			const relationField = new Field(relationEntity, info.relation.to, relationProperty.type, relationAlias)
			const equal = new Operator('==', [relationField, relatedField])
			const operand = new Join(relationEntity, [equal], relatedEntity, relationAlias)
			children.push(operand)
		}
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
		const child = (operand.children[0] instanceof FunctionRef && operand.children[0].name === 'distinct')
			? operand.children[0].children[0]
			: operand.children[0]

		if (!(child instanceof Obj)) {
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
		const properties = this.getPropertiesFromParameters(entityName, parameters)
		if (properties) {
			for (const property of properties) {
				if (property.writeValue) {
					behaviors.push({ property: property.name, expression: property.writeValue })
				}
			}
		}
		return behaviors
	}

	private getPropertiesFromParameters (entityName: string, parameters: Parameter[]): Property[] {
		const entity = this.modelConfig.getEntity(entityName)
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

	private getConstraints (entityName: string, parameters: Parameter[]): Constraint[] {
		const queryProperties = this.getPropertiesFromParameters(entityName, parameters)
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
			if (property.nullable === false && property.default === undefined && property.key === undefined) {
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
						condition: `includes(${property.name},[${values}])`
					}
					constraints.push(constraint)
				}
			}
		}
	}

	private createClause (clause: Node, expressionContext: ExpressionContext): Operand {
		expressionContext.current.arrowVar = clause.children[1].name
		const child = this.nodeToOperand(clause.children[2], expressionContext)
		switch (clause.name) {
		case 'filter': return new Filter(clause.name, [child])
		case 'having': return new Having(clause.name, [child])
		case 'sort': return new Sort(clause.name, [child])
		default: throw new SintaxisError('clause : ' + clause.name + ' not supported')
		}
	}

	private createMapClause (clause: Node, expressionContext: ExpressionContext): Operand {
		if (clause.children.length === 3) {
			expressionContext.current.arrowVar = clause.children[1].name
			const child = this.nodeToOperand(clause.children[2], expressionContext)
			return new Map(clause.name, [child])
		}
		throw new SintaxisError('Sentence Map incorrect!!!')
	}

	private createInsertClause (clause: Node, expressionContext: ExpressionContext): Operand {
		if (clause.children.length === 2) {
			// Example: Categories.insert({ name: name, description: description })
			if (clause.children[1].type === 'obj') {
				const child = this.nodeToOperand(clause.children[1], expressionContext)
				return new Insert(expressionContext.current.entityName, [child], clause.name)
			} else { throw new SintaxisError('Args incorrect in Sentence Insert') }
		} else if (clause.children.length === 3) {
			// Example: Categories.insert(() => ({ name: name, description: description }))
			if (clause.children[2].type === 'obj') {
				const child = this.nodeToOperand(clause.children[2], expressionContext)
				return new Insert(expressionContext.current.entityName, [child], clause.name)
			} else { throw new SintaxisError('Args incorrect in Sentence Insert') }
		}
		throw new SintaxisError('Sentence Insert incorrect!!!')
	}

	private createUpdateClause (clause: Node, expressionContext: ExpressionContext): Operand {
		if (clause.children.length === 2) {
			if (clause.children[1].type === 'obj') {
				// Example: Orders.update({name:'test'})
				const child = this.nodeToOperand(clause.children[1], expressionContext)
				return new Update(expressionContext.current.entityName, [child], expressionContext.current.alias)
			} else {
				throw new SintaxisError('Args incorrect in Sentence Update')
			}
		} else if (clause.children.length === 3) {
			// Example: Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
			expressionContext.current.arrowVar = clause.children[1].name
			const child = this.nodeToOperand(clause.children[2], expressionContext)
			return new Update(expressionContext.current.entityName, [child], expressionContext.current.alias)
		}
		throw new SintaxisError('Sentence Update incorrect!!!')
	}

	private createSelectInclude (node: Node, expressionContext: ExpressionContext): SentenceInclude {
		let current = node
		while (current) {
			if (current.type === 'var') {
				// p.details
				const parts = current.name.split('.')
				const relationName = parts[1]
				const relationInfo = this.modelConfig.getRelation(expressionContext.current.entityName, relationName)
				current.name = relationInfo.entity.name
				const child = this.createSentence(node, expressionContext)
				return new SentenceInclude(relationInfo.relation.name, [child], relationInfo.relation)
			}
			if (current.children.length > 0) {
				current = current.children[0]
			} else {
				break
			}
		}
		throw new SintaxisError('Error to create SentenceInclude')
	}

	private createInclude (node: Node, expressionContext: ExpressionContext): SentenceInclude {
		let current = node
		while (current) {
			if (current.type === 'var') {
				// p.details
				const parts = current.name.split('.')
				const relationName = parts[1]
				const relationInfo = this.modelConfig.getRelation(expressionContext.current.entityName, relationName)
				current.name = relationInfo.entity.name
				const child = this.createSentence(node, expressionContext)
				return new SentenceInclude(relationName, [child], relationInfo.relation)
			}
			if (current.children.length > 0) {
				current = current.children[0]
			} else { break }
		}
		throw new SintaxisError('Error to create SentenceInclude')
	}

	private getSentence (node: Node): any {
		const sentence: any = {}
		let current = node
		while (current) {
			const name = current.type === 'var' ? 'from' : current.name
			sentence[name] = current
			if (current.children.length > 0) {
				current = current.children[0]
			} else {
				break
			}
		}
		return sentence
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

	private groupByFields (operand: Operand): Field[] {
		const data = { fields: [], groupBy: false }
		this._groupByFields(operand, data)
		return data.groupBy ? data.fields : []
	}

	private _groupByFields (operand: Operand, data: any): void {
		if (operand instanceof Field) {
			data.fields.push(operand)
		} else if (operand instanceof FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			data.groupBy = true
		} else if (!(operand instanceof Sentence)) {
			for (const k in operand.children) {
				const p = operand.children[k]
				this._groupByFields(p, data)
			}
		}
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

	private fieldsInSelect (operand: Operand, expressionContext: ExpressionContext): Property[] {
		const fields: Property[] = []
		if (operand.children.length === 1) {
			let child: Operand
			if (operand.children[0] instanceof FunctionRef && operand.children[0].name === 'distinct') {
				child = operand.children[0].children[0]
			} else {
				child = operand.children[0]
			}

			if (child instanceof Obj) {
				const obj = child
				for (const keyVal of obj.children) {
					if (keyVal.children[0] instanceof Field) {
						const _field = keyVal.children[0]
						const field = { name: keyVal.name, type: _field.type }
						fields.push(field)
					} else {
						const field = { name: keyVal.name, type: this.solveTypes(keyVal.children[0], expressionContext) }
						fields.push(field)
					}
				}
			}
		}
		return fields
	}

	/**
	* change name of property by mapping and return fields for clause update or insert
	* @param operand clause update or update
	* @param expressionContext current ExpressionContext
	* @returns fields to execute query
	*/
	private fieldsInModify (operand: Operand, expressionContext: ExpressionContext): Property[] {
		const fields: Property[] = []
		if (operand.children.length === 1) {
			if (operand.children[0] instanceof Object) {
				const obj = operand.children[0]
				for (const p in obj.children) {
					const keyVal = obj.children[p] as KeyValue
					const property = this.modelConfig.getProperty(expressionContext.current.entityName, keyVal.name)
					const field = { name: keyVal.name, type: property.type }
					keyVal.property = property.name // new Field(expressionContext.current.entity,property.name,property.type,property.mapping)
					fields.push(field)
				}
			}
		}
		return fields
	}

	private parametersInSentence (children: Operand[]): Parameter[] {
		const map = children.find(p => p.name === 'map')
		const filter = children.find(p => p.name === 'filter')
		const groupBy = children.find(p => p.name === 'groupBy')
		const having = children.find(p => p.name === 'having')
		const sort = children.find(p => p.name === 'sort')
		const insert = children.find(p => p instanceof Insert) as Insert | undefined
		const update = children.find(p => p instanceof Update) as Update | undefined
		const _delete = children.find(p => p instanceof Delete) as Delete | undefined

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
		if (operand instanceof Variable) {
			if (parameters.find(p => p.name === operand.name) === undefined) {
				let type: string
				if (operand.type === '') type = 'any'
				else if (operand.type === 'T[]') type = 'array'
				else type = operand.type
				parameters.push({ name: operand.name, type: type })
			}
		}
		for (const child of operand.children) {
			this.loadParameters(child, parameters)
		}
	}

	// TODO: determinar el tipo de la variable de acuerdo a la expression.
	// si se usa en un operador con que se esta comparando.
	// si se usa en una función que tipo corresponde de acuerdo en la posición que esta ocupando.
	// let type = this.solveType(operand,childNumber)
	private solveTypes (operand: Operand, expressionContext: ExpressionContext): string {
		if (operand instanceof Constant2 || operand instanceof Field || operand instanceof Variable) return operand.type
		if (operand instanceof Update || operand instanceof Insert) {
			this.solveTypesInsertUpdate(operand)
		}
		if (!(operand instanceof Sentence || operand instanceof ArrowFunction || operand instanceof ChildFunction) && (operand instanceof Operator || operand instanceof FunctionRef)) {
			this.solveTypesFunction(operand, expressionContext)
		}
		// recorre todos los hijos para resolver el tipo
		for (const child of operand.children) {
			this.solveTypes(child, expressionContext)
		}
		return operand.type
	}

	private solveTypesInsertUpdate (operand: Operand):void {
		if (operand.children.length === 1) {
			if (operand.children[0] instanceof Object) {
				const obj = operand.children[0]
				for (const p in obj.children) {
					const keyVal = obj.children[p] as KeyValue
					const entityName = operand.name
					const property = this.modelConfig.getProperty(entityName, keyVal.name)
					if (keyVal.children[0].type === 'any') {
						keyVal.children[0].type = property.type
					}
				}
			}
		}
	}

	private solveTypesFunction (operand: Operand, expressionContext: ExpressionContext):void {
		// get metadata of operand
		const metadata = operand instanceof Operator
			? this.expressionConfig.getOperator(operand.name, operand.children.length)
			: this.expressionConfig.getFunction(operand.name)
		// recorre todos los parámetros
		const tType = this.solveTypesParameters(operand, expressionContext, metadata)
		// en el caso que se haya podido resolver T
		if (tType !== 'any') {
			// en el caso que el operando sea T asigna el tipo correspondiente al operando
			if (metadata.return === 'T' && operand.type === 'any') { operand.type = tType }
			// busca los parámetros que sea T y los hijos aun no fueron definidos para asignarle el tipo correspondiente
			for (let i = 0; i < metadata.params.length; i++) {
				const param = metadata.params[i]
				const child = operand.children[i]
				if (param.type === 'T' && child.type === 'any') {
					child.type = tType
				}
			}
		}
	}

	private solveTypesParameters (operand: Operand, expressionContext: ExpressionContext, metadata:exp.OperatorMetadata):string {
		let tType = 'any'
		for (let i = 0; i < metadata.params.length; i++) {
			const param = metadata.params[i]
			const child = operand.children[i]
			if (param.type !== 'T' && param.type !== 'any' && child.type === 'any') {
				// en el caso que el parámetro tenga un tipo definido y el hijo no, asigna al hijo el tipo del parámetro
				child.type = param.type
			} else if (param.type === 'T' && child.type !== 'any') {
				// en el caso que el parámetro sea T y el hijo tiene un tipo definido, determina que T es el tipo de hijo
				tType = child.type
			} else if (param.type === 'T' && child.type === 'any') {
				// en el caso que el parámetro sea T y el hijo no tiene un tipo definido, intenta resolver el hijo
				// en caso de lograrlo determina que T es el tipo de hijo
				const childType = this.solveTypes(child, expressionContext)
				if (childType !== 'any') {
					tType = childType
					break
				}
			}
		}
		return tType
	}
}
