import { Query } from '../../../query/domain'
import { OrmH3lp } from '../../../shared/infrastructure'
import { ModelConfig, MappingConfig, Dialect, SchemaState } from 'lambdaorm-base'

abstract class StageStateService<T> {
	// eslint-disable-next-line no-useless-constructor
	constructor (protected readonly schemaState:SchemaState, protected readonly helper:OrmH3lp) {}

	public get schemaDirPath () {
		return this.schemaState.schemaPath ? this.helper.fs.dirname(this.schemaState.schemaPath) : process.cwd()
	}

	public async get (name:string):Promise<T> {
		const file = this.getFile(name)
		const exists = await this.helper.fs.exists(file)
		if (exists) {
			const content = await this.helper.fs.read(file)
			if (content) {
				return JSON.parse(content)
			}
		}
		return this.empty()
	}

	public async update (name:string, data:T):Promise<void> {
		const file = this.getFile(name)
		await this.helper.fs.write(file, JSON.stringify(data))
	}

	public async remove (name:string):Promise<any> {
		const file = this.getFile(name)
		await this.helper.fs.remove(file)
	}

	protected abstract empty():T

	public abstract getFile (name: string)
}

export class StageMappingService extends StageStateService<MappingConfig> {
	protected override empty ():MappingConfig {
		return { mapping: [], pending: [], inconsistency: [] }
	}

	public override getFile (name: string) {
		return this.helper.fs.join(this.schemaDirPath, this.schemaState.schema.infrastructure?.paths?.state || 'orm_state', `${name}-data.json`)
	}
}

export class StageModelService extends StageStateService<ModelConfig> {
	protected override empty ():ModelConfig {
		return { mappings: [] }
	}

	public override getFile (name: string) {
		return this.helper.fs.join(this.schemaDirPath, this.schemaState.schema.infrastructure?.paths?.state || 'orm_state', `${name}-model.json`)
	}

	public async ddl (stage: string, action: string, queries: Query[]): Promise<void> {
		const sources: any[] = []
		for (const i in queries) {
			const query = queries[i]
			const source = sources.find(p => p.name === query.source)
			if (source === undefined) {
				sources.push({ name: query.source, dialect: query.dialect, queries: [query] })
			} else {
				source.queries.push(query)
			}
		}
		for (const i in sources) {
			const source = sources[i]
			const logFile = this.ddlFile(stage, action, source)
			const data = source.queries.map((p: Query) => p.sentence).join(';\n') + ';'
			await this.helper.fs.write(logFile, data)
		}
	}

	private ddlFile (stage: string, action:string, source:any) {
		let date = new Date().toISOString()
		const extension = [Dialect.MongoDB].includes(source.dialect) ? 'json' : 'sql'
		date = this.helper.str.replace(date, ':', '')
		date = this.helper.str.replace(date, '.', '')
		date = this.helper.str.replace(date, '-', '')
		return this.helper.fs.join(this.schemaDirPath, this.schemaState.schema.infrastructure?.paths?.state || 'orm_state', `${stage}-ddl-${date}-${action}-${source.name}.${extension}`)
	}
}
