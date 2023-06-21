import { Source, SchemaError } from '../../../domain'

export class DataSourceConfigService {
	public sources: Source[]
	public default?: string

	constructor () {
		this.sources = []
	}

	public load (value: Source): void {
		if (value && value.name) {
			const index = this.sources.findIndex(p => p.name === value.name)
			if (index === -1) {
				this.sources.push(value)
			} else {
				this.sources[index] = value
			}
		}
	}

	public get (name?: string): Source {
		const _name = name === undefined ? this.default : name
		if (_name === undefined) {
			if (this.sources.length === 1) {
				return this.sources[0]
			} else {
				throw new SchemaError('the name of the source is required')
			}
		}
		const db = this.sources.find(p => p.name === _name)
		if (db === undefined) {
			throw new SchemaError(`default source: ${_name} not found`)
		}
		return db
	}
}
