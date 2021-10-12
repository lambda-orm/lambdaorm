// import fs from 'fs'
// import path from 'path'
// import { Helper, Config, orm } from '../index'

// const ConfigExtends = require('config-extends')
// const yaml = require('js-yaml')

// export class Utils {
// // public static async createOrUpdateProject (workspace: string, database: string, dialect: string, connection?: any): Promise<void> {
// // await Helper.createIfNotExists(workspace)

// // const content = yaml.dump(config)
// // // create initial structure
// // await Helper.createIfNotExists(path.join(workspace, config.paths.src))
// // await Helper.createIfNotExists(path.join(workspace, config.paths.data))
// // await Helper.copyFile(path.join(__dirname, './../sintaxis.d.ts'), path.join(workspace, config.paths.src, 'sintaxis.d.ts'))
// // await Helper.writeFile(configPath, content, true)
// // }

// public static async getOrCreteConfig (workspace: string, database: string, dialect: string, connection?: any): Promise<Config> {
// const config = await orm.getConfig(workspace)

// let db = config.databases.find(p => p.name === database)
// if (db === undefined) {
// if (connection === undefined) { connection = Utils.defaultConnection(dialect) }
// db = { name: database, dialect: dialect, connection: connection, schema: 'default' }
// config.databases.push(db)
// } else {
// db.dialect = dialect
// if (connection !== undefined) { db.connection = connection }
// }

// if (db.schema !== undefined) {
// const schema = config.schemas.find(p => p.name === db?.schema)
// if (schema === undefined) {
// config.schemas.push({ name: db.schema, enums: [], entities: [] })
// }
// }
// return config
// }
