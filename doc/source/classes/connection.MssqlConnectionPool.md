[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MssqlConnectionPool

# Class: MssqlConnectionPool

[connection](../modules/connection.md).MssqlConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`MssqlConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.MssqlConnectionPool.md#constructor)

### Properties

- [config](connection.MssqlConnectionPool.md#config)
- [tedious](connection.MssqlConnectionPool.md#tedious)

### Methods

- [acquire](connection.MssqlConnectionPool.md#acquire)
- [end](connection.MssqlConnectionPool.md#end)
- [init](connection.MssqlConnectionPool.md#init)
- [release](connection.MssqlConnectionPool.md#release)

## Constructors

### constructor

• **new MssqlConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/mssql.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/mssql.ts#L9)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connectionPool.ts#L6)

___

### tedious

▪ `Static` **tedious**: `any`

#### Defined in

[src/lib/connection/dialects/mssql.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/mssql.ts#L8)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/mssql.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/mssql.ts#L20)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/mssql.ts:41](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/mssql.ts#L41)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/mssql.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/mssql.ts#L16)

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

[src/lib/connection/dialects/mssql.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/dialects/mssql.ts#L34)
