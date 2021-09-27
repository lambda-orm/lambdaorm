/* eslint-disable linebreak-style */
import { Node, Model } from '../node/index'
import { Context, Delta, IOrm } from './../model'
import { SchemaHelper } from '../schema/schemaHelper'
import { ILanguage } from './iLanguage'
import { Executor } from '../connection'
import { OperandManager } from './operandManager'
import { Operand, Query, Sentence } from './operands'
import { QueryCompleter } from './queryCompleter'
import { OperandMetadata } from './operandMetadata'
import { Library } from './library'

export class LanguageManager {
	public dialects:any
	public languageModel:Model
	public metadata:OperandMetadata
	private languages:any
	private orm:IOrm
	private queryCompleter:QueryCompleter
	private operandManager:OperandManager

	constructor (orm:IOrm, languageModel:Model) {
		this.orm = orm
		this.languageModel = languageModel
		this.queryCompleter = new QueryCompleter()
		this.metadata = new OperandMetadata()
		this.operandManager = new OperandManager(this)

		this.languages = {}
		this.dialects = {}
	}

	public addLibrary (library:Library):void {
		this.metadata.addLibrary(library)
	}

	public add (language:ILanguage) {
		this.languages[language.name] = language
		for (const name in language.dialects) { this.dialects[name] = { name: name, language: language.name } }
	}

	public get (dialect:string):ILanguage {
		const info = this.dialects[dialect]
		return this.languages[info.language] as ILanguage
	}

	public build (node:Node, schema:SchemaHelper): Operand {
		const _node = this.complete(node, schema)
		return this.operandManager.build(_node, schema)
	}

	public complete (node:Node, schema:SchemaHelper): Node {
		const completeNode = this.queryCompleter.complete(node, schema)
		this.orm.node.setParent(completeNode)
		return completeNode
	}

	public model (sentence:Sentence):any {
		return this.operandManager.model(sentence)
	}

	public query (dialect:string, sentence:Sentence): Query {
		return this.get(dialect).query.build(sentence, dialect)
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

	public async execute (dialect:string, operand:Operand, context:Context, executor:Executor):Promise<any> {
		return await this.get(dialect).executor.execute(operand, context, executor)
	}

	public eval (operand:Operand, context:Context):any {
		return this.operandManager.eval(operand, context)
	}

	public sync (dialect:string, delta:Delta, schema:SchemaHelper):any[] {
		return this.get(dialect).schema.sync(delta, dialect, schema)
	}

	public drop (dialect:string, schema:SchemaHelper):string[] {
		return this.get(dialect).schema.drop(dialect, schema)
	}

	public truncate (dialect:string, schema:SchemaHelper):string[] {
		return this.get(dialect).schema.truncate(dialect, schema)
	}
}
