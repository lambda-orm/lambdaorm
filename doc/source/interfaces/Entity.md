[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Entity

# Interface: Entity

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:57

## Extended by

- [`EntityMapping`](EntityMapping.md)
- [`FormatMapping`](FormatMapping.md)

## Properties

### abstract?

> `optional` **abstract**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:61

***

### composite?

> `optional` **composite**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:77

***

### constraints?

> `optional` **constraints**: [`Constraint`](Constraint.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:70

***

### dependents?

> `optional` **dependents**: [`Dependent`](Dependent.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:69

***

### extends?

> `optional` **extends**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:60

***

### hadDefaults?

> `optional` **hadDefaults**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:75

***

### hadReadExps?

> `optional` **hadReadExps**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:71

***

### hadReadValues?

> `optional` **hadReadValues**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:73

***

### hadViewReadExp?

> `optional` **hadViewReadExp**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:76

***

### hadWriteExps?

> `optional` **hadWriteExps**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:72

***

### hadWriteValues?

> `optional` **hadWriteValues**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:74

***

### indexes?

> `optional` **indexes**: [`Index`](Index.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:68

***

### intermediate?

> `optional` **intermediate**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:78

***

### name

> **name**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:58

***

### primaryKey?

> `optional` **primaryKey**: `string`[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:64

***

### properties?

> `optional` **properties**: [`Property`](Property.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:59

***

### relations?

> `optional` **relations**: [`Relation`](Relation.md)[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:66

***

### required?

> `optional` **required**: `string`[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:67

***

### singular?

> `optional` **singular**: `string`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:62

***

### uniqueKey?

> `optional` **uniqueKey**: `string`[]

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:65

***

### view?

> `optional` **view**: `boolean`

Defined in: node\_modules/lambdaorm-base/schema/domain/schema.d.ts:63
