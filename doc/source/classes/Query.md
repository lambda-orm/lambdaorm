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

[src/lib/query/domain/query.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L34)

## Properties

### action

• **action**: [`SentenceAction`](../enums/SentenceAction.md)

#### Defined in

[src/lib/query/domain/query.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L21)

___

### columns

• **columns**: [`Property`](../interfaces/Property.md)[]

#### Defined in

[src/lib/query/domain/query.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L28)

___

### constraints

• **constraints**: [`Constraint`](../interfaces/Constraint.md)[]

#### Defined in

[src/lib/query/domain/query.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L30)

___

### defaults

• **defaults**: [`Behavior`](../interfaces/Behavior.md)[]

#### Defined in

[src/lib/query/domain/query.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L32)

___

### dialect

• **dialect**: `string`

#### Defined in

[src/lib/query/domain/query.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L25)

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/query/domain/query.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L27)

___

### expression

• **expression**: `string`

#### Defined in

[src/lib/query/domain/query.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L33)

___

### includes

• **includes**: [`Include`](Include.md)[]

#### Defined in

[src/lib/query/domain/query.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L23)

___

### parameters

• **parameters**: `Parameter`[]

#### Defined in

[src/lib/query/domain/query.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L29)

___

### sentence

• **sentence**: `string`

#### Defined in

[src/lib/query/domain/query.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L24)

___

### source

• **source**: `string`

#### Defined in

[src/lib/query/domain/query.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L26)

___

### values

• **values**: [`Behavior`](../interfaces/Behavior.md)[]

#### Defined in

[src/lib/query/domain/query.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/1410aa2d/src/lib/query/domain/query.ts#L31)
