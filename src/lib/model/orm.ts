/* eslint-disable @typescript-eslint/ban-types */
import { Schema, MetadataSentence, MetadataParameter, MetadataModel, MetadataConstraint, Metadata } from './index'
import { Transaction, StageFacade, SchemaManager } from '../manager'
import { Cache, Expressions } from 'js-expressions'

export interface OrmOptions {
	view?: string
	stage?: string
	chunkSize?:number
	tryAllCan?:boolean
}
export interface IOrm
{
	get workspace(): string
	dialect (source:string): string
	get stage(): StageFacade
	get schema(): SchemaManager
	get expressions(): Expressions

	setCache (value: Cache):void
	init(configPath?: string, connect?: boolean): Promise<Schema>
	end (): Promise<void>
	/**
	 * Normalize expression
	 * @returns Expression normalized
	*/
	normalize(expression:Function): string
	normalize(expression:string): string

	/**
		* Get model of expression
		* @returns Model of expression
		*/
	model(expression:Function): MetadataModel[]
	model(expression:string): MetadataModel[]

	/**
		* Get parameters of expression
		* @returns Parameters of expression
		*/
	parameters(expression:Function): MetadataParameter[]
	parameters(expression: string): MetadataParameter[]

	/**
	 * Get constraints of expression
	 * @returns Constraints of expression
	 */
	constraints(expression:Function): MetadataConstraint
	constraints(expression:string): MetadataConstraint

	/**
		* Get metadata of expression
		* @returns metadata of expression
		*/
	metadata(expression: Function): Metadata
	metadata (expression:string):Metadata

	/**
	 *
	 * @param expression
	 * @param stage
	 */
	sentence(expression: Function, options?: OrmOptions): MetadataSentence
	sentence(expression: string, options?: OrmOptions): MetadataSentence

	/**
		* Execute expression
		* @param data Data with variables
		* @param stage Stage name
	  * @param view View name
		* @returns Result of execution
		*/
	execute(expression: Function, data?: any, options?: OrmOptions):Promise<any>
	execute(expression: string, data?: any, options?: OrmOptions): Promise<any>
	/**
	 * transaction
	 * @param stage
	 * @param view
	 * @param callback
	 */
	transaction(options: OrmOptions|undefined, callback:{(tr:Transaction): Promise<void>}):Promise<void>
}
