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
- [MssqlConnectionPool](connection.MssqlConnectionPool.md#mssqlconnectionpool)
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

[connection/dialects/mssql.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mssql.ts#L13)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/connectionPool.ts#L6)

___

### MssqlConnectionPool

▪ `Static` **MssqlConnectionPool**: `any`

#### Defined in

[connection/dialects/mssql.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mssql.ts#L11)

___

### tedious

▪ `Static` **tedious**: `any`

#### Defined in

[connection/dialects/mssql.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mssql.ts#L10)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[connection/dialects/mssql.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mssql.ts#L26)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[connection/dialects/mssql.ts:46](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mssql.ts#L46)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[connection/dialects/mssql.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mssql.ts#L21)

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

[connection/dialects/mssql.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mssql.ts#L39)
