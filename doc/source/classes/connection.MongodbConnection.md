[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MongodbConnection

# Class: MongodbConnection

[connection](../modules/connection.md).MongodbConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`MongodbConnection`**

## Table of contents

### Constructors

- [constructor](connection.MongodbConnection.md#constructor)

### Properties

- [cnx](connection.MongodbConnection.md#cnx)
- [inTransaction](connection.MongodbConnection.md#intransaction)
- [pool](connection.MongodbConnection.md#pool)

### Accessors

- [config](connection.MongodbConnection.md#config)

### Methods

- [beginTransaction](connection.MongodbConnection.md#begintransaction)
- [bulkInsert](connection.MongodbConnection.md#bulkinsert)
- [commit](connection.MongodbConnection.md#commit)
- [delete](connection.MongodbConnection.md#delete)
- [execute](connection.MongodbConnection.md#execute)
- [executeSentence](connection.MongodbConnection.md#executesentence)
- [insert](connection.MongodbConnection.md#insert)
- [rollback](connection.MongodbConnection.md#rollback)
- [select](connection.MongodbConnection.md#select)
- [update](connection.MongodbConnection.md#update)

## Constructors

### constructor

• **new MongodbConnection**(`cnx`, `pool`)

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

[src/lib/connection/dialects/MongoDB.ts:88](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L88)

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

[src/lib/connection/dialects/MongoDB.ts:67](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L67)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:93](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L93)

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

[src/lib/connection/dialects/MongoDB.ts:75](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L75)

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

[src/lib/connection/dialects/MongoDB.ts:79](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L79)

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

[src/lib/connection/dialects/MongoDB.ts:84](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L84)

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

[src/lib/connection/dialects/MongoDB.ts:62](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L62)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:98](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L98)

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

[src/lib/connection/dialects/MongoDB.ts:58](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L58)

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

[src/lib/connection/dialects/MongoDB.ts:71](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/MongoDB.ts#L71)
