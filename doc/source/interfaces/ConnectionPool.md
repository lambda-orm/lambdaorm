[Lambda ORM](../README.md) / ConnectionPool

# Interface: ConnectionPool

## Table of contents

### Properties

- [config](ConnectionPool.md#config)

### Methods

- [acquire](ConnectionPool.md#acquire)
- [end](ConnectionPool.md#end)
- [init](ConnectionPool.md#init)
- [release](ConnectionPool.md#release)

## Properties

### config

• **config**: [`ConnectionConfig`](ConnectionConfig.md)

#### Defined in

[src/lib/connection/application/ports/connectionPool.ts:5](https://github.com/lambda-orm/lambdaorm/blob/9f602cbc/src/lib/connection/application/ports/connectionPool.ts#L5)

## Methods

### acquire

▸ **acquire**(): `Promise`\<[`Connection`](Connection.md)\>

#### Returns

`Promise`\<[`Connection`](Connection.md)\>

#### Defined in

[src/lib/connection/application/ports/connectionPool.ts:7](https://github.com/lambda-orm/lambdaorm/blob/9f602cbc/src/lib/connection/application/ports/connectionPool.ts#L7)

___

### end

▸ **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connectionPool.ts:9](https://github.com/lambda-orm/lambdaorm/blob/9f602cbc/src/lib/connection/application/ports/connectionPool.ts#L9)

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connectionPool.ts:6](https://github.com/lambda-orm/lambdaorm/blob/9f602cbc/src/lib/connection/application/ports/connectionPool.ts#L6)

___

### release

▸ **release**(`connection`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](Connection.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connectionPool.ts:8](https://github.com/lambda-orm/lambdaorm/blob/9f602cbc/src/lib/connection/application/ports/connectionPool.ts#L8)
