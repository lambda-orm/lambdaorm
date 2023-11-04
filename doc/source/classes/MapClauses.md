[Lambda ORM](../README.md) / MapClauses

# Class: MapClauses<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`PageClauses`](PageClauses.md)

  ↳ **`MapClauses`**

  ↳↳ [`HavingClauses`](HavingClauses.md)

## Table of contents

### Constructors

- [constructor](MapClauses.md#constructor)

### Methods

- [constraints](MapClauses.md#constraints)
- [execute](MapClauses.md#execute)
- [metadata](MapClauses.md#metadata)
- [model](MapClauses.md#model)
- [normalize](MapClauses.md#normalize)
- [page](MapClauses.md#page)
- [parameters](MapClauses.md#parameters)
- [sentence](MapClauses.md#sentence)
- [sort](MapClauses.md#sort)

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
| `actions` | [`ExpressionActions`](ExpressionActions.md) |
| `expression` | `string` |

#### Inherited from

[PageClauses](PageClauses.md).[constructor](PageClauses.md#constructor)

#### Defined in

[src/lib/repository/domain/queryable.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L8)

## Methods

### constraints

▸ **constraints**(): `Promise`<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[PageClauses](PageClauses.md).[constraints](PageClauses.md#constraints)

#### Defined in

[src/lib/repository/domain/queryable.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L25)

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

[PageClauses](PageClauses.md).[execute](PageClauses.md#execute)

#### Defined in

[src/lib/repository/domain/queryable.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L13)

___

### metadata

▸ **metadata**(): `Promise`<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[PageClauses](PageClauses.md).[metadata](PageClauses.md#metadata)

#### Defined in

[src/lib/repository/domain/queryable.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L37)

___

### model

▸ **model**(): `Promise`<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[PageClauses](PageClauses.md).[model](PageClauses.md#model)

#### Defined in

[src/lib/repository/domain/queryable.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L21)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[PageClauses](PageClauses.md).[normalize](PageClauses.md#normalize)

#### Defined in

[src/lib/repository/domain/queryable.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L17)

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

[PageClauses](PageClauses.md).[page](PageClauses.md#page)

#### Defined in

[src/lib/repository/domain/queryable.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L44)

___

### parameters

▸ **parameters**(): `Promise`<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[PageClauses](PageClauses.md).[parameters](PageClauses.md#parameters)

#### Defined in

[src/lib/repository/domain/queryable.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Returns

`Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Inherited from

[PageClauses](PageClauses.md).[sentence](PageClauses.md#sentence)

#### Defined in

[src/lib/repository/domain/queryable.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L33)

___

### sort

▸ **sort**(`predicate`): [`PageClauses`](PageClauses.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`PageClauses`](PageClauses.md)

#### Defined in

[src/lib/repository/domain/queryable.ts:50](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/repository/domain/queryable.ts#L50)
