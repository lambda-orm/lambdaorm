import {ConnectionConfig} from  './..'
import { MySqlConnection } from './mysql';

export class MariaDbConnection extends MySqlConnection
{  
    constructor(config:ConnectionConfig){        
        super(config);
        this.lib= require('mariadb');
    }
}