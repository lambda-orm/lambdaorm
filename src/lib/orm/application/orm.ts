/* eslint-disable @typescript-eslint/ban-types */
import { MetadataParameter, MetadataModel, MetadataConstraint, Metadata, QueryPlan, Schema, Dialect, SchemaFacade, SchemaState, QueryOptions } from 'lambdaorm-base'
import { StageFacade } from '../../stage/application'
import { ExpressionTransaction } from '../../expressions/application'
import { Expressions } from '3xpr'
export interface IOrm
{
	get workspace(): string
	stage: StageFacade
	schema: SchemaFacade
	state: SchemaState
	expressions: Expressions

	dialect (source:string): Dialect

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
	 * @param options
	 */
	plan(expression: Function, options?: QueryOptions): QueryPlan
	plan(expression: string, options?: QueryOptions): QueryPlan

	/**
		* Execute expression
		* @param data Data with variables
		* @param options query options
		* @returns Result of execution
		*/
	execute(expression: Function, data?: any, options?: QueryOptions):Promise<any>
	execute(expression: string, data?: any, options?: QueryOptions): Promise<any>
	/**
	 * transaction
	 * @param options query options
	 * @param callback
	 */
	transaction(options: QueryOptions|undefined, callback:{(tr:ExpressionTransaction): Promise<void>}):Promise<void>
}
