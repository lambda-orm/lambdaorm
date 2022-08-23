[Lambda ORM](../README.md) / [model](../modules/model.md) / EntityMapping

# Interface: EntityMapping

[model](../modules/model.md).EntityMapping

## Hierarchy

- [`Entity`](model.Entity.md)

  ↳ **`EntityMapping`**

## Table of contents

### Properties

- [abstract](model.EntityMapping.md#abstract)
- [composite](model.EntityMapping.md#composite)
- [constraints](model.EntityMapping.md#constraints)
- [dependents](model.EntityMapping.md#dependents)
- [extends](model.EntityMapping.md#extends)
- [filter](model.EntityMapping.md#filter)
- [hadDefaults](model.EntityMapping.md#haddefaults)
- [hadKeys](model.EntityMapping.md#hadkeys)
- [hadReadExps](model.EntityMapping.md#hadreadexps)
- [hadReadMappingExp](model.EntityMapping.md#hadreadmappingexp)
- [hadReadValues](model.EntityMapping.md#hadreadvalues)
- [hadViewReadExp](model.EntityMapping.md#hadviewreadexp)
- [hadWriteExps](model.EntityMapping.md#hadwriteexps)
- [hadWriteValues](model.EntityMapping.md#hadwritevalues)
- [indexes](model.EntityMapping.md#indexes)
- [mapping](model.EntityMapping.md#mapping)
- [name](model.EntityMapping.md#name)
- [primaryKey](model.EntityMapping.md#primarykey)
- [properties](model.EntityMapping.md#properties)
- [relations](model.EntityMapping.md#relations)
- [sequence](model.EntityMapping.md#sequence)
- [singular](model.EntityMapping.md#singular)
- [uniqueKey](model.EntityMapping.md#uniquekey)
- [view](model.EntityMapping.md#view)

## Properties

### abstract

• `Optional` **abstract**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[abstract](model.Entity.md#abstract)

#### Defined in

[src/lib/model/schema.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L56)

___

### composite

• `Optional` **composite**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[composite](model.Entity.md#composite)

#### Defined in

[src/lib/model/schema.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L72)

___

### constraints

• `Optional` **constraints**: [`Constraint`](model.Constraint.md)[]

#### Inherited from

[Entity](model.Entity.md).[constraints](model.Entity.md#constraints)

#### Defined in

[src/lib/model/schema.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L65)

___

### dependents

• **dependents**: [`Dependent`](model.Dependent.md)[]

#### Inherited from

[Entity](model.Entity.md).[dependents](model.Entity.md#dependents)

#### Defined in

[src/lib/model/schema.ts:64](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L64)

___

### extends

• `Optional` **extends**: `string`

#### Inherited from

[Entity](model.Entity.md).[extends](model.Entity.md#extends)

#### Defined in

[src/lib/model/schema.ts:55](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L55)

___

### filter

• `Optional` **filter**: `string`

#### Defined in

[src/lib/model/schema.ts:88](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L88)

___

### hadDefaults

• `Optional` **hadDefaults**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadDefaults](model.Entity.md#haddefaults)

#### Defined in

[src/lib/model/schema.ts:70](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L70)

___

### hadKeys

• `Optional` **hadKeys**: `boolean`

#### Defined in

[src/lib/model/schema.ts:89](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L89)

___

### hadReadExps

• `Optional` **hadReadExps**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadReadExps](model.Entity.md#hadreadexps)

#### Defined in

[src/lib/model/schema.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L66)

___

### hadReadMappingExp

• `Optional` **hadReadMappingExp**: `boolean`

#### Defined in

[src/lib/model/schema.ts:90](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L90)

___

### hadReadValues

• `Optional` **hadReadValues**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadReadValues](model.Entity.md#hadreadvalues)

#### Defined in

[src/lib/model/schema.ts:68](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L68)

___

### hadViewReadExp

• `Optional` **hadViewReadExp**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadViewReadExp](model.Entity.md#hadviewreadexp)

#### Defined in

[src/lib/model/schema.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L71)

___

### hadWriteExps

• `Optional` **hadWriteExps**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadWriteExps](model.Entity.md#hadwriteexps)

#### Defined in

[src/lib/model/schema.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L67)

___

### hadWriteValues

• `Optional` **hadWriteValues**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadWriteValues](model.Entity.md#hadwritevalues)

#### Defined in

[src/lib/model/schema.ts:69](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L69)

___

### indexes

• **indexes**: [`Index`](model.Index.md)[]

#### Inherited from

[Entity](model.Entity.md).[indexes](model.Entity.md#indexes)

#### Defined in

[src/lib/model/schema.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L60)

___

### mapping

• **mapping**: `string`

#### Defined in

[src/lib/model/schema.ts:85](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L85)

___

### name

• **name**: `string`

#### Inherited from

[Entity](model.Entity.md).[name](model.Entity.md#name)

#### Defined in

[src/lib/model/schema.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L54)

___

### primaryKey

• **primaryKey**: `string`[]

#### Inherited from

[Entity](model.Entity.md).[primaryKey](model.Entity.md#primarykey)

#### Defined in

[src/lib/model/schema.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L61)

___

### properties

• **properties**: [`PropertyMapping`](model.PropertyMapping.md)[]

#### Overrides

[Entity](model.Entity.md).[properties](model.Entity.md#properties)

#### Defined in

[src/lib/model/schema.ts:87](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L87)

___

### relations

• **relations**: [`Relation`](model.Relation.md)[]

#### Inherited from

[Entity](model.Entity.md).[relations](model.Entity.md#relations)

#### Defined in

[src/lib/model/schema.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L63)

___

### sequence

• **sequence**: `string`

#### Defined in

[src/lib/model/schema.ts:86](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L86)

___

### singular

• `Optional` **singular**: `string`

#### Inherited from

[Entity](model.Entity.md).[singular](model.Entity.md#singular)

#### Defined in

[src/lib/model/schema.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L57)

___

### uniqueKey

• **uniqueKey**: `string`[]

#### Inherited from

[Entity](model.Entity.md).[uniqueKey](model.Entity.md#uniquekey)

#### Defined in

[src/lib/model/schema.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L59)

___

### view

• `Optional` **view**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[view](model.Entity.md#view)

#### Defined in

[src/lib/model/schema.ts:58](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/schema.ts#L58)
