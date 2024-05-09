import { Query } from '../../../query/domain';
import { SchemaState, QueryOptions } from 'lambdaorm-base';
import { LanguagesService } from '../../../language/application';
import { SentenceFacade } from '../../../sentence/application';
import { IQueryBuilder } from '../../domain/services';
export declare class QueryBuilder implements IQueryBuilder {
    private readonly sentenceFacade;
    private readonly schemaState;
    private readonly languages;
    constructor(sentenceFacade: SentenceFacade, schemaState: SchemaState, languages: LanguagesService);
    build(queryExpression: string, options: QueryOptions): Query;
    private dmlBuild;
}
