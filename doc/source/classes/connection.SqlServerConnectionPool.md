[Lambda ORM](../README.md) / [connection](../modules/connection.md) / SqlServerConnectionPool

# Class: SqlServerConnectionPool

[connection](../modules/connection.md).SqlServerConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`SqlServerConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.SqlServerConnectionPool.md#constructor)

### Properties

- [config](connection.SqlServerConnectionPool.md#config)
- [lib](connection.SqlServerConnectionPool.md#lib)

### Methods

- [acquire](connection.SqlServerConnectionPool.md#acquire)
- [end](connection.SqlServerConnectionPool.md#end)
- [init](connection.SqlServerConnectionPool.md#init)
- [release](connection.SqlServerConnectionPool.md#release)

## Constructors

### constructor

• **new SqlServerConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/SqlServer.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/SqlServer.ts#L9)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connectionPool.ts#L6)

___

### lib

▪ `Static` **lib**: `any`

#### Defined in

[src/lib/connection/dialects/SqlServer.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/SqlServer.ts#L8)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/SqlServer.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/SqlServer.ts#L20)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/SqlServer.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/SqlServer.ts#L46)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/SqlServer.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/SqlServer.ts#L16)

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

[src/lib/connection/dialects/SqlServer.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/SqlServer.ts#L39)
