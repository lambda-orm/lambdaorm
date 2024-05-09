import { StageConfigService, ViewsConfigService, QueryOptions } from 'lambdaorm-base';
export declare class QueryHelper {
    private readonly stageConfigService;
    private readonly viewsConfigService;
    constructor(stageConfigService: StageConfigService, viewsConfigService: ViewsConfigService);
    solveQueryOptions(options?: QueryOptions): QueryOptions;
}
