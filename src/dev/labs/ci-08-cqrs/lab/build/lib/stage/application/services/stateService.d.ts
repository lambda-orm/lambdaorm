import { Query } from '../../../query/domain';
import { OrmH3lp } from '../../../shared/infrastructure';
import { ModelConfig, MappingConfig, SchemaState } from 'lambdaorm-base';
declare abstract class StageStateService<T> {
    protected readonly schemaState: SchemaState;
    protected readonly helper: OrmH3lp;
    constructor(schemaState: SchemaState, helper: OrmH3lp);
    get schemaDirPath(): string;
    get(name: string): Promise<T>;
    update(name: string, data: T): Promise<void>;
    remove(name: string): Promise<any>;
    protected abstract empty(): T;
    abstract getFile(name: string): any;
}
export declare class StageMappingService extends StageStateService<MappingConfig> {
    protected empty(): MappingConfig;
    getFile(name: string): string;
}
export declare class StageModelService extends StageStateService<ModelConfig> {
    protected empty(): ModelConfig;
    getFile(name: string): string;
    ddl(stage: string, action: string, queries: Query[]): Promise<void>;
    private ddlFile;
}
export {};
