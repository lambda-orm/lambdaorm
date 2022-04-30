
import { Operand, KeyValue, Operator, FunctionRef } from 'js-expressions'
import { Include, Field, Sentence, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Query, SintaxisError, SchemaError, EntityMapping } from '../../model'
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
	protected override buildMapSentence(sentence: Sentence): string {

		// const map = sentence.children.find(p => p.name === 'map') as Map | undefined
		// const from = sentence.children.find(p => p instanceof From) as Operand
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
		if (joins.length > 0) {
			text = `${text}, ${this.buildJoins(joins)}`
		}
		if (filter) {
			text = `${text}, ${this.buildFilter(filter)}`
		}
		if (groupBy) {
			text = `${text}, ${this.buildArrowFunction(groupBy)}`
		}
		if (having) {
			text = `${text}, ${this.buildArrowFunction(having)}`
		}
		if (sort) {
			text = `${text}, ${this.buildArrowFunction(sort)}`
		}
		if (page) {
			text = this.buildPage(text, page)
		}
		return `[${text}]`
	}

	protected override buildUpdateSentence(sentence: Sentence): string {
		const entity = this.mapping.getEntity(sentence.entity)
		const update = sentence.children.find(p => p instanceof Update) as Update | undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (update === undefined) {
			throw new SchemaError(`update operand not found`)
		}
		//TODO: tener en cuenta que cuando hay includes el set solo debe estar en el root.
		//quizas el set debe estar en la connexion
		let data: any = {
			set: `{ "$set" :{ ${this.buildUpdate(update, entity)} }}`,
			filter: filter ? this.buildArrowFunction(filter) : {}
		}
		return JSON.stringify(data)
	}
	protected override buildDeleteSentence(sentence: Sentence): string {
		const entity = this.mapping.getEntity(sentence.entity)
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		//TODO: tener en cuenta que cuando hay includes
		let data: any = {
			filter: filter ? this.buildArrowFunction(filter) : {}
		}
		return JSON.stringify(data)
	}
	protected getMap(sentence: Sentence): any {

		const mapOperator = sentence.children.find(p => p.name === 'map') as Map | undefined
		if (mapOperator === undefined) {
			throw new SchemaError(`map operator not found`)
		}

		this.setPrefixToField(mapOperator, '$')
		let map = this.buildArrowFunction(mapOperator)
		let composite = this.getComposite(sentence)
		if (composite) {
			map = `${map} ,${composite}`
		}
		if (mapOperator.children[0] instanceof FunctionRef && mapOperator.children[0].name === 'distinct') {
			//https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/
			return map
		} else {
			const template = this.dialect.dml('rootMap')
			const result = template.replace('{0}', map)
			// In the templates process $$ is being replaced by $, for this $this is replaced. for $$this.
			return Helper.replace(result, '"$this.', '"$$this.')
			// Example:
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
		}
	}
	protected getComposite(sentence: Sentence): string | undefined {
		const includes = sentence.getCompositeIncludes()
		if (includes.length > 0) {
			let text: string = ''
			const compositeTemplate = this.dialect.dml('composite')
			for (const p in includes) {
				const include = includes[p]
				const relationEntity = this.mapping.getEntity(include.relation.entity)
				if (relationEntity === undefined) {
					throw new SchemaError(`EntityMapping ${include.relation.entity} not found`)
				}
				//TODO: ver que pasa cuando la propiedad a relacionar es ya un hijo
				// ver si debe ir $$This. en vez de $
				//const relationProperty = `"$\\\"${relationEntity.mapping}\\\""`
				const relationProperty = `"$\\"${relationEntity.mapping}\\""`
				let relationMap = this.getChildrenMap(include.children[0] as Sentence)
				let compositeText = compositeTemplate.replace('{name}', include.relation.name)
				compositeText = compositeText.replace('{input}', relationProperty)
				compositeText = compositeText.replace('{in}', relationMap)
				text = text === '' ? compositeText : `${text} ,${compositeText}`
			}
			return text
		} else {
			return undefined
		}
	}
	protected getChildrenMap(sentence: Sentence): any {
		//https://stackoverflow.com/questions/61173117/mongodb-get-index-of-current-element-in-array
		const mapOperator = sentence.children.find(p => p.name === 'map') as Map | undefined
		if (mapOperator === undefined) {
			throw new SchemaError(`map operator not found`)
		}
		this.setPrefixToField(mapOperator, '$$this.')
		let map = this.buildArrowFunction(mapOperator)
		let composite = this.getComposite(sentence)
		if (composite) {
			map = `${map} ,${composite}`
		}
		return map
	}


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
	protected buildFilter(operand: Filter): string {
		//TODO: falta resolver si los campos a filtrar corresponden a un include composite.
		this.setPrefixToField(operand, '$')
		const template = this.dialect.dml('rootFilter')
		return template.replace('{0}', this.buildArrowFunction(operand))
	}
	protected getFieldName(operand: Field): string {
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
	protected setPrefixToField(operand: Operand, prefix: string) {
		if (operand instanceof Field) {
			operand.prefix = prefix
		}
		if (operand.children) {
			for (const p in operand.children) {
				const child = operand.children[p]
				if (child instanceof Operator && child.children.length === 2) {
					// solo debe agregar $ si el field esta del lado del value   {key:value}
					// pero en este caso { "$match" : { "$_id":{{id}} } }  no deberia agregarlo al key = _id"
					const valueOperand = child.children[1]
					this.setPrefixToField(valueOperand, prefix)
				} else {
					this.setPrefixToField(child, prefix)
				}
			}
		}
	}
}
