import { Library } from 'js-expressions'
const CryptoJS = require('crypto-js')

export class OrmExtensionLib extends Library {
	constructor () {
		super('orm')
		this.initFunctions()
	}

	private initFunctions (): any {
		this.addFunction('toBase64', (value: string):string => CryptoJS.enc.Base64.parse(value))
		this.addFunction('getBase64', (value: string): string => CryptoJS.enc.Base64.stringify(value))
		this.addFunction('encrypt', (value: string, key:string):string => CryptoJS.AES.encrypt(value, key).toString())
		this.addFunction('decrypt', (value: string, key:string):string => {
			const bytes = CryptoJS.AES.decrypt(value, key)
			return bytes.toString(CryptoJS.enc.Utf8)
		})
	}
}
