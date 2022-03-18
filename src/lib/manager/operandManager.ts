
import { Property, Parameter, Data, Behavior, Constraint, SintaxisError, MethodNotImplemented, MetadataParameter, MetadataConstraint, MetadataModel, Metadata } from '../model'
import { ModelConfig } from '.'
import { Operand, Variable, KeyValue, List, Obj, Operator, FunctionRef, Block, ArrowFunction, ChildFunction, ExpressionConfig, Node, Expressions } from 'js-expressions'
import { Constant2, Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete, SentenceInclude } from '../model/operands'

class EntityContext {
	public parent?:EntityContext
	public entityName:string
	public alias:string
	public children:EntityContext[]
	public joins: any
	public fields:Property[]
	public groupByFields:Field[]
	public arrowVar:string

	constructor (parent?:EntityContext) {
		this.parent = parent
		if (parent)parent.children.push(this)
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
	public aliases:any
	public current:EntityContext
	constructor (current:EntityContext) {
		this.current = current
		this.aliases = {}
	}
}
export class OperandManager {
	private modelConfig: ModelConfig
	private expressionConfig: ExpressionConfig
	private expressions: Expressions

	constructor (modelConfig: ModelConfig, expressionConfig:ExpressionConfig, expressions: Expressions) {
		this.modelConfig = modelConfig
		this.expressionConfig = expressionConfig
		this.expressions = expressions
	}

	public build (node:Node):Sentence {
		const sentece = this.nodeToOperand(node, new ExpressionContext(new EntityContext())) as Sentence
		const reduced = this.reduce(sentece)
		return this.setParent(reduced) as Sentence
	}

	public model (sentence:Sentence):MetadataModel[] {
		const result:MetadataModel[] = []
		for (let i = 0; i < sentence.columns.length; i++) {
			const column = sentence.columns[i]
			if (!column.name.startsWith('__')) {
				result.push({ name: column.name, type: column.type })
			}
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const childType = include.relation.entity + (include.relation.type === 'manyToOne' ? '[]' : '')
			const child:MetadataModel = { name: include.relation.name, type: childType, childs: [] }
			child.childs = this.model(include.children[0] as Sentence)
			result.push(child)
		}
		return result
	}

	public parameters (sentence:Sentence):MetadataParameter[] {
		const parameters:MetadataParameter[] = []
		for (let i = 0; i < sentence.parameters.length; i++) {
			const parameter = sentence.parameters[i]
			parameters.push({ name: parameter.name, type: parameter.type })
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const relationParameter:MetadataParameter = { name: include.relation.name, type: include.relation.entity, childs: [] }
			const childsParameters = this.parameters(include.children[0] as Sentence)
			for (const q in childsParameters) {
				const childParameter = childsParameters[q]
				relationParameter.childs?.push(childParameter)
			}
			parameters.push(relationParameter)
		}
		return parameters
	}

	public constraints (sentence:Sentence):MetadataConstraint {
		const result: MetadataConstraint = { entity: sentence.entity, constraints: sentence.constraints }
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const child = this.constraints(include.children[0] as Sentence)
			if (!result.childs) {
				result.childs = []
			}
			result.childs.push(child)
		}
		return result
	}

	public serialize (operand:Operand):Metadata {
		const children = []
		for (const k in operand.children) {
			children.push(this.serialize(operand.children[k]))
		}
		if (operand instanceof Sentence) {
			return { name: operand.name, type: operand.constructor.name, children: children, fields: operand.columns, parameters: operand.parameters, entity: operand.entity }
		} else if (operand instanceof SentenceInclude) {
			// return { n: operand.name, t: operand.constructor.name, c: children, r: operand.relation, v: operand.variable }
			return { name: operand.name, type: operand.constructor.name, children: children, relation: operand.relation }
		} else if (operand instanceof Insert) {
			return { name: operand.name, type: operand.constructor.name, children: children, sentence: operand.clause }
		} else if (operand instanceof KeyValue) {
			return { name: operand.name, type: operand.constructor.name, children: children, property: operand.property }
			// return { n: operand.name, t: operand.constructor.name, c: children, m: operand.mapping }
		} else if (operand instanceof Field) {
			return { name: operand.name, type: operand.constructor.name, children: children, entity: operand.entity, alias: operand.alias }
		} else if (operand instanceof Variable) {
			return { name: operand.name, type: operand.constructor.name, children: children, number: operand.number }
		} else {
			return { name: operand.name, type: operand.constructor.name, children: children }
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public deserialize (serialized:any):Operand {
		throw new MethodNotImplemented('OperandManager', 'deserialize')
	}

	public eval (operand:Operand, data:Data):any {
		this.initialize(operand, new Data(data))
		return operand.eval()
	}

	private initialize (operand:Operand, data:Data) {
		let current = data
		if (operand instanceof ArrowFunction) {
			const childData = current.newData()
			operand.data = childData
			operand.metadata = this.expressionConfig
			current = childData
		} else if (operand instanceof ChildFunction) {
			const childData = current.newData()
			operand.data = childData
			operand.metadata = this.expressionConfig
			current = childData
		} else if (operand instanceof FunctionRef) {
			operand.metadata = this.expressionConfig
		} else if (operand instanceof Operator) {
			operand.metadata = this.expressionConfig
		} else if (operand instanceof Variable) {
			operand.data = current
		}
		for (const k in operand.children) {
			const p = operand.children[k]
			this.initialize(p, current)
		}
	}

	private reduce (operand:Operand):Operand {
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

	private reduceOperand (operand:Operand):Operand {
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

	private setParent (operand:Operand, index = 0, parent?:Operand) {
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
		} catch (error:any) {
			throw new SintaxisError('set parent: ' + operand.name + ' error: ' + error.toString())
		}
	}

	private nodeToOperand (node:Node, expressionContext:ExpressionContext):Operand {
		let operand:Operand
		if (node.type === 'arrow' || node.type === 'childFunc') {
			operand = this.createSentence(node, expressionContext)
		} else {
			const children:Operand[] = []
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

	private createOperand (node:Node, children:Operand[], expressionContext:ExpressionContext):Operand {
		switch (node.type) {
		case 'const':
			return new Constant2(node.name)
		case 'var': {
			const parts = node.name.split('.')
			if (parts[0] === expressionContext.current.arrowVar) {
				if (parts.length === 1) {
					// TODO, aqui se deberia retornar el array de fields
					return new Field(expressionContext.current.entityName, '*', 'any', expressionContext.current.alias)
				} else if (parts.length === 2) {
					const _field = expressionContext.current.fields.find(p => p.name === parts[1])
					if (_field) {
						return new Field(expressionContext.current.entityName, _field.name, _field.type, expressionContext.current.alias)
					} else {
						if (this.modelConfig.existsProperty(expressionContext.current.entityName, parts[1])) {
							const property = this.modelConfig.getProperty(expressionContext.current.entityName, parts[1])
							return new Field(expressionContext.current.entityName, property.name, property.type, expressionContext.current.alias)
						} else {
							const relationInfo = this.modelConfig.getRelation(expressionContext.current.entityName, parts[1])
							if (relationInfo) {
								const relation = this.addJoins(parts, parts.length, expressionContext)
								const relationAlias = expressionContext.current.joins[relation]
								// TODO, aqui se deberia retornar el array de fields
								return new Field(relation, '*', 'any', relationAlias + '.*')
							} else {
								throw new SintaxisError('Property ' + parts[1] + ' not fount in ' + expressionContext.current.entityName)
							}
						}
					}
				} else {
					const propertyName = parts[parts.length - 1]
					const relation = this.addJoins(parts, parts.length - 1, expressionContext)
					const info = this.modelConfig.getRelation(expressionContext.current.entityName, relation)
					const relationAlias = expressionContext.current.joins[relation]
					const property = info.entity.properties.find(p => p.name === propertyName)
					if (property) {
						return new Field(info.entity.name, property.name, property.type, relationAlias)
					} else {
						const childRelation = info.entity.relations.find(p => p.name === propertyName)
						if (childRelation) {
							const relation2 = this.addJoins(parts, parts.length, expressionContext)
							const relationAlias2 = expressionContext.current.joins[relation2]
							// TODO, aqui se deberia retornar el array de fields
							return new Field(relation2, '*', 'any', relationAlias2 + '.*')
						} else {
							throw new SintaxisError('Property ' + propertyName + ' not fount in ' + relation)
						}
					}
				}
			} else { return new Variable(node.name) }
		}
		case 'keyVal':
			return new KeyValue(node.name, children)
		case 'array':
			return new List(node.name, children)
		case 'obj':
			return new Obj(node.name, children)
		case 'oper':
			return new Operator(node.name, children)
		case 'funcRef':
			return new FunctionRef(node.name, children)
		case 'block':
			return new Block(node.name, children)
		default:
			throw new SintaxisError('node name: ' + node.name + ' type: ' + node.type + ' not supported')
		}
	}

	private createSentence (node:Node, expressionContext:ExpressionContext):Sentence {
		expressionContext.current = new EntityContext(expressionContext.current)
		let createInclude:any
		const clauses:any = this.getSentence(node)
		expressionContext.current.entityName = clauses.from.name
		// expressionContext.current.metadata = this.modelConfig.getEntity(expressionContext.current.entityName)
		expressionContext.current.alias = this.createAlias(expressionContext, expressionContext.current.entityName)
		let name = ''
		const children:Operand[] = []
		let operand = null
		let selectOperand = null

		if (clauses.filter) {
			// TODO: Si la sentencia es Select, Update o Delete y la entidad tienen una o mas propiedades con key.
			// Se debe agregar el filtro por esta key
			const clause = clauses.filter
			operand = this.createClause(clause, expressionContext)
			children.push(operand)
		}
		if (clauses.from) {
			operand = new From(expressionContext.current.entityName + '.' + expressionContext.current.alias)
			children.push(operand)
		}
		if (clauses.insert) {
			// TODO: Si la entidad tienen una o mas propiedades con key.
			// Se debe agregar el seteo de estas propieades usando el key
			name = 'insert'
			createInclude = this.createInclude
			const clause = clauses.insert as Node
			operand = this.createInsertClause(clause, expressionContext)
			expressionContext.current.fields = this.fieldsInModify(operand, expressionContext)
			children.push(operand)
		} else if (clauses.bulkInsert) {
			name = 'bulkInsert'
			createInclude = this.createInclude
			const clause = clauses.bulkInsert as Node
			operand = this.createInsertClause(clause, expressionContext)
			expressionContext.current.fields = this.fieldsInModify(operand, expressionContext)
			children.push(operand)
		} else if (clauses.update) {
			name = 'update'
			createInclude = this.createInclude
			const clause = clauses.update as Node
			operand = this.createUpdateClause(clause, expressionContext)
			expressionContext.current.fields = this.fieldsInModify(operand, expressionContext)
			children.push(operand)
		} else if (clauses.delete) {
			name = 'delete'
			createInclude = this.createInclude
			// const clause = clauses.delete
			operand = new Delete(expressionContext.current.entityName + '.' + expressionContext.current.alias)
			children.push(operand)
		} else if (clauses.map) {
			name = 'select'
			createInclude = this.createSelectInclude
			const clause = clauses.map
			selectOperand = this.createMapClause(clause, expressionContext)
			expressionContext.current.fields = this.fieldsInSelect(selectOperand, expressionContext)
			expressionContext.current.groupByFields = this.groupByFields(selectOperand)
			children.push(selectOperand)

			if (expressionContext.current.groupByFields.length > 0) {
				const fields = []
				for (let i = 0; i < expressionContext.current.groupByFields.length; i++) {
					const groupByField = expressionContext.current.groupByFields[i].clone()
					fields.push(groupByField)
				}
				if (fields.length === 1) {
					operand = new GroupBy('groupBy', fields)
				} else {
					const array:Operand = new List('array', fields)
					operand = new GroupBy('groupBy', [array])
				}
				children.push(operand)
			}
			if (clauses.having) {
				const clause = clauses.having
				operand = this.createClause(clause, expressionContext)
				children.push(operand)
			}
			if (clauses.sort) {
				const clause = clauses.sort
				operand = this.createClause(clause, expressionContext)
				children.push(operand)
			}
			if (clauses.page) {
				const clause = clauses.page
				const childs = clause.children.map((p:Node) => this.nodeToOperand(p, expressionContext))
				operand = new Page(clause.name, childs)
				children.push(operand)
			}
		}
		if (clauses.include) {
			if (!createInclude) {
				throw new SintaxisError('Include not implemented!!!')
			}

			const clause = clauses.include
			expressionContext.current.arrowVar = clause.children[1].name
			const body = clause.children[2]
			if (body.type === 'array') {
				for (let i = 0; i < body.children.length; i++) {
					const include = createInclude.bind(this)(body.children[i], expressionContext)
					children.push(include)
				}
			} else {
				const include = createInclude.bind(this)(body, expressionContext)
				children.push(include)
			}
		}
		for (const key in expressionContext.current.joins) {
			const info = this.modelConfig.getRelation(expressionContext.current.entityName, key)
			const relatedEntity = info.previousEntity.name
			const relatedAlias = info.previousRelation !== '' ? expressionContext.current.joins[info.previousRelation] : expressionContext.current.alias
			const relatedProperty = info.previousEntity.properties.find(p => p.name === info.relation.from) as Property
			const relationEntity = info.entity.name
			const relationAlias = expressionContext.current.joins[key]
			const relationProperty = info.entity.properties.find(p => p.name === info.relation.to) as Property

			// TODO: Aqui usar el key para agregar el filtro que corresponda
			// si una entidad tiene uno o mas propiedades con key, se debe agregar un filtro por el key
			const relatedField = new Field(relatedEntity, info.relation.from, relatedProperty.type, relatedAlias)
			const relationField = new Field(relationEntity, info.relation.to, relationProperty.type, relationAlias)
			const equal = new Operator('==', [relationField, relatedField])
			operand = new Join(relationEntity + '.' + relationAlias, [equal])
			children.push(operand)
		}
		for (let i = 0; i < children.length; i++) {
			this.solveTypes(children[i], expressionContext)
		}
		const parameters = this.parametersInSentence(children)

		let constraints:Constraint[] = []
		let values: Behavior[] = []
		let defaults: Behavior[] = []

		if (name === 'select' && selectOperand) {
			values = this.getBehaviorReadValues(expressionContext.current.entityName, selectOperand)
		} else if (name === 'insert' || name === 'bulkInsert') {
			defaults = this.getBehaviorDefaults(expressionContext.current.entityName)
			values = this.getBehaviorWriteValues(expressionContext.current.entityName, parameters)
			constraints = this.getConstraints(expressionContext.current.entityName, parameters)
		} else if (name === 'update') {
			values = this.getBehaviorWriteValues(expressionContext.current.entityName, parameters)
			constraints = this.getConstraints(expressionContext.current.entityName, parameters)
		}

		const sentence = new Sentence(name, children, expressionContext.current.entityName, expressionContext.current.alias, expressionContext.current.fields, parameters, constraints, values, defaults)
		expressionContext.current = expressionContext.current.parent ? expressionContext.current.parent as EntityContext : new EntityContext()
		return sentence
	}

	private getBehaviorDefaults (entityName:string):Behavior[] {
		const behaviors:Behavior[] = []
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

	private getBehaviorReadValues (entityName: string, operand:Operand): Behavior[] {
		const behaviors: Behavior[] = []
		const entity = this.modelConfig.getEntity(entityName)
		if (entity && operand.children.length === 1) {
			let child:Operand
			if (operand.children[0] instanceof FunctionRef && operand.children[0].name === 'distinct') {
				child = operand.children[0].children[0]
			} else {
				child = operand.children[0]
			}

			if (child instanceof Obj) {
				const obj = child
				for (const p in obj.children) {
					const keyVal = obj.children[p]
					if (keyVal.children[0] instanceof Field) {
						const field = keyVal.children[0] as Field
						const property = entity.properties.find(p => p.name === field.name)
						if (property && property.readValue) {
							const behavior = { alias: keyVal.name, property: property.name, expression: property.readValue }
							behaviors.push(behavior)
						}
					}
				}
			}
			// Expression completer pasa todos los select a Obj
			// else if (child instanceof List) {
			// const array = child
			// for (let i = 0; i < array.children.length; i++) {
			// const element = array.children[i]
			// if (element instanceof Field) {
			// // TODO: resolver el problema de las relaciones
			// // const parts = element.name.split('.')
			// const field = element as Field
			// const property = entity.properties.find(p => p.name === field.name)
			// if (property && property.readValue) {
			// const behavior = { alias: field.name, property: property.name, expression: property.readValue }
			// behaviors.push(behavior)
			// }
			// }
			// }
			// } else if (child instanceof Field) {
			// // TODO: resolver el problema de las relaciones
			// // const parts = child.name.split('.')
			// const field = child as Field
			// const property = entity.properties.find(p => p.name === field.name)
			// if (property && property.readValue) {
			// const behavior = { alias: field.name, property: property.name, expression: property.readValue }
			// behaviors.push(behavior)
			// }
			// }
		}
		return behaviors
	}

	private getBehaviorWriteValues (entityName: string, parameters: Parameter[]): Behavior[] {
		const behaviors:Behavior[] = []
		const properties = this.getPropertiesFromParameters(entityName, parameters)
		if (properties) {
			for (let i = 0; i < properties.length; i++) {
				const property = properties[i]
				if (property.writeValue) {
					behaviors.push({ property: property.name, expression: property.writeValue })
				}
			}
		}
		return behaviors
	}

	private getPropertiesFromParameters (entityName: string, parameters: Parameter[]):Property[] {
		const entity = this.modelConfig.getEntity(entityName)
		const properties: Property[] = []
		if (entity && entity.properties && parameters) {
			for (const i in parameters) {
				const parameter = parameters[i]
				const property = entity.properties.find(p => p.name === parameter.name)
				if (property) {
					properties.push(property)
				}
			}
		}
		return properties
	}

	private getConstraints (entityName: string, parameters: Parameter[]):Constraint[] {
		const constraints: Constraint[] = []
		const queryProperties = this.getPropertiesFromParameters(entityName, parameters)
		const entity = this.modelConfig.getEntity(entityName)
		if (entity) {
			if (entity.constraints) {
				for (const i in entity.constraints) {
					const constraint = entity.constraints[i]
					const contitionProperties = this.expressions.parameters(constraint.condition)
					let containtAll = true
					for (const j in contitionProperties) {
						const contitionParameter = contitionProperties[j]
						if (!queryProperties.find(p => p.name === contitionParameter.name)) {
							containtAll = false
							break
						}
					}
					if (containtAll) {
						constraints.push(constraint)
					}
				}
			}
			if (queryProperties) {
				for (const i in queryProperties) {
					const property = queryProperties[i]
					if (property.nullable === false && property.default === undefined) {
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
		}

		return constraints
	}

	private createClause (clause:Node, expressionContext:ExpressionContext):Operand {
		expressionContext.current.arrowVar = clause.children[1].name
		const child = this.nodeToOperand(clause.children[2], expressionContext)
		switch (clause.name) {
		case 'filter': return new Filter(clause.name, [child])
		case 'having': return new Having(clause.name, [child])
		case 'sort': return new Sort(clause.name, [child])
		default: throw new SintaxisError('clause : ' + clause.name + ' not supported')
		}
	}

	private createMapClause (clause:Node, expressionContext:ExpressionContext):Operand {
		if (clause.children.length === 3) {
			expressionContext.current.arrowVar = clause.children[1].name
			const child = this.nodeToOperand(clause.children[2], expressionContext)
			return new Map(clause.name, [child])
		}
		throw new SintaxisError('Sentence Map incorrect!!!')
	}

	private createInsertClause (clause:Node, expressionContext:ExpressionContext):Operand {
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

	private createUpdateClause (clause:Node, expressionContext:ExpressionContext):Operand {
		if (clause.children.length === 2) {
			if (clause.children[1].type === 'obj') {
				// Example: Orders.update({name:'test'})
				const child = this.nodeToOperand(clause.children[1], expressionContext)
				return new Update(expressionContext.current.entityName + '.' + expressionContext.current.alias, [child])
			} else {
				throw new SintaxisError('Args incorrect in Sentence Update')
			}
		} else if (clause.children.length === 3) {
			// Example: Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
			expressionContext.current.arrowVar = clause.children[1].name
			const child = this.nodeToOperand(clause.children[2], expressionContext)
			return new Update(expressionContext.current.entityName + '.' + expressionContext.current.alias, [child])
		}
		throw new SintaxisError('Sentence Update incorrect!!!')
	}

	private createSelectInclude (node:Node, expressionContext:ExpressionContext):SentenceInclude {
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
		// return new SentenceInclude(relation.name, [child], relation, '__parentId')
		// return new SentenceInclude(relation.relation.name, [child], relation.relation)
	}

	private createInclude (node:Node, expressionContext:ExpressionContext):SentenceInclude {
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
		// return new SentenceInclude(relationName, [child], relation, relation.to)
	}

	private getSentence (node:Node):any {
		const sentence:any = {}
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

	private addJoins (parts:string[], to:number, expressionContext:ExpressionContext):string {
		let relation = ''
		for (let i = 1; i < to; i++) {
			relation = (i > 1 ? relation + '.' : '') + parts[i]
			if (!expressionContext.current.joins[relation]) {
				expressionContext.current.joins[relation] = this.createAlias(expressionContext, parts[i], relation)
			}
		}
		return relation
	}

	private groupByFields (operand:Operand):Field[] {
		const data = { fields: [], groupBy: false }
		this._groupByFields(operand, data)
		return data.groupBy ? data.fields : []
	}

	private _groupByFields (operand:Operand, data:any):void {
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

	private createAlias (expressionContext:ExpressionContext, name:string, relation?:string):string {
		const c = name.charAt(0).toLowerCase()
		let alias = c
		for (let i = 1; expressionContext.aliases[alias]; i++)alias = alias + i
		expressionContext.aliases[alias] = relation || name
		return alias
	}

	private fieldsInSelect (operand:Operand, expressionContext:ExpressionContext):Property[] {
		const fields: Property[] = []
		if (operand.children.length === 1) {
			let child:Operand
			if (operand.children[0] instanceof FunctionRef && operand.children[0].name === 'distinct') {
				child = operand.children[0].children[0]
			} else {
				child = operand.children[0]
			}

			if (child instanceof Obj) {
				const obj = child
				for (const p in obj.children) {
					const keyVal = obj.children[p]
					if (keyVal.children[0] instanceof Field) {
						const _field = keyVal.children[0] as Field
						const field = { name: keyVal.name, type: _field.type }
						fields.push(field)
					} else {
						const field = { name: keyVal.name, type: this.solveTypes(keyVal.children[0], expressionContext) }
						fields.push(field)
					}
				}
			}
			// Expression completer ya resuelve pasar List y field unico a Obj
			// else if (child instanceof List) {
			// const array = child
			// for (let i = 0; i < array.children.length; i++) {
			// const element = array.children[i]
			// if (element instanceof Field) {
			// const parts = element.name.split('.')
			// const _field = element as Field
			// const field = { name: parts[parts.length - 1], type: _field.type }
			// fields.push(field)
			// } else {
			// const field = { name: 'field' + i, type: this.solveTypes(element, expressionContext) }
			// fields.push(field)
			// }
			// }
			// } else if (child instanceof Field) {
			// const parts = child.name.split('.')
			// const _field = child as Field
			// const field = { name: parts[parts.length - 1], type: _field.type }
			// fields.push(field)
			// } else {
			// const field = { name: 'field0', type: this.solveTypes(child, expressionContext) }
			// fields.push(field)
			// }
		}
		return fields
	}

	/**
	* change name of property by mapping and return fields for clause update or insert
	* @param operand clause update or update
	* @param expressionContext current ExpressionContext
	* @returns fields to execute query
	*/
	private fieldsInModify (operand:Operand, expressionContext:ExpressionContext):Property[] {
		const fields:Property[] = []
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

	private parametersInSentence (children:Operand[]):Parameter[] {
		const map = children.find(p => p.name === 'map')
		const filter = children.find(p => p.name === 'filter')
		const groupBy = children.find(p => p.name === 'groupBy')
		const having = children.find(p => p.name === 'having')
		const sort = children.find(p => p.name === 'sort')
		const insert = children.find(p => p instanceof Insert) as Insert|undefined
		const update = children.find(p => p instanceof Update) as Update|undefined
		const _delete = children.find(p => p instanceof Delete) as Delete|undefined

		const parameters:Parameter[] = []
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

	private loadParameters (operand:Operand, parameters:Parameter[]) {
		if (operand instanceof Variable) {
			if (parameters.find(p => p.name === operand.name) === undefined) {
				let type:string
				if (operand.type === '')type = 'any'
				else if (operand.type === 'T[]')type = 'array'
				else type = operand.type
				parameters.push({ name: operand.name, type: type })
			}
		}
		for (let i = 0; i < operand.children.length; i++) {
			this.loadParameters(operand.children[i], parameters)
		}
	}

	// TODO: determinar el tipo de la variable de acuerdo a la expression.
	// si se usa en un operador con que se esta comparando.
	// si se usa en una funcion que tipo corresponde de acuerdo en la posicion que esta ocupando.
	// let type = this.solveType(operand,childNumber)
	private solveTypes (operand:Operand, expressionContext:ExpressionContext):string {
		if (operand instanceof Constant2 || operand instanceof Field || operand instanceof Variable) return operand.type
		if (operand instanceof Update || operand instanceof Insert) {
			if (operand.children.length === 1) {
				if (operand.children[0] instanceof Object) {
					const obj = operand.children[0]
					for (const p in obj.children) {
						const keyVal = obj.children[p] as KeyValue
						const entityName = operand.name.includes('.') ? operand.name.split('.')[0] : operand.name
						const property = this.modelConfig.getProperty(entityName, keyVal.name)
						if (keyVal.children[0].type === 'any') {
							keyVal.children[0].type = property.type
						}
					}
				}
			}
		}
		if (!(operand instanceof Sentence || operand instanceof ArrowFunction || operand instanceof ChildFunction) && (operand instanceof Operator || operand instanceof FunctionRef)) {
			let tType = 'any'
			// get metadata of operand
			const metadata = operand instanceof Operator
				? this.expressionConfig.getOperator(operand.name, operand.children.length)
				: this.expressionConfig.getFunction(operand.name)

			// recorre todos los parametros
			for (let i = 0; i < metadata.params.length; i++) {
				const param = metadata.params[i]
				const child = operand.children[i]
				if (param.type !== 'T' && param.type !== 'any' && child.type === 'any') {
					// en el caso que el pametro tenga un tipo defido y el hijo no, asigna al hijo el tipo del parametro
					child.type = param.type
				} else if (param.type === 'T' && child.type !== 'any') {
					// en el caso que el pametro sea T y el hijo tiene un tipo definido, determina que T es el tipo de hijo
					tType = child.type
				} else if (param.type === 'T' && child.type === 'any') {
					// en el caso que el pametro sea T y el hijo no tiene un tipo definido, intenta resolver el hijo
					// en caso de lograrlo determina que T es el tipo de hijo
					const childType = this.solveTypes(child, expressionContext)
					if (childType !== 'any') {
						tType = childType
						break
					}
				}
			}
			// en el caso que se haya podido resolver T
			if (tType !== 'any') {
				// en el caso que el operando sea T asigna el tipo correspondiente al operando
				if (metadata.return === 'T' && operand.type === 'any') { operand.type = tType }
				// busca los parametros que sea T y los hijos aun no fueron definidos para asignarle el tipo correspondiente
				for (let i = 0; i < metadata.params.length; i++) {
					const param = metadata.params[i]
					const child = operand.children[i]
					if (param.type === 'T' && child.type === 'any') {
						child.type = tType
					}
				}
			}
		}
		// recorre todos los hijos para resolver el tipo
		for (let i = 0; i < operand.children.length; i++) {
			this.solveTypes(operand.children[i], expressionContext)
		}

		return operand.type
	}
}
