export class Data {
	public data: any
	public parent: any
	constructor (data:any, parent?:Data) {
		this.data = data
		this.parent = parent
	}

	newData ():Data {
		return new Data({}, this)
	}

	clone (): Data {
		const _data = JSON.parse(JSON.stringify(this.data))
		const _parent = this.parent ? this.parent.clone() : null
		return new Data(_data, _parent)
	}

	getData (variable:string):any {
		if (this.data[variable] !== undefined || this.parent == null) return this.data
		const _context = this.parent.getData(variable)
		return _context || this.data
	}

	contains (name:string):boolean {
		const names = name.split('.')
		let value = this.getData(names[0])
		for (const n in names) {
			if (value[n] === undefined) return false
			value = value[n]
		}
		return true
	}

	get (name:string):any {
		const names = name.split('.')
		let value = this.getData(names[0])
		for (const p in names) {
			const _name = names[p]
			if (value[_name] === undefined) return null
			value = value[_name]
		}
		return value
	}

	set (name:string, value:any):void {
		const names = name.split('.')
		const level = names.length - 1
		let list = this.getData(names[0])
		for (let i = 0; i < names.length; i++) {
			const p = names[i]
			if (i === level) { list[p] = value } else { list = list[p] }
		}
	}

	init (name:string, value:any):void {
		this.data[name] = value
	}
}
