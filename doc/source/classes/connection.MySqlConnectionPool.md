[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MySqlConnectionPool

# Class: MySqlConnectionPool

[connection](../modules/connection.md).MySqlConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`MySqlConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.MySqlConnectionPool.md#constructor)

### Properties

- [config](connection.MySqlConnectionPool.md#config)

### Methods

- [acquire](connection.MySqlConnectionPool.md#acquire)
- [end](connection.MySqlConnectionPool.md#end)
- [init](connection.MySqlConnectionPool.md#init)
- [release](connection.MySqlConnectionPool.md#release)

## Constructors

### constructor

• **new MySqlConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/mysql.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mysql.ts#L40)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/mysql.ts:75](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mysql.ts#L75)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/mysql.ts:91](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mysql.ts#L91)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/mysql.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mysql.ts#L47)

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

[src/lib/connection/dialects/mysql.ts:84](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/connection/dialects/mysql.ts#L84)
