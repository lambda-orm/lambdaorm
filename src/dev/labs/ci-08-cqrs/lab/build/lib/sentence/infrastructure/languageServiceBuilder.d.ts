import { LanguagesService } from '../../language/application';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class SentenceLanguageServiceBuilder {
    private readonly helper;
    constructor(helper: OrmH3lp);
    build(): LanguagesService;
}
