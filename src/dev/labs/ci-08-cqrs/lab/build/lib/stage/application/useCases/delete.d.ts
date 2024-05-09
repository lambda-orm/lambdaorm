import { Entity } from 'lambdaorm-base';
import { Query } from '../../../query/domain';
import { StageActionDML } from './base/actionDML';
export declare class StageDelete extends StageActionDML {
    execute(): Promise<void>;
    protected sort(entities: Entity[]): Entity[];
    protected build(): Query[];
    protected createUpdateQueries(entities: Entity[]): Query[];
    protected createQuery(entity: Entity): Query;
}
