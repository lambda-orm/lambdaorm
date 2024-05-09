import { Mapping, QueryOptions, SchemaData, SchemaState } from 'lambdaorm-base';
import { ExpressionFacade } from '../../expressions/application';
import { LanguagesService } from '../../language/application';
import { OrmH3lp } from '../../shared/infrastructure';
import { StageActionDDL } from './useCases/base/actionDDL';
import { StageDelete } from './useCases/delete';
import { StageExport } from './useCases/export';
import { StageImport } from './useCases/import';
import { Executor } from '../../execution/domain';
import { StagePullOptions } from '../domain';
export declare class StageFacade {
    private readonly schemaState;
    private readonly expression;
    private readonly executor;
    private readonly languages;
    private readonly helper;
    private stageModelService;
    private stageMappingService;
    constructor(schemaState: SchemaState, expression: ExpressionFacade, executor: Executor, languages: LanguagesService, helper: OrmH3lp);
    /**
     * Check if the stage exists
     * @param name string
     * @returns {Promise<boolean>}
     */
    exists(name: string): Promise<boolean>;
    /**
     * Push the stage with sources
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    push(options?: QueryOptions): StageActionDDL;
    /**
     * Drop source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    drop(options?: QueryOptions): StageActionDDL;
    /**
     * Truncate source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    truncate(options?: QueryOptions): StageActionDDL;
    /**
     * Delete source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    delete(options?: QueryOptions): StageDelete;
    /**
     * Export source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    export(options?: QueryOptions): StageExport;
    /**
     * Import data into source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    import(options?: QueryOptions): StageImport;
    /**
     * Fetch all mappings from the stage
     * @param options QueryOptions
     * @returns {Promise<Mapping[]>}
     */
    fetch(options?: QueryOptions): Promise<Mapping[]>;
    /**
     * Pull the stage with the sources
     * @param options StagePullOptions
     * @returns {Promise<void>}
     */
    pull(options?: StagePullOptions): Promise<void>;
    /**
     * Update and Push Schema with data
     * @param data any|any[]
     * @param name string
     * @param options QueryOptions
     * @returns {Promise<SchemaData>}
     */
    introspect(data: any | any[], name: string, options?: QueryOptions): Promise<SchemaData>;
    /**
     * Update and Push Schema and import data
     * @param data any|any[]
     * @param name string
     * @param options QueryOptions
     * @returns {Promise<SchemaData>}
     */
    incorporate(data: any | any[], name: string, options?: QueryOptions): Promise<SchemaData>;
}
