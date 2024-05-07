[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / EntityMapping

# Interface: EntityMapping

## Extends

- [`Entity`](Entity.md)

## Properties

### abstract?

> `optional` **abstract**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`abstract`](Entity.md#abstract)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:61

***

### composite?

> `optional` **composite**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`composite`](Entity.md#composite)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:77

***

### constraints?

> `optional` **constraints**: [`Constraint`](Constraint.md)[]

#### Inherited from

[`Entity`](Entity.md).[`constraints`](Entity.md#constraints)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:70

***

### dependents?

> `optional` **dependents**: [`Dependent`](Dependent.md)[]

#### Inherited from

[`Entity`](Entity.md).[`dependents`](Entity.md#dependents)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:69

***

### extends?

> `optional` **extends**: `string`

#### Inherited from

[`Entity`](Entity.md).[`extends`](Entity.md#extends)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:60

***

### filter?

> `optional` **filter**: `string`

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:94

***

### hadDefaults?

> `optional` **hadDefaults**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`hadDefaults`](Entity.md#haddefaults)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:75

***

### hadKeys?

> `optional` **hadKeys**: `boolean`

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:95

***

### hadReadExps?

> `optional` **hadReadExps**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`hadReadExps`](Entity.md#hadreadexps)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:71

***

### hadReadMappingExp?

> `optional` **hadReadMappingExp**: `boolean`

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:96

***

### hadReadValues?

> `optional` **hadReadValues**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`hadReadValues`](Entity.md#hadreadvalues)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:73

***

### hadViewReadExp?

> `optional` **hadViewReadExp**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`hadViewReadExp`](Entity.md#hadviewreadexp)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:76

***

### hadWriteExps?

> `optional` **hadWriteExps**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`hadWriteExps`](Entity.md#hadwriteexps)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:72

***

### hadWriteValues?

> `optional` **hadWriteValues**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`hadWriteValues`](Entity.md#hadwritevalues)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:74

***

### indexes?

> `optional` **indexes**: [`Index`](Index.md)[]

#### Inherited from

[`Entity`](Entity.md).[`indexes`](Entity.md#indexes)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:68

***

### intermediate?

> `optional` **intermediate**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`intermediate`](Entity.md#intermediate)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:78

***

### mapping?

> `optional` **mapping**: `string`

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:91

***

### name

> **name**: `string`

#### Inherited from

[`Entity`](Entity.md).[`name`](Entity.md#name)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:58

***

### primaryKey?

> `optional` **primaryKey**: `string`[]

#### Inherited from

[`Entity`](Entity.md).[`primaryKey`](Entity.md#primarykey)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:64

***

### properties?

> `optional` **properties**: [`PropertyMapping`](PropertyMapping.md)[]

#### Overrides

[`Entity`](Entity.md).[`properties`](Entity.md#properties)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:93

***

### relations?

> `optional` **relations**: [`Relation`](Relation.md)[]

#### Inherited from

[`Entity`](Entity.md).[`relations`](Entity.md#relations)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:66

***

### required?

> `optional` **required**: `string`[]

#### Inherited from

[`Entity`](Entity.md).[`required`](Entity.md#required)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:67

***

### sequence?

> `optional` **sequence**: `string`

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:92

***

### singular?

> `optional` **singular**: `string`

#### Inherited from

[`Entity`](Entity.md).[`singular`](Entity.md#singular)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:62

***

### uniqueKey?

> `optional` **uniqueKey**: `string`[]

#### Inherited from

[`Entity`](Entity.md).[`uniqueKey`](Entity.md#uniquekey)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:65

***

### view?

> `optional` **view**: `boolean`

#### Inherited from

[`Entity`](Entity.md).[`view`](Entity.md#view)

#### Source

node\_modules/lambdaorm-base/schema/domain/schema.d.ts:63
