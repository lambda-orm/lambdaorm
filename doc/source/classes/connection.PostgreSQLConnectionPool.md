[Lambda ORM](../README.md) / [connection](../modules/connection.md) / PostgreSQLConnectionPool

# Class: PostgreSQLConnectionPool

[connection](../modules/connection.md).PostgreSQLConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`PostgreSQLConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.PostgreSQLConnectionPool.md#constructor)

### Properties

- [config](connection.PostgreSQLConnectionPool.md#config)

### Methods

- [acquire](connection.PostgreSQLConnectionPool.md#acquire)
- [end](connection.PostgreSQLConnectionPool.md#end)
- [init](connection.PostgreSQLConnectionPool.md#init)
- [release](connection.PostgreSQLConnectionPool.md#release)

## Constructors

### constructor

• **new PostgreSQLConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/PostgreSQL.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/dialects/PostgreSQL.ts#L10)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/PostgreSQL.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/dialects/PostgreSQL.ts#L46)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/PostgreSQL.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/dialects/PostgreSQL.ts#L56)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/PostgreSQL.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/dialects/PostgreSQL.ts#L42)

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

[src/lib/connection/dialects/PostgreSQL.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/dialects/PostgreSQL.ts#L52)
