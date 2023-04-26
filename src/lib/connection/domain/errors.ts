export class ConnectionError extends Error {
	constructor (message:string) {
		super(message)
		this.name = 'ConnectionError'
	}
}

export class ExecutionError extends Error {
	constructor (source: string, entity: string, sentence: string, message: string, data: any = {}) {
		super(`ERROR: ${message} SOURCE: ${source} ENTITY: ${entity} QUERY: ${sentence}  DATA:${JSON.stringify(data)}`)
		this.name = 'ExecutionError'
	}
}
