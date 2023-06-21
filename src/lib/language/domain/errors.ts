export class LanguageError extends Error {
	constructor (message:string) {
		super(message)
		this.name = 'LanguageError'
	}
}
