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

[connection/dialects/mssql.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mssql.ts#L17)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connectionPool.ts#L6)

___

### tedious

▪ `Static` **tedious**: `any`

#### Defined in

[connection/dialects/mssql.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mssql.ts#L15)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[connection/dialects/mssql.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mssql.ts#L25)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[connection/dialects/mssql.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mssql.ts#L45)

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

[connection/dialects/mssql.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mssql.ts#L33)
