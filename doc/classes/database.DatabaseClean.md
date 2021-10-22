[Lambda ORM](../README.md) / [database](../modules/database.md) / DatabaseClean

# Class: DatabaseClean

[database](../modules/database.md).DatabaseClean

## Table of contents

### Constructors

- [constructor](database.DatabaseClean.md#constructor)

### Methods

- [execute](database.DatabaseClean.md#execute)
- [sentence](database.DatabaseClean.md#sentence)

## Constructors

### constructor

• **new DatabaseClean**(`orm`, `database`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `database` | [`Database`](../interfaces/model.Database.md) |

#### Defined in

[database/databaseClean.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseClean.ts#L8)

## Methods

### execute

▸ **execute**(`tryAllCan?`): `Promise`<[`ExecutionResult`](../interfaces/connection.ExecutionResult.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tryAllCan` | `boolean` | `false` |

#### Returns

`Promise`<[`ExecutionResult`](../interfaces/connection.ExecutionResult.md)\>

#### Defined in

[database/databaseClean.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseClean.ts#L18)

___

### sentence

▸ **sentence**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Defined in

[database/databaseClean.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/database/databaseClean.ts#L13)
