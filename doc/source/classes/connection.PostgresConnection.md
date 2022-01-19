[Lambda ORM](../README.md) / [connection](../modules/connection.md) / PostgresConnection

# Class: PostgresConnection

[connection](../modules/connection.md).PostgresConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`PostgresConnection`**

## Table of contents

### Constructors

- [constructor](connection.PostgresConnection.md#constructor)

### Properties

- [cnx](connection.PostgresConnection.md#cnx)
- [inTransaction](connection.PostgresConnection.md#intransaction)
- [pool](connection.PostgresConnection.md#pool)

### Accessors

- [config](connection.PostgresConnection.md#config)

### Methods

- [beginTransaction](connection.PostgresConnection.md#begintransaction)
- [bulkInsert](connection.PostgresConnection.md#bulkinsert)
- [commit](connection.PostgresConnection.md#commit)
- [delete](connection.PostgresConnection.md#delete)
- [execute](connection.PostgresConnection.md#execute)
- [executeSentence](connection.PostgresConnection.md#executesentence)
- [insert](connection.PostgresConnection.md#insert)
- [rollback](connection.PostgresConnection.md#rollback)
- [select](connection.PostgresConnection.md#select)
- [update](connection.PostgresConnection.md#update)

## Constructors

### constructor

• **new PostgresConnection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Inherited from

[Connection](connection.Connection.md).[constructor](connection.Connection.md#constructor)

#### Defined in

[src/lib/connection/connection.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connection.ts#L10)

## Properties

### cnx

• **cnx**: `any`

#### Inherited from

[Connection](connection.Connection.md).[cnx](connection.Connection.md#cnx)

#### Defined in

[src/lib/connection/connection.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connection.ts#L7)

___

### inTransaction

• **inTransaction**: `boolean`

#### Inherited from

[Connection](connection.Connection.md).[inTransaction](connection.Connection.md#intransaction)

#### Defined in

[src/lib/connection/connection.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connection.ts#L9)

___

### pool

• **pool**: `any`

#### Inherited from

[Connection](connection.Connection.md).[pool](connection.Connection.md#pool)

#### Defined in

[src/lib/connection/connection.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connection.ts#L8)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

Connection.config

#### Defined in

[src/lib/connection/connection.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connection.ts#L16)

## Methods

### beginTransaction

▸ **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[beginTransaction](connection.Connection.md#begintransaction)

#### Defined in

[src/lib/connection/dialects/postgres.ts:148](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L148)

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

[src/lib/connection/dialects/postgres.ts:80](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L80)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[src/lib/connection/dialects/postgres.ts:153](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L153)

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

[src/lib/connection/dialects/postgres.ts:135](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L135)

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

[src/lib/connection/dialects/postgres.ts:140](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L140)

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

[src/lib/connection/dialects/postgres.ts:144](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L144)

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

[src/lib/connection/dialects/postgres.ts:70](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L70)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[src/lib/connection/dialects/postgres.ts:158](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L158)

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

[src/lib/connection/dialects/postgres.ts:65](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L65)

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

[src/lib/connection/dialects/postgres.ts:130](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/postgres.ts#L130)
