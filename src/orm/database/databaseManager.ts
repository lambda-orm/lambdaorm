// import { Database } from '../model'
// import { DatabaseState } from './databaseState'
// import { SchemaManager } from './schemaManager'
// import { LanguageManager } from 'orm/language'
// import { Executor } from './../manager'

// export class DatabaseManager {
// public databases: any
// public default?:string
// public state: DatabaseState
// public executor: Executor
// public schema: SchemaManager
// public language : LanguageManager
// constructor (state:DatabaseState, executor: Executor, language : LanguageManager, schema: SchemaManager) {
// this.executor = executor
// this.language = language
// this.schema = schema
// this.state = state
// this.databases = {}
// }

// public load (database:Database):void {
// this.databases[database.name] = database
// }

// public get (name?: string): Database {
// if (name === undefined) {
// if (this.default !== undefined) {
// const db = this.databases[this.default]
// if (db === undefined) {
// throw new Error(`default database: ${this.default} not found`)
// }
// return db as Database
// } else if (Object.keys(this.databases).length === 1) {
// const key = Object.keys(this.databases)[0]
// return this.databases[key] as Database
// } else {
// throw new Error('the name of the database is required')
// }
// }
// return this.databases[name]as Database
// }
// }
