[Lambda ORM](../README.md) / HavingClauses

# Class: HavingClauses\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`MapClauses`](MapClauses.md)\<`T`\>

  ↳ **`HavingClauses`**

  ↳↳ [`FilterIncludeClauses`](FilterIncludeClauses.md)

  ↳↳ [`IncludeClauses`](IncludeClauses.md)

  ↳↳ [`FilterClauses`](FilterClauses.md)

  ↳↳ [`Queryable`](Queryable.md)

## Table of contents

### Constructors

- [constructor](HavingClauses.md#constructor)

### Methods

- [constraints](HavingClauses.md#constraints)
- [distinct](HavingClauses.md#distinct)
- [execute](HavingClauses.md#execute)
- [first](HavingClauses.md#first)
- [last](HavingClauses.md#last)
- [map](HavingClauses.md#map)
- [metadata](HavingClauses.md#metadata)
- [model](HavingClauses.md#model)
- [normalize](HavingClauses.md#normalize)
- [page](HavingClauses.md#page)
- [parameters](HavingClauses.md#parameters)
- [sentence](HavingClauses.md#sentence)
- [sort](HavingClauses.md#sort)

## Constructors

### constructor

• **new HavingClauses**\<`T`\>(`actions`, `expression`): [`HavingClauses`](HavingClauses.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](../interfaces/ExpressionActions.md) |
| `expression` | `string` |

#### Returns

[`HavingClauses`](HavingClauses.md)\<`T`\>

#### Inherited from

[MapClauses](MapClauses.md).[constructor](MapClauses.md#constructor)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### constraints

▸ **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[MapClauses](MapClauses.md).[constraints](MapClauses.md#constraints)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

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

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:36

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

[MapClauses](MapClauses.md).[execute](MapClauses.md#execute)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

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

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:32

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

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:34

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

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:30

___

### metadata

▸ **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[MapClauses](MapClauses.md).[metadata](MapClauses.md#metadata)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

___

### model

▸ **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[MapClauses](MapClauses.md).[model](MapClauses.md#model)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[MapClauses](MapClauses.md).[normalize](MapClauses.md#normalize)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

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

[MapClauses](MapClauses.md).[page](MapClauses.md#page)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:18

___

### parameters

▸ **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[MapClauses](MapClauses.md).[parameters](MapClauses.md#parameters)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

___

### sentence

▸ **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[MapClauses](MapClauses.md).[sentence](MapClauses.md#sentence)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

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

[MapClauses](MapClauses.md).[sort](MapClauses.md#sort)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:22
