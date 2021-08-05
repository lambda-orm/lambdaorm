export interface Namespace
{
    name: string
    connection:string
    schema:string
}
export interface Schema {
    name: string
    mapping: string
    entities: Entity[]
    enums: Enum[]
}
export interface Enum {
    name: string
    values: any[]
}
export interface Entity {
    name: string
    mapping?: string
    primaryKey?:string[]
    uniqueKey?:string[]
    properties:Property[]
    relations:Relation[]
    indexes?:Index[]
}
export interface Property {
    name: string 
    mapping?: string
    type: string
    length?: number
    nullable?: boolean
    primaryKey?: boolean
    autoincrement?: boolean
}
export interface Relation {
    name: string
    type: string
    from: string
    entity: string
    to: string
}
export interface Index {
    name: string
    fields: string[]
}
