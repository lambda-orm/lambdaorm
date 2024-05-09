import { Connection } from '../ports/connection';
import { ConnectionPoolService } from '../services/connectionPoolService';
export declare class ReleaseConnection {
    private readonly poolService;
    constructor(poolService: ConnectionPoolService);
    release(connection: Connection): Promise<void>;
}
