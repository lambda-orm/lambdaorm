/* eslint-disable @typescript-eslint/ban-types */
import { StageConfigService, ViewsConfigService, QueryOptions } from 'lambdaorm-base'

export class QueryHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly stageConfigService:StageConfigService,
		private readonly viewsConfigService:ViewsConfigService
	) {}

	public solveOptions (options?: QueryOptions):QueryOptions {
		if (!options) {
			options = {}
		}
		if (!options.stage) {
			const _stage = this.stageConfigService.get()
			if (_stage === undefined || _stage === null || _stage.name === undefined || _stage.name === null) {
				throw new Error('Stage not defined: it is possible that the orm was not initialized or was initialized without await')
			}
			options.stage = _stage.name
		}
		if (!options.view) {
			const _view = this.viewsConfigService.get()
			if (_view === undefined || _view === null || _view.name === undefined || _view.name === null) {
				throw new Error('View not defined: it is possible that the orm was not initialized or was initialized without await')
			}
			options.view = _view.name
		}
		return options
	}
}
