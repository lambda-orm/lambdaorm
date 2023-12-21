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

node_modules/lambdaorm-base/schema/domain/schema.d.ts:60

___

### composite

• `Optional` **composite**: `boolean`

#### Inherited from

[Entity](Entity.md).[composite](Entity.md#composite)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:77

___

### constraints

• `Optional` **constraints**: [`Constraint`](Constraint.md)[]

#### Inherited from

[Entity](Entity.md).[constraints](Entity.md#constraints)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:70

___

### date

• `Optional` **date**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:99

___

### dateTime

• `Optional` **dateTime**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:98

___

### dependents

• **dependents**: [`Dependent`](Dependent.md)[]

#### Inherited from

[Entity](Entity.md).[dependents](Entity.md#dependents)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:69

___

### extends

• `Optional` **extends**: `string`

#### Inherited from

[Entity](Entity.md).[extends](Entity.md#extends)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:59

___

### hadDefaults

• `Optional` **hadDefaults**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadDefaults](Entity.md#haddefaults)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:75

___

### hadReadExps

• `Optional` **hadReadExps**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadReadExps](Entity.md#hadreadexps)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:71

___

### hadReadValues

• `Optional` **hadReadValues**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadReadValues](Entity.md#hadreadvalues)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:73

___

### hadViewReadExp

• `Optional` **hadViewReadExp**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadViewReadExp](Entity.md#hadviewreadexp)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:76

___

### hadWriteExps

• `Optional` **hadWriteExps**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadWriteExps](Entity.md#hadwriteexps)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:72

___

### hadWriteValues

• `Optional` **hadWriteValues**: `boolean`

#### Inherited from

[Entity](Entity.md).[hadWriteValues](Entity.md#hadwritevalues)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:74

___

### indexes

• **indexes**: [`Index`](Index.md)[]

#### Inherited from

[Entity](Entity.md).[indexes](Entity.md#indexes)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:66

___

### name

• **name**: `string`

#### Inherited from

[Entity](Entity.md).[name](Entity.md#name)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:58

___

### primaryKey

• **primaryKey**: `string`[]

#### Inherited from

[Entity](Entity.md).[primaryKey](Entity.md#primarykey)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:63

___

### properties

• **properties**: [`Property`](Property.md)[]

#### Inherited from

[Entity](Entity.md).[properties](Entity.md#properties)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:67

___

### relations

• **relations**: [`Relation`](Relation.md)[]

#### Inherited from

[Entity](Entity.md).[relations](Entity.md#relations)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:68

___

### required

• **required**: `string`[]

#### Inherited from

[Entity](Entity.md).[required](Entity.md#required)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:65

___

### singular

• `Optional` **singular**: `string`

#### Inherited from

[Entity](Entity.md).[singular](Entity.md#singular)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:61

___

### time

• `Optional` **time**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:100

___

### uniqueKey

• **uniqueKey**: `string`[]

#### Inherited from

[Entity](Entity.md).[uniqueKey](Entity.md#uniquekey)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:64

___

### view

• `Optional` **view**: `boolean`

#### Inherited from

[Entity](Entity.md).[view](Entity.md#view)

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:62
