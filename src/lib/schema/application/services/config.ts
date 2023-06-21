// import {
// Enum, Entity, Property, Relation, FormatMapping, EntityMapping, PropertyMapping,
// Source, Schema, AppSchema, Mapping, RelationInfo, Stage, RelationType, View, EntityView,
// PropertyView, Dependent, AppPathsConfig, ModelSchema, DataSchema, DIALECT_DEFAULT, ObservableAction, SchemaError
// } from '../../domain'
// import path from 'path'
// import { helper } from '../../../shared/application/helper'
// import { Primitive } from 'typ3s'
// import { IOrmExpressions } from '../../../shared/domain'
// import { Autowired, IObjectHelper } from 'h3lp'
// const yaml = require('js-yaml')

// export class SchemaService {
// public source = new DataSourceConfigService()
// public model = new ModelConfigService()
// public mapping = new MappingsConfigService()
// public stage = new StageConfigService()
// public view = new ViewsConfigService()
// private extender = new SchemaExtender()
// public schema: Schema
// constructor (public workspace: string) {
// this.schema = this.newSchema()
// }

// private newSchema ():Schema {
// return { app: this.newApp(), model: this.newModel(), data: this.newData() }
// }

// private newData (): DataSchema {
// return { mappings: [], sources: [], stages: [] }
// }

// private newModel (): ModelSchema {
// return { enums: [], entities: [], views: [] }
// }

// private newApp ():AppSchema {
// return { paths: this.newPathsApp(), start: [], end: [], listeners: [] }
// }

// private newPathsApp (): AppPathsConfig {
// return { src: 'src', data: 'data', model: 'model' }
// }

// public async init (source?: string | Schema): Promise<Schema> {
// if (source && typeof source === 'string') {
// this.workspace = path.resolve(source)
// }
// let schema: string | Schema
// if (!source || typeof source === 'string') {
// schema = await this.get(source)
// } else {
// if (source === undefined) {
// throw new SchemaError(`Schema: ${source} not supported`)
// }
// schema = source
// }
// schema = helper.utils.solveEnvironmentVars(schema) as Schema
// return this.load(schema)
// }

// public async get (source?: string): Promise<Schema> {
// const configPath = await this.getConfigPath(source)
// let schema = this.newSchema()
// if (configPath) {
// const content = await this.readConfig(configPath)
// if (content === undefined || content === null) {
// throw new SchemaError(`Schema file: ${configPath} empty`)
// } else if (path.extname(configPath) === '.yaml' || path.extname(configPath) === '.yml') {
// schema = yaml.load(content)
// } else if (path.extname(configPath) === '.json') {
// schema = JSON.parse(content)
// } else {
// throw new SchemaError(`Schema file: ${configPath} not supported`)
// }
// }
// this.completeSchema(schema)
// return schema
// }

// public complete (schema: Schema): void {
// this.extender.complete(schema)
// }

// // private async readConfig (path:string):Promise<string|null> {
// // if (path.startsWith('http')) {
// // return await helper.http.get(path)
// // }
// // return await helper.fs.read(path)
// // }

// // private async getConfigPath (source?: string):Promise<string|undefined> {
// // let workspace: string
// // let configFile: string | undefined
// // workspace = process.cwd()

// // if (source === undefined) {
// // configFile = await this.getConfigFileName(workspace)
// // } else if (typeof source === 'string') {
// // if (source.startsWith('http')) {
// // return source
// // } else if (await helper.fs.exists(source)) {
// // const lstat = await helper.fs.lstat(source)
// // if (lstat.isFile()) {
// // configFile = path.basename(source)
// // workspace = path.dirname(source)
// // } else {
// // workspace = source
// // configFile = await this.getConfigFileName(workspace)
// // }
// // } else {
// // console.log(`Not exists path ${source}`)
// // }
// // } else {
// // console.log('Schema: not supported:')
// // console.log(source)
// // }
// // if (configFile) {
// // return path.join(workspace, configFile)
// // } else {
// // return undefined
// // }
// // }

// private completeSchema (schema: Schema) {
// if (schema.model === undefined) {
// schema.model = this.newModel()
// } else {
// if (schema.model.enums === undefined) {
// schema.model.enums = []
// }
// if (schema.model.entities === undefined) {
// schema.model.entities = []
// }
// if (schema.model.views === undefined) {
// schema.model.views = []
// }
// }
// if (schema.data === undefined) {
// schema.data = this.newData()
// } else {
// if (schema.data.mappings === undefined) {
// schema.data.mappings = []
// }
// if (schema.data.sources === undefined) {
// schema.data.sources = []
// }
// if (schema.data.stages === undefined) {
// schema.data.stages = []
// }
// }
// if (schema.app === undefined) {
// schema.app = this.newApp()
// } else {
// if (schema.app.start === undefined) {
// schema.app.start = []
// }
// if (schema.app.end === undefined) {
// schema.app.end = []
// }
// if (schema.app.listeners === undefined) {
// schema.app.listeners = []
// }
// if (schema.app.paths === undefined) {
// schema.app.paths = this.newPathsApp()
// }
// if (schema.app.paths.src === undefined) {
// schema.app.paths.src = 'src'
// }
// if (schema.app.paths.data === undefined) {
// schema.app.paths.data = 'data'
// }
// if (schema.app.paths.model === undefined) {
// schema.app.paths.model = 'model'
// }
// }
// }

// // public async getConfigFileName (workspace: string): Promise<string | undefined> {
// // if (await helper.fs.exists(path.join(workspace, 'lambdaORM.yaml'))) {
// // return 'lambdaORM.yaml'
// // } else if (await helper.fs.exists(path.join(workspace, 'lambdaORM.yml'))) {
// // return 'lambdaORM.yml'
// // } else if (await helper.fs.exists(path.join(workspace, 'lambdaORM.json'))) {
// // return 'lambdaORM.json'
// // } else {
// // return undefined
// // }
// // }

// public load (schema: Schema): Schema {
// this.schema = this.extender.extend(schema)
// this.model.entities = this.schema.model.entities || []
// this.model.enums = this.schema.model.enums || []
// if (!this.schema.model.views) {
// this.schema.model.views = [{ name: 'default', entities: [] }]
// }
// for (const view of this.schema.model.views) {
// this.view.load(view)
// }
// if (this.schema.data.mappings) {
// for (const mapping of this.schema.data.mappings) {
// this.mapping.load(mapping)
// }
// }
// if (this.schema.data.sources) {
// for (const source of this.schema.data.sources) {
// if (helper.val.isEmpty(source.connection)) {
// console.log(`WARNING|source:"${source.name}"|connection is empty`)
// continue
// }
// if (typeof source.connection === Primitive.string) {
// if (source.connection.includes('${')) {
// console.log(`WARNING|source:"${source.name}"|had environment variables unsolved`)
// continue
// }
// const connection = helper.utils.tryParse(source.connection)
// if (connection) {
// source.connection = connection
// } else {
// throw new SchemaError(`Connection "${source.connection}" not serializable`)
// }
// } else if (typeof source.connection !== 'object') {
// throw new SchemaError(`The source "${source.name}" connection to is not defined as an object`)
// }
// this.source.load(source)
// }
// }
// if (this.schema.data.stages) {
// for (const stage of this.schema.data.stages) {
// this.stage.load(stage)
// }
// }
// return this.schema
// }
// }

// // export class SchemaFacade {
// // // eslint-disable-next-line no-useless-constructor
// // constructor (
// // private readonly service: SchemaService) {}

// // public get schema ():Schema {
// // return this.service.schema
// // }

// // public async init (source?: string | Schema): Promise<Schema> {
// // return this.service.init(source)
// // }

// // public async get (source?: string): Promise<Schema> {
// // return this.service.get(source)
// // }

// // public async getConfigFileName (workspace: string): Promise<string | undefined> {
// // return this.service.getConfigFileName(workspace)
// // }

// // public complete (schema: Schema): void {
// // this.service.extender.complete(schema)
// // }

// // public extend (schema: Schema): Schema {
// // return this.service.extender.extend(schema)
// // }

// // public load (schema: Schema): Schema {
// // return this.service.load(schema)
// // }
// // }
