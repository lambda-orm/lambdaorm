"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHelper = void 0;
class QueryHelper {
    // eslint-disable-next-line no-useless-constructor
    constructor(stageConfigService, viewsConfigService) {
        this.stageConfigService = stageConfigService;
        this.viewsConfigService = viewsConfigService;
    }
    solveQueryOptions(options) {
        if (!options) {
            options = {};
        }
        if (!options.stage) {
            const _stage = this.stageConfigService.get();
            if (_stage === undefined || _stage === null || _stage.name === undefined || _stage.name === null) {
                throw new Error('Stage not defined: it is possible that the orm was not initialized or was initialized without await');
            }
            options.stage = _stage.name;
        }
        if (!options.view) {
            const _view = this.viewsConfigService.get();
            if (_view === undefined || _view === null || _view.name === undefined || _view.name === null) {
                throw new Error('View not defined: it is possible that the orm was not initialized or was initialized without await');
            }
            options.view = _view.name;
        }
        return options;
    }
}
exports.QueryHelper = QueryHelper;
//# sourceMappingURL=queryHelper.js.map