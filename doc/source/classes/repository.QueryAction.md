[Lambda ORM](../README.md) / [repository](../modules/repository.md) / QueryAction

# Class: QueryAction

[repository](../modules/repository.md).QueryAction

## Hierarchy

- **`QueryAction`**

  ↳ [`PageClauses`](repository.PageClauses.md)

  ↳ [`Map2Clauses`](repository.Map2Clauses.md)

## Table of contents

### Constructors

- [constructor](repository.QueryAction.md#constructor)

### Methods

- [complete](repository.QueryAction.md#complete)
- [execute](repository.QueryAction.md#execute)
- [metadata](repository.QueryAction.md#metadata)
- [model](repository.QueryAction.md#model)
- [parameters](repository.QueryAction.md#parameters)
- [sentence](repository.QueryAction.md#sentence)

## Constructors

### constructor

• **new QueryAction**(`actions`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](repository.ExpressionActions.md) |
| `expression` | `string` |

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/repository/query.ts#L7)

## Methods

### complete

▸ **complete**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/repository/query.ts#L16)

___

### execute

▸ **execute**(`data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/repository/query.ts#L12)

___

### metadata

▸ **metadata**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/repository/query.ts#L32)

___

### model

▸ **model**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/repository/query.ts#L20)

___

### parameters

▸ **parameters**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/repository/query.ts#L24)

___

### sentence

▸ **sentence**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/repository/query.ts#L28)
