import { ICache } from 'h3lp';
import { ISentenceCompleteBuilder, Sentence, SentenceSerializer, ViewConfigService } from 'lambdaorm-base';
import { OrmH3lp } from '../../../shared/infrastructure';
export declare class SentenceCompleteBuilderCacheDecorator implements ISentenceCompleteBuilder {
    private readonly builder;
    private readonly cache;
    private readonly serializer;
    private readonly helper;
    constructor(builder: ISentenceCompleteBuilder, cache: ICache<string, string>, serializer: SentenceSerializer, helper: OrmH3lp);
    build(expression: string, view: ViewConfigService, stage: string): Sentence;
}
