import { ConfigManager, SchemaConfig } from '.'
import { Sentence, LanguageManager } from '../language'
import { DialectMetadata } from '../language/dialectMetadata'
import { Query, Datastore, Include, IEvaluator } from '../model'

export abstract class LanguageDMLBuilder {
	abstract build (sentence:Sentence, schema:SchemaConfig, datastore:string, metadata:DialectMetadata):Query
}

export class DMLBuilder {
	private config: ConfigManager
	private languageManager: LanguageManager
	private schema: SchemaConfig
	private evaluator:IEvaluator
	public datastore: Datastore

	constructor (config:ConfigManager, evaluator:IEvaluator, schema:SchemaConfig, languageManager: LanguageManager, datastore: Datastore) {
		this.config = config
		this.evaluator = evaluator
		this.schema = schema
		this.languageManager = languageManager
		this.datastore = datastore
	}

	private async getDatastore (sentence:Sentence): Promise<Datastore> {
		const context = { entity: sentence.entity, action: sentence.action }
		for (const i in this.datastore.rules) {
			const rule = this.datastore.rules[i]
			if (await this.evaluator.eval(rule.rule, context) === true) {
				return this.config.datastore.get(rule.datastore)
			}
		}
		return this.datastore
	}

	public async build (sentence:Sentence):Promise<Query> {
		const children = []
		const includes = sentence.getIncludes()
		const datastore = await this.getDatastore(sentence)
		const metadata = this.languageManager.dialectMetadata(datastore.dialect)

		for (const p in includes) {
			const sentenceInclude = includes[p]
			const query = await this.build(sentenceInclude.children[0] as Sentence)
			const include = new Include(sentenceInclude.name, [query], sentenceInclude.relation)
			children.push(include)
		}
		const query = this.languageManager.dmlBuilder(datastore.dialect).build(sentence, this.schema, datastore.name, metadata)
		query.children = children
		return query
	}
}
