[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ConnectionPool

# Interface: ConnectionPool

## Properties

### config

> **config**: [`ConnectionConfig`](ConnectionConfig.md)

#### Source

[src/lib/connection/domain/ports/connectionPool.ts:5](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/connection/domain/ports/connectionPool.ts#L5)

## Methods

### acquire()

> **acquire**(): `Promise`\<[`Connection`](Connection.md)\>

#### Returns

`Promise`\<[`Connection`](Connection.md)\>

#### Source

[src/lib/connection/domain/ports/connectionPool.ts:7](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/connection/domain/ports/connectionPool.ts#L7)

***

### end()

> **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/domain/ports/connectionPool.ts:9](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/connection/domain/ports/connectionPool.ts#L9)

***

### init()

> **init**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/domain/ports/connectionPool.ts:6](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/connection/domain/ports/connectionPool.ts#L6)

***

### release()

> **release**(`connection`): `Promise`\<`void`\>

#### Parameters

• **connection**: [`Connection`](Connection.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/domain/ports/connectionPool.ts:8](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/connection/domain/ports/connectionPool.ts#L8)
