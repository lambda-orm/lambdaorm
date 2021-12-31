[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Routing

# Class: Routing

[manager](../modules/manager.md).Routing

## Table of contents

### Constructors

- [constructor](manager.Routing.md#constructor)

### Methods

- [getDataSource](manager.Routing.md#getdatasource)

## Constructors

### constructor

• **new Routing**(`schema`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaConfig`](manager.SchemaConfig.md) |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/manager/routing.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/routing.ts#L10)

## Methods

### getDataSource

▸ **getDataSource**(`sentenceInfo`, `context`, `stage?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentenceInfo` | [`SentenceInfo`](../interfaces/model.SentenceInfo.md) |
| `context` | `any` |
| `stage?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/manager/routing.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/routing.ts#L15)
