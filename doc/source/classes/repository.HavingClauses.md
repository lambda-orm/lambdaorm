[Lambda ORM](../README.md) / [repository](../modules/repository.md) / HavingClauses

# Class: HavingClauses<T\>

[repository](../modules/repository.md).HavingClauses

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`MapClauses`](repository.MapClauses.md)<`T`\>

  ↳ **`HavingClauses`**

  ↳↳ [`FilterIncludeClauses`](repository.FilterIncludeClauses.md)

  ↳↳ [`IncludeClauses`](repository.IncludeClauses.md)

  ↳↳ [`FilterClauses`](repository.FilterClauses.md)

## Table of contents

### Constructors

- [constructor](repository.HavingClauses.md#constructor)

### Methods

- [complete](repository.HavingClauses.md#complete)
- [distinct](repository.HavingClauses.md#distinct)
- [execute](repository.HavingClauses.md#execute)
- [first](repository.HavingClauses.md#first)
- [last](repository.HavingClauses.md#last)
- [map](repository.HavingClauses.md#map)
- [metadata](repository.HavingClauses.md#metadata)
- [model](repository.HavingClauses.md#model)
- [page](repository.HavingClauses.md#page)
- [parameters](repository.HavingClauses.md#parameters)
- [sentence](repository.HavingClauses.md#sentence)
- [sort](repository.HavingClauses.md#sort)
- [take](repository.HavingClauses.md#take)

## Constructors

### constructor

• **new HavingClauses**<`T`\>(`actions`, `expression`)

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

[MapClauses](repository.MapClauses.md).[constructor](repository.MapClauses.md#constructor)

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L7)

## Methods

### complete

▸ **complete**(): `string`

#### Returns

`string`

#### Inherited from

[MapClauses](repository.MapClauses.md).[complete](repository.MapClauses.md#complete)

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L16)

___

### distinct

▸ **distinct**<`U`\>(`predicate`): [`MapClauses`](repository.MapClauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`MapClauses`](repository.MapClauses.md)<`U`\>

#### Defined in

[src/lib/repository/query.ts:108](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L108)

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

[MapClauses](repository.MapClauses.md).[execute](repository.MapClauses.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L12)

___

### first

▸ **first**<`U`\>(`predicate`): [`Map2Clauses`](repository.Map2Clauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`Map2Clauses`](repository.Map2Clauses.md)<`U`\>

#### Defined in

[src/lib/repository/query.ts:93](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L93)

___

### last

▸ **last**<`U`\>(`predicate`): [`Map2Clauses`](repository.Map2Clauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`Map2Clauses`](repository.Map2Clauses.md)<`U`\>

#### Defined in

[src/lib/repository/query.ts:98](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L98)

___

### map

▸ **map**<`U`\>(`predicate`): [`MapClauses`](repository.MapClauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`MapClauses`](repository.MapClauses.md)<`U`\>

#### Defined in

[src/lib/repository/query.ts:88](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L88)

___

### metadata

▸ **metadata**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[metadata](repository.MapClauses.md#metadata)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L32)

___

### model

▸ **model**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[model](repository.MapClauses.md#model)

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

#### Inherited from

[MapClauses](repository.MapClauses.md).[page](repository.MapClauses.md#page)

#### Defined in

[src/lib/repository/query.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L39)

___

### parameters

▸ **parameters**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[parameters](repository.MapClauses.md#parameters)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L24)

___

### sentence

▸ **sentence**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[sentence](repository.MapClauses.md#sentence)

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L28)

___

### sort

▸ **sort**(`predicate`): [`PageClauses`](repository.PageClauses.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`PageClauses`](repository.PageClauses.md)

#### Inherited from

[MapClauses](repository.MapClauses.md).[sort](repository.MapClauses.md#sort)

#### Defined in

[src/lib/repository/query.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L45)

___

### take

▸ **take**<`U`\>(`predicate`): [`Map2Clauses`](repository.Map2Clauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`Map2Clauses`](repository.Map2Clauses.md)<`U`\>

#### Defined in

[src/lib/repository/query.ts:103](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/repository/query.ts#L103)
