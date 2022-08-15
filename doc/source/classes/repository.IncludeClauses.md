[Lambda ORM](../README.md) / [repository](../modules/repository.md) / IncludeClauses

# Class: IncludeClauses<T\>

[repository](../modules/repository.md).IncludeClauses

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`HavingClauses`](repository.HavingClauses.md)<`T`\>

  ↳ **`IncludeClauses`**

## Table of contents

### Constructors

- [constructor](repository.IncludeClauses.md#constructor)

### Methods

- [constraints](repository.IncludeClauses.md#constraints)
- [distinct](repository.IncludeClauses.md#distinct)
- [execute](repository.IncludeClauses.md#execute)
- [filter](repository.IncludeClauses.md#filter)
- [first](repository.IncludeClauses.md#first)
- [having](repository.IncludeClauses.md#having)
- [last](repository.IncludeClauses.md#last)
- [map](repository.IncludeClauses.md#map)
- [metadata](repository.IncludeClauses.md#metadata)
- [model](repository.IncludeClauses.md#model)
- [normalize](repository.IncludeClauses.md#normalize)
- [page](repository.IncludeClauses.md#page)
- [parameters](repository.IncludeClauses.md#parameters)
- [sentence](repository.IncludeClauses.md#sentence)
- [sort](repository.IncludeClauses.md#sort)

## Constructors

### constructor

• **new IncludeClauses**<`T`\>(`actions`, `expression`)

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

[HavingClauses](repository.HavingClauses.md).[constructor](repository.HavingClauses.md#constructor)

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L7)

## Methods

### constraints

▸ **constraints**(): `Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[constraints](repository.HavingClauses.md#constraints)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L24)

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

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[distinct](repository.HavingClauses.md#distinct)

#### Defined in

[src/lib/repository/query.ts:76](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L76)

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

[HavingClauses](repository.HavingClauses.md).[execute](repository.HavingClauses.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L12)

___

### filter

▸ **filter**(`predicate`): [`FilterIncludeClauses`](repository.FilterIncludeClauses.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`FilterIncludeClauses`](repository.FilterIncludeClauses.md)<`T`\>

#### Defined in

[src/lib/repository/query.ts:88](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L88)

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

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[first](repository.HavingClauses.md#first)

#### Defined in

[src/lib/repository/query.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L66)

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

[src/lib/repository/query.ts:93](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L93)

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

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[last](repository.HavingClauses.md#last)

#### Defined in

[src/lib/repository/query.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L71)

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

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[map](repository.HavingClauses.md#map)

#### Defined in

[src/lib/repository/query.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L61)

___

### metadata

▸ **metadata**(): `Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Returns

`Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[metadata](repository.HavingClauses.md#metadata)

#### Defined in

[src/lib/repository/query.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L36)

___

### model

▸ **model**(): `Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Returns

`Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[model](repository.HavingClauses.md#model)

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L20)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[normalize](repository.HavingClauses.md#normalize)

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L16)

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

[HavingClauses](repository.HavingClauses.md).[page](repository.HavingClauses.md#page)

#### Defined in

[src/lib/repository/query.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L43)

___

### parameters

▸ **parameters**(): `Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[parameters](repository.HavingClauses.md#parameters)

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L28)

___

### sentence

▸ **sentence**(): `Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Returns

`Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Inherited from

[HavingClauses](repository.HavingClauses.md).[sentence](repository.HavingClauses.md#sentence)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L32)

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

[HavingClauses](repository.HavingClauses.md).[sort](repository.HavingClauses.md#sort)

#### Defined in

[src/lib/repository/query.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L49)
