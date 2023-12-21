import { Query } from '../../../query/domain'
import { Index, Relation, EntityMapping, PropertyMapping } from 'lambdaorm-base'

export interface DDLBuilderPort {
	truncateEntity(entity: EntityMapping): Query | undefined
	setNull(entity: EntityMapping, relation: Relation): Query | undefined
	dropFk(entity: EntityMapping, relation: Relation): Query | undefined
	dropIndex(entity: EntityMapping, index: Index): Query | undefined
	dropSequence(entity: EntityMapping): Query | undefined
	dropEntity(entity: EntityMapping): Query | undefined
	dropPk(entity: EntityMapping): Query | undefined
	dropUk(entity: EntityMapping): Query | undefined
	createEntity(entity: EntityMapping): Query | undefined
	addProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	alterProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	dropProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined
	addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined
	addFk(entity: EntityMapping, relation: Relation): Query | undefined
	createFk(entity: EntityMapping, relation: Relation): Query | undefined
	createIndex(entity: EntityMapping, index: Index): Query | undefined
	createSequence(entity: EntityMapping): Query | undefined
}
