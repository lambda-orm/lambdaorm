[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MySqlConnection

# Class: MySqlConnection

[connection](../modules/connection.md).MySqlConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`MySqlConnection`**

## Table of contents

### Constructors

- [constructor](connection.MySqlConnection.md#constructor)

### Properties

- [cnx](connection.MySqlConnection.md#cnx)
- [inTransaction](connection.MySqlConnection.md#intransaction)
- [pool](connection.MySqlConnection.md#pool)

### Accessors

- [config](connection.MySqlConnection.md#config)

### Methods

- [beginTransaction](connection.MySqlConnection.md#begintransaction)
- [bulkInsert](connection.MySqlConnection.md#bulkinsert)
- [commit](connection.MySqlConnection.md#commit)
- [delete](connection.MySqlConnection.md#delete)
- [execute](connection.MySqlConnection.md#execute)
- [executeSentence](connection.MySqlConnection.md#executesentence)
- [insert](connection.MySqlConnection.md#insert)
- [rollback](connection.MySqlConnection.md#rollback)
- [select](connection.MySqlConnection.md#select)
- [update](connection.MySqlConnection.md#update)

## Constructors

### constructor

• **new MySqlConnection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Inherited from

[Connection](connection.Connection.md).[constructor](connection.Connection.md#constructor)

#### Defined in

[src/lib/connection/connection.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/connection.ts#L10)

## Properties

### cnx

• **cnx**: `any`

#### Inherited from

[Connection](connection.Connection.md).[cnx](connection.Connection.md#cnx)

#### Defined in

[src/lib/connection/connection.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/connection.ts#L7)

___

### inTransaction

• **inTransaction**: `boolean`

#### Inherited from

[Connection](connection.Connection.md).[inTransaction](connection.Connection.md#intransaction)

#### Defined in

[src/lib/connection/connection.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/connection.ts#L9)

___

### pool

• **pool**: `any`

#### Inherited from

[Connection](connection.Connection.md).[pool](connection.Connection.md#pool)

#### Defined in

[src/lib/connection/connection.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/connection.ts#L8)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

Connection.config

#### Defined in

[src/lib/connection/connection.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/connection.ts#L16)

## Methods

### beginTransaction

▸ **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[beginTransaction](connection.Connection.md#begintransaction)

#### Defined in

[src/lib/connection/dialects/mysql.ts:146](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L146)

___

### bulkInsert

▸ **bulkInsert**(`mapping`, `query`, `array`, `params`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |
| `array` | `any`[] |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`[]\>

#### Overrides

[Connection](connection.Connection.md).[bulkInsert](connection.Connection.md#bulkinsert)

#### Defined in

[src/lib/connection/dialects/mysql.ts:109](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L109)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[src/lib/connection/dialects/mysql.ts:151](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L151)

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

[src/lib/connection/dialects/mysql.ts:133](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L133)

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

[src/lib/connection/dialects/mysql.ts:138](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L138)

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

[src/lib/connection/dialects/mysql.ts:142](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L142)

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

[src/lib/connection/dialects/mysql.ts:103](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L103)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[src/lib/connection/dialects/mysql.ts:156](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L156)

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

[src/lib/connection/dialects/mysql.ts:99](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L99)

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

[src/lib/connection/dialects/mysql.ts:128](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/mysql.ts#L128)
