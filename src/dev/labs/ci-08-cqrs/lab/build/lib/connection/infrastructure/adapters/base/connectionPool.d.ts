import { ConnectionConfig } from '../../../domain';
import { Connection, ConnectionPool } from '../../../application';
import { OrmH3lp } from '../../../../shared/infrastructure';
export declare abstract class ConnectionPoolAdapter implements ConnectionPool {
    protected readonly helper: OrmH3lp;
    config: ConnectionConfig;
    connections: Connection[];
    constructor(config: ConnectionConfig, helper: OrmH3lp);
    acquire(): Promise<Connection>;
    release(connection: Connection): Promise<void>;
    end(): Promise<void>;
    abstract init(): Promise<void>;
    protected abstract create(id: string): Promise<Connection>;
}
