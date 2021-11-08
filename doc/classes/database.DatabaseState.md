[Lambda ORM](../README.md) / [database](../modules/database.md) / DatabaseState

# Class: DatabaseState

[database](../modules/database.md).DatabaseState

## Table of contents

### Constructors

- [constructor](database.DatabaseState.md#constructor)

### Methods

- [get](database.DatabaseState.md#get)
- [getFile](database.DatabaseState.md#getfile)
- [remove](database.DatabaseState.md#remove)
- [updateData](database.DatabaseState.md#updatedata)
- [updateSchema](database.DatabaseState.md#updateschema)

## Constructors

### constructor

• **new DatabaseState**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConfigManager`](manager.ConfigManager.md) |

#### Defined in

[database/databaseState.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/database/databaseState.ts#L8)

## Methods

### get

▸ **get**(`name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[database/databaseState.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/database/databaseState.ts#L12)

___

### getFile

▸ **getFile**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[database/databaseState.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/database/databaseState.ts#L44)

___

### remove

▸ **remove**(`name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[database/databaseState.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/database/databaseState.ts#L39)

___

### updateData

▸ **updateData**(`name`, `mapping`, `pending`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `mapping` | `any` |
| `pending` | `any`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[database/databaseState.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/database/databaseState.ts#L31)

___

### updateSchema

▸ **updateSchema**(`name`, `schema`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[database/databaseState.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/database/databaseState.ts#L24)
