[Lambda ORM](../README.md) / [repository](../modules/repository.md) / PageClauses

# Class: PageClauses

[repository](../modules/repository.md).PageClauses

## Hierarchy

- [`QueryAction`](repository.QueryAction.md)

  ↳ **`PageClauses`**

  ↳↳ [`MapClauses`](repository.MapClauses.md)

## Table of contents

### Constructors

- [constructor](repository.PageClauses.md#constructor)

### Methods

- [complete](repository.PageClauses.md#complete)
- [execute](repository.PageClauses.md#execute)
- [metadata](repository.PageClauses.md#metadata)
- [model](repository.PageClauses.md#model)
- [page](repository.PageClauses.md#page)
- [parameters](repository.PageClauses.md#parameters)
- [sentence](repository.PageClauses.md#sentence)

## Constructors

### constructor

• **new PageClauses**(`actions`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](repository.ExpressionActions.md) |
| `expression` | `string` |

#### Inherited from

[QueryAction](repository.QueryAction.md).[constructor](repository.QueryAction.md#constructor)

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L7)

## Methods

### complete

▸ **complete**(): `string`

#### Returns

`string`

#### Inherited from

[QueryAction](repository.QueryAction.md).[complete](repository.QueryAction.md#complete)

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L16)

___

### execute

▸ **execute**(`data`, `context`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `context` | `any` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[execute](repository.QueryAction.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L12)

___

### metadata

▸ **metadata**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[metadata](repository.QueryAction.md#metadata)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L32)

___

### model

▸ **model**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[model](repository.QueryAction.md#model)

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L20)

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

#### Defined in

[src/lib/repository/query.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L39)

___

### parameters

▸ **parameters**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[parameters](repository.QueryAction.md#parameters)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L24)

___

### sentence

▸ **sentence**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[sentence](repository.QueryAction.md#sentence)

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L28)
