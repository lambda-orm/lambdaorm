import { View, EntityView, PropertyView } from '../../../domain'

export class ViewConfigService {
	private view: View
	constructor (view: View) {
		this.view = view
	}

	public get name (): string {
		return this.view.name
	}

	public get (): View {
		return this.view
	}

	public set (value: View) {
		this.view = value
	}

	public get entities (): EntityView[] {
		return this.view.entities ? this.view.entities : []
	}

	public getEntity (name: string): EntityView | undefined {
		return this.view.entities ? this.view.entities.find(p => p.name === name) : undefined
	}

	public getProperty (entityName: string, name: string): PropertyView | undefined {
		const entity = this.getEntity(entityName)
		if (!entity) {
			return undefined
		}
		return entity.properties ? entity.properties.find(p => p.name === name) : undefined
	}

	public excludeEntity (name: string): boolean {
		const entity = this.getEntity(name)
		return entity ? !!entity.exclude : false
	}
}
