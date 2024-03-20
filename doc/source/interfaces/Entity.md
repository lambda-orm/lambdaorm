[Lambda ORM](../README.md) / Entity

# Interface: Entity

## Hierarchy

- **`Entity`**

  ↳ [`EntityMapping`](EntityMapping.md)

  ↳ [`FormatMapping`](FormatMapping.md)

## Table of contents

### Properties

- [abstract](Entity.md#abstract)
- [composite](Entity.md#composite)
- [constraints](Entity.md#constraints)
- [dependents](Entity.md#dependents)
- [extends](Entity.md#extends)
- [hadDefaults](Entity.md#haddefaults)
- [hadReadExps](Entity.md#hadreadexps)
- [hadReadValues](Entity.md#hadreadvalues)
- [hadViewReadExp](Entity.md#hadviewreadexp)
- [hadWriteExps](Entity.md#hadwriteexps)
- [hadWriteValues](Entity.md#hadwritevalues)
- [indexes](Entity.md#indexes)
- [intermediate](Entity.md#intermediate)
- [name](Entity.md#name)
- [primaryKey](Entity.md#primarykey)
- [properties](Entity.md#properties)
- [relations](Entity.md#relations)
- [required](Entity.md#required)
- [singular](Entity.md#singular)
- [uniqueKey](Entity.md#uniquekey)
- [view](Entity.md#view)

## Properties

### abstract

• `Optional` **abstract**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:61

___

### composite

• `Optional` **composite**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:78

___

### constraints

• `Optional` **constraints**: [`Constraint`](Constraint.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:71

___

### dependents

• **dependents**: [`Dependent`](Dependent.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:70

___

### extends

• `Optional` **extends**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:60

___

### hadDefaults

• `Optional` **hadDefaults**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:76

___

### hadReadExps

• `Optional` **hadReadExps**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:72

___

### hadReadValues

• `Optional` **hadReadValues**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:74

___

### hadViewReadExp

• `Optional` **hadViewReadExp**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:77

___

### hadWriteExps

• `Optional` **hadWriteExps**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:73

___

### hadWriteValues

• `Optional` **hadWriteValues**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:75

___

### indexes

• **indexes**: [`Index`](Index.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:67

___

### intermediate

• `Optional` **intermediate**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:79

___

### name

• **name**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:59

___

### primaryKey

• **primaryKey**: `string`[]

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:64

___

### properties

• **properties**: [`Property`](Property.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:68

___

### relations

• **relations**: [`Relation`](Relation.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:69

___

### required

• **required**: `string`[]

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:66

___

### singular

• `Optional` **singular**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:62

___

### uniqueKey

• **uniqueKey**: `string`[]

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:65

___

### view

• `Optional` **view**: `boolean`

#### Defined in

node_modules/lambdaorm-base/schema/domain/schema.d.ts:63
