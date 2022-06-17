import { SintaxisError } from '../model'

export class Dialect {
	public name: string
	private _operators?: any = {}
	private _functions?: any = {}
	private _others?: any = {}
	private _dml?: any = {}
	private _ddl?: any = {}
	private _types?: any = {}
	constructor (name: string) {
		this.name = name
		this._operators = {}
		this._functions = {}
		this._others = {}
		this._dml = {}
		this._ddl = {}
		this._types = {}
	}

	public get solveComposite (): boolean {
		return this._others.solveComposite || false
	}

	public operator (name: string, operands: number): string {
		return this._operators[name][operands]
	}

	public function (name: string): any {
		return this._functions[name]
	}

	public dml (name: string): string {
		return this._dml[name]
	}

	public other (name: string): string {
		return this._others[name]
	}

	public ddl (name: string): string {
		return this._ddl[name]
	}

	public type (name: string): string {
		return this._types[name]
	}

	public delimiter (name: string, force = false): string {
		if (name.indexOf(' ') === -1 && !force) return name
		const template = this._others.delimiter
		return template.replace('{name}', name)
	}

	public add (dialect: any): void {
		this.addOperators(dialect)
		this.addFunctions(dialect)

		for (const name in dialect.others) {
			const template = dialect.others[name]
			this._others[name] = template
		}
		for (const name in dialect.dml) {
			const template = dialect.dml[name]
			this._dml[name] = template
		}
		for (const name in dialect.ddl) {
			const template = dialect.ddl[name]
			this._ddl[name] = template
		}
		for (const name in dialect.types) {
			const template = dialect.types[name]
			this._types[name] = template
		}
	}

	private addOperators (dialect: any) {
		for (const type in dialect.operators) {
			const operands = type === 'ternary' ? 3 : type === 'binary' ? 2 : 1
			for (const name in dialect.operators[type]) {
				const template = dialect.operators[type][name]
				if (!this._operators[name]) this._operators[name] = {}
				this._operators[name][operands] = template
			}
		}
	}

	private addFunctions (dialect: any) {
		for (const type in dialect.functions) {
			const list = dialect.functions[type]
			for (const name in list) {
				this._functions[name] = { type: type, template: list[name] }
			}
		}
	}

	public getOperatorMetadata (name: string, operands: number): string | null {
		try {
			if (this._operators[name]) {
				const operator = this._operators[name]
				if (operator[operands]) { return operator[operands] }
			}
			return null
		} catch (error) {
			throw new SintaxisError('error with operator: ' + name)
		}
	}

	public getFunctionMetadata (name: string): string | null {
		try {
			if (this._functions[name]) { return this._functions[name] }
			return null
		} catch (error) {
			throw new SintaxisError('error with function: ' + name)
		}
	}
}
