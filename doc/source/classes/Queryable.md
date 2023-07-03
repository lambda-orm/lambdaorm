[Lambda ORM](../README.md) / Queryable

# Class: Queryable<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `HavingClauses`<`T`\>

  ↳ **`Queryable`**

## Table of contents

### Constructors

- [constructor](Queryable.md#constructor)

### Methods

- [bulkInsert](Queryable.md#bulkinsert)
- [constraints](Queryable.md#constraints)
- [delete](Queryable.md#delete)
- [deleteAll](Queryable.md#deleteall)
- [distinct](Queryable.md#distinct)
- [execute](Queryable.md#execute)
- [filter](Queryable.md#filter)
- [first](Queryable.md#first)
- [having](Queryable.md#having)
- [include](Queryable.md#include)
- [insert](Queryable.md#insert)
- [last](Queryable.md#last)
- [map](Queryable.md#map)
- [metadata](Queryable.md#metadata)
- [model](Queryable.md#model)
- [normalize](Queryable.md#normalize)
- [page](Queryable.md#page)
- [parameters](Queryable.md#parameters)
- [sentence](Queryable.md#sentence)
- [sort](Queryable.md#sort)
- [update](Queryable.md#update)
- [updateAll](Queryable.md#updateall)

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
| `actions` | [`ExpressionActions`](ExpressionActions.md) |
| `expression` | `string` |

#### Inherited from

HavingClauses<T\>.constructor

#### Defined in

[src/lib/repository/domain/queryable.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L8)

## Methods

### bulkInsert

▸ **bulkInsert**(`value?`): `ModificableClauses`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

#### Returns

`ModificableClauses`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:155](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L155)

___

### constraints

▸ **constraints**(): `Promise`<`MetadataConstraint`\>

#### Returns

`Promise`<`MetadataConstraint`\>

#### Inherited from

HavingClauses.constraints

#### Defined in

[src/lib/repository/domain/queryable.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L25)

___

### delete

▸ **delete**(): `ModificableClauses`<`T`\>

#### Returns

`ModificableClauses`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:170](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L170)

___

### deleteAll

▸ **deleteAll**(): `Include`<`T`\>

#### Returns

`Include`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:175](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L175)

___

### distinct

▸ **distinct**<`U`\>(`predicate`): `MapClauses`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

`MapClauses`<`U`\>

#### Inherited from

HavingClauses.distinct

#### Defined in

[src/lib/repository/domain/queryable.ts:77](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L77)

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

HavingClauses.execute

#### Defined in

[src/lib/repository/domain/queryable.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L13)

___

### filter

▸ **filter**(`predicate`): `FilterClauses`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

`FilterClauses`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:135](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L135)

___

### first

▸ **first**<`U`\>(`predicate`): `Map2Clauses`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

`Map2Clauses`<`U`\>

#### Inherited from

HavingClauses.first

#### Defined in

[src/lib/repository/domain/queryable.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L67)

___

### having

▸ **having**(`predicate`): `HavingClauses`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

`HavingClauses`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:145](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L145)

___

### include

▸ **include**(`predicate`): `IncludeClauses`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

`IncludeClauses`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:140](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L140)

___

### insert

▸ **insert**(`value?`): `ModificableClauses`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

#### Returns

`ModificableClauses`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:150](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L150)

___

### last

▸ **last**<`U`\>(`predicate`): `Map2Clauses`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

`Map2Clauses`<`U`\>

#### Inherited from

HavingClauses.last

#### Defined in

[src/lib/repository/domain/queryable.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L72)

___

### map

▸ **map**<`U`\>(`predicate`): `MapClauses`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

`MapClauses`<`U`\>

#### Inherited from

HavingClauses.map

#### Defined in

[src/lib/repository/domain/queryable.ts:62](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L62)

___

### metadata

▸ **metadata**(): `Promise`<`Metadata`\>

#### Returns

`Promise`<`Metadata`\>

#### Inherited from

HavingClauses.metadata

#### Defined in

[src/lib/repository/domain/queryable.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L37)

___

### model

▸ **model**(): `Promise`<`MetadataModel`[]\>

#### Returns

`Promise`<`MetadataModel`[]\>

#### Inherited from

HavingClauses.model

#### Defined in

[src/lib/repository/domain/queryable.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L21)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

HavingClauses.normalize

#### Defined in

[src/lib/repository/domain/queryable.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L17)

___

### page

▸ **page**(`page`, `records`): [`QueryAction`](QueryAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |
| `records` | `number` |

#### Returns

[`QueryAction`](QueryAction.md)

#### Inherited from

HavingClauses.page

#### Defined in

[src/lib/repository/domain/queryable.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L44)

___

### parameters

▸ **parameters**(): `Promise`<`MetadataParameter`[]\>

#### Returns

`Promise`<`MetadataParameter`[]\>

#### Inherited from

HavingClauses.parameters

#### Defined in

[src/lib/repository/domain/queryable.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Returns

`Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Inherited from

HavingClauses.sentence

#### Defined in

[src/lib/repository/domain/queryable.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L33)

___

### sort

▸ **sort**(`predicate`): `PageClauses`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

`PageClauses`

#### Inherited from

HavingClauses.sort

#### Defined in

[src/lib/repository/domain/queryable.ts:50](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L50)

___

### update

▸ **update**(`predicate`): `ModificableClauses`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

`ModificableClauses`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:160](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L160)

___

### updateAll

▸ **updateAll**(`predicate`): `Include`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

`Include`<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:165](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L165)
