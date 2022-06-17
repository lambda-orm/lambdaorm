/* eslint-disable no-tabs */

import { Operand, KeyValue, Operator, FunctionRef, Obj } from 'js-expressions'
import { Include, Field, Sentence, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Query, SchemaError, EntityMapping, RelationType } from '../../model'
import { DmlBuilder } from '../dmlBuilder'
import { Helper } from '../../manager'

export class NoSqlDMLBuilder extends DmlBuilder {
	public override build (sentence: Sentence): Query {
		if (sentence.action === 'select') {
			const noSQLSentence = this.buildSentence(sentence)
			return new Query(sentence.name, this.dataSource.dialect, this.dataSource.name, noSQLSentence, sentence.entity, sentence.columns, sentence.parameters, sentence.constraints, sentence.values, sentence.defaults)
		} else {
			const includes:Include[] = []
			const sentenceIncludes = sentence.getCompositeIncludes()
			for (const p in sentenceIncludes) {
				const sentenceInclude = sentenceIncludes[p]
				const childSentence = sentenceInclude.children[0] as Sentence
				const childQuery = this.build(childSentence)
				const include = new Include(sentenceInclude.name, childQuery, sentenceInclude.relation)
				includes.push(include)
			}
			const noSQLSentence = this.buildSentence(sentence)
			const query = new Query(sentence.name, this.dataSource.dialect, this.dataSource.name, noSQLSentence, sentence.entity, sentence.columns, sentence.parameters, sentence.constraints, sentence.values, sentence.defaults)
			query.includes = includes
			return query
		}
	}

	protected override buildMapSentence (sentence: Sentence): string {
		const map = sentence.children.find(p => p.name === 'map') as Map | undefined
		const joins = sentence.children.filter(p => p instanceof Join) as Join[]
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		const groupBy = sentence.children.find(p => p.name === 'groupBy') as GroupBy | undefined
		const having = sentence.children.find(p => p.name === 'having') as Having | undefined
		const sort = sentence.children.find(p => p.name === 'sort') as Sort | undefined
		const page = sentence.children.find(p => p.name === 'page') as Page | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (map === undefined) {
			throw new SchemaError('map operator not found')
		}

		let text = ''
		if (entity.composite) {
			text = this.addAggregate(text, this.buildReplaceRoot(entity))
		}
		if (joins.length > 0) {
			text = this.addAggregate(text, this.buildJoins(entity, joins))
		}
		if (filter) {
			text = this.addAggregate(text, this.buildFilter(filter))
		}
		if (groupBy) {
			text = this.addAggregate(text, this.getGroupBy(map, groupBy, sentence))
		} else {
			text = this.addAggregate(text, this.getMap(map, sentence))
		}
		if (having) {
			text = this.addAggregate(text, this.buildArrowFunction(having))
		}
		if (sort) {
			text = this.addAggregate(text, this.buildArrowFunction(sort))
		}
		if (page) {
			text = this.buildPage(text, page)
		}
		return `[${text}]`
	}

	private addAggregate (previous:string, toAdd:string) {
		return previous !== '' ? `${previous}, ${toAdd}` : toAdd
	}

	protected buildReplaceRoot (entity:EntityMapping) {
		const parts = entity.name.split('.')
		const mappings:string[] = []
		for (let i = 1; i < parts.length; i++) {
			const childEntityName = parts.slice(0, i + 1).join('.')
			const childEntity = this.mapping.getEntity(childEntityName)
			if (childEntity === undefined) {
				throw new SchemaError(`child entity  ${childEntityName} not found in ${entity.name}`)
			}
			mappings.push(this.dialect.delimiter(childEntity.mapping))
		}
		const parentEntityName = parts.slice(0, parts.length - 1).join('.')
		const parentEntity = this.mapping.getEntity(parentEntityName)
		if (parentEntity === undefined) {
			throw new SchemaError(`parent entity  ${parentEntityName} not found in ${entity.name}`)
		}
		const relationName = parts[parts.length - 1]
		const relation = parentEntity.relations.find(p => p.name === relationName)
		if (relation === undefined) {
			throw new SchemaError(`relation ${relationName} not found in ${parentEntityName}`)
		}
		let newRoot = `$${mappings.join('.')}`
		newRoot = Helper.replace(newRoot, '"', '\\"')
		let text = ''
		if (relation.type === RelationType.manyToOne) {
			text = this.dialect.dml('unwind').replace('{0}', newRoot)
		}
		const replaceRootTemplate = this.dialect.dml('replaceRoot')
		text = text !== '' ? `${text}, ${replaceRootTemplate.replace('{0}', newRoot)}` : replaceRootTemplate.replace('{0}', newRoot)
		return text
	}

	protected override buildUpdateSentence (sentence: Sentence): string {
		const entity = this.mapping.getEntity(sentence.entity)
		const update = sentence.children.find(p => p instanceof Update) as Update | undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (update === undefined) {
			throw new SchemaError('update operand not found')
		}
		// TODO: tener en cuenta que cuando hay includes el set solo debe estar en el root.
		// quizás el set debe estar en la conexión
		const data: any = {
			set: `{ "$set" :{ ${this.buildUpdate(update, entity)} }}`,
			filter: filter ? this.buildArrowFunction(filter) : {}
		}
		return JSON.stringify(data)
	}

	protected override buildDeleteSentence (sentence: Sentence): string {
		const entity = this.mapping.getEntity(sentence.entity)
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		// TODO: tener en cuenta que cuando hay includes
		const data: any = {
			filter: filter ? this.buildArrowFunction(filter) : {}
		}
		return JSON.stringify(data)
	}

	protected getGroupBy (map:Map, _groupBy:GroupBy, sentence: Sentence): any {
		this.setPrefixToField(map, '$')

		let projectColumns = ''
		const columns:KeyValue[] = []
		const groupColumns:KeyValue[] = []
		if (map.children[0] instanceof Obj) {
			const obj =	map.children[0]
			for (const p in obj.children) {
				const keyValue = obj.children[p]
				let column:string
				if (this.hadGroupFunction(keyValue.children[0])) {
					groupColumns.push(keyValue)
					column = `"${keyValue.name}":"$${keyValue.name}"`
				} else {
					columns.push(keyValue)
					column = `"${keyValue.name}":"$_id.${keyValue.name}"`
				}
				if (projectColumns) {
					projectColumns = `${projectColumns} , ${column}`
				} else {
					projectColumns = `${column}`
				}
			}
		}
		let columnsText = this.buildOperand(new Obj('obj', columns))
		const groupColumnsText = this.buildOperand(new Obj('obj', groupColumns))
		const composite = this.getComposite(sentence)
		if (composite) {
			columnsText = `${columnsText} ,${composite}`
		}
		const templateGroup = this.dialect.dml('rootGroupBy')
		const templateProject = this.dialect.dml('rootMap')
		let text = templateGroup.replace('{0}', columnsText)
		text = text.replace('{1}', groupColumnsText)
		text = text + ', ' + templateProject.replace('{0}', projectColumns)
		// In the templates process $$ is being replaced by $, for this $this is replaced. for $$this.
		return Helper.replace(text, '"$this.', '"$$this.')
	}

	protected getMap (map:Map, sentence: Sentence): any {
		this.setPrefixToField(map, '$')
		let mapText = this.buildArrowFunction(map)
		const composite = this.getComposite(sentence)
		if (composite) {
			mapText = `${mapText} ,${composite}`
		}
		if (map.children[0] instanceof FunctionRef && map.children[0].name === 'distinct') {
			// https://www.MongoDB.com/docs/manual/reference/operator/aggregation/group/
			return mapText
		} else {
			const template = this.hadGroupFunction(map) ? this.dialect.dml('mapGroup') : this.dialect.dml('rootMap')
			const result = template.replace('{0}', mapText)
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

	protected getComposite (sentence: Sentence): string | undefined {
		const includes = sentence.getCompositeIncludes()
		if (includes.length > 0) {
			let text = ''
			const compositeTemplate = this.dialect.dml('composite')
			for (const p in includes) {
				const include = includes[p]
				const relationEntity = this.mapping.getEntity(include.relation.entity)
				if (relationEntity === undefined) {
					throw new SchemaError(`EntityMapping ${include.relation.entity} not found`)
				}
				// TODO: ver que pasa cuando la propiedad a relacionar es ya un hijo
				// ver si debe ir $$This. en vez de $
				// const relationProperty = `"$\\\"${relationEntity.mapping}\\\""`
				const relationProperty = `"$\\"${relationEntity.mapping}\\""`
				const relationMap = this.getChildrenMap(include.children[0] as Sentence)
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

	protected getChildrenMap (sentence: Sentence): any {
		// https://stackoverflow.com/questions/61173117/MongoDB-get-index-of-current-element-in-array
		const mapOperator = sentence.children.find(p => p.name === 'map') as Map | undefined
		if (mapOperator === undefined) {
			throw new SchemaError('map operator not found')
		}
		this.setPrefixToField(mapOperator, '$$this.')
		let map = this.buildArrowFunction(mapOperator)
		const composite = this.getComposite(sentence)
		if (composite) {
			map = `${map} ,${composite}`
		}
		return map
	}

	protected override buildJoins (entity: EntityMapping, joins: Join[]): string {
		// Example: https://www.w3schools.com/nodejs/nodejs_mongodb_join.asp
		// Example: https://stackoverflow.com/questions/69097870/how-to-join-multiple-collection-in-MongoDB
		// https://javascript.tutorialink.com/MongoDB-get-sum-of-fields-in-last-stage-of-aggregate/
		let text = ''
		const template = this.dialect.dml('join')
		for (const join of joins) {
			this.setPrefixToField(join, '$')
			const joinEntity = this.mapping.getEntity(join.name)
			if (joinEntity === undefined) {
				throw new SchemaError(`not found mapping for ${join.name}`)
			}
			const foreignField = join.children[0].children[0] as Field
			const localField = join.children[0].children[1] as Field

			const alias = entity.name !== join.entity ? localField.alias : undefined
			let joinTemplate = template.replace('{name}', this.dialect.delimiter(joinEntity.mapping, true))
			joinTemplate = joinTemplate.replace('{fromProperty}', this.getFieldMapping(localField))
			joinTemplate = joinTemplate.replace('{toProperty}', this.getFieldMapping(foreignField, alias))
			joinTemplate = joinTemplate.replace('{alias}', this.dialect.delimiter(join.alias, true))
			text = text !== '' ? `${text}, ${joinTemplate}` : joinTemplate
		}
		return text
		// Example
		// {
		// 	$lookup: {
		// 		from: "Categories",
		// 		localField: "CategoryID",
		// 		foreignField: "_id",
		// 		as: "p"
		// 	}
		// },
		// {
		// 	$project: {
		// 		"name": "$ProductName",
		// 		"category": { $arrayElemAt: ["$p.CategoryName", 0] },
		// 	}
		// }

		// Example multiple joins
		// [
		// 	//https://stackoverflow.com/questions/64515836/how-to-replace-root-with-an-array-field-during-MongoDB-aggregation-pipeline
		// 	// unwind solo aplica si el child es un array
		// 	{ $unwind: "$\"Order Details\"" },
		// 	{ $replaceRoot: { newRoot: "$\"Order Details\"" } },
		// 	{
		// 		"$lookup": {
		// 			"from": "Orders",
		// 			"localField": "OrderID",
		// 			"foreignField": "_id",
		// 			"as": "o1"
		// 		}
		// 	},
		// 	{
		// 		"$lookup": {
		// 			"from": "Products",
		// 			"localField": "ProductID",
		// 			"foreignField": "_id",
		// 			"as": "p"
		// 		}
		// 	},
		// 	{
		// 		"$lookup": {
		// 			"from": "Categories",
		// 			"localField": "CategoryID",
		// 			"foreignField": "p._id",
		// 			"as": "c"
		// 		}
		// 	},
		// 	{
		// 		"$match": {
		// 			"$and": [{ "UnitPrice": { "$gt": 10 } }, { "o1.ShippedDate": { $gte: "1997-01-01", $lt: "1997-12-31" } }]
		// 		}
		// 	},
		// 	{
		// 		"$project": {
		// 			"_id": 0,
		// 			"category": {
		// 				"$arrayElemAt": ["$c.CategoryName", 0]
		// 			},
		// 			"product": {
		// 				"$arrayElemAt": ["$p.ProductName", 0]
		// 			},
		// 			"unitPrice": "$UnitPrice",
		// 			"quantity": "$Quantity"
		// 		}
		// 	}
		// 	, {
		// 		"$sort": {
		// 			"category": 1,
		// 			"product": 1
		// 		}
		// 	}
		// ]
	}

	protected buildFilter (operand: Filter): string {
		// TODO: falta resolver si los campos a filtrar corresponden a un include composite.
		// this.setPrefixToField(operand, '$')
		const template = this.dialect.dml('rootFilter')
		return template.replace('{0}', this.buildArrowFunction(operand))
	}

	protected getFieldMapping (operand: Field, alias?:string): string {
		let name = ''
		if (this.mapping.existsProperty(operand.entity, operand.name)) {
			const property = this.mapping.getProperty(operand.entity, operand.name)
			name = property.mapping
		} else {
			name = operand.name
		}

		if (alias) {
			return this.dialect.delimiter(alias + '.' + name, true)
		} else {
			return this.dialect.delimiter(name, true)
		}
	}

	protected override buildInsert (operand: Insert, entity: EntityMapping): string {
		const assigns: string[] = []
		const template = this.dialect.dml('insert')
		const templateAssing = this.dialect.operator('=', 2)
		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name: string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(q => q.name === keyVal.property)
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
				assigns.push(assing)
			}
		}
		return template.replace('{assigns}', assigns.join(','))
	}

	protected override buildUpdate (operand: Update, entity: EntityMapping): string {
		const template = this.dialect.dml('update')
		const templateAssign = this.dialect.operator('=', 2)
		const assigns: string[] = []

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name: string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(q => q.name === keyVal.property)
					if (property === undefined) {
						throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
					}
					name = property.mapping
				} else {
					name = keyVal.name
				}
				const field = this.dialect.delimiter(name)
				const value = this.buildOperand(keyVal.children[0])
				let assign = templateAssign.replace('{0}', field)
				assign = assign.replace('{1}', value)
				assigns.push(assign)
			}
		}
		return template.replace('{assigns}', assigns.join(','))
	}

	protected override buildField (operand: Field): string {
		if (this.mapping.existsProperty(operand.entity, operand.name)) {
			const property = this.mapping.getProperty(operand.entity, operand.name)
			const templateKey = operand.alias === undefined
				? 'column'
				: operand.isRoot
					? 'field'
					: operand.prefix ? 'projectJoinField' : 'joinField'
			let text = this.dialect.other(templateKey)
			text = text.replace('{entityAlias}', operand.alias || '')
			text = text.replace('{prefix}', operand.prefix || '')
			text = text.replace('{name}', property.mapping)
			return text
		} else {
			return this.dialect.delimiter(operand.name, true)
		}
	}

	protected setPrefixToField (operand: Operand, prefix: string) {
		if (operand instanceof Field) {
			operand.prefix = prefix
		}
		if (operand.children) {
			for (const p in operand.children) {
				const child = operand.children[p]
				if (child instanceof Operator && (child.name === '=' || child.name === '==' || child.name === '===' || child.name === '!=' || child.name === '!==')) {
					// solo debe agregar $ si el field esta del lado del value   {key:value}
					// pero en este caso { "$match" : { "$_id":{{id}} } }  no debería agregarlo al key = _id"
					const valueOperand = child.children[1]
					this.setPrefixToField(valueOperand, prefix)
				} else {
					this.setPrefixToField(child, prefix)
				}
			}
		}
	}

	protected hadGroupFunction (operand: Operand):boolean {
		if (operand instanceof FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].includes(operand.name)) {
			return true
		}
		if (operand.children) {
			for (const p in operand.children) {
				const child = operand.children[p]
				if (this.hadGroupFunction(child)) {
					return true
				}
			}
		}
		return false
	}
}
