[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MariadbConnectionPool

# Class: MariadbConnectionPool

[connection](../modules/connection.md).MariadbConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`MariadbConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.MariadbConnectionPool.md#constructor)

### Properties

- [config](connection.MariadbConnectionPool.md#config)

### Methods

- [acquire](connection.MariadbConnectionPool.md#acquire)
- [end](connection.MariadbConnectionPool.md#end)
- [release](connection.MariadbConnectionPool.md#release)

## Constructors

### constructor

• **new MariadbConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[connection/dialects/mariadb.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mariadb.ts#L8)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[connection/dialects/mariadb.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mariadb.ts#L14)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[connection/dialects/mariadb.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mariadb.ts#L23)

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

[connection/dialects/mariadb.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mariadb.ts#L19)
