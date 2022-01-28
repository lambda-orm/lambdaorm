[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MssqlConnection

# Class: MssqlConnection

[connection](../modules/connection.md).MssqlConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`MssqlConnection`**

## Table of contents

### Constructors

- [constructor](connection.MssqlConnection.md#constructor)

### Properties

- [cnx](connection.MssqlConnection.md#cnx)
- [inTransaction](connection.MssqlConnection.md#intransaction)
- [pool](connection.MssqlConnection.md#pool)

### Accessors

- [config](connection.MssqlConnection.md#config)

### Methods

- [beginTransaction](connection.MssqlConnection.md#begintransaction)
- [bulkInsert](connection.MssqlConnection.md#bulkinsert)
- [commit](connection.MssqlConnection.md#commit)
- [delete](connection.MssqlConnection.md#delete)
- [execute](connection.MssqlConnection.md#execute)
- [executeSentence](connection.MssqlConnection.md#executesentence)
- [insert](connection.MssqlConnection.md#insert)
- [rollback](connection.MssqlConnection.md#rollback)
- [select](connection.MssqlConnection.md#select)
- [update](connection.MssqlConnection.md#update)

## Constructors

### constructor

• **new MssqlConnection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Inherited from

[Connection](connection.Connection.md).[constructor](connection.Connection.md#constructor)

#### Defined in

[src/lib/connection/connection.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/connection.ts#L10)

## Properties

### cnx

• **cnx**: `any`

#### Inherited from

[Connection](connection.Connection.md).[cnx](connection.Connection.md#cnx)

#### Defined in

[src/lib/connection/connection.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/connection.ts#L7)

___

### inTransaction

• **inTransaction**: `boolean`

#### Inherited from

[Connection](connection.Connection.md).[inTransaction](connection.Connection.md#intransaction)

#### Defined in

[src/lib/connection/connection.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/connection.ts#L9)

___

### pool

• **pool**: `any`

#### Inherited from

[Connection](connection.Connection.md).[pool](connection.Connection.md#pool)

#### Defined in

[src/lib/connection/connection.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/connection.ts#L8)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

Connection.config

#### Defined in

[src/lib/connection/connection.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/connection.ts#L16)

## Methods

### beginTransaction

▸ **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[beginTransaction](connection.Connection.md#begintransaction)

#### Defined in

[src/lib/connection/dialects/mssql.ts:124](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L124)

___

### bulkInsert

▸ **bulkInsert**(`mapping`, `query`, `array`, `params`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `array` | `any`[] |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`any`[]\>

#### Overrides

[Connection](connection.Connection.md).[bulkInsert](connection.Connection.md#bulkinsert)

#### Defined in

[src/lib/connection/dialects/mssql.ts:71](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L71)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[src/lib/connection/dialects/mssql.ts:137](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L137)

___

### delete

▸ **delete**(`mapping`, `query`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[delete](connection.Connection.md#delete)

#### Defined in

[src/lib/connection/dialects/mssql.ts:112](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L112)

___

### execute

▸ **execute**(`query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[execute](connection.Connection.md#execute)

#### Defined in

[src/lib/connection/dialects/mssql.ts:116](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L116)

___

### executeSentence

▸ **executeSentence**(`sentence`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `any` |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[executeSentence](connection.Connection.md#executesentence)

#### Defined in

[src/lib/connection/dialects/mssql.ts:120](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L120)

___

### insert

▸ **insert**(`mapping`, `query`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[insert](connection.Connection.md#insert)

#### Defined in

[src/lib/connection/dialects/mssql.ts:57](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L57)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[src/lib/connection/dialects/mssql.ts:152](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L152)

___

### select

▸ **select**(`mapping`, `query`, `params`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[select](connection.Connection.md#select)

#### Defined in

[src/lib/connection/dialects/mssql.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L52)

___

### update

▸ **update**(`mapping`, `query`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[update](connection.Connection.md#update)

#### Defined in

[src/lib/connection/dialects/mssql.ts:108](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mssql.ts#L108)
