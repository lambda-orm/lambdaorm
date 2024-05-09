import { ModelService, Library } from '3xpr';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class SentenceLibrary implements Library {
    private readonly helper;
    constructor(helper: OrmH3lp);
    load(model: ModelService): void;
    private functions;
}
