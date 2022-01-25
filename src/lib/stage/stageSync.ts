import { Query } from '../model/index'
import { Helper } from '../manager/helper'
import { DDLBuilder } from '../manager/ddlBuilder'
import { StageActionDDL } from './stageActionDDL'

export class StageSync extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.stage)
		const old = state && state.entities ? state.entities : null
		const delta = Helper.deltaWithSimpleArrays(this.schema.model.entities, old)
		return new DDLBuilder(this.schema, this.routing, this.languageManager, this.stage).sync(delta)
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		// TODO: solve context
		const context = {}
		const result = await this.executor.executeList(this.stage, queries, context, tryAllCan)
		await this.state.updateModel(this.stage, this.schema.model.entities)
		return result
	}
}
