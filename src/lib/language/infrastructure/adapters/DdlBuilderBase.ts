import { Query } from '../../../query/domain'
import { Index, Source, Relation, EntityMapping, PropertyMapping, MappingConfigService, SentenceAction } from 'lambdaorm-base'
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
		return new Query({ action: SentenceAction.objects, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: '' })
	}

	public tables (names:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.tables)
		text = text.replace('{names}', names.map(p => this.dialect.string(p)).join(','))
		return new Query({ action: SentenceAction.tables, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: '' })
	}

	public views (names:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.views)
		text = text.replace('{names}', names.map(p => this.dialect.string(p)).join(','))
		return new Query({ action: SentenceAction.views, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: '' })
	}

	public primaryKeys (tableNames:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.primaryKeys)
		text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','))
		return new Query({ action: SentenceAction.primaryKeys, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: '' })
	}

	public uniqueKeys (tableNames:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.uniqueKeys)
		text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','))
		return new Query({ action: SentenceAction.uniqueKeys, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: '' })
	}

	public foreignKeys (tableNames:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.foreignKeys)
		text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','))
		return new Query({ action: SentenceAction.foreignKeys, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: '' })
	}

	public indexes (tableNames:string[]): Query {
		let text = this.dialect.ddl(SentenceAction.indexes)
		text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','))
		return new Query({ action: SentenceAction.indexes, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: '' })
	}

	public sequences (): Query {
		const text = this.dialect.ddl(SentenceAction.sequences)
		return new Query({ action: SentenceAction.sequences, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: '' })
	}
}
