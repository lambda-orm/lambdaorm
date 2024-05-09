import { Query } from '../../../query/domain';
import { Index, Source, Relation, EntityMapping, PropertyMapping, MappingConfigService, SentenceAction } from 'lambdaorm-base';
import { DialectService, DdlBuilder } from '../../application';
import { OrmH3lp } from '../../../shared/infrastructure';
export declare abstract class DdlBuilderBase implements DdlBuilder {
    protected readonly source: Source;
    protected readonly mapping: MappingConfigService;
    protected readonly dialect: DialectService;
    protected readonly helper: OrmH3lp;
    constructor(source: Source, mapping: MappingConfigService, dialect: DialectService, helper: OrmH3lp);
    abstract truncateEntity(entity: EntityMapping): Query | undefined;
    abstract setNull(entity: EntityMapping, relation: Relation): Query | undefined;
    abstract dropFk(entity: EntityMapping, relation: Relation): Query | undefined;
    abstract dropIndex(entity: EntityMapping, index: Index): Query | undefined;
    abstract dropSequence(entity: EntityMapping): Query | undefined;
    abstract dropEntity(entity: EntityMapping): Query | undefined;
    abstract dropPk(entity: EntityMapping): Query | undefined;
    abstract dropUk(entity: EntityMapping): Query | undefined;
    abstract createEntity(entity: EntityMapping): Query | undefined;
    abstract addProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined;
    /**
     * @deprecated Use alterPropertyType or alterPropertyNullable
     */
    abstract alterProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined;
    abstract alterPropertyType(entity: EntityMapping, property: PropertyMapping): Query | undefined;
    abstract alterPropertyRequired(entity: EntityMapping, property: PropertyMapping): Query | undefined;
    abstract dropProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined;
    abstract addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined;
    abstract addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined;
    abstract addFk(entity: EntityMapping, relation: Relation): Query | undefined;
    abstract createFk(entity: EntityMapping, relation: Relation): Query | undefined;
    abstract createIndex(entity: EntityMapping, index: Index): Query | undefined;
    abstract createSequence(entity: EntityMapping): Query | undefined;
    objects(): Query;
    tables(names: string[]): Query;
    views(names: string[]): Query;
    primaryKeys(tableNames: string[]): Query;
    uniqueKeys(tableNames: string[]): Query;
    foreignKeys(tableNames: string[]): Query;
    indexes(tableNames: string[]): Query;
    sequences(): Query;
    protected createQuery(action: SentenceAction, sentence: string, entity: string, description: string, query?: string): Query;
}
