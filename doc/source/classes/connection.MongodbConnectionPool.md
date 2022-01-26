[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MongodbConnectionPool

# Class: MongodbConnectionPool

[connection](../modules/connection.md).MongodbConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`MongodbConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.MongodbConnectionPool.md#constructor)

### Properties

- [config](connection.MongodbConnectionPool.md#config)

### Methods

- [acquire](connection.MongodbConnectionPool.md#acquire)
- [end](connection.MongodbConnectionPool.md#end)
- [init](connection.MongodbConnectionPool.md#init)
- [release](connection.MongodbConnectionPool.md#release)

## Constructors

### constructor

• **new MongodbConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/mongodb.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/dialects/mongodb.ts#L14)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/mongodb.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/dialects/mongodb.ts#L26)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/mongodb.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/dialects/mongodb.ts#L50)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/mongodb.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/dialects/mongodb.ts#L21)

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

[src/lib/connection/dialects/mongodb.ts:46](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/connection/dialects/mongodb.ts#L46)
