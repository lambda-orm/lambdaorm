import { Property, Relation, Index, EntityMapping } from 'lambdaorm-base';
import { Query } from '../../../query/domain';
import { DdlBuilderBase } from './DdlBuilderBase';
export declare class NoSqlDDLBuilder extends DdlBuilderBase {
    truncateEntity(entity: EntityMapping): Query | undefined;
    createEntity(entity: EntityMapping): Query | undefined;
    createFk(_entity: EntityMapping, _relation: Relation): Query | undefined;
    createSequence(entity: EntityMapping): Query | undefined;
    createIndex(entity: EntityMapping, index: Index): Query | undefined;
    alterProperty(_entity: EntityMapping, _property: Property): Query | undefined;
    alterPropertyType(entity: EntityMapping, property: Property): Query | undefined;
    alterPropertyRequired(_entity: EntityMapping, _property: Property): Query | undefined;
    addProperty(_entity: EntityMapping, _property: Property): Query | undefined;
    addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined;
    addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined;
    addFk(_entity: EntityMapping, _relation: Relation): Query | undefined;
    dropEntity(entity: EntityMapping): Query | undefined;
    dropProperty(_entity: EntityMapping, _property: Property): Query | undefined;
    dropPk(entity: EntityMapping): Query | undefined;
    dropUk(entity: EntityMapping): Query | undefined;
    setNull(_entity: EntityMapping, _relation: Relation): Query | undefined;
    dropFk(_entity: EntityMapping, _relation: Relation): Query | undefined;
    dropIndex(entity: EntityMapping, index: Index): Query | undefined;
    dropSequence(entity: EntityMapping): Query | undefined;
}
