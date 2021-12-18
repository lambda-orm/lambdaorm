
export class Library {
	public name:string
	public language:string
	public enums:any
	public operators:any
	public functions:any

	constructor (name:string, language:string) {
		this.name = name
		this.language = language
		this.enums = {}
		this.operators = {}
		this.functions = {}
	}

	public addEnum (key:string, source:any) {
		this.enums[key] = source
	}

	public addFunction (name:string, source:any, custom:any = null, isArrowFunction = false) {
		const metadata: {[k: string]: any} = this.getMetadata(source)
		metadata.lib = this.name
		metadata['language '] = this.language
		metadata.isArrowFunction = isArrowFunction
		this.functions[name] = { function: source, metadata: metadata, custom: custom }
	}

	public addOperator (name:string, source:any, custom:any = null, customFunction:any = null) {
		if (!this.operators[name]) this.operators[name] = {}
		const metadata: {[k: string]: any} = this.getMetadata(source)
		const operands = metadata.args.length
		metadata.lib = this.name
		metadata['language '] = this.language
		this.operators[name][operands] = { function: source, metadata: metadata, custom: custom, customFunction: customFunction }
	}

	public getMetadata (source:any) {
		const args = []
		const _args = this.getArgs(source)
		for (const k in _args) {
			const p = _args[k]
			const data = p.split('=')
			const arg = {
				name: data[0],
				default: data.length > 1 ? data[1] : null
			}
			args.push(arg)
		}
		return {
			originalName: source.name,
			signature: '(' + _args.toString() + ')',
			doc: null,
			args: args
		}
	}

	public getArgs (source:string) {
		const args = (f:any) => f.toString().replace(/[\r\n\s]+/g, ' ')
			.match(/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/)
			.slice(1, 3)
			.join('')
			.split(/\s*,\s*/)
		return args(source)
	}
}
