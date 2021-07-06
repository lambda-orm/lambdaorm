export interface Schema {
    name: string
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
    properties:Property[]
    relations:Relation[]
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
    to: RelationTo
}    
export interface RelationTo {
    entity: string
    property: string
}
