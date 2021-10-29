import { ExecutionResult } from '../connection'
import { Delta } from '../model'

export interface ExecutionSyncResult extends ExecutionResult
{
  delta:Delta
}
