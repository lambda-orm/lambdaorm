import { Language } from '../ports/language';
import { DialectService } from './dialectService';
export declare class LanguagesService {
    dialects: any;
    private languages;
    constructor();
    add(language: Language): LanguagesService;
    get(name: string): Language;
    getByDialect(dialect: string): Language;
    getDialect(name: string): DialectService;
}
