import { ConnectionConfig } from '../domain';
import { Connection } from './ports/connection';
import { ConnectionPoolService } from './services/connectionPoolService';
import { DialectPoolService } from './services/dialectPoolService';
import { AcquireConnection } from './useCases/acquire';
import { ReleaseConnection } from './useCases/release';
export declare class ConnectionFacade {
    private readonly dialectService;
    private readonly poolService;
    private readonly acquireConnection;
    private readonly releaseConnection;
    constructor(dialectService: DialectPoolService, poolService: ConnectionPoolService, acquireConnection: AcquireConnection, releaseConnection: ReleaseConnection);
    addDialect(dialect: string, classConnectionPool: any): ConnectionFacade;
    load(config: ConnectionConfig): void;
    getConfig(name: string): ConnectionConfig;
    end(): Promise<void>;
    acquire(name: string): Promise<Connection>;
    release(connection: Connection): Promise<void>;
}
