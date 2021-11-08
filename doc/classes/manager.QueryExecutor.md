[Lambda ORM](../README.md) / [manager](../modules/manager.md) / QueryExecutor

# Class: QueryExecutor

[manager](../modules/manager.md).QueryExecutor

## Table of contents

### Constructors

- [constructor](manager.QueryExecutor.md#constructor)

### Properties

- [database](manager.QueryExecutor.md#database)

### Methods

- [commit](manager.QueryExecutor.md#commit)
- [execute](manager.QueryExecutor.md#execute)
- [release](manager.QueryExecutor.md#release)
- [rollback](manager.QueryExecutor.md#rollback)

## Constructors

### constructor

• **new QueryExecutor**(`connectionManager`, `languageManager`, `database`, `schema`, `transactionable?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) | `undefined` |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) | `undefined` |
| `database` | [`Database`](../interfaces/model.Database.md) | `undefined` |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) | `undefined` |
| `transactionable` | `boolean` | `false` |

#### Defined in

[manager/queryExecutor.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryExecutor.ts#L15)

## Properties

### database

• **database**: [`Database`](../interfaces/model.Database.md)

#### Defined in

[manager/queryExecutor.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryExecutor.ts#L9)

## Methods

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/queryExecutor.ts:36](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryExecutor.ts#L36)

___

### execute

▸ **execute**(`query`, `dataContext?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `dataContext` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/queryExecutor.ts:58](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryExecutor.ts#L58)

___

### release

▸ **release**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/queryExecutor.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryExecutor.ts#L50)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/queryExecutor.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryExecutor.ts#L43)
