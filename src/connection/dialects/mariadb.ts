import {ConnectionConfig} from  './..'
import { MySqlConnection } from './mysql';

export class MariaDbConnection extends MySqlConnection
{      
    private static mariadbLib:any
    constructor(config:ConnectionConfig){        
        super(config);
        if(!MariaDbConnection.mariadbLib)
            MariaDbConnection.mariadbLib= require('mariadb')
    }
    public async connect():Promise<void>
    { 
        this.cnx = await MariaDbConnection.mariadbLib.createConnection(this.config.connectionString);
    }
}