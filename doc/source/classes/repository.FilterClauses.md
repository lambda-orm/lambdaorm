[Lambda ORM](../README.md) / [repository](../modules/repository.md) / FilterClauses

# Class: FilterClauses<T\>

[repository](../modules/repository.md).FilterClauses

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`HavingClauses`](repository.HavingClauses.md)<`T`\>

  ↳ **`FilterClauses`**

## Table of contents

### Constructors

- [constructor](repository.FilterClauses.md#constructor)

### Methods

- [constraints](repository.FilterClauses.md#constraints)
- [distinct](repository.FilterClauses.md#distinct)
- [execute](repository.FilterClauses.md#execute)
- [first](repository.FilterClauses.md#first)
- [having](repository.FilterClauses.md#having)
- [include](repository.FilterClauses.md#include)
- [last](repository.FilterClauses.md#last)
- [map](repository.FilterClauses.md#map)
- [metadata](repository.FilterClauses.md#metadata)
- [model](repository.FilterClauses.md#model)
- [normalize](repository.FilterClauses.md#normalize)
- [page](repository.FilterClauses.md#page)
- [parameters](repository.FilterClauses.md#parameters)
- [sentence](repository.FilterClauses.md#sentence)
- [sort](repository.FilterClauses.md#sort)

## Constructors

### constructor

• **new FilterClauses**<`T`\>(`actions`, `expression`)

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

[src/lib/repository/query.ts:104](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L104)

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

[src/lib/repository/query.ts:99](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L99)

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
