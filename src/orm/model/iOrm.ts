/* eslint-disable @typescript-eslint/ban-types */
import { Cache, Config } from './../model/index'
import { Transaction, DatastoreFacade } from './../manager'

export interface IOrm
{
	get workspace(): string
	dialect (datastore:string): string
	get datastore (): DatastoreFacade
	setCache (value: Cache):void
	init(configPath?: string, connect?: boolean): Promise<Config>
	end (): Promise<void>
	// expression(expression: string): ExpressionFacade
	/**
	 * Complete expression
	 * @returns Expression complete
	*/
	complete(expression:Function): string
	complete(expression:string): string

	/**
		* Get model of expression
		* @returns Model of expression
		*/
	model(expression:Function): Promise<any>
	model(expression:string): Promise<any>

	/**
		* Get parameters of expression
		* @returns Parameters of expression
		*/
	parameters(expression:Function): Promise<any>
	parameters(expression:string): Promise<any>

	sentence(expression: Function, datastore: string): Promise<string>
	sentence(expression: string, datastore: string): Promise<string>

	/**
		* Get metadata of expression
		* @returns metadata of expression
		*/
	metadata(expression: Function): Promise<any>
	metadata (expression:string):Promise<any>

	/**
		* Evaluate and solve expression
		* @param expression  string expression
		* @param data Data with variables
		* @returns Result of the evaluale expression
	 */
	eval (expression: string, data: any): Promise<any>
	/**
		* Execute expression
		* @param data Data with variables
		* @param context Context
		* @param datastore DataStore name
		* @returns Result of execution
		*/
	execute(expression: Function, data: any, context: any, datastore: string):Promise<any>
	execute(expression: string, data: any, context: any, datastore: string):Promise<any>
	transaction(datastore:string, context:any, callback:{(tr:Transaction): Promise<void>}):Promise<void>
}
