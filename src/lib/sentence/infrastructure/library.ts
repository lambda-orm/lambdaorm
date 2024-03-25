import { ModelService, Library } from '3xpr'
const CryptoJS = require('crypto-js')

export class SentenceLibrary implements Library {
	public load (model: ModelService):void {
		this.functions(model)
	}

	private functions (model: ModelService): void {
		model.addFunction('toBase64(value:string):string', (value: string):string => CryptoJS.enc.Base64.parse(value))
		model.addFunction('getBase64(value:string):string', (value: string): string => CryptoJS.enc.Base64.stringify(value))
		model.addFunction('encrypt(value:string):string', (value: string, key:string):string => CryptoJS.AES.encrypt(value, key).toString())
		model.addFunction('decrypt(value:string):string', (value: string, key:string):string => CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8))
		model.addFunction('update(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') })
		model.addFunction('updateAll(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') })
		model.addFunction('deleteAll(list: any[]):any', ():void => { throw new Error('NotImplemented') })
		model.addFunction('merge(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') })
		model.addFunction('bulkMerge(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') })
		model.addFunction('having(list: T[], predicate: boolean):T[]', ():void => { throw new Error('NotImplemented') })
		model.addFunction('include(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') })
		model.addFunction('desc(value:any):void', ():void => { throw new Error('NotImplemented') })
		model.addFunction('asc(value:any):void', ():void => { throw new Error('NotImplemented') })
	}
}
