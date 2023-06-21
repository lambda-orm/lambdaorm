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
