import { SchemaState } from 'lambdaorm-base';
import { LanguagesService } from '../../language/application';
import { ExpressionFacade } from '../../expressions/application';
import { StageFacade } from '../application';
import { Executor } from '../../execution/domain';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class StageFacadeBuilder {
    private readonly languages;
    private readonly executor;
    private readonly helper;
    constructor(languages: LanguagesService, executor: Executor, helper: OrmH3lp);
    build(schemaState: SchemaState, expressionFacade: ExpressionFacade): StageFacade;
}
