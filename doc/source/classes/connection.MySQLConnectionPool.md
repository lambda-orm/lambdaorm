[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MySQLConnectionPool

# Class: MySQLConnectionPool

[connection](../modules/connection.md).MySQLConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`MySQLConnectionPool`**

  ↳↳ [`MariaDBConnectionPool`](connection.MariaDBConnectionPool.md)

## Table of contents

### Constructors

- [constructor](connection.MySQLConnectionPool.md#constructor)

### Properties

- [config](connection.MySQLConnectionPool.md#config)

### Methods

- [acquire](connection.MySQLConnectionPool.md#acquire)
- [end](connection.MySQLConnectionPool.md#end)
- [init](connection.MySQLConnectionPool.md#init)
- [release](connection.MySQLConnectionPool.md#release)

## Constructors

### constructor

• **new MySQLConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MySQL.ts#L26)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:48](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MySQL.ts#L48)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MySQL.ts#L60)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MySQL.ts#L33)

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

[src/lib/connection/dialects/MySQL.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MySQL.ts#L56)
