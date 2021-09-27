
import { Node } from '../node/index'
import { Property, Parameter, Context } from './../model'
import { SchemaHelper } from '../schema/schemaHelper'
import {
	Operand, Constant, Variable, Field, KeyValue, List, Obj, Operator, FunctionRef, Block,
	Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete,
	SentenceInclude, ArrowFunction, ChildFunction
} from './operands'
import { LanguageManager } from './languageManager'

class EntityContext {
	public parent?:EntityContext
	public entity:string
	public alias:string
	public metadata:any
	public children:EntityContext[]
	public joins:any
	public fields:Property[]
	public groupByFields:Field[]
	public arrowVar:string

	constructor (parent?:EntityContext) {
		this.parent = parent
		if (parent)parent.children.push(this)
		this.entity = ''
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
	private language:LanguageManager
	constructor (language:LanguageManager) {
		this.language = language
	}

	public build (node:Node, schema:SchemaHelper):Sentence {
		try {
			const sentece = this.nodeToOperand(node, schema, new ExpressionContext(new EntityContext())) as Sentence
			const reduced = this.reduce(sentece)
			return this.setParent(reduced) as Sentence
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public model (sentence:Sentence):any {
		const result:any = {}
		for (let i = 0; i < sentence.columns.length; i++) {
			const column = sentence.columns[i]
			result[column.name] = column.type
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const childsSchema = this.model(include.children[0] as Sentence)
			if (include.relation.type === 'manyToOne') {
				result[include.name] = [childsSchema]
			} else {
				result[include.name] = childsSchema
			}
		}
		return result
	}

	public serialize (operand:Operand):any {
		const children = []
		for (const k in operand.children) {
			children.push(this.serialize(operand.children[k]))
		}
		if (operand instanceof Sentence) { return { n: operand.name, t: operand.constructor.name, c: children, f: operand.columns, p: operand.parameters, e: operand.entity, a: operand.autoincrement } } else if (operand instanceof SentenceInclude) { return { n: operand.name, t: operand.constructor.name, c: children, r: operand.relation, v: operand.variable } } else if (operand instanceof Insert) { return { n: operand.name, t: operand.constructor.name, c: children, s: operand.clause, a: operand.autoincrement } } else if (operand instanceof KeyValue) { return { n: operand.name, t: operand.constructor.name, c: children, m: operand.mapping } } else if (operand instanceof Field) { return { n: operand.name, t: operand.constructor.name, c: children, e: operand.entity, m: operand.mapping } } else if (operand instanceof Variable) { return { n: operand.name, t: operand.constructor.name, c: children, u: operand.number } } else { return { n: operand.name, t: operand.constructor.name, c: children } }
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public deserialize (serialized:any):Operand {
		throw new Error('NotImplemented')
	}

	public eval (operand:Operand, context:Context):any {
		this.initialize(operand, new Context(context))
		return operand.eval()
	}

	private initialize (operand:Operand, context:Context) {
		let current = context
		if (operand instanceof ArrowFunction) {
			const childContext = current.newContext()
			operand.context = childContext
			operand.metadata = this.language.metadata
			current = childContext
		} else if (operand instanceof ChildFunction) {
			const childContext = current.newContext()
			operand.context = childContext
			operand.metadata = this.language.metadata
			current = childContext
		} else if (operand instanceof FunctionRef) {
			operand.metadata = this.language.metadata
		} else if (operand instanceof Operator) {
			operand.metadata = this.language.metadata
		} else if (operand instanceof Variable) {
			operand.context = current
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
			const funcMetadata = this.language.metadata.getFunctionMetadata(operand.name)
			if (funcMetadata && funcMetadata.metadata && funcMetadata.metadata.deterministic) {
				return this.reduceOperand(operand)
			}
		}
		return operand
	}

	private reduceOperand (operand:Operand):Operand {
		let allConstants = true
		for (const k in operand.children) {
			const p = operand.children[k]
			if (!(p instanceof Constant)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = this.eval(operand, new Context({}))
			const constant = new Constant(value)
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
			throw new Error('set parent: ' + operand.name + ' error: ' + error.toString())
		}
	}

	private nodeToOperand (node:Node, schema:SchemaHelper, context:ExpressionContext):Operand {
		let operand:Operand
		if (node.type === 'arrow' || node.type === 'childFunc') {
			operand = this.createSentence(node, schema, context)
		} else {
			const children:Operand[] = []
			if (node.children) {
				for (const i in node.children) {
					const p = node.children[i]
					const child = this.nodeToOperand(p, schema, context)

					children.push(child)
				}
			}
			operand = this.createOperand(node, children, schema, context)
			for (let i = 0; i < children.length; i++) {
				const child = children[i]
				child.parent = operand
				child.index = i
			}
		}
		return operand
	}

	private createOperand (node:Node, children:Operand[], schema:SchemaHelper, context:ExpressionContext):Operand {
		switch (node.type) {
		case 'const':
			return new Constant(node.name)
		case 'var': {
			const parts = node.name.split('.')
			if (parts[0] === context.current.arrowVar) {
				if (parts.length === 1) {
					// TODO, aqui se deberia retornar el array de fields
					return new Field(context.current.entity, '*', 'any', context.current.alias + '.*')
				} else if (parts.length === 2) {
					const _field = context.current.fields.find(p => p.name === parts[1])
					if (_field) {
						return new Field(context.current.entity, _field.name, _field.type, _field.name)
					} else {
						if (schema.existsProperty(context.current.entity, parts[1])) {
							const property = schema.getProperty(context.current.entity, parts[1])
							return new Field(context.current.entity, property.name, property.type, context.current.alias + '.' + property.mapping)
						} else {
							const relationInfo = schema.getRelation(context.current.entity, parts[1])
							if (relationInfo) {
								const relation = this.addJoins(parts, parts.length, context)
								const relationAlias = context.current.joins[relation]
								// TODO, aqui se deberia retornar el array de fields
								return new Field(relation, '*', 'any', relationAlias + '.*')
							} else {
								throw new Error('Property ' + parts[1] + ' not fount in ' + context.current.entity)
							}
						}
					}
				} else {
					const propertyName = parts[parts.length - 1]
					const relation = this.addJoins(parts, parts.length - 1, context)
					const info = schema.getRelation(context.current.entity, relation)
					const relationAlias = context.current.joins[relation]
					const property = info.relationSchema.property[propertyName]
					if (property) {
						return new Field(info.relationSchema.name, property.name, property.type, relationAlias + '.' + property.mapping)
					} else {
						const relationName = info.relationSchema.relation[propertyName]
						if (relationName) {
							const relation2 = this.addJoins(parts, parts.length, context)
							const relationAlias2 = context.current.joins[relation2]
							// TODO, aqui se deberia retornar el array de fields
							return new Field(relation2, '*', 'any', relationAlias2 + '.*')
						} else {
							throw new Error('Property ' + propertyName + ' not fount in ' + relation)
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
			throw new Error('node name: ' + node.name + ' type: ' + node.type + ' not supported')
		}
	}

	private createSentence (node:Node, schema:SchemaHelper, context:ExpressionContext):Sentence {
		context.current = new EntityContext(context.current)
		let createInclude:any
		const clauses:any = this.getSentence(node)
		context.current.entity = clauses.from.name
		context.current.metadata = schema.getEntity(context.current.entity)
		context.current.alias = this.createAlias(context, context.current.entity)
		const autoincrement = schema.getAutoincrement(context.current.entity)
		let name = ''
		const children:Operand[] = []
		let operand = null

		if (clauses.filter) {
			const clause = clauses.filter
			operand = this.createClause(clause, schema, context)
			children.push(operand)
		}
		if (clauses.from) {
			const tableName = context.current.metadata.mapping// schema.entityMapping(clause.name)
			operand = new From(tableName + '.' + context.current.alias)
			children.push(operand)
		}
		if (clauses.insert) {
			name = 'insert'
			createInclude = this.createInclude
			const clause = clauses.insert as Node
			operand = this.createInsertClause(clause, schema, context)
			context.current.fields = this.fieldsInModify(operand, context)
			children.push(operand)
		} else if (clauses.bulkInsert) {
			name = 'bulkInsert'
			createInclude = this.createInclude
			const clause = clauses.bulkInsert as Node
			operand = this.createInsertClause(clause, schema, context)
			context.current.fields = this.fieldsInModify(operand, context)
			children.push(operand)
		} else if (clauses.update) {
			name = 'update'
			createInclude = this.createInclude
			const clause = clauses.update as Node
			operand = this.createUpdateClause(clause, schema, context)
			context.current.fields = this.fieldsInModify(operand, context)
			children.push(operand)
		} else if (clauses.delete) {
			name = 'delete'
			createInclude = this.createInclude
			// const clause = clauses.delete
			operand = new Delete(context.current.metadata.mapping + '.' + context.current.alias)
			children.push(operand)
		} else if (clauses.map) {
			name = 'select'
			createInclude = this.createSelectInclude
			const clause = clauses.map
			operand = this.createMapClause(clause, schema, context)
			context.current.fields = this.fieldsInSelect(operand)
			context.current.groupByFields = this.groupByFields(operand)
			children.push(operand)

			if (context.current.groupByFields.length > 0) {
				const fields = []
				for (let i = 0; i < context.current.groupByFields.length; i++) {
					const groupByField = context.current.groupByFields[i].clone()
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
				operand = this.createClause(clause, schema, context)
				children.push(operand)
			}
			if (clauses.sort) {
				const clause = clauses.sort
				operand = this.createClause(clause, schema, context)
				children.push(operand)
			}
			if (clauses.page) {
				const clause = clauses.page
				const childs = clause.children.map((p:Node) => this.nodeToOperand(p, schema, context))
				operand = new Page(clause.name, childs)
				children.push(operand)
			}
		}
		if (clauses.include) {
			if (!createInclude) { throw new Error('Include not implemented!!!') }

			const clause = clauses.include
			context.current.arrowVar = clause.children[1].name
			const body = clause.children[2]
			if (body.type === 'array') {
				for (let i = 0; i < body.children.length; i++) { children.push(createInclude.bind(this)(body.children[i], schema, context)) }
			} else { children.push(createInclude.bind(this)(body, schema, context)) }
		}
		for (const key in context.current.joins) {
			const info = schema.getRelation(context.current.entity, key)

			const relatedAlias = info.previousRelation !== '' ? context.current.joins[info.previousRelation] : context.current.alias
			const relatedProperty = info.previousSchema.property[info.relationData.from]
			const relationTable = info.relationSchema.name
			const relationAlias = context.current.joins[key]
			const relationProperty = info.relationSchema.property[info.relationData.to]

			const relatedField = new Field(info.previousSchema.name, info.relationData.from, relatedProperty.type, relatedAlias + '.' + relatedProperty.mapping)
			const relationField = new Field(info.relationSchema.name, info.relationData.to, relationProperty.type, relationAlias + '.' + relationProperty.mapping)
			const equal = new Operator('==', [relationField, relatedField])
			operand = new Join(relationTable + '.' + relationAlias, [equal])
			children.push(operand)
		}
		for (let i = 0; i < children.length; i++) this.solveTypes(children[i], context)
		const parameters = this.parametersInSentence(children)
		const sentence = new Sentence(name, children, context.current.entity, context.current.alias, autoincrement, context.current.fields, parameters)
		context.current = context.current.parent ? context.current.parent as EntityContext : new EntityContext()
		return sentence
	}

	private createClause (clause:Node, schema:SchemaHelper, context:ExpressionContext):Operand {
		context.current.arrowVar = clause.children[1].name
		const child = this.nodeToOperand(clause.children[2], schema, context)
		switch (clause.name) {
		case 'filter': return new Filter(clause.name, [child])
		case 'having': return new Having(clause.name, [child])
		case 'sort': return new Sort(clause.name, [child])
		default: throw new Error('clause : ' + clause.name + ' not supported')
		}
	}

	private createMapClause (clause:Node, schema:SchemaHelper, context:ExpressionContext):Operand {
		if (clause.children.length === 3) {
			context.current.arrowVar = clause.children[1].name
			const child = this.nodeToOperand(clause.children[2], schema, context)
			return new Map(clause.name, [child])
		}
		throw new Error('Sentence Map incorrect!!!')
	}

	private createInsertClause (clause:Node, schema:SchemaHelper, context:ExpressionContext):Operand {
		if (clause.children.length === 2) {
			if (clause.children[1].type === 'obj') {
				const autoincremente:Property|undefined = schema.getAutoincrement(context.current.entity)
				const child = this.nodeToOperand(clause.children[1], schema, context)
				return new Insert(context.current.metadata.mapping, [child], clause.name, autoincremente?.mapping)
			} else { throw new Error('Args incorrect in Sentence Insert') }
		}
		throw new Error('Sentence Insert incorrect!!!')
	}

	private createUpdateClause (clause:Node, schema:SchemaHelper, context:ExpressionContext):Operand {
		if (clause.children.length === 2) {
			if (clause.children[1].type === 'obj') {
				// Example: Orders.update({name:'test'})
				const child = this.nodeToOperand(clause.children[1], schema, context)
				return new Update(context.current.metadata.mapping + '.' + context.current.alias, [child])
			} else { throw new Error('Args incorrect in Sentence Update') }
		} else if (clause.children.length === 3) {
			// Example: Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
			context.current.arrowVar = clause.children[1].name
			const child = this.nodeToOperand(clause.children[2], schema, context)
			return new Update(context.current.metadata.mapping + '.' + context.current.alias, [child])
		}
		throw new Error('Sentence Update incorrect!!!')
	}

	private createSelectInclude (node:Node, schema:SchemaHelper, context:ExpressionContext):SentenceInclude {
		let relation:any
		let current = node
		while (current) {
			if (current.type === 'var') {
				// p.details
				const parts = current.name.split('.')
				const relationName = parts[1]
				relation = context.current.metadata.relation[relationName]
				current.name = relation.entity
				break
			}
			if (current.children.length > 0) { current = current.children[0] } else { break }
		}
		const child = this.createSentence(node, schema, context)
		const variableName = 'list_' + relation.to
		return new SentenceInclude(relation.name, [child], relation, variableName)
	}

	private createInclude (node:Node, schema:SchemaHelper, context:ExpressionContext):SentenceInclude {
		let relation:any; let relationName = ''
		let current = node
		while (current) {
			if (current.type === 'var') {
				// p.details
				const parts = current.name.split('.')
				relationName = parts[1]
				relation = context.current.metadata.relation[relationName]
				current.name = relation.entity
				break
			}
			if (current.children.length > 0) { current = current.children[0] } else { break }
		}
		const child = this.createSentence(node, schema, context)
		return new SentenceInclude(relationName, [child], relation, relation.to)
	}

	private getSentence (node:Node):any {
		const sentence:any = {}
		let current = node
		while (current) {
			const name = current.type === 'var' ? 'from' : current.name
			sentence[name] = current
			if (current.children.length > 0) { current = current.children[0] } else { break }
		}
		return sentence
	}

	private addJoins (parts:string[], to:number, context:ExpressionContext):string {
		let relation = ''
		for (let i = 1; i < to; i++) {
			relation = (i > 1 ? relation + '.' : '') + parts[i]
			if (!context.current.joins[relation]) { context.current.joins[relation] = this.createAlias(context, parts[i], relation) }
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

	private createAlias (context:ExpressionContext, name:string, relation?:string):string {
		const c = name.charAt(0).toLowerCase()
		let alias = c
		for (let i = 1; context.aliases[alias]; i++)alias = alias + i
		context.aliases[alias] = relation || name
		return alias
	}

	private fieldsInSelect (operand:Operand):Property[] {
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
						const field = { name: keyVal.name, type: 'any' }
						fields.push(field)
					}
				}
			} else if (child instanceof List) {
				const array = child
				for (let i = 0; i < array.children.length; i++) {
					const element = array.children[i]
					if (element instanceof Field) {
						const parts = element.name.split('.')
						const _field = element as Field
						const field = { name: parts[parts.length - 1], type: _field.type }
						fields.push(field)
					} else {
						const field = { name: 'field' + i, type: 'any' }
						fields.push(field)
					}
				}
			} else if (child instanceof Field) {
				const parts = child.name.split('.')
				const _field = child as Field
				const field = { name: parts[parts.length - 1], type: _field.type }
				fields.push(field)
			} else {
				const field = { name: 'field0', type: 'any' }
				fields.push(field)
			}
		}
		return fields
	}

	/**
	* change name of property by mapping and return fields for clause update or insert
	* @param operand clause update or update
	* @param context current ExpressionContext
	* @returns fields to execute query
	*/
	private fieldsInModify (operand:Operand, context:ExpressionContext):Property[] {
		const fields:Property[] = []
		if (operand.children.length === 1) {
			if (operand.children[0] instanceof Object) {
				const obj = operand.children[0]
				for (const p in obj.children) {
					const keyVal = obj.children[p] as KeyValue
					const property = context.current.metadata.property[keyVal.name]
					const field = { name: keyVal.name, type: property.type }
					keyVal.mapping = property.mapping // new Field(context.current.entity,property.name,property.type,property.mapping)
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
			let type:string
			if (operand.type === '')type = 'any'
			else if (operand.type === 'T[]')type = 'array'
			else type = operand.type

			parameters.push({ name: operand.name, type: type })
		}
		for (let i = 0; i < operand.children.length; i++) { this.loadParameters(operand.children[i], parameters) }
	}

	// TODO: determinar el tipo de la variable de acuerdo a la expression.
	// si se usa en un operador con que se esta comparando.
	// si se usa en una funcion que tipo corresponde de acuerdo en la posicion que esta ocupando.
	// let type = this.solveType(operand,childNumber)
	private solveTypes (operand:Operand, context:ExpressionContext):string {
		if (operand instanceof Constant || operand instanceof Field || operand instanceof Variable) return operand.type
		if (operand instanceof Update || operand instanceof Insert) {
			if (operand.children.length === 1) {
				if (operand.children[0] instanceof Object) {
					const obj = operand.children[0]
					for (const p in obj.children) {
						const keyVal = obj.children[p] as KeyValue
						const property = context.current.metadata.property[keyVal.name]
						if (keyVal.children[0].type === 'any') { keyVal.children[0].type = property.type }
					}
				}
			}
		}
		if (!(operand instanceof Sentence || operand instanceof ArrowFunction || operand instanceof ChildFunction) && (operand instanceof Operator || operand instanceof FunctionRef)) {
			let tType = 'any'
			// get metadata of operand
			const metadata = operand instanceof Operator
				? this.language.languageModel.getOperator(operand.name, operand.children.length)
				: this.language.languageModel.getFunction(operand.name)

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
					const childType = this.solveTypes(child, context)
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
		for (let i = 0; i < operand.children.length; i++) { this.solveTypes(operand.children[i], context) }

		return operand.type
	}
}
