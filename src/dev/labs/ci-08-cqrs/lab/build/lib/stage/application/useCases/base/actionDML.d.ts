import { Query } from '../../../../query/domain';
import { DomainConfigService, Entity, QueryOptions } from 'lambdaorm-base';
import { StageMappingService } from '../../services/stateService';
import { Executor } from '../../../../execution/domain';
import { ExpressionFacade } from '../../../../expressions/application';
export declare abstract class StageActionDML {
    protected stageMappingService: StageMappingService;
    protected domain: DomainConfigService;
    protected expressionFacade: ExpressionFacade;
    protected executor: Executor;
    protected options: QueryOptions;
    protected arrowVariables: string[];
    constructor(stageMappingService: StageMappingService, domain: DomainConfigService, expressionFacade: ExpressionFacade, executor: Executor, options: QueryOptions);
    sentence(): Promise<any>;
    queries(): Query[];
    protected abstract createQuery(entity: Entity): Query;
    protected createInclude(entity: Entity, level?: number): string;
    protected getAllEntities(queries: Query[]): string[];
}
