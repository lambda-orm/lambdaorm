
import { Node, Model } from '../parser/index'
import { Context, Delta, Query } from './../model'
import { SchemaHelper } from '../schema/schemaHelper'
import { Language } from './language'
import { OperandManager } from './operandManager'
import { Operand, Sentence } from './operands'
import { OperandMetadata } from './operandMetadata'
import { Library } from './library'
import { DialectMetadata } from './dialectMetadata'

export class LanguageManager {
	public dialects:any
	public languageModel:Model
	public metadata:OperandMetadata
	private languages:any
	private operandManager: OperandManager

	constructor (languageModel:Model) {
		this.languageModel = languageModel
		this.metadata = new OperandMetadata()
		this.operandManager = new OperandManager(this)

		this.languages = {}
		this.dialects = {}
	}

	public addLibrary (library:Library):void {
		this.metadata.addLibrary(library)
	}

	public add (language:Language) {
		this.languages[language.name] = language
		for (const name in language.dialects) { this.dialects[name] = { name: name, language: language.name } }
	}

	public get (dialect:string):Language {
		const info = this.dialects[dialect]
		return this.languages[info.language] as Language
	}

	public dialectMetadata (dialect:string):DialectMetadata {
		return this.get(dialect).metadata(dialect)
	}

	public build (node:Node, schema:SchemaHelper): Operand {
		return this.operandManager.build(node, schema)
	}

	public model (sentence:Sentence):any {
		return this.operandManager.model(sentence)
	}

	public parameters (sentence:Sentence):any {
		return this.operandManager.parameters(sentence)
	}

	public query (dialect: string, sentence: Sentence): Query {
		const metadata = this.get(dialect).metadata(dialect)
		return this.get(dialect).query.build(sentence, metadata)
	}

	public sentence (dialect:string, operand:Query):any {
		return this.get(dialect).query.sentence(operand)
	}

	public serialize (operand:Operand):any {
		return this.operandManager.serialize(operand)
	}

	public deserialize (serialized:any) {
		return this.operandManager.deserialize(serialized)
	}

	public serializeQuery (dialect:string, operand:Operand):any {
		return this.get(dialect).query.serialize(operand)
	}

	public deserializeQuery (dialect:string, serialized:any) {
		return this.get(dialect).query.deserialize(serialized)
	}

	public eval (operand:Operand, context:Context):any {
		return this.operandManager.eval(operand, context)
	}

	public sync (dialect: string, delta: Delta, schema: SchemaHelper):Query[] {
		const metadata = this.get(dialect).metadata(dialect)
		return this.get(dialect).schema.sync(delta, metadata, schema)
	}

	public drop (dialect: string, schema: SchemaHelper): Query[] {
		const metadata = this.get(dialect).metadata(dialect)
		return this.get(dialect).schema.drop(metadata, schema)
	}

	public truncate (dialect: string, schema: SchemaHelper): Query[] {
		const metadata = this.get(dialect).metadata(dialect)
		return this.get(dialect).schema.truncate(metadata, schema)
	}
}
