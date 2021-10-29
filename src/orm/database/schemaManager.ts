// import { SchemaHelper } from './schemaHelper'
// import { Helper } from '../helper'
// import { Schema, Entity, Property, Relation, Index } from '../model/index'

// export class SchemaManager {
// public schemas:any
// constructor () {
// this.schemas = {}
// }

// public load (value:Schema):void {
// if (value && value.name) { this.schemas[value.name] = this.transform(value) }
// }

// public delete (name:string):void {
// delete this.schemas[name]
// }

// public get (name:string):Schema {
// const schema = this.schemas[name]
// if (!schema) { throw new Error(`schema ${name} not found`) }
// return this.untransform(schema)
// }

// public list ():Schema[] {
// const result:Schema[] = []
// for (const p in this.schemas) {
// result.push(this.untransform(this.schemas[p]))
// }
// return result
// }

// public getInstance (name:string):SchemaHelper {
// const schema = this.schemas[name]
// if (!schema) { throw new Error(`schema ${name} not found`) }
// return new SchemaHelper(schema)
// }

// public transform (source:Schema):any {
// const target:any = { entity: {}, enum: {} }
// target.name = source.name
// for (const p in source.entities) {
// const sourceEntity = source.entities[p]
// const targetEntity:any = {
// name: sourceEntity.name,
// mapping: sourceEntity.mapping,
// primaryKey: sourceEntity.primaryKey,
// uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
// property: {},
// relation: {},
// index: {}
// }
// for (const q in sourceEntity.properties) {
// const sourceProperty = sourceEntity.properties[q]
// targetEntity.property[sourceProperty.name] = sourceProperty
// }
// for (const q in sourceEntity.relations) {
// const sourceRelation = sourceEntity.relations[q]
// targetEntity.relation[sourceRelation.name] = sourceRelation
// }
// if (sourceEntity.indexes) {
// for (const q in sourceEntity.indexes) {
// const index = sourceEntity.indexes[q]
// targetEntity.index[index.name] = index
// }
// }
// target.entity[sourceEntity.name] = targetEntity
// }
// return target
// }

// public untransform (source:any):Schema {
// const target:Schema = { name: source.name as string, entities: [], enums: [] }
// for (const p in source.entity) {
// const sourceEntity = source.entity[p]
// const targetEntity:Entity = {
// name: sourceEntity.name as string,
// mapping: sourceEntity.mapping as string,
// primaryKey: sourceEntity.primaryKey,
// uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
// properties: [],
// relations: [],
// indexes: []
// }
// for (const q in sourceEntity.property) {
// const sourceProperty = sourceEntity.property[q]
// const targetProperty:Property = {
// name: sourceProperty.name,
// mapping: sourceProperty.mapping,
// type: sourceProperty.type
// }
// // properties defined when is necesary
// if (sourceProperty.length !== undefined)targetProperty.length = sourceProperty.length
// if (sourceProperty.nullable !== undefined)targetProperty.nullable = sourceProperty.nullable
// if (sourceProperty.autoincrement !== undefined)targetProperty.autoincrement = sourceProperty.autoincrement
// targetEntity.properties.push(targetProperty)
// }
// for (const q in sourceEntity.relation) {
// const sourceRelation = sourceEntity.relation[q]
// const targetRelation:Relation = {
// name: sourceRelation.name,
// type: sourceRelation.type,
// composite: Helper.nvl(sourceRelation.composite, false),
// from: sourceRelation.from,
// entity: sourceRelation.entity,
// to: sourceRelation.to
// }
// targetEntity.relations.push(targetRelation)
// }
// for (const q in sourceEntity.index) {
// const sourceIndex = sourceEntity.index[q]
// const targetIndex:Index = {
// name: sourceIndex.name,
// fields: sourceIndex.fields
// }
// targetEntity.indexes?.push(targetIndex)
// }
// target.entities.push(targetEntity)
// }
// return target
// }
// }
