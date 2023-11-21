[Lambda ORM](../README.md) / FormatMapping

# Interface: FormatMapping

## Hierarchy

- [`Entity`](Entity.md)

  ↳ **`FormatMapping`**

## Table of contents

### Properties

- [abstract](FormatMapping.md#abstract)
- [composite](FormatMapping.md#composite)
- [constraints](FormatMapping.md#constraints)
- [date](FormatMapping.md#date)
- [dateTime](FormatMapping.md#datetime)
- [dependents](FormatMapping.md#dependents)
- [extends](FormatMapping.md#extends)
- [hadDefaults](FormatMapping.md#haddefaults)
- [hadReadExps](FormatMapping.md#hadreadexps)
- [hadReadValues](FormatMapping.md#hadreadvalues)
- [hadViewReadExp](FormatMapping.md#hadviewreadexp)
- [hadWriteExps](FormatMapping.md#hadwriteexps)
- [hadWriteValues](FormatMapping.md#hadwritevalues)
- [indexes](FormatMapping.md#indexes)
- [name](FormatMapping.md#name)
- [primaryKey](FormatMapping.md#primarykey)
- [properties](FormatMapping.md#properties)
- [relations](FormatMapping.md#relations)
- [required](FormatMapping.md#required)
- [singular](FormatMapping.md#singular)
- [time](FormatMapping.md#time)
- [uniqueKey](FormatMapping.md#uniquekey)
- [view](FormatMapping.md#view)

## Properties

### abstract

• `Optional` **abstract**: `boolean`

#### Inherited from

[Entity](Entity.md).[abstract](Entity.md#abstract)

#### Defined in

[src/lib/schema/domain/schema.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L61)

___

### composite

• `Optional` **composite**: `boolean`

#### Inherited from

[Entity](Entity.md).[composite](Entity.md#composite)

#### Defined in

[src/lib/schema/domain/schema.ts:78](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L78)

___

### constraints

• `Optional` **constraints**: [`Constraint`](Constraint.md)[]

#### Inherited from

[Entity](Entity.md).[constraints](Entity.md#constraints)

#### Defined in

[src/lib/schema/domain/schema.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L71)

___

### date

• `Optional` **date**: `string`

#### Defined in

[src/lib/schema/domain/schema.ts:100](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L100)

___

### dateTime

• `Optional` **dateTime**: `string`

#### Defined in

[src/lib/schema/domain/schema.ts:99](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L99)

___

### dependents

• **dependents**: [`Dependent`](Dependent.md)[]

#### Inherited from

[Entity](Entity.md).[dependents](Entity.md#dependents)

#### Defined in

[src/lib/schema/domain/schema.ts:70](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L70)

___

### extends

• `Optional` **extends**: `string`

#### Inherited from

[Entity](Entity.md).[extends](Entity.md#extends)

#### Defined in

[src/lib/schema/domain/schema.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L60)

___

### hadDefaults

• `Optional` **hadDefaults**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadDefaults](Entity.md#haddefaults)

#### Defined in

[src/lib/schema/domain/schema.ts:76](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L76)

___

### hadReadExps

• `Optional` **hadReadExps**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadReadExps](Entity.md#hadreadexps)

#### Defined in

[src/lib/schema/domain/schema.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L72)

___

### hadReadValues

• `Optional` **hadReadValues**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadReadValues](Entity.md#hadreadvalues)

#### Defined in

[src/lib/schema/domain/schema.ts:74](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L74)

___

### hadViewReadExp

• `Optional` **hadViewReadExp**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadViewReadExp](Entity.md#hadviewreadexp)

#### Defined in

[src/lib/schema/domain/schema.ts:77](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L77)

___

### hadWriteExps

• `Optional` **hadWriteExps**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadWriteExps](Entity.md#hadwriteexps)

#### Defined in

[src/lib/schema/domain/schema.ts:73](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L73)

___

### hadWriteValues

• `Optional` **hadWriteValues**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadWriteValues](Entity.md#hadwritevalues)

#### Defined in

[src/lib/schema/domain/schema.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L75)

___

### indexes

• **indexes**: [`Index`](Index.md)[]

#### Inherited from

[Entity](Entity.md).[indexes](Entity.md#indexes)

#### Defined in

[src/lib/schema/domain/schema.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L67)

___

### name

• **name**: `string`

#### Inherited from

[Entity](Entity.md).[name](Entity.md#name)

#### Defined in

[src/lib/schema/domain/schema.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L59)

___

### primaryKey

• **primaryKey**: `string`[]

#### Inherited from

[Entity](Entity.md).[primaryKey](Entity.md#primarykey)

#### Defined in

[src/lib/schema/domain/schema.ts:64](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L64)

___

### properties

• **properties**: [`Property`](Property.md)[]

#### Inherited from

[Entity](Entity.md).[properties](Entity.md#properties)

#### Defined in

[src/lib/schema/domain/schema.ts:68](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L68)

___

### relations

• **relations**: [`Relation`](Relation.md)[]

#### Inherited from

[Entity](Entity.md).[relations](Entity.md#relations)

#### Defined in

[src/lib/schema/domain/schema.ts:69](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L69)

___

### required

• **required**: `string`[]

#### Inherited from

[Entity](Entity.md).[required](Entity.md#required)

#### Defined in

[src/lib/schema/domain/schema.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L66)

___

### singular

• `Optional` **singular**: `string`

#### Inherited from

[Entity](Entity.md).[singular](Entity.md#singular)

#### Defined in

[src/lib/schema/domain/schema.ts:62](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L62)

___

### time

• `Optional` **time**: `string`

#### Defined in

[src/lib/schema/domain/schema.ts:101](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L101)

___

### uniqueKey

• **uniqueKey**: `string`[]

#### Inherited from

[Entity](Entity.md).[uniqueKey](Entity.md#uniquekey)

#### Defined in

[src/lib/schema/domain/schema.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L65)

___

### view

• `Optional` **view**: `boolean`

#### Inherited from

[Entity](Entity.md).[view](Entity.md#view)

#### Defined in

[src/lib/schema/domain/schema.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/0c231c6f/src/lib/schema/domain/schema.ts#L63)
