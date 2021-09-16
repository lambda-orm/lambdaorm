export class Context {
	public data: any
	public parent: any
	constructor (data:any, parent?:Context) {
		this.data = data
		this.parent = parent
	}

	newContext ():Context {
		return new Context({}, this)
	}

	getContext (variable:string):any {
		if (this.data[variable] !== undefined || this.parent == null) return this.data
		const _context = this.parent.getContext(variable)
		return _context || this.data
	}

	contains (name:string):boolean {
		const names = name.split('.')
		let value = this.getContext(names[0])
		for (const n in names) {
			if (value[n] === undefined) return false
			value = value[n]
		}
		return true
	}

	get (name:string):any {
		const names = name.split('.')
		let value = this.getContext(names[0])
		for (const p in names) {
			const name = names[p]
			if (value[name] === undefined) return null
			value = value[name]
		}
		return value
	}

	set (name:string, value:any):void {
		const names = name.split('.')
		const level = names.length - 1
		let list = this.getContext(names[0])
		for (let i = 0; i < names.length; i++) {
			const p = names[i]
			if (i === level) { list[p] = value } else { list = list[p] }
		}
	}

	init (name:string, value:any):void {
		this.data[name] = value
	}
}
