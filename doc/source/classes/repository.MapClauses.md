[Lambda ORM](../README.md) / [repository](../modules/repository.md) / MapClauses

# Class: MapClauses<T\>

[repository](../modules/repository.md).MapClauses

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`PageClauses`](repository.PageClauses.md)

  ↳ **`MapClauses`**

  ↳↳ [`HavingClauses`](repository.HavingClauses.md)

  ↳↳ [`Queryable`](repository.Queryable.md)

## Table of contents

### Constructors

- [constructor](repository.MapClauses.md#constructor)

### Methods

- [complete](repository.MapClauses.md#complete)
- [execute](repository.MapClauses.md#execute)
- [metadata](repository.MapClauses.md#metadata)
- [model](repository.MapClauses.md#model)
- [page](repository.MapClauses.md#page)
- [parameters](repository.MapClauses.md#parameters)
- [sentence](repository.MapClauses.md#sentence)
- [sort](repository.MapClauses.md#sort)

## Constructors

### constructor

• **new MapClauses**<`T`\>(`actions`, `expression`)

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

[PageClauses](repository.PageClauses.md).[constructor](repository.PageClauses.md#constructor)

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L7)

## Methods

### complete

▸ **complete**(): `string`

#### Returns

`string`

#### Inherited from

[PageClauses](repository.PageClauses.md).[complete](repository.PageClauses.md#complete)

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

[PageClauses](repository.PageClauses.md).[execute](repository.PageClauses.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L12)

___

### metadata

▸ **metadata**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[metadata](repository.PageClauses.md#metadata)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L32)

___

### model

▸ **model**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[model](repository.PageClauses.md#model)

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L20)

___

### page

▸ **page**(`page`, `records`): [`QueryAction`](repository.QueryAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |
| `records` | `number` |

#### Returns

[`QueryAction`](repository.QueryAction.md)

#### Inherited from

[PageClauses](repository.PageClauses.md).[page](repository.PageClauses.md#page)

#### Defined in

[src/lib/repository/query.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L39)

___

### parameters

▸ **parameters**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[parameters](repository.PageClauses.md#parameters)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L24)

___

### sentence

▸ **sentence**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[sentence](repository.PageClauses.md#sentence)

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

[src/lib/repository/query.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L45)
