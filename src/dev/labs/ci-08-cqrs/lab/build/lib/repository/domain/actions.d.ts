import { MetadataParameter, MetadataModel, MetadataConstraint, Metadata, QueryPlan, QueryActions } from 'lambdaorm-base';
import { IOrm } from '../../orm/application';
export declare class QueryActionsImpl implements QueryActions {
    private orm;
    private name;
    private stage?;
    constructor(name: string, orm: IOrm, stage?: string);
    execute(query: string, data: any): Promise<any>;
    normalize(query: string): string;
    model(query: string): Promise<MetadataModel[]>;
    parameters(query: string): Promise<MetadataParameter[]>;
    constraints(query: string): Promise<MetadataConstraint>;
    metadata(query: string): Promise<Metadata>;
    plan(query: string): Promise<QueryPlan>;
}
