import { LanguagesService } from '../../../../language/application';
import { StageModelService } from '../../services/stateService';
import { Query, ExecuteResult } from '../../../../query/domain';
import { SchemaState, QueryOptions } from 'lambdaorm-base';
import { Executor } from '../../../../execution/domain';
import { OrmH3lp } from '../../../../shared/infrastructure';
export declare abstract class StageActionDDL {
    protected readonly executor: Executor;
    protected readonly stageModelService: StageModelService;
    protected readonly schemaState: SchemaState;
    protected readonly languages: LanguagesService;
    protected readonly options: QueryOptions;
    protected readonly helper: OrmH3lp;
    constructor(executor: Executor, stageModelService: StageModelService, schemaState: SchemaState, languages: LanguagesService, options: QueryOptions, helper: OrmH3lp);
    abstract execute(): Promise<ExecuteResult[]>;
    abstract queries(): Promise<Query[]>;
    sentence(): Promise<any[]>;
}
