[Lambda ORM](../README.md) / [database](../modules/database.md) / DatabaseManager

# Class: DatabaseManager

[database](../modules/database.md).DatabaseManager

## Table of contents

### Constructors

- [constructor](database.DatabaseManager.md#constructor)

### Properties

- [databases](database.DatabaseManager.md#databases)
- [default](database.DatabaseManager.md#default)

### Methods

- [clean](database.DatabaseManager.md#clean)
- [exists](database.DatabaseManager.md#exists)
- [export](database.DatabaseManager.md#export)
- [get](database.DatabaseManager.md#get)
- [getState](database.DatabaseManager.md#getstate)
- [import](database.DatabaseManager.md#import)
- [load](database.DatabaseManager.md#load)
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

[database/databaseManager.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L12)

## Properties

### databases

• **databases**: `any`

#### Defined in

[database/databaseManager.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L9)

___

### default

• `Optional` **default**: `string`

#### Defined in

[database/databaseManager.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L10)

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

[database/databaseManager.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L44)

___

### exists

▸ **exists**(`name`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[database/databaseManager.ts:75](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L75)

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

[database/databaseManager.ts:49](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L49)

___

### get

▸ **get**(`name?`): [`Database`](../interfaces/model.Database.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`Database`](../interfaces/model.Database.md)

#### Defined in

[database/databaseManager.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L21)

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

[database/databaseManager.ts:80](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L80)

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

[database/databaseManager.ts:61](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L61)

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

[database/databaseManager.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L17)

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

[database/databaseManager.ts:107](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L107)

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

[database/databaseManager.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L39)

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

[database/databaseManager.ts:99](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L99)

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

[database/databaseManager.ts:92](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseManager.ts#L92)
