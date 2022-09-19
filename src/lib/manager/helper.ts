
import { Helper } from 'h3lp'
import { Delta, MetadataSentence } from '../index'
const { DateTime } = require('luxon')
const SqlString = require('sqlstring')

export class OrmHelper extends Helper {
	public sentenceToArray (sentence:MetadataSentence):string[] {
		const sentences:string[] = []
		sentences.push(sentence.sentence)
		if (sentence.children) {
			sentence.children.forEach(p => this.sentenceToArray(p).forEach(p => sentences.push(p)))
		}
		return sentences
	}

	public deltaWithSimpleArrays (current:any, old?:any):Delta {
		const delta = new Delta()
		if (current === undefined || current === null) {
			throw new Error('current value can\'t empty')
		}
		for (const name in current) {
			const currentValue = current[name]
			if (old === undefined || old === null) {
				delta.new.push({ name: name, new: currentValue })
			} else {
				this.deltaValue(name, currentValue, old[name], delta)
			}
		}
		if (old !== undefined || old !== null) {
			for (const name in old) {
				if (current[name] === undefined) {
					delta.remove.push({ name: name, old: old[name] })
				}
			}
		}
		return delta
	}

	private deltaValue (name:string, currentValue:any, oldValue:any, delta:Delta):void {
		if (oldValue === undefined) {
			delta.new.push({ name: name, new: currentValue })
		} else if (oldValue === null && currentValue === null) {
			delta.unchanged.push({ name: name, value: oldValue })
		} else if ((oldValue !== null && currentValue === null) || (oldValue === null && currentValue !== null)) {
			delta.changed.push({ name: name, new: currentValue, old: oldValue, delta: null })
		} else if (Array.isArray(currentValue)) {
			this.deltaArrayValue(name, currentValue, oldValue, delta)
		} else if (this.isObject(currentValue)) {
			const objectDelta = this.deltaWithSimpleArrays(currentValue, oldValue)
			const change = objectDelta.changed.length + objectDelta.remove.length + objectDelta.new.length > 0
			if (change) {
				delta.changed.push({ name: name, new: currentValue, old: oldValue, delta: objectDelta })
			} else {
				delta.unchanged.push({ name: name, value: oldValue })
			}
		} else if (oldValue !== currentValue) {
			delta.changed.push({ name: name, new: currentValue, old: oldValue, delta: null })
		} else {
			delta.unchanged.push({ name: name, value: oldValue })
		}
	}

	private deltaArrayValue (name:string, currentValue:any, oldValue:any, delta:Delta):void {
		if (!Array.isArray(oldValue)) { throw new Error(`current value in ${name} is array by old no`) }
		if (currentValue.length === 0 && oldValue.length === 0) {
			delta.unchanged.push({ name: name, value: oldValue })
		}
		const arrayDelta = new Delta()
		const news = currentValue.filter(p => oldValue.indexOf(p) === -1)
		const unchanged = currentValue.filter(p => oldValue.indexOf(p) !== -1)
		const removes = oldValue.filter(p => currentValue.indexOf(p) === -1)
		const change = news.length + removes.length > 0
		for (const p in news) {
			arrayDelta.new.push({ name: p, new: p })
		}
		for (const p in removes) {
			arrayDelta.remove.push({ name: p, old: p })
		}
		for (const p in unchanged) {
			arrayDelta.unchanged.push({ name: p, value: p })
		}
		delta.children.push({ name: name, type: 'array', change: change, delta: arrayDelta })
	}

	public dateFormat (value:any, format:string):string {
		const iso = new Date(value).toISOString()
		if (format === 'ISO') {
			return DateTime.fromISO(iso).toISO()
		} else {
			return DateTime.fromISO(iso).toFormat(format)
		}
	}

	public escape (value:string):string {
		return SqlString.escape(value)
	}

	public transformParameter (name:string) {
		return this.replace(name, '.', '_')
		// con la siguiente opción falla cuando se hace value=Helper.replace(value,"\\'","\\''")
		// return string.replace(new RegExp(search, 'g'), replace)
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public clearLambda (func:Function) {
		const str = func.toString().trim()
		const index = str.indexOf('=>') + 2
		return str.substring(index, str.length).trim()
	}
}

// export class Helper {
// 	public static sentenceToArray (sentence:MetadataSentence):string[] {
// 		const sentences:string[] = []
// 		sentences.push(sentence.sentence)
// 		if (sentence.children) {
// 			sentence.children.forEach(p => Helper.sentenceToArray(p).forEach(p => sentences.push(p)))
// 		}
// 		return sentences
// 	}

// 	public static replace (string:string, search:string, replace:string) {
// 		return string.split(search).join(replace)
// 		// con la siguiente opción falla cuando se hace value=Helper.replace(value,"\\'","\\''")
// 		// return string.replace(new RegExp(search, 'g'), replace)
// 	}

// 	public static clone (obj:any):any {
// 		return obj && typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj
// 	}

// 	public static cloneOperand (obj:any):any {
// 		const children:any[] = []
// 		if (obj.children) {
// 			for (const k in obj.children) {
// 				const p = obj.children[k]
// 				const child = Helper.clone(p)
// 				children.push(child)
// 			}
// 		}
// 		return new obj.constructor(obj.name, children)
// 	}

// 	public static isObject (obj:any):boolean {
// 		return obj && typeof obj === 'object' && obj.constructor === Object
// 	}

// 	public static isEmpty (value:any):boolean {
// 		return value === null || value === undefined || value.toString().trim().length === 0
// 	}

// 	public static nvl (value:any, _default:any):any {
// 		return !this.isEmpty(value) ? value : _default
// 	}

// 	public static resolvePath (source:string):string {
// 		const _source = source.trim()
// 		if (_source.startsWith('.')) {
// 			return path.join(process.cwd(), source)
// 		}
// 		if (_source.startsWith('~')) {
// 			return _source.replace('~', process.env.HOME as string)
// 		}
// 		return source
// 	}

// 	public static async existsPath (_path:string):Promise<boolean> {
// 		const fullPath = Helper.resolvePath(_path)
// 		return new Promise<boolean>((resolve) => {
// 			fs.access(fullPath, (err) => {
// 				if (err) {
// 					resolve(false)
// 				} else {
// 					resolve(true)
// 				}
// 			})
// 		})
// 	}

// 	public static async createIfNotExists (_path:string):Promise<void> {
// 		const fullPath = Helper.resolvePath(_path)
// 		if (await Helper.existsPath(fullPath)) { return }
// 		return new Promise<void>((resolve, reject) => {
// 			fs.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve())
// 		})
// 	}

// 	public static async readFile (filePath: string): Promise<string|null> {
// 		const fullPath = Helper.resolvePath(filePath)
// 		if (!await Helper.existsPath(fullPath)) { return null }
// 		return new Promise<string>((resolve, reject) => {
// 			fs.readFile(fullPath, (err, data) => err ? reject(err) : resolve(data.toString('utf8')))
// 		})
// 	}

// 	public static async removeFile (filePath:string):Promise<void> {
// 		const fullPath = Helper.resolvePath(filePath)
// 		if (!await Helper.existsPath(fullPath)) { return }
// 		return new Promise<void>((resolve, reject) => {
// 			fs.unlink(fullPath, err => err ? reject(err) : resolve())
// 		})
// 	}

// 	public static async copyFile (src: string, dest:string): Promise<void> {
// 		const srcFullPath = Helper.resolvePath(src)
// 		const destFullPath = Helper.resolvePath(dest)
// 		if (!await Helper.existsPath(srcFullPath)) {
// 			throw new Error(`not exists ${src}`)
// 		}
// 		return new Promise<void>((resolve, reject) => {
// 			fs.copyFile(srcFullPath, destFullPath, err => err ? reject(err) : resolve())
// 		})
// 	}

// 	public static async writeFile (filePath: string, content: string): Promise<void> {
// 		const fullPath = Helper.resolvePath(filePath)
// 		const dir = path.dirname(fullPath)
// 		if (!await Helper.existsPath(dir)) {
// 			await Helper.mkdir(dir)
// 		}
// 		return new Promise<void>((resolve, reject) => {
// 			fs.writeFile(fullPath, content, { encoding: 'utf8' }, err => err ? reject(err) : resolve())
// 		})
// 	}

// 	public static async mkdir (_path:string):Promise<void> {
// 		const fullPath = Helper.resolvePath(_path)
// 		return new Promise<void>((resolve, reject) => {
// 			fs.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve())
// 		})
// 	}

// 	public static async lstat (_path:string):Promise<fs.Stats> {
// 		const fullPath = Helper.resolvePath(_path)
// 		return new Promise<fs.Stats>((resolve, reject) => {
// 			fs.lstat(fullPath, (err, stats) => err
// 				? reject(err)
// 				: resolve(stats))
// 		})
// 	}

// 	public static getEnvironmentVariable (text:string):string|undefined {
// 		const startIndex = text.indexOf('${')
// 		if (startIndex < 0) {
// 			return undefined
// 		}
// 		const endIndex = text.indexOf('}', startIndex + 2)
// 		if (endIndex < 0) {
// 			throw new Error(`Environment variable not found end character "?" in ${text}`)
// 		}
// 		return text.substring(startIndex + 2, endIndex)
// 	}

// 	public static solveEnvironmentVariables (source:any): void {
// 		if (typeof source !== 'object') {
// 			return
// 		}
// 		for (const name in source) {
// 			const child = source[name]
// 			if (typeof child === 'string' && child.indexOf('${') >= 0) {
// 				source[name] = Helper.replaceEnvironmentVariable(child)
// 			} else if (typeof child === 'object') {
// 				Helper.solveEnvironmentVariables(child)
// 			}
// 		}
// 	}

// 	private static replaceEnvironmentVariable (text:any): any {
// 		// there can be more than one environment variable in text
// 		while (text.indexOf('${') >= 0) {
// 			const environmentVariable = Helper.getEnvironmentVariable(text)
// 			if (!environmentVariable) {
// 				continue
// 			}
// 			const environmentVariableValue = process.env[environmentVariable]
// 			if (environmentVariableValue === undefined || environmentVariableValue === null) {
// 				text = Helper.replace(text, '${' + environmentVariable + '}', '')
// 			} else {
// 				const objValue = Helper.tryParse(environmentVariableValue)
// 				const value = objValue ? JSON.stringify(objValue) : environmentVariableValue
// 				text = Helper.replace(text, '${' + environmentVariable + '}', value)
// 			}
// 		}
// 		return text
// 	}

// 	public static getType (value: any):string {
// 		if (Array.isArray(value)) return 'array'
// 		if (typeof value === 'string') {
// 			if (Helper.isDate(value)) {
// 				return 'datetime'
// 			} else {
// 				return 'string'
// 			}
// 		}
// 		return typeof value
// 	}

// 	public static isDate (value:any) {
// 		return Date.parse(value) > 0
// 	}

// 	public static tryParse (value:string):any|null {
// 		try {
// 			return JSON.parse(value)
// 		} catch {
// 			return null
// 		}
// 	}

// 	public static tsType (value:string):string {
// 		switch (value) {
// 		case 'integer':
// 		case 'decimal':
// 			return 'number'
// 		case 'datetime':
// 		case 'date':
// 		case 'time':
// 			return 'Date'
// 		default:
// 			return value
// 		}
// 	}

// 	// https://stackoverflow.com/questions/27194359/javascript-pluralize-an-english-string
// 	/**
//     * Returns the plural of an English word.
//     *
//     * @export
//     * @param {string} word
//     * @param {number} [amount]
//     * @returns {string}
//     */
// 	public static plural (word: string, amount?: number): string {
// 		if (amount !== undefined && amount === 1) {
// 			return word
// 		}

// 		// save some time in the case that singular and plural are the same
// 		if (Helper._uncountable.indexOf(word.toLowerCase()) >= 0) {
// 			return word
// 		}
// 		// check for irregular forms
// 		for (const w in Helper._irregular) {
// 			const pattern = new RegExp(`${w}$`, 'i')
// 			const replace = Helper._irregular[w]
// 			if (pattern.test(word)) {
// 				return word.replace(pattern, replace)
// 			}
// 		}
// 		// check for matches using regular expressions
// 		for (const reg in Helper._plural) {
// 			const pattern = new RegExp(reg, 'i')
// 			if (pattern.test(word)) {
// 				return word.replace(pattern, Helper._plural[reg])
// 			}
// 		}
// 		return word
// 	}

// 	private static _plural: { [key: string]: string } = {
// 		'(quiz)$': '$1zes',
// 		'^(ox)$': '$1en',
// 		'([m|l])ouse$': '$1ice',
// 		'(matr|vert|ind)ix|ex$': '$1ices',
// 		'(x|ch|ss|sh)$': '$1es',
// 		'([^aeiouy]|qu)y$': '$1ies',
// 		'(hive)$': '$1s',
// 		'(?:([^f])fe|([lr])f)$': '$1$2ves',
// 		'(shea|lea|loa|thie)f$': '$1ves',
// 		sis$: 'ses',
// 		'([ti])um$': '$1a',
// 		'(tomat|potat|ech|her|vet)o$': '$1oes',
// 		'(bu)s$': '$1ses',
// 		'(alias)$': '$1es',
// 		'(octop)us$': '$1i',
// 		'(ax|test)is$': '$1es',
// 		'(us)$': '$1es',
// 		'([^s]+)$': '$1s'
// 	}

// 	private static _singular: { [key: string]: string } = {
// 		'(quiz)zes$': '$1',
// 		'(matr)ices$': '$1ix',
// 		'(vert|ind)ices$': '$1ex',
// 		'^(ox)en$': '$1',
// 		'(alias)es$': '$1',
// 		'(octop|vir)i$': '$1us',
// 		'(cris|ax|test)es$': '$1is',
// 		'(shoe)s$': '$1',
// 		'(o)es$': '$1',
// 		'(bus)es$': '$1',
// 		'([m|l])ice$': '$1ouse',
// 		'(x|ch|ss|sh)es$': '$1',
// 		'(m)ovies$': '$1ovie',
// 		'(s)eries$': '$1eries',
// 		'([^aeiouy]|qu)ies$': '$1y',
// 		'([lr])ves$': '$1f',
// 		'(tive)s$': '$1',
// 		'(hive)s$': '$1',
// 		'(li|wi|kni)ves$': '$1fe',
// 		'(shea|loa|lea|thie)ves$': '$1f',
// 		'(^analy)ses$': '$1sis',
// 		'((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': '$1$2sis',
// 		'([ti])a$': '$1um',
// 		'(n)ews$': '$1ews',
// 		'(h|bl)ouses$': '$1ouse',
// 		'(corpse)s$': '$1',
// 		'(us)es$': '$1',
// 		s$: ''
// 	}

// 	private static _uncountable: string[] = [
// 		'sheep',
// 		'fish',
// 		'deer',
// 		'moose',
// 		'series',
// 		'species',
// 		'money',
// 		'rice',
// 		'information',
// 		'equipment',
// 		'bison',
// 		'cod',
// 		'offspring',
// 		'pike',
// 		'salmon',
// 		'shrimp',
// 		'swine',
// 		'trout',
// 		'aircraft',
// 		'hovercraft',
// 		'spacecraft',
// 		'sugar',
// 		'tuna',
// 		'you',
// 		'wood'
// 	]

// 	private static _irregular: { [key: string]: string } = {
// 		move: 'moves',
// 		foot: 'feet',
// 		goose: 'geese',
// 		sex: 'sexes',
// 		child: 'children',
// 		man: 'men',
// 		tooth: 'teeth',
// 		person: 'people'
// 	}

// 	/**
//     * Returns the singular of an English word.
//     *
//     * @export
//     * @param {string} word
//     * @param {number} [amount]
//     * @returns {string}
//     */
// 	public static singular (word: string, amount?: number): string {
// 		if (amount !== undefined && amount !== 1) {
// 			return word
// 		}

// 		// save some time in the case that singular and plural are the same
// 		if (Helper._uncountable.indexOf(word.toLowerCase()) >= 0) {
// 			return word
// 		}
// 		// check for irregular forms
// 		for (const w in Helper._irregular) {
// 			const pattern = new RegExp(`${Helper._irregular[w]}$`, 'i')
// 			const replace = w
// 			if (pattern.test(word)) {
// 				return word.replace(pattern, replace)
// 			}
// 		}
// 		// check for matches using regular expressions
// 		for (const reg in Helper._singular) {
// 			const pattern = new RegExp(reg, 'i')
// 			if (pattern.test(word)) {
// 				return word.replace(pattern, Helper._singular[reg])
// 			}
// 		}
// 		return word
// 	}
// }
