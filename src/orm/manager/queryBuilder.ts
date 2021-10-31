import { ConfigManager } from './'
import { Sentence, LanguageManager } from './../language'
import { DialectMetadata } from './../language/dialectMetadata'
import { Query, Database, Include, Entity } from './../model'
import { SchemaHelper } from './../database'

export abstract class LanguageQueryBuilder {
	abstract build (sentence:Sentence, database:string, metadata:DialectMetadata):Query
}

export class QueryBuilder {
	private configManager: ConfigManager
	private languageManager: LanguageManager
	private schema:SchemaHelper
	public database: Database

	constructor (configManager:ConfigManager, schema:SchemaHelper, languageManager: LanguageManager, database: Database) {
		this.configManager = configManager
		this.schema = schema
		this.languageManager = languageManager
		this.database = database
	}

	private getDatabase (entity: string): Database {
		if (entity !== undefined) {
			const _entity = this.schema.getEntity(entity) as Entity
			if (_entity.externalDb !== undefined && _entity.externalDb !== this.database.name) {
				return this.configManager.database.get(_entity.externalDb)
			}
		}
		return this.database
	}

	public build (sentence:Sentence):Query {
		const children = []
		const includes = sentence.getIncludes()
		const database = this.getDatabase(sentence.entity)
		const metadata = this.languageManager.dialectMetadata(database.dialect)

		for (const p in includes) {
			const sentenceInclude = includes[p]
			const query = this.build(sentenceInclude.children[0] as Sentence)
			const include = new Include(sentenceInclude.name, [query], sentenceInclude.relation)
			children.push(include)
		}
		const query = this.languageManager.queryBuilder(database.dialect).build(sentence, database.name, metadata)
		query.children = children
		return query
	}
}
