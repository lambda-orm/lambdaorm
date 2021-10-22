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
- [init](connection.MariadbConnectionPool.md#init)
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

[connection/dialects/mariadb.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mariadb.ts#L8)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[connection/dialects/mariadb.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mariadb.ts#L28)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[connection/dialects/mariadb.ts:37](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mariadb.ts#L37)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[connection/dialects/mariadb.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mariadb.ts#L15)

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

[connection/dialects/mariadb.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mariadb.ts#L33)
