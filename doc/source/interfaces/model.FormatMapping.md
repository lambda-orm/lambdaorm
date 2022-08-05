[Lambda ORM](../README.md) / [model](../modules/model.md) / FormatMapping

# Interface: FormatMapping

[model](../modules/model.md).FormatMapping

## Hierarchy

- [`Entity`](model.Entity.md)

  ↳ **`FormatMapping`**

## Table of contents

### Properties

- [abstract](model.FormatMapping.md#abstract)
- [composite](model.FormatMapping.md#composite)
- [constraints](model.FormatMapping.md#constraints)
- [date](model.FormatMapping.md#date)
- [datetime](model.FormatMapping.md#datetime)
- [dependents](model.FormatMapping.md#dependents)
- [extends](model.FormatMapping.md#extends)
- [hadDefaults](model.FormatMapping.md#haddefaults)
- [hadReadExps](model.FormatMapping.md#hadreadexps)
- [hadReadValues](model.FormatMapping.md#hadreadvalues)
- [hadViewReadExp](model.FormatMapping.md#hadviewreadexp)
- [hadWriteExps](model.FormatMapping.md#hadwriteexps)
- [hadWriteValues](model.FormatMapping.md#hadwritevalues)
- [indexes](model.FormatMapping.md#indexes)
- [name](model.FormatMapping.md#name)
- [primaryKey](model.FormatMapping.md#primarykey)
- [properties](model.FormatMapping.md#properties)
- [relations](model.FormatMapping.md#relations)
- [singular](model.FormatMapping.md#singular)
- [time](model.FormatMapping.md#time)
- [uniqueKey](model.FormatMapping.md#uniquekey)
- [view](model.FormatMapping.md#view)

## Properties

### abstract

• `Optional` **abstract**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[abstract](model.Entity.md#abstract)

#### Defined in

[src/lib/model/schema.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L56)

___

### composite

• `Optional` **composite**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[composite](model.Entity.md#composite)

#### Defined in

[src/lib/model/schema.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L72)

___

### constraints

• `Optional` **constraints**: [`Constraint`](model.Constraint.md)[]

#### Inherited from

[Entity](model.Entity.md).[constraints](model.Entity.md#constraints)

#### Defined in

[src/lib/model/schema.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L65)

___

### date

• `Optional` **date**: `string`

#### Defined in

[src/lib/model/schema.ts:94](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L94)

___

### datetime

• `Optional` **datetime**: `string`

#### Defined in

[src/lib/model/schema.ts:93](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L93)

___

### dependents

• **dependents**: [`Dependent`](model.Dependent.md)[]

#### Inherited from

[Entity](model.Entity.md).[dependents](model.Entity.md#dependents)

#### Defined in

[src/lib/model/schema.ts:64](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L64)

___

### extends

• `Optional` **extends**: `string`

#### Inherited from

[Entity](model.Entity.md).[extends](model.Entity.md#extends)

#### Defined in

[src/lib/model/schema.ts:55](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L55)

___

### hadDefaults

• `Optional` **hadDefaults**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadDefaults](model.Entity.md#haddefaults)

#### Defined in

[src/lib/model/schema.ts:70](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L70)

___

### hadReadExps

• `Optional` **hadReadExps**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadReadExps](model.Entity.md#hadreadexps)

#### Defined in

[src/lib/model/schema.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L66)

___

### hadReadValues

• `Optional` **hadReadValues**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadReadValues](model.Entity.md#hadreadvalues)

#### Defined in

[src/lib/model/schema.ts:68](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L68)

___

### hadViewReadExp

• `Optional` **hadViewReadExp**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadViewReadExp](model.Entity.md#hadviewreadexp)

#### Defined in

[src/lib/model/schema.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L71)

___

### hadWriteExps

• `Optional` **hadWriteExps**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadWriteExps](model.Entity.md#hadwriteexps)

#### Defined in

[src/lib/model/schema.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L67)

___

### hadWriteValues

• `Optional` **hadWriteValues**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[hadWriteValues](model.Entity.md#hadwritevalues)

#### Defined in

[src/lib/model/schema.ts:69](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L69)

___

### indexes

• **indexes**: [`Index`](model.Index.md)[]

#### Inherited from

[Entity](model.Entity.md).[indexes](model.Entity.md#indexes)

#### Defined in

[src/lib/model/schema.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L60)

___

### name

• **name**: `string`

#### Inherited from

[Entity](model.Entity.md).[name](model.Entity.md#name)

#### Defined in

[src/lib/model/schema.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L54)

___

### primaryKey

• **primaryKey**: `string`[]

#### Inherited from

[Entity](model.Entity.md).[primaryKey](model.Entity.md#primarykey)

#### Defined in

[src/lib/model/schema.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L61)

___

### properties

• **properties**: [`Property`](model.Property.md)[]

#### Inherited from

[Entity](model.Entity.md).[properties](model.Entity.md#properties)

#### Defined in

[src/lib/model/schema.ts:62](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L62)

___

### relations

• **relations**: [`Relation`](model.Relation.md)[]

#### Inherited from

[Entity](model.Entity.md).[relations](model.Entity.md#relations)

#### Defined in

[src/lib/model/schema.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L63)

___

### singular

• `Optional` **singular**: `string`

#### Inherited from

[Entity](model.Entity.md).[singular](model.Entity.md#singular)

#### Defined in

[src/lib/model/schema.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L57)

___

### time

• `Optional` **time**: `string`

#### Defined in

[src/lib/model/schema.ts:95](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L95)

___

### uniqueKey

• **uniqueKey**: `string`[]

#### Inherited from

[Entity](model.Entity.md).[uniqueKey](model.Entity.md#uniquekey)

#### Defined in

[src/lib/model/schema.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L59)

___

### view

• `Optional` **view**: `boolean`

#### Inherited from

[Entity](model.Entity.md).[view](model.Entity.md#view)

#### Defined in

[src/lib/model/schema.ts:58](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L58)
