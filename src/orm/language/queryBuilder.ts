import { Sentence } from './operands'
import { DialectMetadata } from './dialectMetadata'
import { Query, IOrm, Database, Include } from '../model'

export abstract class LanguageQueryBuilder {
	abstract build (sentence:Sentence, database:string, metadata:DialectMetadata):Query
}

export class QueryBuilder {
	private orm: IOrm
	public database: Database
	constructor (orm:IOrm, database: Database) {
		this.orm = orm
		this.database = database
	}

	private getDatabase (entity: string): Database {
		if (entity !== undefined && this.database.externals !== undefined) {
			const external = this.database.externals.find(p => p.entities.includes(entity))
			if (external !== undefined) {
				return this.orm.database.get(external.name)
			}
		}
		return this.database
	}

	public build (sentence:Sentence):Query {
		const children = []
		const includes = sentence.getIncludes()
		const database = this.getDatabase(sentence.entity)
		const metadata = this.orm.language.dialectMetadata(database.dialect)

		for (const p in includes) {
			const sentenceInclude = includes[p]
			const query = this.build(sentenceInclude.children[0] as Sentence)
			const include = new Include(sentenceInclude.name, [query], sentenceInclude.relation)
			children.push(include)
		}
		const query = this.orm.language.queryBuilder(database.dialect).build(sentence, database.name, metadata)
		query.children = children
		return query
	}
}
