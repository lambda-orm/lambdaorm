import { ModelService, Library } from '3xpr'
import { OrmH3lp } from '../../shared/infrastructure'

export class SentenceLibrary implements Library {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper: OrmH3lp) {}

	public load (model: ModelService):void {
		this.functions(model)
	}

	private functions (model: ModelService): void {
		model.addFunction('toBase64(value:string):string', (value: string):string => this.helper.crypto.toBase64(value))
		model.addFunction('getBase64(value:string):string', (value: string): string => this.helper.crypto.getBase64(value))
		model.addFunction('encrypt(value:string):string', (value: string, key:string):string => this.helper.crypto.encrypt(value, key))
		model.addFunction('decrypt(value:string):string', (value: string, key:string):string => this.helper.crypto.decrypt(value, key))
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
