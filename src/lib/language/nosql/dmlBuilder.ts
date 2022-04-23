
import { Operand, KeyValue } from 'js-expressions'
import { Include, Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Query, SintaxisError, SchemaError, EntityMapping } from '../../model'
import { DmlBuilder } from '../dmlBuilder'
import { Helper } from '../../manager'

export class NoSqlDMLBuilder extends DmlBuilder {

	public override build(sentence: Sentence): Query {
		if (sentence.action === 'select') {
			const nosqlSentence = this.buildSentence(sentence)
			return new Query(sentence.name, this.dataSource.dialect, this.dataSource.name, nosqlSentence, sentence.entity, sentence.columns, sentence.parameters, sentence.constraints, sentence.values, sentence.defaults)
		} else {
			const includes = []
			const sentenceIncludes = sentence.getCompositeIncludes()
			for (const p in sentenceIncludes) {
				const sentenceInclude = sentenceIncludes[p]
				const childSentence = sentenceInclude.children[0] as Sentence
				const childQuery = this.build(childSentence)
				const include = new Include(sentenceInclude.name, childQuery, sentenceInclude.relation)
				includes.push(include)
			}
			const nosqlSentence = this.buildSentence(sentence)
			const query = new Query(sentence.name, this.dataSource.dialect, this.dataSource.name, nosqlSentence, sentence.entity, sentence.columns, sentence.parameters, sentence.constraints, sentence.values, sentence.defaults)
			query.includes = includes
			return query
		}
	}

	protected override buildSentence(sentence: Sentence): string {
		switch (sentence.action) {
			case 'select':
				return this.buildMapSentence(sentence)
			case 'insert':
				return this.buildInsertSentence(sentence)
			case 'update':
				return this.buildUpdateSentence(sentence)
			case 'delete':
				return this.buildDeleteSentence(sentence)
			default:
				throw new SintaxisError(`sentence action ${sentence.action} not found`)
		}
	}
	protected buildMapSentence(sentence: Sentence): string {

		// const map = sentence.children.find(p => p.name === 'map') as Map | undefined
		const from = sentence.children.find(p => p instanceof From) as Operand
		const joins = sentence.children.filter(p => p instanceof Join)
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		const groupBy = sentence.children.find(p => p.name === 'groupBy') as GroupBy | undefined
		const having = sentence.children.find(p => p.name === 'having') as Having | undefined
		const sort = sentence.children.find(p => p.name === 'sort') as Sort | undefined
		const page = sentence.children.find(p => p.name === 'page') as Page | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		let text = this.getMap(sentence)
		if (joins.length > 0) text = `${text}, ${this.buildJoins(joins)}`
		if (filter) text = `${text}, ${this.buildArrowFunction(filter)}`
		if (groupBy) text = `${text}, ${this.buildArrowFunction(groupBy)}`
		if (having) text = `${text}, ${this.buildArrowFunction(having)}`
		if (sort) text = `${text}, ${this.buildArrowFunction(sort)}`
		if (page) text = `${text}, ${this.buildArrowFunction(page)}`
		return `[${text}]`
	}
	protected buildInsertSentence(sentence: Sentence): string {
		const insert = sentence.children.find(p => p instanceof Insert) as Insert | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (insert === undefined) {
			throw new SchemaError(`insert operand not found`)
		}
		return this.buildInsert(insert, entity)
	}
	protected buildUpdateSentence(sentence: Sentence): string {
		const entity = this.mapping.getEntity(sentence.entity)
		const update = sentence.children.find(p => p instanceof Update) as Update | undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (update === undefined) {
			throw new SchemaError(`update operand not found`)
		}
		let text = this.buildUpdate(update, entity)
		if (filter) text = `${text}, ${this.buildArrowFunction(filter)}`
		return `[${text}]`
	}
	protected buildDeleteSentence(sentence: Sentence): string {
		const entity = this.mapping.getEntity(sentence.entity)
		const update = sentence.children.find(p => p instanceof Update) as Update | undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (update === undefined) {
			throw new SchemaError(`update operand not found`)
		}
		let text = ''
		if (filter) text = this.buildArrowFunction(filter)
		return `[${text}]`
	}
	// private buildSentence(sentence: Sentence): NoSqlSentence {
	// const map = sentence.children.find(p => p.name === 'map') as Map | undefined
	// const insert = sentence.children.find(p => p instanceof Insert) as Insert | undefined
	// const update = sentence.children.find(p => p instanceof Update) as Update | undefined
	// // const _delete = sentence.children.find(p => p instanceof Delete) as Delete|undefined
	// const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
	// const groupBy = sentence.children.find(p => p.name === 'groupBy') as GroupBy | undefined
	// const having = sentence.children.find(p => p.name === 'having') as Having | undefined
	// const sort = sentence.children.find(p => p.name === 'sort') as Sort | undefined
	// const page = sentence.children.find(p => p.name === 'page') as Page | undefined
	// const entity = this.mapping.getEntity(sentence.entity)
	// if (entity === undefined) {
	// throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
	// }
	// const nosqlSentence: NoSqlSentence = {}
	// if (map) {
	// const from = sentence.children.find(p => p instanceof From) as Operand
	// const joins = sentence.children.filter(p => p instanceof Join)
	// this.setPrefixToField(map)
	// nosqlSentence.map = this.buildArrowFunction(map) //this.buildMap(map, entity)
	// nosqlSentence.from = this.buildFrom(from)
	// nosqlSentence.joins = this.buildJoins(joins)
	// } else if (insert) nosqlSentence.insert = this.buildInsert(insert, entity)
	// else if (update) nosqlSentence.update = this.buildUpdate(update, entity)
	// // else if (_delete) nosqlSentence.delete = this.buildDelete(_delete)
	// if (filter) nosqlSentence.filter = this.buildArrowFunction(filter)
	// if (groupBy) nosqlSentence.groupBy = this.buildArrowFunction(groupBy)
	// if (having) nosqlSentence.having = this.buildArrowFunction(having)
	// if (sort) nosqlSentence.sort = this.buildArrowFunction(sort)
	// if (page) nosqlSentence.page = this.buildPage(page)
	// return nosqlSentence
	// }


	private getMap(sentence: Sentence): any {
		const mapOperator = sentence.children.find(p => p.name === 'map') as Map | undefined
		if (mapOperator === undefined) {
			throw new SchemaError(`map operator not found`)
		}
		this.setPrefixToField(mapOperator, '$')
		let map = this.buildArrowFunction(mapOperator)

		const includes = sentence.getCompositeIncludes()
		for (const p in includes) {
			const include = includes[p]
			const relationEntity = this.mapping.getEntity(include.relation.entity)
			if (relationEntity === undefined) {
				throw new SchemaError(`EntityMapping ${include.relation.entity} not found`)
			}
			const relationProperty = this.dialect.delimiter(relationEntity.mapping)
			let relationMap = this.getIncludeMap(include.children[0] as Sentence)
			// In the templates process $$ is being replaced by $, for this $this is replaced. for $$this.
			relationMap = Helper.replace(relationMap, '"$this.', '"$$this.')
			map = `${map} ,${include.relation.name}: { $map:{ input:'$${relationProperty}', in:{${relationMap}}}}`
		}
		return `{ "$project" :{ "_id": 0 , ${map} } }`
	}
	private getIncludeMap(sentence: Sentence): any {
		//https://stackoverflow.com/questions/61173117/mongodb-get-index-of-current-element-in-array
		const mapOperator = sentence.children.find(p => p.name === 'map') as Map | undefined
		if (mapOperator === undefined) {
			throw new SchemaError(`map operator not found`)
		}
		this.setPrefixToField(mapOperator, '$$this.')
		let map = this.buildArrowFunction(mapOperator) //this.buildMap(map, entity)
		const includes = sentence.getCompositeIncludes()
		for (const p in includes) {
			const include = includes[p]
			const relationEntity = this.mapping.getEntity(include.relation.entity)
			if (relationEntity === undefined) {
				throw new SchemaError(`EntityMapping ${include.relation.entity} not found`)
			}
			const relationProperty = this.dialect.delimiter(relationEntity.mapping)
			const relationMap = this.getIncludeMap(include.children[0] as Sentence)
			map = `${map} ,${include.relation.name}: {
							$map: {
								input: '$${relationProperty}',
								in: ${relationMap}
							}
						}`
		}
		return map
	}
	// {
	// 	$project: {
	// 		_id: 0,
	// 		id: '$CustomerID',
	// 		details: {
	// 			$map: {
	// 				input: '$"Order Details"',
	// 				in: {
	// 					price: "$$this.UnitPrice",
	// 					qty: "$$this.Quantity"
	// 				}
	// 			}
	// 		}
	// 	}
	// }



	// private buildMap(operand: Map, entity: EntityMapping): string {
	// const template = this.dialect.dml('map')
	// const templateColumn = this.dialect.other('column')
	// const columns: string[] = []
	// if (operand.children[0] instanceof Object) {
	// const obj = operand.children[0]
	// for (const p in obj.children) {
	// const keyVal = obj.children[p] as KeyValue
	// let name: string
	// if (keyVal.property !== undefined) {
	// const property = entity.properties.find(p => p.name === keyVal.property)
	// if (property === undefined) {
	// throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
	// }
	// name = property.mapping
	// } else {
	// name = keyVal.name
	// }
	// const column = templateColumn.replace('{name}', name)
	// columns.push(column)
	// }
	// }
	// return template.replace('{0}', columns.join(','))
	// }

	// private buildFrom(from: Operand): string {
	// const parts = from.name.split('.')
	// const entityMapping = this.mapping.entityMapping(parts[0])
	// if (entityMapping === undefined) {
	// throw new SchemaError(`not found mapping for ${parts[0]}`)
	// }
	// return this.dialect.delimiter(entityMapping)
	// }

	protected override buildJoins(joins: Operand[]): string {
		// Example: https://www.w3schools.com/nodejs/nodejs_mongodb_join.asp
		// Example: https://stackoverflow.com/questions/69097870/how-to-join-multiple-collection-in-mongodb
		// https://javascript.tutorialink.com/mongodb-get-sum-of-fields-in-last-stage-of-aggregate/
		let text: string = ''
		const template = this.dialect.dml('join')
		for (let i = 0; i < joins.length; i++) {
			const join = joins[i]
			const parts = join.name.split('.')
			const entity = this.mapping.getEntity(parts[0])
			if (entity === undefined) {
				throw new SchemaError(`not found mapping for ${parts[0]}`)
			}
			const localField = join.children[0].children[0] as Field
			const foreignField = join.children[0].children[1] as Field
			let joinTemplate = template.replace('{name}', this.dialect.delimiter(entity.mapping))
			joinTemplate = joinTemplate.replace('{fromProperty}', this.getFieldName(localField))
			joinTemplate = joinTemplate.replace('{toProperty}', this.getFieldName(foreignField))
			joinTemplate = joinTemplate.replace('{alias}', parts[1])
			text = text === '' ? `${text}, ${joinTemplate}` : joinTemplate
		}
		return text
	}
	private getFieldName(operand: Field): string {
		if (this.mapping.existsProperty(operand.entity, operand.name)) {
			const property = this.mapping.getProperty(operand.entity, operand.name)
			if (operand.alias === undefined) {
				return this.dialect.delimiter(property.mapping, true)
			} else {
				return `${operand.alias}.${this.dialect.delimiter(property.mapping)}`
			}
		} else {
			return this.dialect.delimiter(operand.name)
		}
	}

	protected override buildInsert(operand: Insert, entity: EntityMapping): string {
		const assings: string[] = []
		const template = this.dialect.dml('insert')
		const templateAssing = this.dialect.operator('=', 2)
		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name: string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(p => p.name === keyVal.property)
					if (property === undefined) {
						throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
					}
					name = property.mapping
				} else {
					name = keyVal.name
				}
				const value = this.buildOperand(keyVal.children[0])
				let assing = templateAssing.replace('{0}', name)
				assing = assing.replace('{1}', value)
				assings.push(assing)
			}
		}
		return template.replace('{assings}', assings.join(','))
	}

	protected override buildUpdate(operand: Update, entity: EntityMapping): string {
		const template = this.dialect.dml('update')
		const templateAssing = this.dialect.operator('=', 2)
		const assings: string[] = []

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name: string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(p => p.name === keyVal.property)
					if (property === undefined) {
						throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
					}
					name = property.mapping
				} else {
					name = keyVal.name
				}
				const field = this.dialect.delimiter(name)
				const value = this.buildOperand(keyVal.children[0])
				let assing = templateAssing.replace('{0}', field)
				assing = assing.replace('{1}', value)
				assings.push(assing)
			}
		}
		return template.replace('{assings}', assings.join(','))
	}

	protected override buildField(operand: Field): string {
		if (this.mapping.existsProperty(operand.entity, operand.name)) {
			const property = this.mapping.getProperty(operand.entity, operand.name)
			const mapping = operand.prefix ? operand.prefix + property.mapping : property.mapping
			if (operand.alias === undefined) {
				return this.dialect.other('column').replace('{name}', this.dialect.delimiter(mapping, true))
			} else {
				let text = this.dialect.other('field')
				text = text.replace('{entityAlias}', operand.alias)
				text = text.replace('{name}', this.dialect.delimiter(mapping))
				return text
			}
		} else {
			return this.dialect.other('column').replace('{name}', this.dialect.delimiter(operand.name))
		}
	}
	private setPrefixToField(operand: Operand, prefix: string) {
		if (operand instanceof Field) {
			operand.prefix = prefix
		}
		if (operand.children) {
			for (const p in operand.children) {
				this.setPrefixToField(operand.children[p], prefix)
			}
		}
	}


}
