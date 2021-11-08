[Lambda ORM](../README.md) / [model](../modules/model.md) / Entity

# Interface: Entity

[model](../modules/model.md).Entity

## Table of contents

### Properties

- [abstract](model.Entity.md#abstract)
- [excludeModel](model.Entity.md#excludemodel)
- [extends](model.Entity.md#extends)
- [externalDb](model.Entity.md#externaldb)
- [indexes](model.Entity.md#indexes)
- [mapping](model.Entity.md#mapping)
- [name](model.Entity.md#name)
- [primaryKey](model.Entity.md#primarykey)
- [properties](model.Entity.md#properties)
- [relations](model.Entity.md#relations)
- [singular](model.Entity.md#singular)
- [uniqueKey](model.Entity.md#uniquekey)

## Properties

### abstract

• `Optional` **abstract**: `boolean`

#### Defined in

[model/schema.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L34)

___

### excludeModel

• `Optional` **excludeModel**: `boolean`

#### Defined in

[model/schema.ts:35](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L35)

___

### extends

• `Optional` **extends**: `string`

#### Defined in

[model/schema.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L33)

___

### externalDb

• `Optional` **externalDb**: `string`

#### Defined in

[model/schema.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L43)

___

### indexes

• `Optional` **indexes**: [`Index`](model.Index.md)[]

#### Defined in

[model/schema.ts:42](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L42)

___

### mapping

• `Optional` **mapping**: `string`

#### Defined in

[model/schema.ts:37](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L37)

___

### name

• **name**: `string`

#### Defined in

[model/schema.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L32)

___

### primaryKey

• `Optional` **primaryKey**: `string`[]

#### Defined in

[model/schema.ts:38](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L38)

___

### properties

• **properties**: [`Property`](model.Property.md)[]

#### Defined in

[model/schema.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L40)

___

### relations

• **relations**: [`Relation`](model.Relation.md)[]

#### Defined in

[model/schema.ts:41](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L41)

___

### singular

• `Optional` **singular**: `string`

#### Defined in

[model/schema.ts:36](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L36)

___

### uniqueKey

• `Optional` **uniqueKey**: `string`[]

#### Defined in

[model/schema.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/schema.ts#L39)
