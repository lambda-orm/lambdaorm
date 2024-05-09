import { Source, MappingConfigService } from 'lambdaorm-base';
import { DialectService, Language, DdlBuilder, DmlBuilder } from '../../application';
export declare abstract class LanguageBase implements Language {
    dialects: DialectService[];
    name: string;
    solveComposite?: boolean;
    constructor(name: string, dialects: any);
    getDialect(name: string): DialectService;
    abstract ddlBuilder(source: Source, mapping: MappingConfigService): DdlBuilder;
    abstract dmlBuilder(source: Source, mapping: MappingConfigService): DmlBuilder;
}
