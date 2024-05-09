import { LanguagesService } from '../../../language/application';
import { SchemaState, QueryOptions, Mapping, SchemaHelper } from 'lambdaorm-base';
import { Executor } from '../../../execution/domain';
export declare class StageFetch {
    private readonly executor;
    private readonly schemaState;
    private readonly languages;
    private readonly helper;
    private readonly options;
    constructor(executor: Executor, schemaState: SchemaState, languages: LanguagesService, helper: SchemaHelper, options: QueryOptions);
    execute(): Promise<Mapping[]>;
    private source;
    private sourceObjects;
    private entities;
    private views;
    private completeEntities;
    private solvePrimaryKeys;
    private solveUniqueKeys;
    private solveIndexes;
    private solveSequences;
    private solveRelations;
    private builder;
}
