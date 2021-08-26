export interface ExecutionSentenceResult {
    sentence:any;
    result?:any;    
    error?:any 
}
export interface ExecutionResult {
    results:ExecutionSentenceResult[];
    error?:any 
}