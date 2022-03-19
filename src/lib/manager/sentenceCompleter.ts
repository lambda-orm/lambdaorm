import { MappingConfig, ViewConfig } from '.'
import { Sentence, EntityMapping, Field, Filter, Join, SchemaError } from '../model'
import { Expressions, Variable, Operand, Operator } from 'js-expressions'

export class SentenceCompleter {
	protected expressions:Expressions
	constructor (expressions:Expressions) {
		this.expressions = expressions
	}

	public complete (mapping: MappingConfig, view:ViewConfig, sentence: Sentence): Sentence {
		const entity = mapping.getEntity(sentence.entity) as EntityMapping
		this.solveFilter(sentence, entity)
		this.solveJoin(sentence, mapping)
		this.solveProperty(mapping, view, sentence)
		return sentence
	}

	private solveFilter (sentence: Sentence, entity:EntityMapping) {
		if (entity.filter) {
			const expression = this.expressions.parse(entity.filter)
			const child = this.replaceField(entity, sentence.alias, expression)
			const filter = sentence.children.find(p => p.name === 'filter') as Filter|undefined
			if (filter) {
				filter.children[0] = new Operator('&&', [filter.children[0], child])
			} else {
				sentence.children.push(new Filter('filter', [child]))
			}
		}
	}

	private solveJoin (sentence: Sentence, mapping: MappingConfig) {
		const joins = sentence.children.filter(p => p instanceof Join)
		for (let i = 0; i < joins.length; i++) {
			const join = joins[i]
			const parts = join.name.split('.')
			const entity = mapping.getEntity(parts[0])
			if (entity === undefined) {
				throw new SchemaError(`not found mapping for ${parts[0]}`)
			}
			if (entity.filter) {
				const expression = this.expressions.parse(entity.filter)
				const newFilter = this.replaceField(entity, parts[1], expression)
				join.children[0] = new Operator('&&', [join.children[0], newFilter])
			}
		}
	}

	private solveProperty (mapping: MappingConfig, view:ViewConfig, operand:Operand) {
		for (const i in operand.children) {
			const child = operand.children[i]
			if (child instanceof Field) {
				const field = child as Field
				const alias = field.alias as string
				const entity = mapping.getEntity(field.entity)
				const property = entity?.properties.find(p => p.name === field.name)
				if (entity && property) {
					const viewPorperty = view.getProperty(entity.name, property.name)
					if (property.readMappingExp || property.readExp || (viewPorperty && viewPorperty.readExp)) {
						let sourceOperand = child as Operand
						if (property.readMappingExp) {
							const expression = this.expressions.parse(property.readMappingExp)
							sourceOperand = this.replaceField(entity, alias, expression, field.name, sourceOperand)
						}
						if (property.readExp) {
							const expression = this.expressions.parse(property.readExp)
							sourceOperand = this.replaceField(entity, alias, expression, field.name, sourceOperand)
						}

						if (viewPorperty && viewPorperty.readExp) {
							const expression = this.expressions.parse(viewPorperty.readExp)
							sourceOperand = this.replaceField(entity, alias, expression, field.name, sourceOperand)
						}
						operand.children[i] = sourceOperand
					}
				}
			} else {
				this.solveProperty(mapping, view, child)
			}
		}
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
