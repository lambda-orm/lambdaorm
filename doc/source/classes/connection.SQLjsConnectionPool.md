[Lambda ORM](../README.md) / [connection](../modules/connection.md) / SQLjsConnectionPool

# Class: SQLjsConnectionPool

[connection](../modules/connection.md).SQLjsConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`SQLjsConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.SQLjsConnectionPool.md#constructor)

### Properties

- [config](connection.SQLjsConnectionPool.md#config)

### Methods

- [acquire](connection.SQLjsConnectionPool.md#acquire)
- [end](connection.SQLjsConnectionPool.md#end)
- [init](connection.SQLjsConnectionPool.md#init)
- [release](connection.SQLjsConnectionPool.md#release)

## Constructors

### constructor

• **new SQLjsConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/connection/dialects/SQLjs.ts#L11)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/connection/dialects/SQLjs.ts#L33)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/connection/dialects/SQLjs.ts#L42)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/connection/dialects/SQLjs.ts#L16)

___

### release

▸ **release**(`_connection`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_connection` | [`Connection`](connection.Connection.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[release](connection.ConnectionPool.md#release)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/connection/dialects/SQLjs.ts#L38)
