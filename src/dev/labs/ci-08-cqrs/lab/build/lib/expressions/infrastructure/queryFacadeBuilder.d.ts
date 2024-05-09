import { LanguagesService } from '../../language/application';
import { SchemaState } from 'lambdaorm-base';
import { SentenceFacade } from '../../sentence/application';
import { Expressions } from '3xpr';
import { ExpressionFacade } from '../application';
import { Executor } from '../../execution/domain';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class ExpressionFacadeBuilder {
    private readonly languages;
    private readonly executor;
    private readonly expressions;
    private readonly helper;
    constructor(languages: LanguagesService, executor: Executor, expressions: Expressions, helper: OrmH3lp);
    build(sentence: SentenceFacade, schemaState: SchemaState): ExpressionFacade;
}
