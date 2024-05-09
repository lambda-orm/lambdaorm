import { ConnectionFacade } from '../../connection/application';
import { LanguagesService } from '../../language/application';
import { Expressions } from '3xpr';
import { SchemaState } from 'lambdaorm-base';
import { OrmH3lp } from '../../shared/infrastructure';
import { ObservableExecutorDecorator } from '../domain';
export declare class ExecutorBuilder {
    private readonly connection;
    private readonly languages;
    private readonly expressions;
    private readonly helper;
    constructor(connection: ConnectionFacade, languages: LanguagesService, expressions: Expressions, helper: OrmH3lp);
    build(schemaState: SchemaState): ObservableExecutorDecorator;
}
