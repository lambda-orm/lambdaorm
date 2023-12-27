[Lambda ORM](../README.md) / Query

# Class: Query

## Table of contents

### Constructors

- [constructor](Query.md#constructor)

### Properties

- [action](Query.md#action)
- [columns](Query.md#columns)
- [constraints](Query.md#constraints)
- [defaults](Query.md#defaults)
- [dialect](Query.md#dialect)
- [entity](Query.md#entity)
- [expression](Query.md#expression)
- [includes](Query.md#includes)
- [parameters](Query.md#parameters)
- [sentence](Query.md#sentence)
- [source](Query.md#source)
- [values](Query.md#values)

## Constructors

### constructor

• **new Query**(`args`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`QueryArgs`](../interfaces/QueryArgs.md) |

#### Returns

[`Query`](Query.md)

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:33](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L33)
=======
[src/lib/query/domain/query.ts:33](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L33)
>>>>>>> release/1.2.0

## Properties

### action

• **action**: [`SentenceAction`](../enums/SentenceAction.md)

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:20](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L20)
=======
[src/lib/query/domain/query.ts:20](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L20)
>>>>>>> release/1.2.0

___

### columns

• **columns**: [`Property`](../interfaces/Property.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:27](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L27)
=======
[src/lib/query/domain/query.ts:27](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L27)
>>>>>>> release/1.2.0

___

### constraints

• **constraints**: [`Constraint`](../interfaces/Constraint.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:29](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L29)
=======
[src/lib/query/domain/query.ts:29](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L29)
>>>>>>> release/1.2.0

___

### defaults

• **defaults**: [`Behavior`](../interfaces/Behavior.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:31](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L31)
=======
[src/lib/query/domain/query.ts:31](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L31)
>>>>>>> release/1.2.0

___

### dialect

• **dialect**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:24](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L24)
=======
[src/lib/query/domain/query.ts:24](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L24)
>>>>>>> release/1.2.0

___

### entity

• **entity**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:26](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L26)
=======
[src/lib/query/domain/query.ts:26](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L26)
>>>>>>> release/1.2.0

___

### expression

• **expression**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:32](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L32)
=======
[src/lib/query/domain/query.ts:32](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L32)
>>>>>>> release/1.2.0

___

### includes

• **includes**: [`Include`](Include.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:22](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L22)
=======
[src/lib/query/domain/query.ts:22](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L22)
>>>>>>> release/1.2.0

___

### parameters

• **parameters**: `Parameter`[]

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:28](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L28)
=======
[src/lib/query/domain/query.ts:28](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L28)
>>>>>>> release/1.2.0

___

### sentence

• **sentence**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:23](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L23)
=======
[src/lib/query/domain/query.ts:23](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L23)
>>>>>>> release/1.2.0

___

### source

• **source**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:25](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L25)
=======
[src/lib/query/domain/query.ts:25](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L25)
>>>>>>> release/1.2.0

___

### values

• **values**: [`Behavior`](../interfaces/Behavior.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/query/domain/query.ts:30](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/query/domain/query.ts#L30)
=======
[src/lib/query/domain/query.ts:30](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/query/domain/query.ts#L30)
>>>>>>> release/1.2.0
