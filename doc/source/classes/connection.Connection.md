[Lambda ORM](../README.md) / [connection](../modules/connection.md) / Connection

# Class: Connection

[connection](../modules/connection.md).Connection

## Hierarchy

- **`Connection`**

  ↳ [`MySqlConnection`](connection.MySqlConnection.md)

  ↳ [`PostgresConnection`](connection.PostgresConnection.md)

  ↳ [`MssqlConnection`](connection.MssqlConnection.md)

  ↳ [`SqlJsConnection`](connection.SqlJsConnection.md)

  ↳ [`MongodbConnection`](connection.MongodbConnection.md)

## Table of contents

### Constructors

- [constructor](connection.Connection.md#constructor)

### Properties

- [cnx](connection.Connection.md#cnx)
- [inTransaction](connection.Connection.md#intransaction)
- [pool](connection.Connection.md#pool)

### Accessors

- [config](connection.Connection.md#config)

### Methods

- [beginTransaction](connection.Connection.md#begintransaction)
- [bulkInsert](connection.Connection.md#bulkinsert)
- [commit](connection.Connection.md#commit)
- [delete](connection.Connection.md#delete)
- [execute](connection.Connection.md#execute)
- [executeSentence](connection.Connection.md#executesentence)
- [insert](connection.Connection.md#insert)
- [rollback](connection.Connection.md#rollback)
- [select](connection.Connection.md#select)
- [update](connection.Connection.md#update)

## Constructors

### constructor

• **new Connection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Defined in

[src/lib/connection/connection.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L10)

## Properties

### cnx

• **cnx**: `any`

#### Defined in

[src/lib/connection/connection.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L7)

___

### inTransaction

• **inTransaction**: `boolean`

#### Defined in

[src/lib/connection/connection.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L9)

___

### pool

• **pool**: `any`

#### Defined in

[src/lib/connection/connection.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L8)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Defined in

[src/lib/connection/connection.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L16)

## Methods

### beginTransaction

▸ `Abstract` **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connection.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L29)

___

### bulkInsert

▸ `Abstract` **bulkInsert**(`mapping`, `query`, `array`, `parameters`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `array` | `any`[] |
| `parameters` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/lib/connection/connection.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L24)

___

### commit

▸ `Abstract` **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connection.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L30)

___

### delete

▸ `Abstract` **delete**(`mapping`, `query`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/connection/connection.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L23)

___

### execute

▸ `Abstract` **execute**(`query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/connection/connection.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L25)

___

### executeSentence

▸ `Abstract` **executeSentence**(`sentence`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/connection/connection.ts:27](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L27)

___

### insert

▸ `Abstract` **insert**(`mapping`, `query`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/connection/connection.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L21)

___

### rollback

▸ `Abstract` **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connection.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L31)

___

### select

▸ `Abstract` **select**(`mapping`, `query`, `params`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/connection/connection.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L20)

___

### update

▸ `Abstract` **update**(`mapping`, `query`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/connection/connection.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connection.ts#L22)
