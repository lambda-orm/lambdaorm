import { SchemaManager, MappingConfig, Routing } from '.'
import { Sentence, LanguageManager } from '../language'
import { DialectMetadata } from '../language/dialectMetadata'
import { Query, DataSource, Include, SentenceInfo } from '../model'
import { Expressions } from 'js-expressions'

export abstract class LanguageDMLBuilder {
	protected dataSource: string
	protected dialect:string
	protected mapping:MappingConfig
	protected metadata: DialectMetadata
	protected expressions:Expressions

	constructor (dataSource: string, mapping: MappingConfig, metadata: DialectMetadata, expressions:Expressions) {
		this.dataSource = dataSource
		this.mapping = mapping
		this.expressions = expressions
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

	private getDataSource (sentence: Sentence): DataSource {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, name: sentence.name }
		const datasourceName = this.routing.getDataSource(sentenceInfo, this.stage)
		return this.schema.dataSource.get(datasourceName)
	}

	public build (sentence:Sentence):Query {
		const children = []
		const includes = sentence.getIncludes()
		const dataSource = this.getDataSource(sentence)

		for (const p in includes) {
			const sentenceInclude = includes[p]
			const query = this.build(sentenceInclude.children[0] as Sentence)
			const include = new Include(sentenceInclude.name, [query], sentenceInclude.relation)
			children.push(include)
		}
		const query = this.languageManager.dmlBuilder(dataSource).build(sentence)
		query.children = children
		return query
	}
}
