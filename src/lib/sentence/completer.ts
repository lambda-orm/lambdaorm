import { MappingConfig, ViewConfig } from '../manager'
import { Sentence, EntityMapping, Field, Filter, Join, SchemaError, SentenceInclude, Insert, Update, PropertyMapping, PropertyView, SentenceAction } from '../contract'
import { IExpressions, Operand, OperandType, Type } from '3xpr'

export class SentenceCompleter {
	protected expressions: IExpressions

	constructor (expressions:IExpressions) {
		this.expressions = expressions
	}

	public complete (mapping: MappingConfig, view: ViewConfig, sentence: Sentence) {
		const entity = mapping.getEntity(sentence.entity) as EntityMapping
		if (!entity) {
			throw new SchemaError(`${sentence.entity} entity in ${mapping.name} mapping not found`)
		}
		if (entity.filter || entity.hadKeys) {
			if (sentence.name !== SentenceAction.insert && sentence.name !== SentenceAction.bulkInsert) {
				this.solveFilter(sentence, entity)
			}
			if (entity.hadKeys && [SentenceAction.insert, SentenceAction.bulkInsert, SentenceAction.update].includes(sentence.action)) {
				this.solveKeys(sentence, entity)
			}
			if (sentence.action === SentenceAction.select) {
				this.solveJoin(sentence, mapping)
			}
		}
		if (sentence.action === SentenceAction.select && (entity.hadReadExps || entity.hadReadMappingExp || entity.hadViewReadExp)) {
			this.solveProperties(sentence, mapping, view)
		}
	}

	private solveFilter (sentence: Sentence, entity: EntityMapping) {
		let newFilter: Operand | undefined
		// add filter for filter in entity
		if (entity.filter) {
			const filterOperand = this.expressions.build(entity.filter)
			newFilter = this.replaceField(entity, sentence.alias, filterOperand)
		}
		// add filter for keys in properties
		if (entity.hadKeys) {
			const expressionKeys = this.filterByKeys(sentence, entity)
			if (expressionKeys) {
				if (newFilter) {
					newFilter = new Operand(sentence.pos, '&&', OperandType.Operator, [newFilter, expressionKeys])
				} else {
					newFilter = expressionKeys
				}
			}
		}
		// if exists newFilter  add to current filter
		if (newFilter) {
			const filter = sentence.children.find(p => p.name === 'filter') as Filter|undefined
			if (filter) {
				filter.children[0] = new Operand(sentence.pos, '&&', OperandType.Operator, [filter.children[0], newFilter])
			} else {
				sentence.children.push(new Filter(sentence.pos, 'filter', [newFilter], sentence.entity, sentence.alias))
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
				// TODO: see how to solve in cases where the parameter does not have the same name as the field
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
			if (child.type === OperandType.KeyVal) {
				if (child.name === property.name) {
					child.children[0] = new Operand(child.pos, property.key, OperandType.Const)
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
			const operand = this.expressions.build(expression)
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
				const operand = this.expressions.build(entity.filter)
				newFilter = this.replaceField(entity, parts[1], operand)
			}
			// add filter for keys in properties
			const expressionKeys = this.filterByKeys(sentence, entity)
			if (expressionKeys) {
				if (newFilter) {
					newFilter = new Operand(sentence.pos, '&&', OperandType.Operator, [newFilter, expressionKeys])
				} else {
					newFilter = expressionKeys
				}
			}
			// if exists newFilter  add to current filter
			if (newFilter) {
				join.children[0] = new Operand(sentence.pos, '&&', OperandType.Operator, [join.children[0], newFilter])
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
			const operand = this.expressions.build(property.readMappingExp)
			sourceOperand = this.replaceField(entity, alias, operand, child.name, sourceOperand)
		}
		if (property.readExp) {
			const operand = this.expressions.build(property.readExp)
			sourceOperand = this.replaceField(entity, alias, operand, child.name, sourceOperand)
		}
		if (viewProperty && viewProperty.readExp) {
			const operand = this.expressions.build(viewProperty.readExp)
			sourceOperand = this.replaceField(entity, alias, operand, child.name, sourceOperand)
		}
		return sourceOperand
	}

	private replaceField (entity:EntityMapping, alias:string, operand:Operand, sourceName?:string, source?:Operand):Operand {
		for (const i in operand.children) {
			const child = operand.children[i]
			if (child instanceof Field) {
				continue
			} else if (child.type === OperandType.Var) {
				const property = entity.properties.find(p => p.name === child.name)
				if (property) {
					if (sourceName && source && property.name === sourceName) {
						operand.children[i] = source
					} else {
						operand.children[i] = new Field(operand.pos, entity.name, child.name, Type.to(property.type), alias)
					}
				}
			} else if (child.children && child.children.length > 0) {
				operand.children[i] = this.replaceField(entity, alias, child, sourceName, source)
			}
		}
		return operand
	}
}
