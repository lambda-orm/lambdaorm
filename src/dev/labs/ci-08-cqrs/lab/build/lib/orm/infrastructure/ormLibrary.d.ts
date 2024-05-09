import { IOrm } from '../application';
export declare class OrmLibrary {
    private readonly orm;
    constructor(orm: IOrm);
    load(): void;
}
