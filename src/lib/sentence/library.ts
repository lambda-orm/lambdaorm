import { IModelManager } from '3xpr'
const CryptoJS = require('crypto-js')

export class SentenceLibrary {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly model:IModelManager) {}

	public load ():void {
		this.functions()
	}

	private functions (): void {
		this.model.addFunction('toBase64(value:string):string', (value: string):string => CryptoJS.enc.Base64.parse(value))
		this.model.addFunction('getBase64(value:string):string', (value: string): string => CryptoJS.enc.Base64.stringify(value))
		this.model.addFunction('encrypt(value:string):string', (value: string, key:string):string => CryptoJS.AES.encrypt(value, key).toString())
		this.model.addFunction('decrypt(value:string):string', (value: string, key:string):string => {
			const bytes = CryptoJS.AES.decrypt(value, key)
			return bytes.toString(CryptoJS.enc.Utf8)
		})
		this.model.addFunction('update(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') })
		this.model.addFunction('updateAll(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') })
		this.model.addFunction('deleteAll(list: any[]):any', ():void => { throw new Error('NotImplemented') })
		this.model.addFunction('having(list: T[], predicate: boolean):T[]', ():void => { throw new Error('NotImplemented') })
		this.model.addFunction('include(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') })
		this.model.addFunction('desc(value:any):void', ():void => { throw new Error('NotImplemented') })
		this.model.addFunction('asc(value:any):void', ():void => { throw new Error('NotImplemented') })
	}
}
