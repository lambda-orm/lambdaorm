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

  ↳↳ [`Queryable`](repository.Queryable.md)

## Table of contents

### Constructors

- [constructor](repository.HavingClauses.md#constructor)

### Methods

- [constraints](repository.HavingClauses.md#constraints)
- [distinct](repository.HavingClauses.md#distinct)
- [execute](repository.HavingClauses.md#execute)
- [first](repository.HavingClauses.md#first)
- [last](repository.HavingClauses.md#last)
- [map](repository.HavingClauses.md#map)
- [metadata](repository.HavingClauses.md#metadata)
- [model](repository.HavingClauses.md#model)
- [normalize](repository.HavingClauses.md#normalize)
- [page](repository.HavingClauses.md#page)
- [parameters](repository.HavingClauses.md#parameters)
- [sentence](repository.HavingClauses.md#sentence)
- [sort](repository.HavingClauses.md#sort)

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

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L7)

## Methods

### constraints

▸ **constraints**(): `Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[constraints](repository.MapClauses.md#constraints)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L24)

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

[src/lib/repository/query.ts:76](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L76)

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

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L12)

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

[src/lib/repository/query.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L66)

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

[src/lib/repository/query.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L71)

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

[src/lib/repository/query.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L61)

___

### metadata

▸ **metadata**(): `Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Returns

`Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[metadata](repository.MapClauses.md#metadata)

#### Defined in

[src/lib/repository/query.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L36)

___

### model

▸ **model**(): `Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Returns

`Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[model](repository.MapClauses.md#model)

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L20)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[MapClauses](repository.MapClauses.md).[normalize](repository.MapClauses.md#normalize)

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L16)

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

[src/lib/repository/query.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L43)

___

### parameters

▸ **parameters**(): `Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[parameters](repository.MapClauses.md#parameters)

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L28)

___

### sentence

▸ **sentence**(): `Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Returns

`Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Inherited from

[MapClauses](repository.MapClauses.md).[sentence](repository.MapClauses.md#sentence)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L32)

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

[src/lib/repository/query.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L49)
