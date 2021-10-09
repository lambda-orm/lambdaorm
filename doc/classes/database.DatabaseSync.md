[Lambda ORM](../README.md) / [database](../modules/database.md) / DatabaseSync

# Class: DatabaseSync

[database](../modules/database.md).DatabaseSync

## Table of contents

### Constructors

- [constructor](database.DatabaseSync.md#constructor)

### Methods

- [execute](database.DatabaseSync.md#execute)
- [sentence](database.DatabaseSync.md#sentence)
- [serialize](database.DatabaseSync.md#serialize)

## Constructors

### constructor

• **new DatabaseSync**(`orm`, `database`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `database` | [`Database`](../interfaces/model.Database.md) |

#### Defined in

[database/databaseSync.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/database/databaseSync.ts#L7)

## Methods

### execute

▸ **execute**(): `Promise`<[`ExecutionSyncResult`](../interfaces/schema.ExecutionSyncResult.md)\>

#### Returns

`Promise`<[`ExecutionSyncResult`](../interfaces/schema.ExecutionSyncResult.md)\>

#### Defined in

[database/databaseSync.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/database/databaseSync.ts#L23)

___

### sentence

▸ **sentence**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Defined in

[database/databaseSync.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/database/databaseSync.ts#L17)

___

### serialize

▸ **serialize**(): `Promise`<[`Delta`](model.Delta.md)\>

#### Returns

`Promise`<[`Delta`](model.Delta.md)\>

#### Defined in

[database/databaseSync.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/database/databaseSync.ts#L12)
