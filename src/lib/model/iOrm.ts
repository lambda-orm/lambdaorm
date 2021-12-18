/* eslint-disable @typescript-eslint/ban-types */
import { Schema } from './index'
import { Transaction, StageFacade } from '../manager'
import { Cache } from 'js-expressions'

export interface IOrm
{
	get workspace(): string
	dialect (dataSource:string): string
	get stage (): StageFacade
	setCache (value: Cache):void
	init(configPath?: string, connect?: boolean): Promise<Schema>
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
	 *
	 * @param expression
	 * @param stage
	 */
	sentence(expression: Function, stage?: string): Promise<string>
	sentence(expression: string, stage?: string): Promise<string>

	/**
		* Execute expression
		* @param data Data with variables
		* @param context Context
		* @param stage Stage name
		* @returns Result of execution
		*/
	execute(expression: Function, data?: any, context?: any, stage?: string):Promise<any>
	execute(expression: string, data?: any, context?: any, dataSstageource?: string):Promise<any>
	transaction(context:any, stage:string, callback:{(tr:Transaction): Promise<void>}):Promise<void>
}
