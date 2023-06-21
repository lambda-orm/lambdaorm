import { Stage, SchemaError } from '../../../domain'

export class StageConfigService {
	public stages: Stage[]

	constructor () {
		this.stages = []
	}

	public load (value: Stage): void {
		if (value && value.name) {
			const index = this.stages.findIndex(p => p.name === value.name)
			if (index === -1) {
				this.stages.push(value)
			} else {
				this.stages[index] = value
			}
		}
	}

	public get (name?: string): Stage {
		if (name === undefined) {
			return this.stages[0]
		}
		const stage = this.stages.find(p => p.name === name)
		if (stage === undefined) {
			throw new SchemaError(`Stage: ${name} not found`)
		}
		return stage
	}
}
