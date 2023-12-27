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

<<<<<<< HEAD
[src/lib/connection/application/ports/connectionPool.ts:5](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connectionPool.ts#L5)
=======
[src/lib/connection/application/ports/connectionPool.ts:5](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connectionPool.ts#L5)
>>>>>>> release/1.2.0

## Methods

### acquire

▸ **acquire**(): `Promise`\<[`Connection`](Connection.md)\>

#### Returns

`Promise`\<[`Connection`](Connection.md)\>

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connectionPool.ts:7](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connectionPool.ts#L7)
=======
[src/lib/connection/application/ports/connectionPool.ts:7](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connectionPool.ts#L7)
>>>>>>> release/1.2.0

___

### end

▸ **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connectionPool.ts:9](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connectionPool.ts#L9)
=======
[src/lib/connection/application/ports/connectionPool.ts:9](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connectionPool.ts#L9)
>>>>>>> release/1.2.0

___

### init

▸ **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connectionPool.ts:6](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connectionPool.ts#L6)
=======
[src/lib/connection/application/ports/connectionPool.ts:6](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connectionPool.ts#L6)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connectionPool.ts:8](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connectionPool.ts#L8)
=======
[src/lib/connection/application/ports/connectionPool.ts:8](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connectionPool.ts#L8)
>>>>>>> release/1.2.0
