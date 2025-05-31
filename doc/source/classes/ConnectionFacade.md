[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ConnectionFacade

# Class: ConnectionFacade

Defined in: [src/lib/connection/application/facade.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/application/facade.ts#L7)

## Constructors

### Constructor

> **new ConnectionFacade**(`dialectService`, `poolService`, `acquireConnection`, `releaseConnection`): `ConnectionFacade`

Defined in: [src/lib/connection/application/facade.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/application/facade.ts#L9)

#### Parameters

##### dialectService

[`DialectPoolService`](DialectPoolService.md)

##### poolService

[`ConnectionPoolService`](ConnectionPoolService.md)

##### acquireConnection

[`AcquireConnection`](AcquireConnection.md)

##### releaseConnection

[`ReleaseConnection`](ReleaseConnection.md)

#### Returns

`ConnectionFacade`

## Methods

### acquire()

> **acquire**(`name`): `Promise`\<[`Connection`](../interfaces/Connection.md)\>

Defined in: [src/lib/connection/application/facade.ts:32](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/application/facade.ts#L32)

#### Parameters

##### name

`string`

#### Returns

`Promise`\<[`Connection`](../interfaces/Connection.md)\>

***

### addDialect()

> **addDialect**(`dialect`, `classConnectionPool`): `ConnectionFacade`

Defined in: [src/lib/connection/application/facade.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/application/facade.ts#L15)

#### Parameters

##### dialect

`string`

##### classConnectionPool

`any`

#### Returns

`ConnectionFacade`

***

### end()

> **end**(): `Promise`\<`void`\>

Defined in: [src/lib/connection/application/facade.ts:28](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/application/facade.ts#L28)

#### Returns

`Promise`\<`void`\>

***

### getConfig()

> **getConfig**(`name`): [`ConnectionConfig`](../interfaces/ConnectionConfig.md)

Defined in: [src/lib/connection/application/facade.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/application/facade.ts#L24)

#### Parameters

##### name

`string`

#### Returns

[`ConnectionConfig`](../interfaces/ConnectionConfig.md)

***

### load()

> **load**(`config`): `void`

Defined in: [src/lib/connection/application/facade.ts:20](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/application/facade.ts#L20)

#### Parameters

##### config

[`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Returns

`void`

***

### release()

> **release**(`connection`): `Promise`\<`void`\>

Defined in: [src/lib/connection/application/facade.ts:36](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/application/facade.ts#L36)

#### Parameters

##### connection

[`Connection`](../interfaces/Connection.md)

#### Returns

`Promise`\<`void`\>
