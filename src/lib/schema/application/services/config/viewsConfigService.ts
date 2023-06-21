import { View, SchemaError } from '../../../domain'
import { ViewConfigService } from './viewConfigService'

export class ViewsConfigService {
	public views: View[]

	constructor () {
		this.views = []
	}

	public load (value: View): void {
		if (value && value.name) {
			if (!value.entities) {
				value.entities = []
			}
			const index = this.views.findIndex(p => p.name === value.name)
			if (index === -1) {
				this.views.push(value)
			} else {
				this.views[index] = value
			}
		}
	}

	public get (name?: string): View {
		if (name === undefined) {
			return this.views[0]
		}
		const view = this.views.find(p => p.name === name)
		if (view === undefined) {
			throw new SchemaError(`View: ${name} not found`)
		}
		return view
	}

	public getInstance (name?: string): ViewConfigService {
		const view = this.get(name)
		if (!view) {
			throw new SchemaError(`view ${name} not found`)
		}
		return new ViewConfigService(view)
	}
}
