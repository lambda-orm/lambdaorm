[Lambda ORM](../README.md) / [model](../modules/model.md) / EntityMapping

# Interface: EntityMapping

[model](../modules/model.md).EntityMapping

## Hierarchy

- [`Entity`](model.Entity.md)

  ↳ **`EntityMapping`**

## Table of contents

### Properties

- [abstract](model.EntityMapping.md#abstract)
- [extends](model.EntityMapping.md#extends)
- [indexes](model.EntityMapping.md#indexes)
- [mapping](model.EntityMapping.md#mapping)
- [name](model.EntityMapping.md#name)
- [primaryKey](model.EntityMapping.md#primarykey)
- [properties](model.EntityMapping.md#properties)
- [relations](model.EntityMapping.md#relations)
- [singular](model.EntityMapping.md#singular)
- [uniqueKey](model.EntityMapping.md#uniquekey)

## Properties

### abstract

• `Optional` **abstract**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[abstract](model.Entity.md#abstract)

#### Defined in

[src/lib/model/schema.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L32)

___

### extends

• `Optional` **extends**: `string`

#### Inherited from

[Entity](model.Entity.md).[extends](model.Entity.md#extends)

#### Defined in

[src/lib/model/schema.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L31)

___

### indexes

• **indexes**: [`Index`](model.Index.md)[]

#### Inherited from

[Entity](model.Entity.md).[indexes](model.Entity.md#indexes)

#### Defined in

[src/lib/model/schema.ts:35](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L35)

___

### mapping

• **mapping**: `string`

#### Defined in

[src/lib/model/schema.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L51)

___

### name

• **name**: `string`

#### Inherited from

[Entity](model.Entity.md).[name](model.Entity.md#name)

#### Defined in

[src/lib/model/schema.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L30)

___

### primaryKey

• **primaryKey**: `string`[]

#### Inherited from

[Entity](model.Entity.md).[primaryKey](model.Entity.md#primarykey)

#### Defined in

[src/lib/model/schema.ts:36](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L36)

___

### properties

• **properties**: [`PropertyMapping`](model.PropertyMapping.md)[]

#### Overrides

[Entity](model.Entity.md).[properties](model.Entity.md#properties)

#### Defined in

[src/lib/model/schema.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L52)

___

### relations

• **relations**: [`Relation`](model.Relation.md)[]

#### Inherited from

[Entity](model.Entity.md).[relations](model.Entity.md#relations)

#### Defined in

[src/lib/model/schema.ts:38](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L38)

___

### singular

• `Optional` **singular**: `string`

#### Inherited from

[Entity](model.Entity.md).[singular](model.Entity.md#singular)

#### Defined in

[src/lib/model/schema.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L33)

___

### uniqueKey

• **uniqueKey**: `string`[]

#### Inherited from

[Entity](model.Entity.md).[uniqueKey](model.Entity.md#uniquekey)

#### Defined in

[src/lib/model/schema.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/model/schema.ts#L34)
