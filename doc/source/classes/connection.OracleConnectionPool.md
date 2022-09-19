[Lambda ORM](../README.md) / [connection](../modules/connection.md) / OracleConnectionPool

# Class: OracleConnectionPool

[connection](../modules/connection.md).OracleConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`OracleConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.OracleConnectionPool.md#constructor)

### Properties

- [config](connection.OracleConnectionPool.md#config)

### Methods

- [acquire](connection.OracleConnectionPool.md#acquire)
- [end](connection.OracleConnectionPool.md#end)
- [init](connection.OracleConnectionPool.md#init)
- [release](connection.OracleConnectionPool.md#release)

## Constructors

### constructor

• **new OracleConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/connectionPool.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connectionPool.ts#L7)

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

[src/lib/connection/dialects/Oracle.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/Oracle.ts#L49)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/Oracle.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/Oracle.ts#L61)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/Oracle.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/Oracle.ts#L24)

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

[src/lib/connection/dialects/Oracle.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/Oracle.ts#L57)
