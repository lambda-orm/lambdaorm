/* eslint-disable @typescript-eslint/ban-types */
import { Schema } from './index'
import { Transaction, StageFacade, SchemaManager } from '../manager'
import { Cache } from 'js-expressions'

export interface IOrm
{
	get workspace(): string
	dialect (dataSource:string): string
	get stage(): StageFacade
	get schema (): SchemaManager
	setCache (value: Cache):void
	init(configPath?: string, connect?: boolean): Promise<Schema>
	end (): Promise<void>
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
	model(expression:Function): any
	model(expression:string): any

	/**
		* Get parameters of expression
		* @returns Parameters of expression
		*/
	parameters(expression:Function): any
	parameters(expression:string): any

	/**
		* Get metadata of expression
		* @returns metadata of expression
		*/
	metadata(expression: Function): any
	metadata (expression:string):any

	/**
	 *
	 * @param expression
	 * @param stage
	 */
	sentence(expression: Function, stage?: string): string
	sentence(expression: string, stage?: string): string

	/**
		* Execute expression
		* @param data Data with variables
		* @param stage Stage name
		* @returns Result of execution
		*/
	execute(expression: Function, data?: any, stage?: string):Promise<any>
	execute(expression: string, data?: any, stage?: string):Promise<any>
	transaction(stage:string, callback:{(tr:Transaction): Promise<void>}):Promise<void>
}
