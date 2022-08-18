import { SchemaModel, SchemaMapping, Query } from '../model'
import { SchemaManager } from '../manager'
import { Helper } from '../manager/helper'
const path = require('path')

abstract class StageState<T> {
	protected schema: SchemaManager

	constructor (schema:SchemaManager) {
		this.schema = schema
	}

	public async get (name:string):Promise<T> {
		const file = this.getFile(name)
		const exists = await Helper.existsPath(file)
		if (exists) {
			const content = await Helper.readFile(file)
			if (content) {
				return JSON.parse(content)
			}
		}
		return this.empty()
	}

	public async update (name:string, data:T):Promise<void> {
		const file = this.getFile(name)
		await Helper.writeFile(file, JSON.stringify(data))
	}

	public async remove (name:string):Promise<any> {
		const file = this.getFile(name)
		await Helper.removeFile(file)
	}

	protected abstract empty():T

	public abstract getFile (name: string)
}

export class StageMapping extends StageState<SchemaMapping> {
	protected override empty ():SchemaMapping {
		return { mapping: [], pending: [], inconsistency: [] }
	}

	public override getFile (name: string) {
		return path.join(this.schema.workspace, this.schema.schema.app.data, `${name}-data.json`)
	}
}

export class StageModel extends StageState<SchemaModel> {
	protected override empty ():SchemaModel {
		return { mappings: [] }
	}

	public override getFile (name: string) {
		return path.join(this.schema.workspace, this.schema.schema.app.data, `${name}-model.json`)
	}

	public async ddl (stage: string, action: string, queries: Query[]): Promise<void> {
		const sources: any[] = []
		for (const i in queries) {
			const query = queries[i]
			const dataSource = sources.find(p => p.name === query.dataSource)
			if (dataSource === undefined) {
				sources.push({ name: query.dataSource, queries: [query] })
			} else {
				dataSource.queries.push(query)
			}
		}
		for (const i in sources) {
			const dataSource = sources[i]
			const logFile = this.ddlFile(stage, action, dataSource.name)
			const data = dataSource.queries.map((p: Query) => p.sentence).join(';\n') + ';'
			await Helper.writeFile(logFile, data)
		}
	}

	private ddlFile (stage: string, action:string, dataSource:string) {
		let date = new Date().toISOString()
		date = Helper.replace(date, ':', '')
		date = Helper.replace(date, '.', '')
		date = Helper.replace(date, '-', '')
		return path.join(this.schema.workspace, this.schema.schema.app.data, `${stage}-ddl-${date}-${action}-${dataSource}.txt`)
	}
}
