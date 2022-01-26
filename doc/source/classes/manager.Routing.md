[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Routing

# Class: Routing

[manager](../modules/manager.md).Routing

## Table of contents

### Constructors

- [constructor](manager.Routing.md#constructor)

### Methods

- [eval](manager.Routing.md#eval)
- [getDataSource](manager.Routing.md#getdatasource)

## Constructors

### constructor

• **new Routing**(`schema`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/manager/routing.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/routing.ts#L10)

## Methods

### eval

▸ **eval**(`dataSource`, `sentenceInfo`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | [`RuleDataSource`](../interfaces/model.RuleDataSource.md) |
| `sentenceInfo` | [`SentenceInfo`](../interfaces/model.SentenceInfo.md) |

#### Returns

`boolean`

#### Defined in

[src/lib/manager/routing.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/routing.ts#L15)

___

### getDataSource

▸ **getDataSource**(`sentenceInfo`, `stage?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentenceInfo` | [`SentenceInfo`](../interfaces/model.SentenceInfo.md) |
| `stage?` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/manager/routing.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/routing.ts#L32)
