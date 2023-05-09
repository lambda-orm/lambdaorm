import { SintaxisError } from '../../../shared/domain'
import { Operand, OperandType, TypeService } from '3xpr'
import { Type, Primitive } from 'typ3s'
import { SentenceCrudAction } from '../../../schema/domain'
import { Sentence, SentenceInclude, Field, Map, From, Join, Filter, GroupBy, Having, Sort, Page, Insert, BulkInsert, Update } from '../../domain'
import { ModelConfigService } from '../../../schema/application'

export class SentenceTypeService extends TypeService {
	private config: ModelConfigService
	constructor (config: ModelConfigService) {
		super()
		this.config = config
	}

	public override getType (operand: Operand):Type {
		if (operand instanceof Sentence) {
			const sentence = operand as Sentence
			this.solveSentence(sentence)
			for (const child of sentence.children) {
				if (child.children.length > 0 && !(child instanceof From) && !(child instanceof SentenceInclude)) {
					this.solveTemplate(child.children[0])
					this.setUndefinedAsAny(child.children[0])
				}
			}
		} else {
			this.solveType(operand)
			this.solveTemplate(operand)
			this.setUndefinedAsAny(operand)
		}
		return operand.returnType || Type.any
	}

	private solveSentence (sentence: Sentence): void {
		switch (sentence.crudAction) {
		case SentenceCrudAction.select:
			this.solveSelect(sentence)
			break
		case SentenceCrudAction.insert:
		case SentenceCrudAction.update:
		case SentenceCrudAction.delete:
			this.solveModify(sentence)
			break
		default:
			throw new SintaxisError(`sentence crud action ${sentence.crudAction} not found`)
		}
	}

	private solveSelect (sentence: Sentence):void {
		const map = sentence.children.find(p => p instanceof Map) as Map
		const joins = sentence.children.filter(p => p instanceof Join) as Join[]
		const filter = sentence.children.find(p => p instanceof Filter) as Filter | undefined
		const groupBy = sentence.children.find(p => p instanceof GroupBy) as GroupBy | undefined
		const having = sentence.children.find(p => p instanceof Having) as Having | undefined
		const sort = sentence.children.find(p => p instanceof Sort) as Sort | undefined
		const page = sentence.children.find(p => p instanceof Page) as Page | undefined

		this.solveFields(map.children[0], sentence.entity)
		this.solveType(map.children[0])
		if (joins) {
			for (const join of joins) {
				this.solveFields(join.children[0], sentence.entity, map.children[0].children)
				this.solveType(join.children[0])
			}
		}
		if (filter) {
			this.solveFields(filter.children[0], sentence.entity, map.children[0].children)
			this.solveType(filter.children[0])
		}
		if (groupBy) {
			this.solveFields(groupBy.children[0], sentence.entity, map.children[0].children)
			this.solveType(groupBy.children[0])
		}
		if (having) {
			this.solveFields(having.children[0], sentence.entity, map.children[0].children)
			this.solveType(having.children[0])
		}
		if (sort) {
			this.solveFields(sort.children[0], sentence.entity, map.children[0].children)
			this.solveType(sort.children[0])
		}
		if (page) {
			this.solveType(page.children[0])
			this.solveType(page.children[1])
		}
	}

	private solveModify (sentence: Sentence):void {
		const insert = sentence.children.find(p => p instanceof Insert) as Insert| undefined
		const bulkInsert = sentence.children.find(p => p instanceof BulkInsert) as BulkInsert| undefined
		const update = sentence.children.find(p => p instanceof Update) as Update| undefined
		// const _delete = sentence.children.find(p => p instanceof Delete) as Delete| undefined
		const filter = sentence.children.find(p => p instanceof Filter) as Filter | undefined

		if (insert) {
			this.solveFieldsModify(insert.children[0], sentence.entity)
			this.solveType(insert.children[0])
		}
		if (bulkInsert) {
			this.solveFieldsModify(bulkInsert.children[0], sentence.entity)
			this.solveType(bulkInsert.children[0])
		}
		if (update) {
			this.solveFieldsModify(update.children[0], sentence.entity)
			this.solveType(update.children[0])
		}
		if (filter) {
			this.solveFields(filter.children[0], sentence.entity)
			this.solveType(filter.children[0])
		}
	}

	private solveFields (operand: Operand, entityName:string, keyVals: Operand[] = []):void {
		if (operand instanceof Field && (operand.returnType === undefined || operand.returnType.primitive === Primitive.any)) {
			const keyVal = keyVals.find(p => p.name === operand.name)
			if (keyVal) {
				// Example: Users.map(=> { name: firstname + ", " + lastname }).sort(p=> p.name)
				operand.returnType = keyVal.returnType
			} else {
				// Example: Users.map(=> { name: firstname + ", " + lastname }).sort(p=> p.lastname)
				// Users.map(=> { name: firstname + ", " + lastname }).sort(p=> p.username)
				const property = this.config.getProperty(entityName, operand.name)
				if (property) {
					operand.returnType = Type.to(property.type)
				}
			}
		} else {
			for (const child of operand.children) {
				this.solveFields(child, entityName, keyVals)
			}
		}
	}

	private solveFieldsModify (operand: Operand, entityName: string):void {
		if (operand.type === OperandType.Obj) {
			for (const keyVal of operand.children) {
				const property = this.config.getProperty(entityName, keyVal.name)
				if (keyVal.returnType === undefined || keyVal.returnType === Type.any) {
					keyVal.returnType = Type.to(property.type)
				}
				if (keyVal.children[0].returnType === undefined || keyVal.children[0].returnType === Type.any) {
					keyVal.children[0].returnType = Type.to(property.type)
				}
			}
		}
	}
}
