import { ExecuteResult, Query } from '../../../query/domain';
import { StageActionDDL } from './base/actionDDL';
export declare class StagePull extends StageActionDDL {
    queries(): Promise<Query[]>;
    execute(): Promise<ExecuteResult[]>;
}
