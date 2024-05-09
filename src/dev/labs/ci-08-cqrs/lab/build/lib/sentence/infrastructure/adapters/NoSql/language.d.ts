import { DdlBuilder, DmlBuilder } from '../../../../language/application';
import { MappingConfigService, Source } from 'lambdaorm-base';
import { LanguageBase } from '../../../../language/infrastructure';
import { OrmH3lp } from '../../../../shared/infrastructure';
export declare class NoSqlLanguageAdapter extends LanguageBase {
    private readonly helper;
    constructor(helper: OrmH3lp);
    ddlBuilder(source: Source, mapping: MappingConfigService): DdlBuilder;
    dmlBuilder(source: Source, mapping: MappingConfigService): DmlBuilder;
}
