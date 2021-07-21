import {IExecutor} from './iExecutor'

export interface ITransaction extends IExecutor
{
    begin():Promise<void>
    commit():Promise<void>
    rollback():Promise<void>
}