[Lambda ORM](../README.md) / [model](../modules/model.md) / Query

# Class: Query

[model](../modules/model.md).Query

## Table of contents

### Constructors

- [constructor](model.Query.md#constructor)

### Properties

- [action](model.Query.md#action)
- [columns](model.Query.md#columns)
- [constraints](model.Query.md#constraints)
- [defaults](model.Query.md#defaults)
- [dialect](model.Query.md#dialect)
- [entity](model.Query.md#entity)
- [includes](model.Query.md#includes)
- [parameters](model.Query.md#parameters)
- [sentence](model.Query.md#sentence)
- [source](model.Query.md#source)
- [values](model.Query.md#values)

## Constructors

### constructor

• **new Query**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`QueryArgs`](../interfaces/model.QueryArgs.md) |

#### Defined in

[src/lib/model/query.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L29)

## Properties

### action

• **action**: [`SentenceAction`](../enums/model.SentenceAction.md)

#### Defined in

[src/lib/model/query.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L17)

___

### columns

• **columns**: [`Property`](../interfaces/model.Property.md)[]

#### Defined in

[src/lib/model/query.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L24)

___

### constraints

• **constraints**: [`Constraint`](../interfaces/model.Constraint.md)[]

#### Defined in

[src/lib/model/query.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L26)

___

### defaults

• **defaults**: [`Behavior`](../interfaces/model.Behavior.md)[]

#### Defined in

[src/lib/model/query.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L28)

___

### dialect

• **dialect**: `string`

#### Defined in

[src/lib/model/query.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L21)

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/model/query.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L23)

___

### includes

• **includes**: [`Include`](model.Include.md)[]

#### Defined in

[src/lib/model/query.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L19)

___

### parameters

• **parameters**: [`Parameter`](../interfaces/model.Parameter.md)[]

#### Defined in

[src/lib/model/query.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L25)

___

### sentence

• **sentence**: `string`

#### Defined in

[src/lib/model/query.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L20)

___

### source

• **source**: `string`

#### Defined in

[src/lib/model/query.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L22)

___

### values

• **values**: [`Behavior`](../interfaces/model.Behavior.md)[]

#### Defined in

[src/lib/model/query.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/query.ts#L27)
