[Lambda ORM](../README.md) / HavingClauses

# Class: HavingClauses<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`MapClauses`](MapClauses.md)<`T`\>

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

• **new HavingClauses**<`T`\>(`actions`, `expression`)

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

[MapClauses](MapClauses.md).[constructor](MapClauses.md#constructor)

#### Defined in

[src/lib/repository/domain/queryable.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L8)

## Methods

### constraints

▸ **constraints**(): `Promise`<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[MapClauses](MapClauses.md).[constraints](MapClauses.md#constraints)

#### Defined in

[src/lib/repository/domain/queryable.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L25)

___

### distinct

▸ **distinct**<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`MapClauses`](MapClauses.md)<`U`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:77](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L77)

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

[MapClauses](MapClauses.md).[execute](MapClauses.md#execute)

#### Defined in

[src/lib/repository/domain/queryable.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L13)

___

### first

▸ **first**<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`Map2Clauses`](Map2Clauses.md)<`U`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L67)

___

### last

▸ **last**<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`Map2Clauses`](Map2Clauses.md)<`U`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L72)

___

### map

▸ **map**<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |

#### Returns

[`MapClauses`](MapClauses.md)<`U`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:62](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L62)

___

### metadata

▸ **metadata**(): `Promise`<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[MapClauses](MapClauses.md).[metadata](MapClauses.md#metadata)

#### Defined in

[src/lib/repository/domain/queryable.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L37)

___

### model

▸ **model**(): `Promise`<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[MapClauses](MapClauses.md).[model](MapClauses.md#model)

#### Defined in

[src/lib/repository/domain/queryable.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L21)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[MapClauses](MapClauses.md).[normalize](MapClauses.md#normalize)

#### Defined in

[src/lib/repository/domain/queryable.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L17)

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

[src/lib/repository/domain/queryable.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L44)

___

### parameters

▸ **parameters**(): `Promise`<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[MapClauses](MapClauses.md).[parameters](MapClauses.md#parameters)

#### Defined in

[src/lib/repository/domain/queryable.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Returns

`Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Inherited from

[MapClauses](MapClauses.md).[sentence](MapClauses.md#sentence)

#### Defined in

[src/lib/repository/domain/queryable.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L33)

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

[src/lib/repository/domain/queryable.ts:50](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/repository/domain/queryable.ts#L50)
