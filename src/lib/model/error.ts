
export class SintaxisError extends Error {
	constructor (message:string) {
		super(message)
		this.name = 'SintaxisError'
	}
}

export class NotImplemented extends Error {
	constructor (_class:string, method:string) {
		super(`method ${method} in class: ${_class} not implementd`)
		this.name = 'NotImplemented'
	}
}

export class SchemaError extends Error {
	constructor (message:string) {
		super(message)
		this.name = 'SchemaError'
	}
}

export class ConnectionError extends Error {
	constructor (message:string) {
		super(message)
		this.name = 'ConnectionError'
	}
}

export class ValidationError extends Error {
	constructor (dataSource: string, entity: string, sentence: string, message: string, data: any = {}) {
		super(`ERROR: ${message} DATA_SOURCE: ${dataSource} ENTITY: ${entity} SENTENCE: ${sentence}  DATA:${JSON.stringify(data)}`)
		this.name = 'ValidationError'
	}
}
export class ExecutionError extends Error {
	constructor (dataSource: string, entity: string, sentence: string, message: string, data: any = {}) {
		super(`ERROR: ${message} DATA_SOURCE: ${dataSource} ENTITY: ${entity} SENTENCE: ${sentence}  DATA:${JSON.stringify(data)}`)
		this.name = 'ExecutionError'
	}
}
