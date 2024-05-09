import { PropertyMapping, Property, Relation, Index, EntityMapping } from 'lambdaorm-base';
import { Query } from '../../../query/domain';
import { DdlBuilderBase } from './DdlBuilderBase';
export declare class SqlDdlBuilder extends DdlBuilderBase {
    truncateEntity(entity: EntityMapping): Query | undefined;
    createEntity(entity: EntityMapping): Query | undefined;
    private createColumn;
    private createPk;
    createFk(entity: EntityMapping, relation: Relation): Query | undefined;
    createSequence(entity: EntityMapping): Query | undefined;
    createIndex(entity: EntityMapping, index: Index): Query | undefined;
    /**
     * @deprecated This method is obsolete, since to alter a property you must call alterPropertyType or alterPropertyNullable
     */
    alterProperty(entity: EntityMapping, property: Property): Query | undefined;
    alterPropertyType(entity: EntityMapping, property: Property): Query | undefined;
    alterPropertyRequired(entity: EntityMapping, property: PropertyMapping): Query | undefined;
    addProperty(entity: EntityMapping, property: Property): Query | undefined;
    private property;
    addPk(entity: EntityMapping, primaryKeys: string[]): Query | undefined;
    addUk(entity: EntityMapping, uniqueKeys: string[]): Query | undefined;
    private addKeys;
    addFk(entity: EntityMapping, relation: Relation): Query | undefined;
    dropEntity(entity: EntityMapping): Query | undefined;
    dropProperty(entity: EntityMapping, property: Property): Query | undefined;
    dropPk(entity: EntityMapping): Query | undefined;
    dropUk(entity: EntityMapping): Query | undefined;
    setNull(entity: EntityMapping, relation: Relation): Query | undefined;
    dropFk(entity: EntityMapping, relation: Relation): Query | undefined;
    dropIndex(entity: EntityMapping, index: Index): Query | undefined;
    dropSequence(entity: EntityMapping): Query | undefined;
    private equal;
}
