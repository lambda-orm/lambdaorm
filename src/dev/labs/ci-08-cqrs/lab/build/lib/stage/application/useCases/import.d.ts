import { StageActionDML } from './base/actionDML';
import { SchemaData, MappingConfig, Entity } from 'lambdaorm-base';
import { Query } from '../../../query/domain';
export declare class StageImport extends StageActionDML {
    execute(data: SchemaData): Promise<void>;
    private executePendingRows;
    protected solveInternalsIds(entityName: string, rows: any[], state: MappingConfig, parentEntity?: string): void;
    private solveInternalsIdsMany;
    private solveInternalsIdsOne;
    private solveInternalsIdsRow;
    protected loadExternalIds(entityName: string, rows: any[], aux: any): void;
    protected completeMapping(entityName: string, rows: any[], aux: any, state: MappingConfig): void;
    protected sort(queries: Query[]): Query[];
    protected createQuery(entity: Entity): Query;
}
