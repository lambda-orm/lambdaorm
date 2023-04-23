import { MappingConfigService } from '../../../../schema/application'
import { Query } from '../../../../query/domain'
import { Index, Source, Relation, EntityMapping, PropertyMapping } from '../../../../schema/domain'
import { DialectService, DDLBuilderPort } from '../../../application'

export abstract class DDLBuilderAdapter implements DDLBuilderPort {
	protected source: Source
	protected mapping: MappingConfigService
	protected dialect: DialectService

	constructor (source: Source, mapping: MappingConfigService, dialect: DialectService) {
		this.source = source
		this.mapping = mapping
		this.dialect = dialect
	}

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
