import { Query, ExecuteResult } from '../../../query/domain';
import { SchemaState, QueryOptions } from 'lambdaorm-base';
import { LanguagesService } from '../../../language/application';
import { StageMappingService, StageModelService } from '../services/stateService';
import { StageActionDDL } from './base/actionDDL';
import { Executor } from '../../../execution/domain';
import { OrmH3lp } from '../../../shared/infrastructure';
export declare class StageDrop extends StageActionDDL {
    private mappingService;
    constructor(executor: Executor, stateService: StageModelService, mappingService: StageMappingService, schemaState: SchemaState, languages: LanguagesService, options: QueryOptions, helper: OrmH3lp);
    queries(): Promise<Query[]>;
    execute(): Promise<ExecuteResult[]>;
}
