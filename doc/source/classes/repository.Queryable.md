[Lambda ORM](../README.md) / [repository](../modules/repository.md) / Queryable

# Class: Queryable<T\>

[repository](../modules/repository.md).Queryable

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`MapClauses`](repository.MapClauses.md)<`T`\>

  ↳ **`Queryable`**

## Table of contents

### Constructors

- [constructor](repository.Queryable.md#constructor)

### Methods

- [complete](repository.Queryable.md#complete)
- [distinct](repository.Queryable.md#distinct)
- [execute](repository.Queryable.md#execute)
- [filter](repository.Queryable.md#filter)
- [first](repository.Queryable.md#first)
- [having](repository.Queryable.md#having)
- [include](repository.Queryable.md#include)
- [last](repository.Queryable.md#last)
- [map](repository.Queryable.md#map)
- [metadata](repository.Queryable.md#metadata)
- [model](repository.Queryable.md#model)
- [page](repository.Queryable.md#page)
- [parameters](repository.Queryable.md#parameters)
- [sentence](repository.Queryable.md#sentence)
- [sort](repository.Queryable.md#sort)
- [take](repository.Queryable.md#take)

## Constructors

### constructor

• **new Queryable**<`T`\>(`actions`, `expression`)

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

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L7)

## Methods

### complete

▸ **complete**(): `string`

#### Returns

`string`

#### Inherited from

[MapClauses](repository.MapClauses.md).[complete](repository.MapClauses.md#complete)

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L16)

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

[src/lib/repository/query.ts:172](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L172)

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

[MapClauses](repository.MapClauses.md).[execute](repository.MapClauses.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L12)

___

### filter

▸ **filter**(`predicate`): [`FilterClauses`](repository.FilterClauses.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`FilterClauses`](repository.FilterClauses.md)<`T`\>

#### Defined in

[src/lib/repository/query.ts:142](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L142)

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

[src/lib/repository/query.ts:157](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L157)

___

### having

▸ **having**(`predicate`): [`HavingClauses`](repository.HavingClauses.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`HavingClauses`](repository.HavingClauses.md)<`T`\>

#### Defined in

[src/lib/repository/query.ts:177](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L177)

___

### include

▸ **include**(`predicate`): [`IncludeClauses`](repository.IncludeClauses.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`IncludeClauses`](repository.IncludeClauses.md)<`T`\>

#### Defined in

[src/lib/repository/query.ts:147](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L147)

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

[src/lib/repository/query.ts:162](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L162)

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

[src/lib/repository/query.ts:152](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L152)

___

### metadata

▸ **metadata**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[metadata](repository.MapClauses.md#metadata)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L32)

___

### model

▸ **model**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[model](repository.MapClauses.md#model)

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

[MapClauses](repository.MapClauses.md).[page](repository.MapClauses.md#page)

#### Defined in

[src/lib/repository/query.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L39)

___

### parameters

▸ **parameters**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[parameters](repository.MapClauses.md#parameters)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L24)

___

### sentence

▸ **sentence**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[sentence](repository.MapClauses.md#sentence)

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

#### Inherited from

[MapClauses](repository.MapClauses.md).[sort](repository.MapClauses.md#sort)

#### Defined in

[src/lib/repository/query.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L45)

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

[src/lib/repository/query.ts:167](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/repository/query.ts#L167)
