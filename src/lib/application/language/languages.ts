
import { NotImplemented, IDialectService, LanguagePort } from '../../domain'

export class LanguagesService {
	public dialects: any
	private languages: LanguagePort[]

	constructor () {
		this.languages = []
		this.dialects = {}
	}

	public add (language: LanguagePort) {
		const index = this.languages.findIndex(p => p.name === language.name)
		if (index !== -1) {
			this.languages[index] = language
		} else {
			this.languages.push(language)
		}
	}

	public get (name: string): LanguagePort {
		const language = this.languages.find(p => p.name === name)
		if (!language) {
			throw new NotImplemented(`language ${name} not implemented`)
		}
		return language
	}

	public getByDialect (dialect: string): LanguagePort {
		for (const i in this.languages) {
			for (const j in this.languages[i].dialects) {
				if (this.languages[i].dialects[j].name === dialect) {
					return this.languages[i]
				}
			}
		}
		throw new NotImplemented(`language with dialect ${dialect} not implemLanguageented`)
	}

	public getDialect (name: string): IDialectService {
		for (const i in this.languages) {
			for (const j in this.languages[i].dialects) {
				if (this.languages[i].dialects[j].name === name) { return this.languages[i].dialects[j] }
			}
		}
		throw new NotImplemented(`Dialect ${name} not implemented`)
	}
}
