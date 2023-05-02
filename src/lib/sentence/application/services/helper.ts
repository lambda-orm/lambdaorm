import { SintaxisError } from '../../../shared/domain'
import { Property, SentenceCrudAction } from '../../../schema/domain'
import { Field, Sentence, Map, Filter, GroupBy, Having, Sort, Insert, BulkInsert, Update, Delete } from '../../domain'
import { Operand, Parameter, OperandType, helper } from '3xpr'
import { Type, Primitive } from 'typ3s'
import { ModelConfigService } from '../../../schema/application'

export class SentenceHelper {
	private model: ModelConfigService

	constructor (model: ModelConfigService) {
		this.model = model
	}

	public getClauses (operand: Operand): any {
		const sentence: any = {}
		let current = operand
		while (current) {
			const name = current.type === OperandType.Var ? 'from' : current.name
			sentence[name] = current
			if (current.children.length > 0) {
				current = current.children[0]
			} else {
				break
			}
		}
		return sentence
	}

	public toExpression (operand: Operand): string {
		const clauses: any = this.getClauses(operand)
		const list:string[] = []
		if (clauses.map) {
			const body = helper.operand.toExpression(clauses.map.children[2])
			list.push(`map(${clauses.map.children[1].name}=>${body})`)
		} else if (clauses.insert) {
			const body = helper.operand.toExpression(clauses.insert.children[1])
			list.push(`insert(${body})`)
		} else if (clauses.bulkInsert) {
			const body = helper.operand.toExpression(clauses.bulkInsert.children[1])
			list.push(`bulkInsert(${body})`)
		} else if (clauses.update) {
			const body = helper.operand.toExpression(clauses.update.children[2])
			list.push(`update(${clauses.update.children[1].name}=>${body})`)
		} else if (clauses.delete) {
			list.push('delete()')
		}
		if (clauses.filter) {
			const body = helper.operand.toExpression(clauses.filter.children[2])
			list.push(`filter(${clauses.filter.children[1].name}=>${body})`)
		}
		if (clauses.include) {
			const body = clauses.include.children[2]
			if (Type.isList(body.type as string)) {
				const includes:string[] = []
				for (const child of body.children) {
					const include = this.toExpression(child)
					includes.push(include)
				}
				list.push(`include(${clauses.include.children[1].name}=>[${includes.join(',')}])`)
			} else {
				const include = this.toExpression(body)
				list.push(`include(${clauses.include.children[1].name}=>${include})`)
			}
		}

		if (clauses.groupBy) {
			const body = helper.operand.toExpression(clauses.groupBy.children[2])
			list.push(`groupBy(${clauses.groupBy.children[1].name}=>${body})`)
		}
		if (clauses.having) {
			const body = helper.operand.toExpression(clauses.having.children[2])
			list.push(`having(${clauses.having.children[1].name}=>${body})`)
		}
		if (clauses.sort) {
			const body = helper.operand.toExpression(clauses.sort.children[2])
			list.push(`sort(${clauses.sort.children[1].name}=>${body})`)
		}
		if (clauses.page) {
			const offset = helper.operand.toExpression(clauses.page.children[1])
			const limit = helper.operand.toExpression(clauses.page.children[2])
			list.push(`page(${offset},${limit})`)
		}
		// TODO: solve includes
		return `${clauses.from.name}.${list.join('.')}`
	}

	public getPropertiesFromParameters (entityName: string, parameters: Parameter[]): Property[] {
		const entity = this.model.getEntity(entityName)
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

	public groupByFields (operand: Operand): Field[] {
		const data = { fields: [], groupBy: false }
		this._groupByFields(operand, data)
		return data.groupBy ? data.fields : []
	}

	private _groupByFields (operand: Operand, data: any): void {
		if (operand instanceof Field) {
			data.fields.push(operand)
		} else if (operand.type === OperandType.CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			data.groupBy = true
		} else if (!(operand instanceof Sentence)) {
			for (const k in operand.children) {
				const p = operand.children[k]
				this._groupByFields(p, data)
			}
		}
	}

	public fieldsInSelect (operand: Operand): Property[] {
		const fields: Property[] = []
		if (operand.children.length === 1) {
			let child: Operand
			if (operand.children[0].type === OperandType.CallFunc && operand.children[0].name === 'distinct') {
				child = operand.children[0].children[0]
			} else {
				child = operand.children[0]
			}
			if (child.type === OperandType.Obj) {
				const obj = child
				for (const keyVal of obj.children) {
					if (keyVal.returnType !== undefined && keyVal.returnType.primitive !== Primitive.any) {
						fields.push({ name: keyVal.name, type: keyVal.returnType.primitive })
					} else {
						fields.push({ name: keyVal.name, type: Type.stringify(keyVal.children[0].returnType) })
					}
				}
			}
		}
		return fields
	}

	public fieldsInModify (operand: Operand, entityName: string, addAutoIncrement = false): Property[] {
		const fields: Property[] = []
		if (operand.children.length === 1) {
			if (operand.children[0].type === OperandType.Obj) {
				const obj = operand.children[0]
				for (const p in obj.children) {
					const keyVal = obj.children[p]
					const property = this.model.getProperty(entityName, keyVal.name)
					const field = { name: keyVal.name, type: property.type }
					fields.push(field)
				}
			}
		}
		if (addAutoIncrement) {
			const autoIncrement = this.model.getAutoIncrement(entityName)
			if (autoIncrement) {
				fields.unshift(autoIncrement)
			}
		}
		return fields
	}

	public getColumns (sentence: Sentence): Property[] {
		switch (sentence.crudAction) {
		case SentenceCrudAction.select:
			// eslint-disable-next-line no-case-declarations
			const map = sentence.children.find(p => p.name === 'map') as Map
			return this.fieldsInSelect(map)
		case SentenceCrudAction.insert:
			// eslint-disable-next-line no-case-declarations
			const insert = sentence.action === 'bulkInsert'
				? sentence.children.find(p => p instanceof BulkInsert) as BulkInsert
				: sentence.children.find(p => p instanceof Insert) as Insert
			return this.fieldsInModify(insert, sentence.entity, true)
		case SentenceCrudAction.update:
			// eslint-disable-next-line no-case-declarations
			const update = sentence.children.find(p => p instanceof Update) as Update
			return this.fieldsInModify(update, sentence.entity)
		case SentenceCrudAction.delete:
			// eslint-disable-next-line no-case-declarations
			const _delete = sentence.children.find(p => p instanceof Delete) as Delete
			return this.fieldsInModify(_delete, sentence.entity)
		default:
			throw new SintaxisError(`sentence crud action ${sentence.crudAction} not found`)
		}
	}

	public getParameters (sentence: Sentence): Parameter[] {
		const map = sentence.children.find(p => p instanceof Map) as Map | undefined
		const filter = sentence.children.find(p => p instanceof Filter) as Filter | undefined
		const groupBy = sentence.children.find(p => p instanceof GroupBy) as GroupBy | undefined
		const having = sentence.children.find(p => p instanceof Having) as Having | undefined
		const sort = sentence.children.find(p => p instanceof Sort) as Sort | undefined
		const insert = sentence.children.find(p => p instanceof Insert) as Insert | undefined
		const bulkInsert = sentence.children.find(p => p instanceof BulkInsert) as BulkInsert | undefined
		const update = sentence.children.find(p => p instanceof Update) as Update | undefined
		const _delete = sentence.children.find(p => p instanceof Delete) as Delete | undefined

		const variables: Operand[] = []
		if (map) this.loadVariables(map, variables)
		if (insert) this.loadVariables(insert, variables)
		if (bulkInsert) this.loadVariables(bulkInsert, variables)
		if (update) this.loadVariables(update, variables)
		if (_delete) this.loadVariables(_delete, variables)
		if (filter) this.loadVariables(filter, variables)
		if (groupBy) this.loadVariables(groupBy, variables)
		if (having) this.loadVariables(having, variables)
		if (sort) this.loadVariables(sort, variables)

		const parameters: Parameter[] = []
		for (let i = 0; i < variables.length; i++) {
			const variable = variables[i]
			variable.number = i + 1
			parameters.push({ name: variable.name, type: Type.stringify(variable.returnType) })
		}
		return parameters
	}

	private loadVariables (operand: Operand, variables: Operand[]) {
		if (operand.type === OperandType.Var && !(operand instanceof Field)) {
			variables.push(operand)
		}
		for (const child of operand.children) {
			this.loadVariables(child, variables)
		}
	}
}
