[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MariaDBConnectionPool

# Class: MariaDBConnectionPool

[connection](../modules/connection.md).MariaDBConnectionPool

## Hierarchy

- [`MySQLConnectionPool`](connection.MySQLConnectionPool.md)

  ↳ **`MariaDBConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.MariaDBConnectionPool.md#constructor)

### Properties

- [config](connection.MariaDBConnectionPool.md#config)

### Methods

- [acquire](connection.MariaDBConnectionPool.md#acquire)
- [end](connection.MariaDBConnectionPool.md#end)
- [init](connection.MariaDBConnectionPool.md#init)
- [release](connection.MariaDBConnectionPool.md#release)

## Constructors

### constructor

• **new MariaDBConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Inherited from

[MySQLConnectionPool](connection.MySQLConnectionPool.md).[constructor](connection.MySQLConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MySQL.ts#L26)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[MySQLConnectionPool](connection.MySQLConnectionPool.md).[config](connection.MySQLConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Inherited from

[MySQLConnectionPool](connection.MySQLConnectionPool.md).[acquire](connection.MySQLConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:48](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MySQL.ts#L48)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MySQLConnectionPool](connection.MySQLConnectionPool.md).[end](connection.MySQLConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MySQL.ts#L60)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[MySQLConnectionPool](connection.MySQLConnectionPool.md).[init](connection.MySQLConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MySQL.ts#L33)

___

### release

▸ **release**(`connection`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](connection.Connection.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

[MySQLConnectionPool](connection.MySQLConnectionPool.md).[release](connection.MySQLConnectionPool.md#release)

#### Defined in

[src/lib/connection/dialects/MySQL.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/MySQL.ts#L56)
