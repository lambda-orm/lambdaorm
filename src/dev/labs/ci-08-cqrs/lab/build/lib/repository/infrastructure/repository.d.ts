import { IOrm } from '../../orm/application';
import { IRepository, Queryable } from 'lambdaorm-base';
export declare class Repository<TEntity, TQuery> implements IRepository<TEntity, TQuery> {
    readonly name: string;
    stage?: string | undefined;
    private readonly orm;
    constructor(name: string, stage?: string | undefined, orm?: IOrm);
    upsert(entity: TEntity): Promise<number>;
    upsert(entity: TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>;
    bulkDelete(entities: TEntity[]): Promise<any[]>;
    bulkDelete(entities: TEntity[], include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any[]>;
    bulkMerge(entities: TEntity[]): Promise<any[]>;
    bulkMerge(entities: TEntity[], include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any[]>;
    protected _execute(head: string, filter?: (value: TQuery, index: number, array: TQuery[]) => unknown, include?: (value: TQuery, index: number, array: TQuery[]) => unknown, data?: any): Promise<any>;
    execute(query: string, data?: any): Promise<any>;
    /**  */
    insert(entity: TEntity): Promise<any>;
    /**  */
    insert(entity: TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any>;
    /**  */
    bulkInsert(entities: TEntity[]): Promise<any[]>;
    /**  */
    bulkInsert(entities: TEntity[], include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any[]>;
    /**  */
    update(entity: TEntity): Promise<number>;
    /**  */
    update(entity: TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>;
    updateAll(data: any, map: (value: TEntity) => unknown, filter?: (value: TQuery, index: number, array: TQuery[]) => unknown, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>;
    /**  */
    merge(entity: TEntity): Promise<number>;
    /**  */
    merge(entity: TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>;
    /**  */
    delete(entity: TEntity): Promise<number>;
    /**  */
    delete(entity: TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>;
    deleteAll(data: any, filter?: (value: TQuery, index: number, array: TQuery[]) => unknown, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>;
    list(data: any, filter?: (value: TQuery, index: number, array: TQuery[]) => unknown, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<TEntity[]>;
    distinct(data: any, filter?: (value: TQuery, index: number, array: TQuery[]) => unknown, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any[]>;
    first(data: any, filter?: (value: TQuery, index: number, array: TQuery[]) => unknown, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<TEntity | null>;
    last(data: any, filter?: (value: TQuery, index: number, array: TQuery[]) => unknown, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<TEntity | null>;
    query(): Queryable<TQuery>;
}
