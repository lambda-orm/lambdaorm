/* eslint-disable @typescript-eslint/ban-types */
import { MetadataParameter, MetadataModel, MetadataConstraint, Metadata, QueryPlan, Schema, Dialect, SchemaFacade, SchemaState, QueryOptions } from 'lambdaorm-base'
import { StageFacade } from '../../stage/application'
import { QueryTransaction } from '../../expressions/application'
import { Expressions } from '3xpr'
export interface IOrm
{
	stage: StageFacade
	schema: SchemaFacade
	state: SchemaState
	exp: Expressions

	dialect (source:string): Dialect

	// setCache (value: Cache):void
	init(configPath?: string, connect?: boolean): Promise<Schema>
	end (): Promise<void>
	/**
	 * Normalize query
	 * @returns Expression normalized
	*/
	normalize(query:Function): string
	normalize(query:string): string

	/**
		* Get model of query
		* @returns Model of query
		*/
	model(query:Function): MetadataModel[]
	model(query:string): MetadataModel[]

	/**
		* Get parameters of query
		* @returns Parameters of query
		*/
	parameters(query:Function): MetadataParameter[]
	parameters(query: string): MetadataParameter[]

	/**
	 * Get constraints of query
	 * @returns Constraints of query
	 */
	constraints(query:Function): MetadataConstraint
	constraints(query:string): MetadataConstraint

	/**
		* Get metadata of query
		* @returns metadata of query
		*/
	metadata(query: Function): Metadata
	metadata (query:string):Metadata

	/**
	 *
	 * @param query
	 * @param options
	 */
	plan(query: Function, options?: QueryOptions): QueryPlan
	plan(query: string, options?: QueryOptions): QueryPlan

	/**
		* Execute query
		* @param query Query to execute
		* @param data Data with variables
		* @param options query options
		* @returns Result of execution
		*/
	execute(query: Function, data?: any, options?: QueryOptions):Promise<any>
	execute(query: string, data?: any, options?: QueryOptions): Promise<any>
	/**
	 * transaction
	 * @param options query options
	 * @param callback
	 */
	transaction(options: QueryOptions|undefined, callback:{(tr:QueryTransaction): Promise<void>}):Promise<void>
}
