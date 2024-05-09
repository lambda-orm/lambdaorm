import { ConnectionConfig } from '../../domain';
import { ConnectionPool } from '../ports/connectionPool';
import { DialectPoolService } from './dialectPoolService';
export declare class ConnectionPoolService {
    private readonly dialectPoolService;
    private pools;
    constructor(dialectPoolService: DialectPoolService);
    load(config: ConnectionConfig): void;
    get(name: string): ConnectionPool;
    end(name: string): Promise<void>;
    endAll(): Promise<void>;
}
