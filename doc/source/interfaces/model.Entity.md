[Lambda ORM](../README.md) / [model](../modules/model.md) / Entity

# Interface: Entity

[model](../modules/model.md).Entity

## Hierarchy

- **`Entity`**

  ↳ [`EntityMapping`](model.EntityMapping.md)

  ↳ [`FormatMapping`](model.FormatMapping.md)

## Table of contents

### Properties

- [abstract](model.Entity.md#abstract)
- [composite](model.Entity.md#composite)
- [constraints](model.Entity.md#constraints)
- [dependents](model.Entity.md#dependents)
- [extends](model.Entity.md#extends)
- [hadDefaults](model.Entity.md#haddefaults)
- [hadReadExps](model.Entity.md#hadreadexps)
- [hadReadValues](model.Entity.md#hadreadvalues)
- [hadViewReadExp](model.Entity.md#hadviewreadexp)
- [hadWriteExps](model.Entity.md#hadwriteexps)
- [hadWriteValues](model.Entity.md#hadwritevalues)
- [indexes](model.Entity.md#indexes)
- [name](model.Entity.md#name)
- [primaryKey](model.Entity.md#primarykey)
- [properties](model.Entity.md#properties)
- [relations](model.Entity.md#relations)
- [singular](model.Entity.md#singular)
- [uniqueKey](model.Entity.md#uniquekey)
- [view](model.Entity.md#view)

## Properties

### abstract

• `Optional` **abstract**: `boolean`

#### Defined in

[src/lib/model/schema.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L56)

___

### composite

• `Optional` **composite**: `boolean`

#### Defined in

[src/lib/model/schema.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L72)

___

### constraints

• `Optional` **constraints**: [`Constraint`](model.Constraint.md)[]

#### Defined in

[src/lib/model/schema.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L65)

___

### dependents

• **dependents**: [`Dependent`](model.Dependent.md)[]

#### Defined in

[src/lib/model/schema.ts:64](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L64)

___

### extends

• `Optional` **extends**: `string`

#### Defined in

[src/lib/model/schema.ts:55](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L55)

___

### hadDefaults

• `Optional` **hadDefaults**: `boolean`

#### Defined in

[src/lib/model/schema.ts:70](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L70)

___

### hadReadExps

• `Optional` **hadReadExps**: `boolean`

#### Defined in

[src/lib/model/schema.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L66)

___

### hadReadValues

• `Optional` **hadReadValues**: `boolean`

#### Defined in

[src/lib/model/schema.ts:68](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L68)

___

### hadViewReadExp

• `Optional` **hadViewReadExp**: `boolean`

#### Defined in

[src/lib/model/schema.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L71)

___

### hadWriteExps

• `Optional` **hadWriteExps**: `boolean`

#### Defined in

[src/lib/model/schema.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L67)

___

### hadWriteValues

• `Optional` **hadWriteValues**: `boolean`

#### Defined in

[src/lib/model/schema.ts:69](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L69)

___

### indexes

• **indexes**: [`Index`](model.Index.md)[]

#### Defined in

[src/lib/model/schema.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L60)

___

### name

• **name**: `string`

#### Defined in

[src/lib/model/schema.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L54)

___

### primaryKey

• **primaryKey**: `string`[]

#### Defined in

[src/lib/model/schema.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L61)

___

### properties

• **properties**: [`Property`](model.Property.md)[]

#### Defined in

[src/lib/model/schema.ts:62](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L62)

___

### relations

• **relations**: [`Relation`](model.Relation.md)[]

#### Defined in

[src/lib/model/schema.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L63)

___

### singular

• `Optional` **singular**: `string`

#### Defined in

[src/lib/model/schema.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L57)

___

### uniqueKey

• **uniqueKey**: `string`[]

#### Defined in

[src/lib/model/schema.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L59)

___

### view

• `Optional` **view**: `boolean`

#### Defined in

[src/lib/model/schema.ts:58](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/schema.ts#L58)
