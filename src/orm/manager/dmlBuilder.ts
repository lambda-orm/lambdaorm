import { SchemaConfig } from '.'
import { Sentence, LanguageManager } from '../language'
import { DialectMetadata } from '../language/dialectMetadata'
import { Query, Include } from '../model'

export abstract class LanguageDMLBuilder {
	abstract build (sentence:Sentence, schema:SchemaConfig, metadata:DialectMetadata):Query
}

export class DMLBuilder {
	private languageManager: LanguageManager
	private schema: SchemaConfig
	public dialect: string

	constructor (schema:SchemaConfig, languageManager: LanguageManager, dialect: string) {
		this.schema = schema
		this.languageManager = languageManager
		this.dialect = dialect
	}

	public async build (sentence:Sentence):Promise<Query> {
		const children = []
		const includes = sentence.getIncludes()
		const metadata = this.languageManager.dialectMetadata(this.dialect)
		for (const p in includes) {
			const sentenceInclude = includes[p]
			const query = await this.build(sentenceInclude.children[0] as Sentence)
			const include = new Include(sentenceInclude.name, [query], sentenceInclude.relation)
			children.push(include)
		}
		const query = this.languageManager.dmlBuilder(this.dialect).build(sentence, this.schema, metadata)
		query.children = children
		return query
	}
}
