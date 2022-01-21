[Lambda ORM](../README.md) / [model](../modules/model.md) / Entity

# Interface: Entity

[model](../modules/model.md).Entity

## Hierarchy

- **`Entity`**

  ↳ [`EntityMapping`](model.EntityMapping.md)

## Table of contents

### Properties

- [abstract](model.Entity.md#abstract)
- [extends](model.Entity.md#extends)
- [indexes](model.Entity.md#indexes)
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

[src/lib/model/schema.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L32)

___

### extends

• `Optional` **extends**: `string`

#### Defined in

[src/lib/model/schema.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L31)

___

### indexes

• **indexes**: [`Index`](model.Index.md)[]

#### Defined in

[src/lib/model/schema.ts:35](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L35)

___

### name

• **name**: `string`

#### Defined in

[src/lib/model/schema.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L30)

___

### primaryKey

• **primaryKey**: `string`[]

#### Defined in

[src/lib/model/schema.ts:36](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L36)

___

### properties

• **properties**: [`Property`](model.Property.md)[]

#### Defined in

[src/lib/model/schema.ts:37](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L37)

___

### relations

• **relations**: [`Relation`](model.Relation.md)[]

#### Defined in

[src/lib/model/schema.ts:38](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L38)

___

### singular

• `Optional` **singular**: `string`

#### Defined in

[src/lib/model/schema.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L33)

___

### uniqueKey

• **uniqueKey**: `string`[]

#### Defined in

[src/lib/model/schema.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/model/schema.ts#L34)
