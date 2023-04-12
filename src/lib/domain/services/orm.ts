/* eslint-disable @typescript-eslint/ban-types */
import {
	Schema, QueryInfo, MetadataParameter, MetadataModel, MetadataConstraint, Metadata,
	QueryOptions, ISchemaService, ITransaction, IStageService
} from '..'
import { IExpressions } from '3xpr'

export interface IOrm
{
	get workspace(): string
	dialect (source:string): string
	get stage(): IStageService
	get schema(): ISchemaService
	get expressions(): IExpressions

	// setCache (value: Cache):void
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
	getInfo(expression: Function, options?: QueryOptions): QueryInfo
	getInfo(expression: string, options?: QueryOptions): QueryInfo

	/**
		* Execute expression
		* @param data Data with variables
		* @param stage Stage name
	  * @param view View name
		* @returns Result of execution
		*/
	execute(expression: Function, data?: any, options?: QueryOptions):Promise<any>
	execute(expression: string, data?: any, options?: QueryOptions): Promise<any>
	/**
	 * transaction
	 * @param stage
	 * @param view
	 * @param callback
	 */
	transaction(options: QueryOptions|undefined, callback:{(tr:ITransaction): Promise<void>}):Promise<void>
}
