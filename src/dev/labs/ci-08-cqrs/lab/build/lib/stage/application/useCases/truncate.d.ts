import { Query, ExecuteResult } from '../../../query/domain';
import { StageActionDDL } from './base/actionDDL';
export declare class StageTruncate extends StageActionDDL {
    queries(): Promise<Query[]>;
    execute(): Promise<ExecuteResult[]>;
}
