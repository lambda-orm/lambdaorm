[Lambda ORM](../README.md) / [connection](../modules/connection.md) / PostgresConnectionPool

# Class: PostgresConnectionPool

[connection](../modules/connection.md).PostgresConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`PostgresConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.PostgresConnectionPool.md#constructor)

### Properties

- [config](connection.PostgresConnectionPool.md#config)

### Methods

- [acquire](connection.PostgresConnectionPool.md#acquire)
- [end](connection.PostgresConnectionPool.md#end)
- [release](connection.PostgresConnectionPool.md#release)

## Constructors

### constructor

• **new PostgresConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[connection/dialects/postgres.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/postgres.ts#L10)

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

[connection/dialects/postgres.ts:42](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/postgres.ts#L42)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[connection/dialects/postgres.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/postgres.ts#L52)

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

[connection/dialects/postgres.ts:48](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/postgres.ts#L48)
