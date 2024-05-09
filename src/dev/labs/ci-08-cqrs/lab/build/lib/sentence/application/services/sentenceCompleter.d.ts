import { Sentence, MappingConfigService, ViewConfigService } from 'lambdaorm-base';
import { Expressions } from '3xpr';
export declare class SentenceCompleter {
    private readonly expressions;
    constructor(expressions: Expressions);
    complete(mapping: MappingConfigService, view: ViewConfigService, sentence: Sentence): void;
    private solveFilter;
    private solveKeys;
    private solveKey;
    private filterByKeys;
    private solveJoin;
    private solveProperties;
    private solveProperty;
    private replaceField;
}
