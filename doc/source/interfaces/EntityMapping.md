[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / EntityMapping

# Interface: EntityMapping

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:91

## Extends

- [`Entity`](Entity.md)

## Properties

### abstract?

> `optional` **abstract**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:61

#### Inherited from

[`Entity`](Entity.md).[`abstract`](Entity.md#abstract)

***

### composite?

> `optional` **composite**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:77

#### Inherited from

[`Entity`](Entity.md).[`composite`](Entity.md#composite)

***

### constraints?

> `optional` **constraints**: [`Constraint`](Constraint.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:70

#### Inherited from

[`Entity`](Entity.md).[`constraints`](Entity.md#constraints)

***

### dependents?

> `optional` **dependents**: [`Dependent`](Dependent.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:69

#### Inherited from

[`Entity`](Entity.md).[`dependents`](Entity.md#dependents)

***

### extends?

> `optional` **extends**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:60

#### Inherited from

[`Entity`](Entity.md).[`extends`](Entity.md#extends)

***

### filter?

> `optional` **filter**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:95

***

### hadDefaults?

> `optional` **hadDefaults**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:75

#### Inherited from

[`Entity`](Entity.md).[`hadDefaults`](Entity.md#haddefaults)

***

### hadKeys?

> `optional` **hadKeys**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:96

***

### hadReadExps?

> `optional` **hadReadExps**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:71

#### Inherited from

[`Entity`](Entity.md).[`hadReadExps`](Entity.md#hadreadexps)

***

### hadReadMappingExp?

> `optional` **hadReadMappingExp**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:97

***

### hadReadValues?

> `optional` **hadReadValues**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:73

#### Inherited from

[`Entity`](Entity.md).[`hadReadValues`](Entity.md#hadreadvalues)

***

### hadViewReadExp?

> `optional` **hadViewReadExp**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:76

#### Inherited from

[`Entity`](Entity.md).[`hadViewReadExp`](Entity.md#hadviewreadexp)

***

### hadWriteExps?

> `optional` **hadWriteExps**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:72

#### Inherited from

[`Entity`](Entity.md).[`hadWriteExps`](Entity.md#hadwriteexps)

***

### hadWriteValues?

> `optional` **hadWriteValues**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:74

#### Inherited from

[`Entity`](Entity.md).[`hadWriteValues`](Entity.md#hadwritevalues)

***

### indexes?

> `optional` **indexes**: [`Index`](Index.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:68

#### Inherited from

[`Entity`](Entity.md).[`indexes`](Entity.md#indexes)

***

### intermediate?

> `optional` **intermediate**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:78

#### Inherited from

[`Entity`](Entity.md).[`intermediate`](Entity.md#intermediate)

***

### mapping?

> `optional` **mapping**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:92

***

### name

> **name**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:58

#### Inherited from

[`Entity`](Entity.md).[`name`](Entity.md#name)

***

### primaryKey?

> `optional` **primaryKey**: `string`[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:64

#### Inherited from

[`Entity`](Entity.md).[`primaryKey`](Entity.md#primarykey)

***

### properties?

> `optional` **properties**: [`PropertyMapping`](PropertyMapping.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:94

#### Overrides

[`Entity`](Entity.md).[`properties`](Entity.md#properties)

***

### relations?

> `optional` **relations**: [`Relation`](Relation.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:66

#### Inherited from

[`Entity`](Entity.md).[`relations`](Entity.md#relations)

***

### required?

> `optional` **required**: `string`[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:67

#### Inherited from

[`Entity`](Entity.md).[`required`](Entity.md#required)

***

### sequence?

> `optional` **sequence**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:93

***

### singular?

> `optional` **singular**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:62

#### Inherited from

[`Entity`](Entity.md).[`singular`](Entity.md#singular)

***

### uniqueKey?

> `optional` **uniqueKey**: `string`[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:65

#### Inherited from

[`Entity`](Entity.md).[`uniqueKey`](Entity.md#uniquekey)

***

### view?

> `optional` **view**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:63

#### Inherited from

[`Entity`](Entity.md).[`view`](Entity.md#view)
