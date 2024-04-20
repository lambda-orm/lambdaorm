import { H3lp } from 'h3lp'
import { Logger, OrmBaseH3lp } from 'lambdaorm-base'
const CryptoJS = require('crypto-js')

class CryptoHelper {
	public encrypt (value: string, key: string): string {
		return CryptoJS.AES.encrypt(value, key).toString()
	}

	public decrypt (value: string, key: string): string {
		return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8)
	}

	public toBase64 (value: string): string {
		return CryptoJS.enc.Base64.parse(value)
	}

	public getBase64 (value: string): string {
		return CryptoJS.enc.Base64.stringify(value)
	}
}

export class OrmH3lp extends OrmBaseH3lp {
	public crypto: CryptoHelper
	constructor (h3lp: H3lp, logger: Logger) {
		super(h3lp, logger)
		this.crypto = new CryptoHelper()
	}
}
