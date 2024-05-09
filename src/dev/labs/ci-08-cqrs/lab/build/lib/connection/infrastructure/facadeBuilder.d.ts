import { ConnectionFacade } from '../application';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class ConnectionFacadeBuilder {
    private readonly helper;
    constructor(helper: OrmH3lp);
    build(): ConnectionFacade;
}
