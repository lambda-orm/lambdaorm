export class ValidationError extends Error {
	constructor (source: string, entity: string, expression:string, sentence: string, message: string, data: any = {}) {
		super(`ERROR: ${message} SOURCE: ${source} ENTITY: ${entity} EXP: ${expression} QUERY: ${sentence} DATA:${JSON.stringify(data)}`)
		this.name = 'ValidationError'
	}
}
