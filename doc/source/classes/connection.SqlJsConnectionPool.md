[Lambda ORM](../README.md) / [connection](../modules/connection.md) / SqlJsConnectionPool

# Class: SqlJsConnectionPool

[connection](../modules/connection.md).SqlJsConnectionPool

## Hierarchy

- [`ConnectionPool`](connection.ConnectionPool.md)

  ↳ **`SqlJsConnectionPool`**

## Table of contents

### Constructors

- [constructor](connection.SqlJsConnectionPool.md#constructor)

### Properties

- [config](connection.SqlJsConnectionPool.md#config)

### Methods

- [acquire](connection.SqlJsConnectionPool.md#acquire)
- [end](connection.SqlJsConnectionPool.md#end)
- [init](connection.SqlJsConnectionPool.md#init)
- [release](connection.SqlJsConnectionPool.md#release)

## Constructors

### constructor

• **new SqlJsConnectionPool**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[constructor](connection.ConnectionPool.md#constructor)

#### Defined in

[src/lib/connection/dialects/sqljs.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/sqljs.ts#L12)

## Properties

### config

• **config**: [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

[ConnectionPool](connection.ConnectionPool.md).[config](connection.ConnectionPool.md#config)

#### Defined in

[src/lib/connection/connectionPool.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/connectionPool.ts#L6)

## Methods

### acquire

▸ **acquire**(): `Promise`<[`Connection`](connection.Connection.md)\>

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[acquire](connection.ConnectionPool.md#acquire)

#### Defined in

[src/lib/connection/dialects/sqljs.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/sqljs.ts#L34)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[end](connection.ConnectionPool.md#end)

#### Defined in

[src/lib/connection/dialects/sqljs.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/sqljs.ts#L43)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[ConnectionPool](connection.ConnectionPool.md).[init](connection.ConnectionPool.md#init)

#### Defined in

[src/lib/connection/dialects/sqljs.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/sqljs.ts#L17)

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

[src/lib/connection/dialects/sqljs.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/connection/dialects/sqljs.ts#L39)
