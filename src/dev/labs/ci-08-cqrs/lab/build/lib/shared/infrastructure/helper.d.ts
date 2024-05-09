import { H3lp } from 'h3lp';
import { Logger, OrmBaseH3lp } from 'lambdaorm-base';
export declare class CryptoHelper {
    encrypt(value: string, key: string): string;
    decrypt(value: string, key: string): string;
    toBase64(value: string): string;
    getBase64(value: string): string;
}
export declare class OrmH3lp extends OrmBaseH3lp {
    crypto: CryptoHelper;
    constructor(h3lp: H3lp, logger: Logger);
}
