import { EntityMapping, Index, PropertyMapping, Query, Relation } from '../model'

// export interface IDialectService {
// name: string
// format: DialectFormat
// get solveComposite (): boolean
// operator (name: string, operands: number): string
// function (name: string): any
// dml (name: string): string
// other (name: string): string
// ddl (name: string): string
// type (name: string): string
// delimiter (name: string, force?:boolean, excludeUnderscore?:boolean): string
// getOperatorMetadata (name: string, operands: number): string | null
// getFunctionMetadata (name: string): string | null
// }

// export interface ILanguageDDLBuilder {

// truncateEntity(entity: EntityMapping): Query | undefined
// setNull(entity: EntityMapping, relation: Relation): Query | undefined
// dropFk(entity: EntityMapping, relation: Relation): Query | undefined
// dropIndex(entity: EntityMapping, index: Index): Query | undefined
// dropSequence(entity: EntityMapping): Query | undefined
// dropEntity(entity: EntityMapping): Query | undefined
// dropPk(entity: EntityMapping): Query | undefined
// dropUk(entity: EntityMapping): Query | undefined
// createEntity(entity: EntityMapping): Query | undefined
// addProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
// alterProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
// dropProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
// addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined
// addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined
// addFk(entity: EntityMapping, relation: Relation): Query | undefined
// createFk(entity: EntityMapping, relation: Relation): Query | undefined
// createIndex(entity: EntityMapping, index: Index): Query | undefined
// createSequence(entity: EntityMapping): Query | undefined
// }
