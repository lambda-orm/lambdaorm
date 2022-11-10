
export class SintaxisError extends Error {
	constructor (message:string) {
		super(message)
		this.name = 'SintaxisError'
	}
}

export class MethodNotImplemented extends Error {
	constructor (_class:string, method:string) {
		super(`method ${method} in class: ${_class} not implemented`)
		this.name = 'MethodNotImplemented'
	}
}

export class NotImplemented extends Error {
	constructor (message:string) {
		super(message)
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
	constructor (source: string, entity: string, expression:string, sentence: string, message: string, data: any = {}) {
		super(`ERROR: ${message} SOURCE: ${source} ENTITY: ${entity} EXP: ${expression} QUERY: ${sentence} DATA:${JSON.stringify(data)}`)
		this.name = 'ValidationError'
	}
}
export class ExecutionError extends Error {
	constructor (source: string, entity: string, sentence: string, message: string, data: any = {}) {
		super(`ERROR: ${message} SOURCE: ${source} ENTITY: ${entity} QUERY: ${sentence}  DATA:${JSON.stringify(data)}`)
		this.name = 'ExecutionError'
	}
}
