export class ConnectionError extends Error {
	constructor (message:string) {
		super(message)
		this.name = 'ConnectionError'
	}
}
