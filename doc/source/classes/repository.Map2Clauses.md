[Lambda ORM](../README.md) / [repository](../modules/repository.md) / Map2Clauses

# Class: Map2Clauses<T\>

[repository](../modules/repository.md).Map2Clauses

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`QueryAction`](repository.QueryAction.md)

  ↳ **`Map2Clauses`**

## Table of contents

### Constructors

- [constructor](repository.Map2Clauses.md#constructor)

### Methods

- [complete](repository.Map2Clauses.md#complete)
- [execute](repository.Map2Clauses.md#execute)
- [metadata](repository.Map2Clauses.md#metadata)
- [model](repository.Map2Clauses.md#model)
- [parameters](repository.Map2Clauses.md#parameters)
- [sentence](repository.Map2Clauses.md#sentence)
- [sort](repository.Map2Clauses.md#sort)

## Constructors

### constructor

• **new Map2Clauses**<`T`\>(`actions`, `expression`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](repository.ExpressionActions.md) |
| `expression` | `string` |

#### Inherited from

[QueryAction](repository.QueryAction.md).[constructor](repository.QueryAction.md#constructor)

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L7)

## Methods

### complete

▸ **complete**(): `string`

#### Returns

`string`

#### Inherited from

[QueryAction](repository.QueryAction.md).[complete](repository.QueryAction.md#complete)

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L16)

___

### execute

▸ **execute**(`data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[execute](repository.QueryAction.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L12)

___

### metadata

▸ **metadata**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[metadata](repository.QueryAction.md#metadata)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L32)

___

### model

▸ **model**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[model](repository.QueryAction.md#model)

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L20)

___

### parameters

▸ **parameters**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[parameters](repository.QueryAction.md#parameters)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L24)

___

### sentence

▸ **sentence**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[sentence](repository.QueryAction.md#sentence)

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L28)

___

### sort

▸ **sort**(`predicate`): [`PageClauses`](repository.PageClauses.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`PageClauses`](repository.PageClauses.md)

#### Defined in

[src/lib/repository/query.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L51)
