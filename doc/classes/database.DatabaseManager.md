[Lambda ORM](../README.md) / [database](../modules/database.md) / DatabaseManager

# Class: DatabaseManager

[database](../modules/database.md).DatabaseManager

## Table of contents

### Constructors

- [constructor](database.DatabaseManager.md#constructor)

### Properties

- [databases](database.DatabaseManager.md#databases)

### Methods

- [clean](database.DatabaseManager.md#clean)
- [exists](database.DatabaseManager.md#exists)
- [export](database.DatabaseManager.md#export)
- [get](database.DatabaseManager.md#get)
- [getState](database.DatabaseManager.md#getstate)
- [import](database.DatabaseManager.md#import)
- [load](database.DatabaseManager.md#load)
- [model](database.DatabaseManager.md#model)
- [removeState](database.DatabaseManager.md#removestate)
- [sync](database.DatabaseManager.md#sync)
- [updateDataState](database.DatabaseManager.md#updatedatastate)
- [updateSchemaState](database.DatabaseManager.md#updateschemastate)

## Constructors

### constructor

• **new DatabaseManager**(`orm`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |

#### Defined in

[database/databaseManager.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L11)

## Properties

### databases

• **databases**: `any`

#### Defined in

[database/databaseManager.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L9)

## Methods

### clean

▸ **clean**(`name`): [`DatabaseClean`](database.DatabaseClean.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`DatabaseClean`](database.DatabaseClean.md)

#### Defined in

[database/databaseManager.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L29)

___

### exists

▸ **exists**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[database/databaseManager.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L51)

___

### export

▸ **export**(`name`): `Promise`<[`SchemaData`](../interfaces/schema.SchemaData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`SchemaData`](../interfaces/schema.SchemaData.md)\>

#### Defined in

[database/databaseManager.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L40)

___

### get

▸ **get**(`name`): [`Database`](../interfaces/model.Database.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Database`](../interfaces/model.Database.md)

#### Defined in

[database/databaseManager.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L20)

___

### getState

▸ **getState**(`name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[database/databaseManager.ts:56](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L56)

___

### import

▸ **import**(`name`, `data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `data` | [`SchemaData`](../interfaces/schema.SchemaData.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[database/databaseManager.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L45)

___

### load

▸ **load**(`database`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | [`Database`](../interfaces/model.Database.md) |

#### Returns

`void`

#### Defined in

[database/databaseManager.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L16)

___

### model

▸ **model**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[database/databaseManager.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L34)

___

### removeState

▸ **removeState**(`name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[database/databaseManager.ts:77](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L77)

___

### sync

▸ **sync**(`name`): [`DatabaseSync`](database.DatabaseSync.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`DatabaseSync`](database.DatabaseSync.md)

#### Defined in

[database/databaseManager.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L24)

___

### updateDataState

▸ **updateDataState**(`name`, `mapping`, `pending`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `mapping` | `any` |
| `pending` | `any`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[database/databaseManager.ts:69](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L69)

___

### updateSchemaState

▸ **updateSchemaState**(`name`, `schema`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[database/databaseManager.ts:62](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/database/databaseManager.ts#L62)
