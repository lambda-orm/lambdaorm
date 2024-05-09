"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceLibrary = void 0;
class SentenceLibrary {
    // eslint-disable-next-line no-useless-constructor
    constructor(helper) {
        this.helper = helper;
    }
    load(model) {
        this.functions(model);
    }
    functions(model) {
        model.addFunction('toBase64(value:string):string', (value) => this.helper.crypto.toBase64(value), { description: 'Convert a string to base64' });
        model.addFunction('getBase64(value:string):string', (value) => this.helper.crypto.getBase64(value), { description: 'Get a string from base64' });
        model.addFunction('encrypt(value:string):string', (value, key) => this.helper.crypto.encrypt(value, key), { description: 'Encrypt a string' });
        model.addFunction('decrypt(value:string):string', (value, key) => this.helper.crypto.decrypt(value, key), { description: 'Decrypt a string' });
        model.addFunction('update(list: any[], predicate: any):any', () => { throw new Error('NotImplemented'); }, { description: 'Update a list' });
        model.addFunction('updateAll(list: any[], predicate: any):any', () => { throw new Error('NotImplemented'); }, { description: 'Update all items in a list' });
        model.addFunction('deleteAll(list: any[]):any', () => { throw new Error('NotImplemented'); }, { description: 'Delete all items in a list' });
        model.addFunction('merge(list: any[], predicate: any):any', () => { throw new Error('NotImplemented'); }, { description: 'Merge a list' });
        model.addFunction('bulkMerge(list: any[], predicate: any):any', () => { throw new Error('NotImplemented'); }, { description: 'Bulk merge a list' });
        model.addFunction('having(list: T[], predicate: boolean):T[]', () => { throw new Error('NotImplemented'); }, { description: 'Having a list' });
        model.addFunction('include(list: any[], predicate: any):any', () => { throw new Error('NotImplemented'); }, { description: 'Include a list' });
        model.addFunction('desc(value:any):void', () => { throw new Error('NotImplemented'); }, { description: 'Descending' });
        model.addFunction('asc(value:any):void', () => { throw new Error('NotImplemented'); }, { description: 'Ascending' });
    }
}
exports.SentenceLibrary = SentenceLibrary;
//# sourceMappingURL=library.js.map