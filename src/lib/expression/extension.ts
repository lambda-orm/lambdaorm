import { Library } from 'js-expressions'
import { Helper } from './..'

export class OrmExtesionLib extends Library {
	constructor () {
		super('orm')
		this.initFunctions()
	}

	private initFunctions (): any {
		this.addFunction('textTobase64', (value: string):string => Helper.textTobase64(value))
		this.addFunction('base64ToText', (value: string): string => Helper.base64ToText(value))
		this.addFunction('encrypt', (value: string, key:string):string => Helper.encrypt(value, key))
		this.addFunction('decrypt', (value: string, key:string):string => Helper.decrypt(value, key))
	}
}
