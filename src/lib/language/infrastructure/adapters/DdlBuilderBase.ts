import { Query } from '../../../query/domain'
import { Index, Source, Relation, EntityMapping, PropertyMapping, MappingConfigService, SentenceAction, SentenceType } from 'lambdaorm-base'
import { DialectService, DdlBuilder } from '../../application'
import { OrmH3lp } from '../../../shared/infrastructure'

export abstract class DdlBuilderBase implements DdlBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		protected readonly source: Source,
		protected readonly mapping: MappingConfigService,
		protected readonly dialect: DialectService,
		protected readonly helper:OrmH3lp) {}

	abstract truncateEntity(entity: EntityMapping): Query | undefined
	abstract setNull(entity: EntityMapping, relation: Relation): Query | undefined
	abstract dropFk(entity: EntityMapping, relation: Relation): Query | undefined
	abstract dropIndex(entity: EntityMapping, index: Index): Query | undefined
	abstract dropSequence(entity: EntityMapping): Query | undefined
	abstract dropEntity(entity: EntityMapping): Query | undefined
	abstract dropPk(entity: EntityMapping): Query | undefined
	abstract dropUk(entity: EntityMapping): Query | undefined
	abstract createEntity(entity: EntityMapping): Query | undefined
	abstract addProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	/**
	 * @deprecated Use alterPropertyType or alterPropertyNullable
	 */
	abstract alterProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract alterPropertyType(entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract alterPropertyRequired (entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract dropProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined
	abstract addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined
	abstract addFk(entity: EntityMapping, relation: Relation): Query | undefined
	abstract createFk(entity: EntityMapping, relation: Relation): Query | undefined
	abstract createIndex(entity: EntityMapping, index: Index): Query | undefined
	abstract createSequence(entity: EntityMapping): Query | undefined
	public objects (): Query {
		const text = this.dialect.ddl(SentenceAction.objects)
		return this.createQuery(SentenceAction.objects, text, '')
	}

	public tables (names:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.tables)
		text = text.replace('{names}', names.map(p => this.dialect.string(p)).join(','))
		return this.createQuery(SentenceAction.tables, text, '')
	}

	public views (names:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.views)
		text = text.replace('{names}', names.map(p => this.dialect.string(p)).join(','))
		return this.createQuery(SentenceAction.views, text, '')
	}

	public primaryKeys (tableNames:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.primaryKeys)
		text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','))
		return this.createQuery(SentenceAction.primaryKeys, text, '')
	}

	public uniqueKeys (tableNames:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.uniqueKeys)
		text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','))
		return this.createQuery(SentenceAction.uniqueKeys, text, '')
	}

	public foreignKeys (tableNames:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.foreignKeys)
		text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','))
		return this.createQuery(SentenceAction.foreignKeys, text, '')
	}

	public indexes (tableNames:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.indexes)
		text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','))
		return this.createQuery(SentenceAction.indexes, text, '')
	}

	public sequences (): Query {
		const text = this.dialect.ddl(SentenceAction.sequences)
		return this.createQuery(SentenceAction.sequences, text, '')
	}

	protected createQuery (action: SentenceAction, sentence: string, entity: string, query = ''): Query {
		const category = this.helper.query.getSentenceCategory(action)
		const type = SentenceType.ddl
		return new Query({ query, action, category, type, dialect: this.source.dialect, source: this.source.name, sentence, entity })
	}
}
