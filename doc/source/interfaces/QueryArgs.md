[Lambda ORM](../README.md) / QueryArgs

# Interface: QueryArgs

## Table of contents

### Properties

- [action](QueryArgs.md#action)
- [columns](QueryArgs.md#columns)
- [constraints](QueryArgs.md#constraints)
- [defaults](QueryArgs.md#defaults)
- [dialect](QueryArgs.md#dialect)
- [entity](QueryArgs.md#entity)
- [expression](QueryArgs.md#expression)
- [includes](QueryArgs.md#includes)
- [parameters](QueryArgs.md#parameters)
- [sentence](QueryArgs.md#sentence)
- [source](QueryArgs.md#source)
- [values](QueryArgs.md#values)

## Properties

### action

• **action**: [`SentenceAction`](../enums/SentenceAction.md)

#### Defined in

[src/lib/query/domain/query.ts:5](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L5)

___

### columns

• `Optional` **columns**: [`Property`](Property.md)[]

#### Defined in

[src/lib/query/domain/query.ts:10](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L10)

___

### constraints

• `Optional` **constraints**: [`Constraint`](Constraint.md)[]

#### Defined in

[src/lib/query/domain/query.ts:12](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L12)

___

### defaults

• `Optional` **defaults**: [`Behavior`](Behavior.md)[]

#### Defined in

[src/lib/query/domain/query.ts:14](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L14)

___

### dialect

• **dialect**: `string`

#### Defined in

[src/lib/query/domain/query.ts:6](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L6)

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/query/domain/query.ts:9](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L9)

___

### expression

• `Optional` **expression**: `string`

#### Defined in

[src/lib/query/domain/query.ts:17](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L17)

___

### includes

• `Optional` **includes**: [`Include`](../classes/Include.md)[]

#### Defined in

[src/lib/query/domain/query.ts:16](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L16)

___

### parameters

• `Optional` **parameters**: `Parameter`[]

#### Defined in

[src/lib/query/domain/query.ts:11](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L11)

___

### sentence

• **sentence**: `string`

#### Defined in

[src/lib/query/domain/query.ts:8](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L8)

___

### source

• **source**: `string`

#### Defined in

[src/lib/query/domain/query.ts:7](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L7)

___

### values

• `Optional` **values**: [`Behavior`](Behavior.md)[]

#### Defined in

[src/lib/query/domain/query.ts:13](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/query/domain/query.ts#L13)
