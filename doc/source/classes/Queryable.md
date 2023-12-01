[Lambda ORM](../README.md) / Queryable

# Class: Queryable\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`HavingClauses`](HavingClauses.md)\<`T`\>

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

• **new Queryable**\<`T`\>(`actions`, `expression`): [`Queryable`](Queryable.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](ExpressionActions.md) |
| `expression` | `string` |

#### Returns

[`Queryable`](Queryable.md)\<`T`\>

#### Inherited from

[HavingClauses](HavingClauses.md).[constructor](HavingClauses.md#constructor)

#### Defined in

[src/lib/repository/domain/queryable.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L8)

## Methods

### bulkInsert

▸ **bulkInsert**(`value?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:159](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L159)

___

### constraints

▸ **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[HavingClauses](HavingClauses.md).[constraints](HavingClauses.md#constraints)

#### Defined in

[src/lib/repository/domain/queryable.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L25)

___

### delete

▸ **delete**(`predicate?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate?` | (`value`: `T`) => `unknown` |

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:178](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L178)

___

### deleteAll

▸ **deleteAll**(): [`IncludeAction`](IncludeAction.md)\<`T`\>

#### Returns

[`IncludeAction`](IncludeAction.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:187](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L187)

___

### distinct

▸ **distinct**\<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)\<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`MapClauses`](MapClauses.md)\<`U`\>

#### Inherited from

[HavingClauses](HavingClauses.md).[distinct](HavingClauses.md#distinct)

#### Defined in

[src/lib/repository/domain/queryable.ts:77](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L77)

___

### execute

▸ **execute**(`data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[HavingClauses](HavingClauses.md).[execute](HavingClauses.md#execute)

#### Defined in

[src/lib/repository/domain/queryable.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L13)

___

### filter

▸ **filter**(`predicate`): [`FilterClauses`](FilterClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`FilterClauses`](FilterClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:134](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L134)

___

### first

▸ **first**\<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Inherited from

[HavingClauses](HavingClauses.md).[first](HavingClauses.md#first)

#### Defined in

[src/lib/repository/domain/queryable.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L67)

___

### having

▸ **having**(`predicate`): [`HavingClauses`](HavingClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`HavingClauses`](HavingClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:144](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L144)

___

### include

▸ **include**(`predicate`): [`IncludeClauses`](IncludeClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`IncludeClauses`](IncludeClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:139](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L139)

___

### insert

▸ **insert**(`predicate?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate?` | (`value`: `T`) => `unknown` |

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:150](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L150)

___

### last

▸ **last**\<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Inherited from

[HavingClauses](HavingClauses.md).[last](HavingClauses.md#last)

#### Defined in

[src/lib/repository/domain/queryable.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L72)

___

### map

▸ **map**\<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)\<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`MapClauses`](MapClauses.md)\<`U`\>

#### Inherited from

[HavingClauses](HavingClauses.md).[map](HavingClauses.md#map)

#### Defined in

[src/lib/repository/domain/queryable.ts:62](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L62)

___

### metadata

▸ **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[HavingClauses](HavingClauses.md).[metadata](HavingClauses.md#metadata)

#### Defined in

[src/lib/repository/domain/queryable.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L37)

___

### model

▸ **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[HavingClauses](HavingClauses.md).[model](HavingClauses.md#model)

#### Defined in

[src/lib/repository/domain/queryable.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L21)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[HavingClauses](HavingClauses.md).[normalize](HavingClauses.md#normalize)

#### Defined in

[src/lib/repository/domain/queryable.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L17)

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

[HavingClauses](HavingClauses.md).[page](HavingClauses.md#page)

#### Defined in

[src/lib/repository/domain/queryable.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L44)

___

### parameters

▸ **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[HavingClauses](HavingClauses.md).[parameters](HavingClauses.md#parameters)

#### Defined in

[src/lib/repository/domain/queryable.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[HavingClauses](HavingClauses.md).[sentence](HavingClauses.md#sentence)

#### Defined in

[src/lib/repository/domain/queryable.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L33)

___

### sort

▸ **sort**(`predicate`): [`PageClauses`](PageClauses.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`PageClauses`](PageClauses.md)

#### Inherited from

[HavingClauses](HavingClauses.md).[sort](HavingClauses.md#sort)

#### Defined in

[src/lib/repository/domain/queryable.ts:50](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L50)

___

### update

▸ **update**(`predicate?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate?` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:164](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L164)

___

### updateAll

▸ **updateAll**(`predicate`): [`IncludeAction`](IncludeAction.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`IncludeAction`](IncludeAction.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:173](https://github.com/FlavioLionelRita/lambdaorm/blob/4a7be3c2/src/lib/repository/domain/queryable.ts#L173)
