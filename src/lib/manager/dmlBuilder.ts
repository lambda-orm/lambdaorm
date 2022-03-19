import { SchemaManager, MappingConfig, Routing, ViewConfig, Languages, Dialect } from '.'
import { Query, DataSource, Include, SentenceInfo, Sentence } from '../model'
import { Expressions } from 'js-expressions'

export abstract class LanguageDMLBuilder {
	// protected dataSource: DataSource
	// protected mapping: MappingConfig
	// protected view:ViewConfig
	// protected dialect: Dialect
	protected expressions:Expressions

	constructor (expressions:Expressions) {
		// this.dataSource = dataSource
		// this.mapping = mapping
		// this.view = view
		// this.dialect = dialect
		this.expressions = expressions
	}

	abstract build (dataSource: DataSource, mapping: MappingConfig, view:ViewConfig, dialect: Dialect, sentence:Sentence):Query
}

export class DMLBuilder {
	private schema: SchemaManager
	private languages: Languages
	private expressions:Expressions
	public stage: string
	public view: ViewConfig
	protected routing: Routing

	constructor (schema:SchemaManager, routing:Routing, languages: Languages, expressions:Expressions, stage: string, view: string) {
		this.schema = schema
		this.routing = routing
		this.expressions = expressions
		this.languages = languages
		this.stage = stage
		this.view = schema.view.getInstance(view)
	}

	private getDataSource (sentence: Sentence): DataSource {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, name: sentence.name }
		const datasourceName = this.routing.getDataSource(sentenceInfo, this.stage)
		return this.schema.dataSource.get(datasourceName)
	}

	public build (sentence:Sentence):Query {
		const children = []
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const sentenceInclude = includes[p]
			const query = this.build(sentenceInclude.children[0] as Sentence)
			const include = new Include(sentenceInclude.name, [query], sentenceInclude.relation)
			children.push(include)
		}

		const dataSource = this.getDataSource(sentence)
		const language = this.languages.getByDiatect(dataSource.dialect)
		const mapping = this.schema.mapping.getInstance(dataSource.mapping)
		const query = language.dmlBuild(dataSource, mapping, this.view, sentence)
		query.children = children
		return query
	}
}
