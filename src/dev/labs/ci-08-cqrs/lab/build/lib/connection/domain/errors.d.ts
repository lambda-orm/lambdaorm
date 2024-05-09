export declare class ConnectionError extends Error {
    constructor(message: string);
}
export declare class ExecutionError extends Error {
    constructor(source: string, entity: string, sentence: string, message: string, data?: any);
}
