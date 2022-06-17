import { MappingConfig, ViewConfig } from '.'
import { Sentence, EntityMapping, Field, Filter, Join, SchemaError, SentenceInclude, Insert, Update, Constant2, PropertyMapping, PropertyView } from '../model'
import { Expressions, Variable, Operand, Operator, KeyValue } from 'js-expressions'

export class SentenceCompleter {
	protected expressions: Expressions

	constructor (expressions:Expressions) {
		this.expressions = expressions
	}

	public complete (mapping: MappingConfig, view: ViewConfig, sentence: Sentence) {
		const entity = mapping.getEntity(sentence.entity) as EntityMapping
		if (entity.filter || entity.hadKeys) {
			if (sentence.name !== 'insert' && sentence.name !== 'bulkInsert') {
				this.solveFilter(sentence, entity)
			}
			if (entity.hadKeys && ['insert', 'bulkInsert', 'update'].includes(sentence.name)) {
				this.solveKeys(sentence, entity)
			}
			if (sentence.name === 'select') {
				this.solveJoin(sentence, mapping)
			}
		}
		if (sentence.name === 'select' && (entity.hadReadExps || entity.hadReadMappingExp || entity.hadViewReadExp)) {
			this.solveProperties(sentence, mapping, view)
		}
	}

	private solveFilter (sentence: Sentence, entity: EntityMapping) {
		let newFilter: Operand | undefined
		// add filter for filter in entity
		if (entity.filter) {
			const expression = this.expressions.parse(entity.filter)
			newFilter = this.replaceField(entity, sentence.alias, expression)
		}
		// add filter for keys in properties
		if (entity.hadKeys) {
			const expressionKeys = this.filterByKeys(sentence, entity)
			if (expressionKeys) {
				if (newFilter) {
					newFilter = new Operator('&&', [newFilter, expressionKeys])
				} else {
					newFilter = expressionKeys
				}
			}
		}
		// if exists newFilter  add to current filter
		if (newFilter) {
			const filter = sentence.children.find(p => p.name === 'filter') as Filter|undefined
			if (filter) {
				filter.children[0] = new Operator('&&', [filter.children[0], newFilter])
			} else {
				sentence.children.push(new Filter('filter', [newFilter]))
			}
		}
	}

	private solveKeys (sentence: Sentence, entity: EntityMapping) {
		const insert = sentence.children.find(p => p instanceof Insert)
		const update = sentence.children.find(p => p instanceof Update)
		for (const p in entity.properties) {
			const property = entity.properties[p]
			if (property.key) {
				if (insert) {
					this.solveKey(property, insert)
				} else if (update) {
					this.solveKey(property, update)
				}
				// TODO: ver como resolver en los casos que el parámetro no tiene el mismo nombre que el campo
				const index = sentence.parameters.findIndex(q => q.name === property.name)
				if (index >= 0) {
					sentence.parameters.splice(index, 1)
				}
			}
		}
	}

	private solveKey (property:PropertyMapping, operand:Operand):Operand {
		for (const i in operand.children) {
			const child = operand.children[i]
			if (child instanceof KeyValue) {
				if (child.name === property.name) {
					child.children[0] = new Constant2(property.key as string)
				}
			} else if (child.children && child.children.length > 0) {
				operand.children[i] = this.solveKey(property, child)
			}
		}
		return operand
	}

	private filterByKeys (sentence: Sentence, entity: EntityMapping) : Operand|undefined {
		let expression:string|undefined
		for (const i in entity.properties) {
			const property = entity.properties[i]
			if (property.key) {
				if (!expression) {
					expression = ''
				}
				if (typeof property.key === 'string') {
					expression = expression + `${property.name} == '${property.key}' `
				} else {
					expression = expression + `${property.name} == ${property.key} `
				}
			}
		}
		if (expression) {
			const operand = this.expressions.parse(expression)
			return this.replaceField(entity, sentence.alias, operand)
		} else {
			return undefined
		}
	}

	private solveJoin (sentence: Sentence, mapping: MappingConfig) {
		const joins = sentence.children.filter(p => p instanceof Join)
		for (const join of joins) {
			const parts = join.name.split('.')
			const entity = mapping.getEntity(parts[0])
			if (entity === undefined) {
				throw new SchemaError(`not found mapping for ${parts[0]}`)
			}
			let newFilter: Operand | undefined
			// add filter for filter in entity
			if (entity.filter) {
				const expression = this.expressions.parse(entity.filter)
				newFilter = this.replaceField(entity, parts[1], expression)
			}
			// add filter for keys in properties
			const expressionKeys = this.filterByKeys(sentence, entity)
			if (expressionKeys) {
				if (newFilter) {
					newFilter = new Operator('&&', [newFilter, expressionKeys])
				} else {
					newFilter = expressionKeys
				}
			}
			// if exists newFilter  add to current filter
			if (newFilter) {
				join.children[0] = new Operator('&&', [join.children[0], newFilter])
			}
		}
	}

	private solveProperties (operand:Operand, mapping: MappingConfig, view:ViewConfig) {
		for (const i in operand.children) {
			const child = operand.children[i]
			if (child instanceof Field) {
				const alias = child.alias
				const entity = mapping.getEntity(child.entity)
				const property = entity?.properties.find(p => p.name === child.name)
				if (entity === undefined || property === undefined || alias === undefined) {
					continue
				}
				const viewProperty = view.getProperty(entity.name, property.name)
				if (property.readMappingExp || property.readExp || (viewProperty && viewProperty.readExp)) {
					operand.children[i] = this.solveProperty(child, entity, property, viewProperty)
				}
			} else if (child instanceof SentenceInclude === false) {
				this.solveProperties(child, mapping, view)
			}
		}
	}

	private solveProperty (child:Field, entity: EntityMapping, property:PropertyMapping, viewProperty:PropertyView|undefined):Operand {
		const alias = child.alias as string
		let sourceOperand = child as Operand
		if (property.readMappingExp) {
			const expression = this.expressions.parse(property.readMappingExp)
			sourceOperand = this.replaceField(entity, alias, expression, child.name, sourceOperand)
		}
		if (property.readExp) {
			const expression = this.expressions.parse(property.readExp)
			sourceOperand = this.replaceField(entity, alias, expression, child.name, sourceOperand)
		}
		if (viewProperty && viewProperty.readExp) {
			const expression = this.expressions.parse(viewProperty.readExp)
			sourceOperand = this.replaceField(entity, alias, expression, child.name, sourceOperand)
		}
		return sourceOperand
	}

	private replaceField (entity:EntityMapping, alias:string, operand:Operand, sourceName?:string, source?:Operand):Operand {
		for (const i in operand.children) {
			const child = operand.children[i]
			if (child instanceof Variable) {
				const property = entity.properties.find(p => p.name === child.name)
				if (property) {
					if (sourceName && source && property.name === sourceName) {
						operand.children[i] = source
					} else {
						operand.children[i] = new Field(entity.name, child.name, property.type, alias)
					}
				}
			} else if (child.children && child.children.length > 0) {
				operand.children[i] = this.replaceField(entity, alias, child, sourceName, source)
			}
		}
		return operand
	}
}
