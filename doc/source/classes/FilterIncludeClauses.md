[Lambda ORM](../README.md) / FilterIncludeClauses

# Class: FilterIncludeClauses\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`HavingClauses`](HavingClauses.md)\<`T`\>

  ↳ **`FilterIncludeClauses`**

## Table of contents

### Constructors

- [constructor](FilterIncludeClauses.md#constructor)

### Methods

- [constraints](FilterIncludeClauses.md#constraints)
- [distinct](FilterIncludeClauses.md#distinct)
- [execute](FilterIncludeClauses.md#execute)
- [first](FilterIncludeClauses.md#first)
- [having](FilterIncludeClauses.md#having)
- [last](FilterIncludeClauses.md#last)
- [map](FilterIncludeClauses.md#map)
- [metadata](FilterIncludeClauses.md#metadata)
- [model](FilterIncludeClauses.md#model)
- [normalize](FilterIncludeClauses.md#normalize)
- [page](FilterIncludeClauses.md#page)
- [parameters](FilterIncludeClauses.md#parameters)
- [sentence](FilterIncludeClauses.md#sentence)
- [sort](FilterIncludeClauses.md#sort)

## Constructors

### constructor

• **new FilterIncludeClauses**\<`T`\>(`actions`, `expression`): [`FilterIncludeClauses`](FilterIncludeClauses.md)\<`T`\>

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

[`FilterIncludeClauses`](FilterIncludeClauses.md)\<`T`\>

#### Inherited from

[HavingClauses](HavingClauses.md).[constructor](HavingClauses.md#constructor)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### constraints

▸ **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[HavingClauses](HavingClauses.md).[constraints](HavingClauses.md#constraints)

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

#### Inherited from

[HavingClauses](HavingClauses.md).[distinct](HavingClauses.md#distinct)

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

[HavingClauses](HavingClauses.md).[execute](HavingClauses.md#execute)

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

#### Inherited from

[HavingClauses](HavingClauses.md).[first](HavingClauses.md#first)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:32

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

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:40

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

#### Inherited from

[HavingClauses](HavingClauses.md).[map](HavingClauses.md#map)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:30

___

### metadata

▸ **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[HavingClauses](HavingClauses.md).[metadata](HavingClauses.md#metadata)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

___

### model

▸ **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[HavingClauses](HavingClauses.md).[model](HavingClauses.md#model)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[HavingClauses](HavingClauses.md).[normalize](HavingClauses.md#normalize)

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

[HavingClauses](HavingClauses.md).[page](HavingClauses.md#page)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:18

___

### parameters

▸ **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[HavingClauses](HavingClauses.md).[parameters](HavingClauses.md#parameters)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

___

### sentence

▸ **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[HavingClauses](HavingClauses.md).[sentence](HavingClauses.md#sentence)

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

[HavingClauses](HavingClauses.md).[sort](HavingClauses.md#sort)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:22
