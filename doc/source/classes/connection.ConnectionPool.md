[Lambda ORM](../README.md) / [connection](../modules/connection.md) / ConnectionPool

# Class: ConnectionPool

[connection](../modules/connection.md).ConnectionPool

## Hierarchy

- **`ConnectionPool`**

  ↳ [`MySQLConnectionPool`](connection.MySQLConnectionPool.md)

  ↳ [`PostgreSQLConnectionPool`](connection.PostgreSQLConnectionPool.md)

  ↳ [`SqlServerConnectionPool`](connection.SqlServerConnectionPool.md)

  ↳ [`OracleConnectionPool`](connection.OracleConnectionPool.md)

  ↳ [`SQLjsConnectionPool`](connection.SQLjsConnectionPool.md)

  ↳ [`MongoDBConnectionPool`](connection.MongoDBConnectionPool.md)

## Table of contents

### Constructors

- [constructor](connection.ConnectionPool.md#constructor)

### Properties

- [config](connection.ConnectionPool.md#config)

### Methods

- [acquire](connection.ConnectionPool.md#acquire)
- [end](connection.ConnectionPool.md#end)
- [init](connection.ConnectionPool.md#init)
- [release](connection.ConnectionPool.md#release)

## Constructors

### constructor

• **new ConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Defined in

[src/lib/connection/connectionPool.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connectionPool.ts#L7)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ `Abstract` **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Defined in

[src/lib/connection/connectionPool.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connectionPool.ts#L12)

___

### end

▸ `Abstract` **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connectionPool.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connectionPool.ts#L14)

___

### init

▸ `Abstract` **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connectionPool.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connectionPool.ts#L11)

___

### release

▸ `Abstract` **release**(`connection`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](connection.Connection.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connectionPool.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connectionPool.ts#L13)
