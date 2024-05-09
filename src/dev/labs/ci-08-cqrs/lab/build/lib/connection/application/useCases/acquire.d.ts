import { Connection } from '../ports/connection';
import { ConnectionPoolService } from '../services/connectionPoolService';
export declare class AcquireConnection {
    private readonly poolService;
    constructor(poolService: ConnectionPoolService);
    acquire(name: string): Promise<Connection>;
}
