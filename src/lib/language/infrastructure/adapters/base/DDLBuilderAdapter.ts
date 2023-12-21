import { Query } from '../../../../query/domain'
import { Index, Source, Relation, EntityMapping, PropertyMapping, MappingConfigService } from 'lambdaorm-base'
import { DialectService, DDLBuilderPort } from '../../../application'
import { Helper } from '../../../../shared/application'

export abstract class DDLBuilderAdapter implements DDLBuilderPort {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		protected readonly source: Source,
		protected readonly mapping: MappingConfigService,
		protected readonly dialect: DialectService,
		protected readonly helper:Helper) {}

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
	abstract alterProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract dropProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined
	abstract addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined
	abstract addFk(entity: EntityMapping, relation: Relation): Query | undefined
	abstract createFk(entity: EntityMapping, relation: Relation): Query | undefined
	abstract createIndex(entity: EntityMapping, index: Index): Query | undefined
	abstract createSequence(entity: EntityMapping): Query | undefined
}
