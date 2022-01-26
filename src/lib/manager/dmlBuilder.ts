import { SchemaManager, MappingConfig, Routing } from '.'
import { Sentence, LanguageManager } from '../language'
import { DialectMetadata } from '../language/dialectMetadata'
import { Query, DataSource, Include, SentenceInfo } from '../model'

export abstract class LanguageDMLBuilder {
	protected dataSource: string
	protected dialect:string
	protected mapping:MappingConfig
	protected metadata: DialectMetadata

	constructor (dataSource: string, mapping: MappingConfig, metadata: DialectMetadata) {
		this.dataSource = dataSource
		this.mapping = mapping
		this.metadata = metadata
		this.dialect = metadata.name
	}

	abstract build (sentence:Sentence):Query
}

export class DMLBuilder {
	private schema: SchemaManager
	private languageManager: LanguageManager
	// private mapping: MappingConfig
	public stage: string
	protected routing: Routing

	constructor (schema:SchemaManager, routing:Routing, languageManager: LanguageManager, stage: string) {
		this.schema = schema
		this.routing = routing
		// this.mapping = mapping
		this.languageManager = languageManager
		this.stage = stage
	}

	private async getDataSource (sentence: Sentence): Promise<DataSource> {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, name: sentence.name }
		const datasourceName = await this.routing.getDataSource(sentenceInfo, this.stage)
		return this.schema.dataSource.get(datasourceName)
	}

	public async build (sentence:Sentence):Promise<Query> {
		const children = []
		const includes = sentence.getIncludes()
		const dataSource = await this.getDataSource(sentence)

		for (const p in includes) {
			const sentenceInclude = includes[p]
			const query = await this.build(sentenceInclude.children[0] as Sentence)
			const include = new Include(sentenceInclude.name, [query], sentenceInclude.relation)
			children.push(include)
		}
		const query = this.languageManager.dmlBuilder(dataSource).build(sentence)
		query.children = children
		return query
	}
}
