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

[connection/dialects/mysql.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mysql.ts#L39)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[connection/dialects/mysql.ts:56](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mysql.ts#L56)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[connection/dialects/mysql.ts:65](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mysql.ts#L65)

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

[connection/dialects/mysql.ts:61](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/dialects/mysql.ts#L61)
