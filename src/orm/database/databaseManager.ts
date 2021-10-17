import { Schema, IOrm, Database } from '../model'
import { SchemaData } from '../schema/index'
import { DatabaseSync } from './databaseSync'
import { DatabaseClean } from './databaseClean'
import { Helper } from './../helper'
// const fs = require('fs')
const path = require('path')

export class DatabaseManager {
	public databases: any
	public default?:string
	private orm:IOrm
	constructor (orm:IOrm) {
		this.orm = orm
		this.databases = {}
	}

	public load (database:Database):void {
		this.databases[database.name] = database
	}

	public get (name?: string): Database {
		if (name === undefined) {
			if (this.default !== undefined) {
				const db = this.databases[this.default]
				if (db === undefined) {
					throw new Error(`default database: ${this.default} not found`)
				}
				return db as Database
			} else if (Object.keys(this.databases).length === 1) {
				const key = Object.keys(this.databases)[0]
				return this.databases[key] as Database
			} else {
				throw new Error('the name of the database is required')
			}
		}
		return this.databases[name]as Database
	}

	public sync (name:string):DatabaseSync {
		const database = this.get(name)
		return new DatabaseSync(this.orm, database)
	}

	public clean (name:string):DatabaseClean {
		const database = this.get(name)
		return new DatabaseClean(this.orm, database)
	}

	public async export (name:string):Promise<SchemaData> {
		const state = await this.getState(name)
		return await this.orm.schema.export(state.schema).execute(name)
	}

	public async import (name:string, data:SchemaData) {
		const state = await this.getState(name)
		await this.orm.schema.import(state.schema).execute(data, state.mapping, state.pending, name)
		await this.updateDataState(name, state.mapping, state.pending)
	}

	public async exists (name:string) {
		const file = this.getStateFile(name)
		return await Helper.existsPath(file)
	}

	public async getState (name:string):Promise<any> {
		const file = this.getStateFile(name)
		const exists = await Helper.existsPath(file)
		if (exists) {
			const content = await Helper.readFile(file)
			if (content) {
				return JSON.parse(content)
			}
		}
		return { schema: null, mapping: {}, pending: [] }
	}

	public async updateSchemaState (name:string, schema:Schema):Promise<void> {
		const stateFile = this.getStateFile(name)
		const state = await this.getState(name)
		state.schema = schema
		await Helper.writeFile(stateFile, JSON.stringify(state))
	}

	public async updateDataState (name:string, mapping:any, pending:any[]):Promise<void> {
		const stateFile = this.getStateFile(name)
		const state = await this.getState(name)
		state.mapping = mapping
		state.pending = pending
		// fs.writeFileSync(stateFile, JSON.stringify(state))
		await Helper.writeFile(stateFile, JSON.stringify(state))
	}

	public async removeState (name:string):Promise<any> {
		const file = this.getStateFile(name)
		await Helper.removeFile(file)
		// if (fs.existsSync(file)) { fs.unlinkSync(file) }
	}

	protected getStateFile (name: string) {
		return path.join(this.orm.config.app.workspace, this.orm.config.app.data, `${name}-state.json`)
	}
}
