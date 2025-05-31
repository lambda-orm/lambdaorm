[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ConnectionPool

# Interface: ConnectionPool

Defined in: [src/lib/connection/domain/ports/connectionPool.ts:4](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connectionPool.ts#L4)

## Properties

### config

> **config**: [`ConnectionConfig`](ConnectionConfig.md)

Defined in: [src/lib/connection/domain/ports/connectionPool.ts:5](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connectionPool.ts#L5)

## Methods

### acquire()

> **acquire**(): `Promise`\<[`Connection`](Connection.md)\>

Defined in: [src/lib/connection/domain/ports/connectionPool.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connectionPool.ts#L7)

#### Returns

`Promise`\<[`Connection`](Connection.md)\>

***

### end()

> **end**(): `Promise`\<`void`\>

Defined in: [src/lib/connection/domain/ports/connectionPool.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connectionPool.ts#L9)

#### Returns

`Promise`\<`void`\>

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [src/lib/connection/domain/ports/connectionPool.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connectionPool.ts#L6)

#### Returns

`Promise`\<`void`\>

***

### release()

> **release**(`connection`): `Promise`\<`void`\>

Defined in: [src/lib/connection/domain/ports/connectionPool.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connectionPool.ts#L8)

#### Parameters

##### connection

[`Connection`](Connection.md)

#### Returns

`Promise`\<`void`\>
