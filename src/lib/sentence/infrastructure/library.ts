import { ModelService, Library } from '3xpr'
import { OrmH3lp } from '../../shared/infrastructure'

export class SentenceLibrary implements Library {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper: OrmH3lp) {}

	public load (model: ModelService):void {
		this.functions(model)
	}

	private functions (model: ModelService): void {
		model.addFunction('toBase64(value:string):string', (value: string):string => this.helper.crypto.toBase64(value), { description: 'Convert a string to base64' })
		model.addFunction('getBase64(value:string):string', (value: string): string => this.helper.crypto.getBase64(value), { description: 'Get a string from base64' })
		model.addFunction('encrypt(value:string):string', (value: string, key:string):string => this.helper.crypto.encrypt(value, key), { description: 'Encrypt a string' })
		model.addFunction('decrypt(value:string):string', (value: string, key:string):string => this.helper.crypto.decrypt(value, key), { description: 'Decrypt a string' })
		model.addFunction('update(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') }, { description: 'Update a list' })
		model.addFunction('updateAll(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') }, { description: 'Update all items in a list' })
		model.addFunction('deleteAll(list: any[]):any', ():void => { throw new Error('NotImplemented') }, { description: 'Delete all items in a list' })
		model.addFunction('merge(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') }, { description: 'Merge a list' })
		model.addFunction('bulkMerge(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') }, { description: 'Bulk merge a list' })
		model.addFunction('having(list: T[], predicate: boolean):T[]', ():void => { throw new Error('NotImplemented') }, { description: 'Having a list' })
		model.addFunction('include(list: any[], predicate: any):any', ():void => { throw new Error('NotImplemented') }, { description: 'Include a list' })
		model.addFunction('desc(value:any):void', ():void => { throw new Error('NotImplemented') }, { description: 'Descending' })
		model.addFunction('asc(value:any):void', ():void => { throw new Error('NotImplemented') }, { description: 'Ascending' })
	}
}
