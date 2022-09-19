[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MongoDBConnectionPool

# Class: MongoDBConnectionPool

[connection](../modules/connection.md).MongoDBConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`MongoDBConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.MongoDBConnectionPool.md#constructor)

### Properties

- [config](connection.MongoDBConnectionPool.md#config)

### Methods

- [acquire](connection.MongoDBConnectionPool.md#acquire)
- [end](connection.MongoDBConnectionPool.md#end)
- [init](connection.MongoDBConnectionPool.md#init)
- [release](connection.MongoDBConnectionPool.md#release)

## Constructors

### constructor

• **new MongoDBConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MongoDB.ts#L10)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MongoDB.ts#L21)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MongoDB.ts#L33)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MongoDB.ts#L17)

___

### release

▸ **release**(`connection`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](connection.Connection.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[release](connection.ConnectionPool.md#release)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MongoDB.ts#L29)
