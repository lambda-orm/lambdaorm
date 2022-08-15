[Lambda ORM](../README.md) / [repository](../modules/repository.md) / MapClauses

# Class: MapClauses<T\>

[repository](../modules/repository.md).MapClauses

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`PageClauses`](repository.PageClauses.md)

  ↳ **`MapClauses`**

  ↳↳ [`HavingClauses`](repository.HavingClauses.md)

## Table of contents

### Constructors

- [constructor](repository.MapClauses.md#constructor)

### Methods

- [constraints](repository.MapClauses.md#constraints)
- [execute](repository.MapClauses.md#execute)
- [metadata](repository.MapClauses.md#metadata)
- [model](repository.MapClauses.md#model)
- [normalize](repository.MapClauses.md#normalize)
- [page](repository.MapClauses.md#page)
- [parameters](repository.MapClauses.md#parameters)
- [sentence](repository.MapClauses.md#sentence)
- [sort](repository.MapClauses.md#sort)

## Constructors

### constructor

• **new MapClauses**<`T`\>(`actions`, `expression`)

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

[PageClauses](repository.PageClauses.md).[constructor](repository.PageClauses.md#constructor)

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L7)

## Methods

### constraints

▸ **constraints**(): `Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[constraints](repository.PageClauses.md#constraints)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L24)

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

[PageClauses](repository.PageClauses.md).[execute](repository.PageClauses.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L12)

___

### metadata

▸ **metadata**(): `Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Returns

`Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[metadata](repository.PageClauses.md#metadata)

#### Defined in

[src/lib/repository/query.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L36)

___

### model

▸ **model**(): `Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Returns

`Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[model](repository.PageClauses.md#model)

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L20)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[PageClauses](repository.PageClauses.md).[normalize](repository.PageClauses.md#normalize)

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

[PageClauses](repository.PageClauses.md).[page](repository.PageClauses.md#page)

#### Defined in

[src/lib/repository/query.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L43)

___

### parameters

▸ **parameters**(): `Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[parameters](repository.PageClauses.md#parameters)

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L28)

___

### sentence

▸ **sentence**(): `Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Returns

`Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Inherited from

[PageClauses](repository.PageClauses.md).[sentence](repository.PageClauses.md#sentence)

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

#### Defined in

[src/lib/repository/query.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/query.ts#L49)
