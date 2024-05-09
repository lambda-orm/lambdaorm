import { OrmH3lp } from '../../../shared/infrastructure';
import { ConnectionConfig } from '../../domain';
import { ConnectionPool } from '../ports/connectionPool';
export declare class DialectPoolService {
    private readonly helper;
    private dialectsPool;
    constructor(helper: OrmH3lp);
    add(dialect: string, classConnectionPool: any): void;
    create(config: ConnectionConfig): ConnectionPool;
}
