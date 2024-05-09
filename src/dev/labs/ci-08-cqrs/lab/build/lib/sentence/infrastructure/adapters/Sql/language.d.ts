import { LanguageBase } from '../../../../language/infrastructure/adapters/languageBase';
import { DdlBuilder, DmlBuilder } from '../../../../language/application';
import { MappingConfigService, Source } from 'lambdaorm-base';
import { OrmH3lp } from '../../../../shared/infrastructure';
export declare class SqlLanguageAdapter extends LanguageBase {
    private readonly helper;
    constructor(helper: OrmH3lp);
    ddlBuilder(source: Source, mapping: MappingConfigService): DdlBuilder;
    dmlBuilder(source: Source, mapping: MappingConfigService): DmlBuilder;
}
