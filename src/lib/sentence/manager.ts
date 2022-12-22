
import { SintaxisError, MetadataParameter, MetadataConstraint, MetadataModel, Metadata, Relation, source, SentenceInfo, ObservableAction } from '../contract'
import { SchemaManager, Routing, ViewConfig, helper } from '../manager'
import { Operand, Variable, Constant, KeyValue, List, Obj, Operator, FunctionRef, ArrowFunction, ChildFunction, Expressions } from 'js-expressions'
import * as exp from 'js-expressions'
import { MemoryCache, ICache } from 'h3lp'
import { Constant2, Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete, SentenceInclude } from '../contract/operands'
import { SentenceCompleter, SentenceBuilder } from '.'

class SentenceSerializer {
	public serialize (sentence: Sentence): string {
		return JSON.stringify(this._serialize(sentence))
	}

	public deserialize (value: string): Sentence {
		return (this._deserialize(JSON.parse(value))) as Sentence
	}

	private _serialize (operand: Operand): Metadata {
		const children:Metadata[] = []
		for (const child of operand.children) {
			children.push(this._serialize(child))
		}
		if (operand instanceof Sentence) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, columns: operand.columns, parameters: operand.parameters, entity: operand.entity, constraints: operand.constraints }
		} else if (operand instanceof SentenceInclude) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, relation: operand.relation }
		} else if (operand instanceof Insert) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, clause: operand.clause }
		} else if (operand instanceof Update) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, alias: operand.alias }
		} else if (operand instanceof Delete) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, alias: operand.alias }
		} else if (operand instanceof KeyValue) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, property: operand.property }
		} else if (operand instanceof Field) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, entity: operand.entity, alias: operand.alias, isRoot: operand.isRoot }
		} else if (operand instanceof From) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, alias: operand.alias }
		} else if (operand instanceof Join) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, entity: operand.entity, alias: operand.alias }
		} else if (operand instanceof Variable) {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type, number: operand.number }
		} else {
			return { name: operand.name, classtype: operand.constructor.name, children, type: operand.type }
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
			// eslint-disable-next-line no-case-declarations
			const sentence = new Sentence(
				value.name,
				children,
				value.entity as string,
				value.alias as string,
				value.columns || []
			)
			sentence.parameters = value.parameters || []
			sentence.constraints = value.constraints || []
			sentence.values = value.values || []
			sentence.defaults = value.defaults || []
			return sentence
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
}

export class SentenceManager {
	private serializer: SentenceSerializer
	private builder: SentenceBuilder
	private schema: SchemaManager
	private routing: Routing
	private completer: SentenceCompleter
	private cache: ICache<number, string>

	constructor (schema: SchemaManager, expressions: Expressions, routing: Routing) {
		this.schema = schema
		this.routing = routing
		this.serializer = new SentenceSerializer()
		this.builder = new SentenceBuilder(schema, expressions)
		this.completer = new SentenceCompleter(expressions)
		this.cache = new MemoryCache<number, string>()
	}

	public normalize (expression: string): string {
		return this.builder.normalize(expression)
	}

	public create (expression: string, view: ViewConfig, stage:string): Sentence {
		const sentence = this.build(expression)
		this.complete(sentence, view, stage as string)
		return sentence
	}

	public getDataSource (sentence: Sentence, stage: string): source {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, action: ObservableAction[sentence.action] }
		const dataSourceName = this.routing.getDataSource(sentenceInfo, stage)
		return this.schema.source.get(dataSourceName)
	}

	/**
	 * Get model of expression
	 * @param expression expression
	 * @returns Model of expression
	 */
	public model (expression: string): MetadataModel[] {
		const sentence = this.build(expression)
		return this.modelFromSentence(sentence)
	}

	/**
	 * Get constraints of expression
	 * @param expression expression
	 * @returns constraints
	 */
	public constraints (expression: string): MetadataConstraint {
		const sentence = this.build(expression)
		return this.constraintsFromSentence(sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): MetadataParameter[] {
		const sentence = this.build(expression)
		return this.parametersFromSentence(sentence)
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata (expression: string): Metadata {
		const sentence = this.build(expression)
		return JSON.parse(this.serialize(sentence)) as Metadata
	}

	private build (expression: string): Sentence {
		const key = helper.utils.hashCode(expression)
		const value = this.cache.get(key)
		if (!value) {
			const operand = this.builder.build(expression)
			this.cache.set(key, this.serialize(operand))
			return operand
		} else {
			return this.deserialize(value) as Sentence
		}
	}

	private complete (sentence: Sentence, view: ViewConfig, stage: string) {
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			this.complete(sentenceInclude.children[0] as Sentence, view, stage)
		}
		const source = this.getDataSource(sentence, stage)
		const mapping = this.schema.mapping.getInstance(source.mapping)
		this.completer.complete(mapping, view, sentence)
	}

	private modelFromSentence (sentence: Sentence): MetadataModel[] {
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
			child.children = this.modelFromSentence(include.children[0] as Sentence)
			result.push(child)
		}
		return result
	}

	private parametersFromSentence (sentence: Sentence): MetadataParameter[] {
		const parameters: MetadataParameter[] = []
		for (const parameter of sentence.parameters) {
			parameters.push({ name: parameter.name, type: parameter.type })
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const relationParameter: MetadataParameter = {
				name: include.relation.name,
				type: include.relation.entity,
				children: []
			}
			const children = this.parametersFromSentence(include.children[0] as Sentence)
			for (const q in children) {
				const child = children[q]
				relationParameter.children?.push(child)
			}
			parameters.push(relationParameter)
		}
		return parameters
	}

	private constraintsFromSentence (sentence: Sentence): MetadataConstraint {
		const result: MetadataConstraint = { entity: sentence.entity, constraints: sentence.constraints }
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const child = this.constraintsFromSentence(include.children[0] as Sentence)
			if (!result.children) {
				result.children = []
			}
			result.children.push(child)
		}
		return result
	}

	private serialize (sentence: Sentence): string {
		return this.serializer.serialize(sentence)
	}

	private deserialize (value: string): Sentence {
		return this.serializer.deserialize(value)
	}
}
