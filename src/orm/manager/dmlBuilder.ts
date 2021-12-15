import { SchemaConfig, MappingConfig } from '.'
import { Sentence, LanguageManager } from '../language'
import { DialectMetadata } from '../language/dialectMetadata'
import { Query, DataSource, Include, IEvaluator } from '../model'

export abstract class LanguageDMLBuilder {
	protected dataSource: string
	protected dialect:string
	protected mapping:MappingConfig
	protected metadata:DialectMetadata

	constructor (dataSource: string, mapping: MappingConfig, metadata: DialectMetadata) {
		this.dataSource = dataSource
		this.mapping = mapping
		this.metadata = metadata
		this.dialect = metadata.name
	}

	abstract build (sentence:Sentence):Query
}

export class DMLBuilder {
	private schema: SchemaConfig
	private languageManager: LanguageManager
	private mapping: MappingConfig
	private evaluator:IEvaluator
	public dataSource: DataSource

	constructor (schema:SchemaConfig, evaluator:IEvaluator, mapping:MappingConfig, languageManager: LanguageManager, dataSource: DataSource) {
		this.schema = schema
		this.evaluator = evaluator
		this.mapping = mapping
		this.languageManager = languageManager
		this.dataSource = dataSource
	}

	private async getDatastore (sentence:Sentence): Promise<DataSource> {
		const context = { entity: sentence.entity, action: sentence.action }
		for (const i in this.dataSource.rules) {
			const rule = this.dataSource.rules[i]
			if (await this.evaluator.eval(rule.rule, context) === true) {
				return this.schema.dataSource.get(rule.dataSource)
			}
		}
		return this.dataSource
	}

	public async build (sentence:Sentence):Promise<Query> {
		const children = []
		const includes = sentence.getIncludes()
		const dataSource = await this.getDatastore(sentence)

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
