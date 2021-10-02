
import { Context, Parameter } from './../../model'
import { IOperandExecutor } from '../'
import { Executor } from '../../connection'
import { SentenceInclude, Query, Operand } from './../operands'
import { SqlLanguage } from './language'
import { SqlDialectMetadata } from './dialectMetadata'

export class SqlExecutor implements IOperandExecutor {
	private language:SqlLanguage
	constructor (language:SqlLanguage) {
		this.language = language
	}

	public async execute (operand:Operand, context:Context, executor:Executor):Promise<any> {
		const query:Query = operand as Query
		const metadata = this.language.metadata(query.dialect)
		return await this._execute(query, context, metadata, executor)
	}

	protected async _execute (query:Query, context:Context, metadata:SqlDialectMetadata, executor:Executor):Promise<any> {
		let result:any
		switch (query.name) {
		case 'select': result = await this.select(query, context, metadata, executor); break
		case 'insert': result = await this.insert(query, context, metadata, executor); break
		case 'update': result = await this.update(query, context, metadata, executor); break
		case 'delete': result = await this.delete(query, context, metadata, executor); break
		case 'bulkInsert': result = await this.bulkInsert(query, context, metadata, executor); break
		default: throw new Error(`sentence ${query.name} not implemented`)
		}
		return result
	}

	protected async select (query:Query, context:Context, metadata:SqlDialectMetadata, executor:Executor):Promise<any> {
		const mainResult = await executor.select(query.sentence, this.params(query.parameters, metadata, context))
		if (mainResult.length > 0) {
			for (const p in query.children) {
				const include = query.children[p] as SentenceInclude
				// if (!context.contains(include.variable)) {
				// if (!context.contains('__parentId')) {
				const ids:any[] = []
				for (let i = 0; i < mainResult.length; i++) {
					const id = mainResult[i]['__' + include.relation.from]
					if (!ids.includes(id)) { ids.push(id) }
				}
				// context.set(include.variable, ids)
				context.set('__parentId', ids)
				// }
				const includeResult = await this._execute(include.children[0] as Query, context, metadata, executor)
				for (let i = 0; i < mainResult.length; i++) {
					const element = mainResult[i]
					const relationId = element['__' + include.relation.from]
					element[include.name] = (include.relation.type === 'manyToOne')
						? includeResult.filter((p:any) => p.__parentId === relationId)
						: includeResult.find((p: any) => p.__parentId === relationId)
						// ? includeResult.filter((p:any) => p[include.relation.to] === relationId)
						// : includeResult.find((p:any) => p[include.relation.to] === relationId)
				}
				// clear temporal fields used for include relations
				for (let i = 0; i < mainResult.length; i++) {
					const element = mainResult[i]
					delete element['__' + include.relation.from]
					if (include.relation.type === 'manyToOne') {
						for (let j = 0; j < element[include.name].length; j++) {
							const child = element[include.name][j]
							if (child.__parentId) {
								delete child.__parentId
							}
						}
					} else if (element[include.name] && element[include.name].__parentId) {
						delete element[include.name].__parentId
					}
				}
			}
		}
		return mainResult
	}

	protected async insert (query:Query, context:Context, metadata:SqlDialectMetadata, executor:Executor):Promise<number> {
	// before insert the relationships of the type oneToOne and oneToMany
		for (const p in query.children) {
			const include = query.children[p] as SentenceInclude
			const relation = context.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'oneToOne' || include.relation.type === 'oneToMany') {
					const relationContext = new Context(relation, context)
					const relationId = await this._execute(include.children[0] as Query, relationContext, metadata, executor)
					context.set(include.relation.from, relationId)
				}
			}
		}
		// insert main entity
		const insertId = await executor.insert(query.sentence, this.params(query.parameters, metadata, context))
		if (query.autoincrement) { context.set(query.autoincrement.name, insertId) }
		// after insert the relationships of the type oneToOne and manyToOne
		for (const p in query.children) {
			const include = query.children[p] as SentenceInclude
			const relation = context.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					const parentId = context.get(include.relation.from)
					const childPropertyName = include.relation.to
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						child[childPropertyName] = parentId
						const childContext = new Context(child, context)
						await this._execute(include.children[0] as Query, childContext, metadata, executor)
					}
				}
			}
		}
		return insertId
	}

	protected async bulkInsert (query:Query, context:Context, metadata:SqlDialectMetadata, executor:Executor):Promise<number[]> {
	// before insert the relationships of the type oneToOne and oneToMany
		for (const p in query.children) {
			const include = query.children[p] as SentenceInclude
			if (include.relation.type === 'oneToOne' || include.relation.type === 'oneToMany') {
				const allChilds:any[] = []
				for (let i = 0; i < context.data.length; i++) {
					const item = context.data[i]
					const child = item[include.relation.name]
					if (child) { allChilds.push(child) }
				}
				const childContext = new Context(allChilds, context)
				const allChildsId = await this._execute(include.children[0] as Query, childContext, metadata, executor)
				for (let i = 0; i < context.data.length; i++) {
					const item = context.data[i]
					if (item[include.relation.name]) { item[include.relation.from] = allChildsId[i] }
				}
			}
		}
		// insert main entity
		const fieldId:string|undefined = query.autoincrement ? query.autoincrement.mapping : undefined
		const ids = await executor.bulkInsert(query.sentence, this.rows(query, metadata, context.data), query.parameters, fieldId)
		if (query.autoincrement) {
			for (let i = 0; i < context.data.length; i++) {
				context.data[i][query.autoincrement.name] = ids[i]
			}
		}
		// after insert the relationships of the type oneToOne and manyToOne
		for (const p in query.children) {
			const include = query.children[p] as SentenceInclude
			if (include.relation.type === 'manyToOne') {
				const allChilds:any[] = []
				for (let i = 0; i < context.data.length; i++) {
					const item = context.data[i]
					const parentId = item[include.relation.from]
					const childPropertyName = include.relation.to
					const childs = item[include.relation.name]
					if (childs) {
						for (let j = 0; j < childs.length; j++) {
							const child = childs[j]
							child[childPropertyName] = parentId
							allChilds.push(child)
						}
					}
				}
				const childContext = new Context(allChilds, context)
				await this._execute(include.children[0] as Query, childContext, metadata, executor)
			}
		}
		return ids
	}

	protected async update (query:Query, context:Context, metadata:SqlDialectMetadata, executor:Executor):Promise<any> {
		const changeCount = await executor.update(query.sentence, this.params(query.parameters, metadata, context))
		for (const p in query.children) {
			const include = query.children[p] as SentenceInclude
			const relation = context.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						const childContext = new Context(child, context)
						await this._execute(include.children[0] as Query, childContext, metadata, executor)
					}
				} else {
					const childContext = new Context(relation, context)
					await this._execute(include.children[0] as Query, childContext, metadata, executor)
				}
			}
		}
		return changeCount
	}

	protected async delete (query:Query, context:Context, metadata:SqlDialectMetadata, executor:Executor):Promise<any> {
	// before remove relations entities
		for (const p in query.children) {
			const include = query.children[p] as SentenceInclude
			const relation = context.get(include.relation.name)
			if (relation) {
				if (include.relation.type === 'manyToOne') {
					for (let i = 0; i < relation.length; i++) {
						const child = relation[i]
						const childContext = new Context(child, context)
						await this._execute(include.children[0] as Query, childContext, metadata, executor)
					}
				} else {
					const childContext = new Context(relation, context)
					await this._execute(include.children[0] as Query, childContext, metadata, executor)
				}
			}
		}
		// remove main entity
		const changeCount = await executor.delete(query.sentence, this.params(query.parameters, metadata, context))
		return changeCount
	}

	protected params (parameters:Parameter[], metadata:SqlDialectMetadata, context:Context):Parameter[] {
		for (const p in parameters) {
			const parameter = parameters[p]
			let value = context.get(parameter.name)
			if (value !== null) {
				switch (parameter.type) {
				case 'datetime':
					value = metadata.solveDateTime(value)
					break
				case 'date':
					value = metadata.solveDate(value)
					break
				case 'time':
					value = metadata.solveTime(value)
					break
				}
				// if (parameter.type === 'datetime') { value = metadata.solveDateTime(value) } else if (parameter.type === 'date') { value = metadata.solveDate(value) } else if (parameter.type == 'time') { value = metadata.solveTime(value) }
			}
			parameter.value = value === undefined ? null : value
		}
		return parameters
	}

	protected rows (query:Query, metadata:SqlDialectMetadata, array:any[]) {
		const rows:any[] = []
		for (let i = 0; i < array.length; i++) {
			const item = array[i]
			const row:any[] = []
			for (let j = 0; j < query.parameters.length; j++) {
				const parameter = query.parameters[j]
				let value = item[parameter.name]
				if (value !== null) {
					switch (parameter.type) {
					case 'datetime':
						value = metadata.solveDateTime(value)
						break
					case 'date':
						value = metadata.solveDate(value)
						break
					case 'time':
						value = metadata.solveTime(value)
						break
					}
				}
				// if(typeof value == 'string')
				//     value = Helper.escape(value)
				row.push(value === undefined ? null : value)
			}
			rows.push(row)
		}
		return rows
	}
}
