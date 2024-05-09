import { Property, Relation, Behavior, Constraint, SentenceAction, SentenceType, SentenceCategory } from 'lambdaorm-base';
import { Parameter } from '3xpr';
export interface QueryArgs {
    action: SentenceAction;
    type: SentenceType;
    category: SentenceCategory;
    dialect: string;
    source: string;
    sentence: string;
    entity: string;
    columns?: Property[];
    parameters?: Parameter[];
    constraints?: Constraint[];
    values?: Behavior[];
    defaults?: Behavior[];
    includes?: Include[];
    query?: string;
    description: string;
}
export declare class Query {
    action: SentenceAction;
    type: SentenceType;
    category: SentenceCategory;
    includes: Include[];
    sentence: string;
    dialect: string;
    source: string;
    entity: string;
    columns: Property[];
    parameters: Parameter[];
    constraints: Constraint[];
    values: Behavior[];
    defaults: Behavior[];
    query: string;
    description: string;
    constructor(args: QueryArgs);
}
export declare class Include {
    name: string;
    query: Query;
    relation: Relation;
    constructor(name: string, query: Query, relation: Relation);
}
export interface ExecuteResult {
    result?: any;
    description: string;
    error?: Error;
}
