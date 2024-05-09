import { StageActionDML } from './base/actionDML';
import { Entity, SchemaData } from 'lambdaorm-base';
import { Query } from '../../../query/domain';
export declare class StageExport extends StageActionDML {
    execute(): Promise<SchemaData>;
    protected createQuery(entity: Entity): Query;
}
