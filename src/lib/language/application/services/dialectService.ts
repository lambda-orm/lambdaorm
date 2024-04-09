import { DialectFormat, LanguageError } from '../../domain'

export class DialectService {
	public name: string
	public format: DialectFormat
	private _operators?: any = {}
	private _functions?: any = {}
	private _others?: any = {}
	private _support?: any = {}
	private _dml?: any = {}
	private _ddl?: any = {}
	private _dbTypes?: any = {}
	private _types?: any = {}
	constructor (name: string, data: any) {
		this.name = name
		this.format = data.format
		this._operators = {}
		this._functions = {}
		this.addOperators(data)
		this.addFunctions(data)

		for (const name in data.support) {
			const value = data.support[name]
			this._support[name] = value
		}
		for (const name in data.others) {
			const template = data.others[name]
			this._others[name] = template
		}
		for (const name in data.dml) {
			const template = data.dml[name]
			this._dml[name] = template
		}
		for (const name in data.ddl) {
			const template = data.ddl[name]
			this._ddl[name] = template
		}
		for (const name in data.dbTypes) {
			const type = data.dbTypes[name]
			this._dbTypes[name] = type
		}
		for (const name in data.types) {
			const type = data.types[name]
			this._types[name.toLowerCase()] = type
		}
	}

	private addOperators (dialect: any) {
		for (const type in dialect.operators) {
			let operands:number
			if (type === 'ternary') {
				operands = 3
			} else {
				operands = type === 'binary' ? 2 : 1
			}
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
				this._functions[name] = { type, template: list[name] }
			}
		}
	}

	public get solveComposite (): boolean {
		return this._support.composite || false
	}

	public operator (name: string, operands: number): string {
		return this._operators[name][operands]
	}

	public function (name: string): any {
		return this._functions[name]
	}

	public support (name: string): string {
		return this._support[name]
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

	public dbType (name: string): string {
		return this._dbTypes[name]
	}

	public type (name: string): string {
		const type = this._types[name.toLowerCase()]
		if (type === undefined) {
			throw new LanguageError('error with type: ' + name)
		}
		return type
	}

	public delimiter (name: string, force = false, excludeUnderscore = false): string {
		if ((!name.startsWith('_') || excludeUnderscore) && name.indexOf(' ') === -1 && name.indexOf('.') === -1 && !force) {
			return name
		}
		const template = this._others.delimiter
		return template.replace('{name}', name)
	}

	public string (name: string): string {
		const template = this._others.string
		return template.replace('{name}', name)
	}

	public getOperatorMetadata (name: string, operands: number): string | null {
		try {
			if (this._operators[name]) {
				const operator = this._operators[name]
				if (operator[operands]) { return operator[operands] }
			}
			return null
		} catch (error) {
			throw new LanguageError('error with operator: ' + name)
		}
	}

	public getFunctionMetadata (name: string): string | null {
		try {
			if (this._functions[name]) { return this._functions[name] }
			return null
		} catch (error) {
			throw new LanguageError('error with function: ' + name)
		}
	}
}
