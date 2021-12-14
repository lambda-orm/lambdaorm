import expConfig from './config.json'

export class ExpressionConfig {
	public operators: any
	public enums: any
	public functions: any
	constructor () {
		this.operators = {}
		this.enums = {}
		this.functions = {}
		this.load(expConfig)
	}

	private load (data:any):void {
		for (const name in data.enums) {
			this.addEnum(name, data.enums[name])
		}
		for (const type in data.operators) {
			const count = type === 'ternary' ? 3 : type === 'binary' ? 2 : 1
			for (const name in data.operators[type]) {
				const metadata = data.operators[type][name]
				this.addOperator(name, count, metadata)
			}
		}
		for (const name in data.functions) {
			const metadata = data.functions[name]
			this.addFunction(name, metadata)
		}
	}

	private addEnum (key:string, source:any):void {
		this.enums[key] = source
	}

	private addOperator (name:string, operands:number, metadata:any):void {
		if (!this.operators[name]) this.operators[name] = {}
		this.operators[name][operands] = metadata
	}

	private addFunction (name:string, metadata:any):void {
		this.functions[name] = metadata
	}

	public isEnum (name:string):boolean {
		const names = name.split('.')
		return !!this.enums[names[0]]
	}

	public getEnumValue (name:string, option:string):any {
		return this.enums[name][option]
	}

	public getEnum (name:string):any {
		return this.enums[name]
	}

	public getOperator (name:string, operands:number):any {
		try {
			if (this.operators[name]) {
				const operator = this.operators[name]
				if (operator[operands]) { return operator[operands] }
			}
			return null
		} catch (error) {
			throw new Error('error with operator: ' + name)
		}
	}

	public getFunction (name:string):any {
		try {
			if (this.functions[name]) { return this.functions[name] }
			return null
		} catch (error) {
			throw new Error('error with function: ' + name)
		}
	}
}
