[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ConnectionFacade

# Class: ConnectionFacade

## Constructors

### new ConnectionFacade()

> **new ConnectionFacade**(`dialectService`, `poolService`, `acquireConnection`, `releaseConnection`): [`ConnectionFacade`](ConnectionFacade.md)

#### Parameters

• **dialectService**: [`DialectPoolService`](DialectPoolService.md)

• **poolService**: [`ConnectionPoolService`](ConnectionPoolService.md)

• **acquireConnection**: [`AcquireConnection`](AcquireConnection.md)

• **releaseConnection**: [`ReleaseConnection`](ReleaseConnection.md)

#### Returns

[`ConnectionFacade`](ConnectionFacade.md)

#### Source

[src/lib/connection/application/facade.ts:9](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/facade.ts#L9)

## Methods

### acquire()

> **acquire**(`name`): `Promise`\<[`Connection`](../interfaces/Connection.md)\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<[`Connection`](../interfaces/Connection.md)\>

#### Source

[src/lib/connection/application/facade.ts:32](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/facade.ts#L32)

***

### addDialect()

> **addDialect**(`dialect`, `classConnectionPool`): [`ConnectionFacade`](ConnectionFacade.md)

#### Parameters

• **dialect**: `string`

• **classConnectionPool**: `any`

#### Returns

[`ConnectionFacade`](ConnectionFacade.md)

#### Source

[src/lib/connection/application/facade.ts:15](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/facade.ts#L15)

***

### end()

> **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/facade.ts:28](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/facade.ts#L28)

***

### getConfig()

> **getConfig**(`name`): [`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Parameters

• **name**: `string`

#### Returns

[`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Source

[src/lib/connection/application/facade.ts:24](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/facade.ts#L24)

***

### load()

> **load**(`config`): `void`

#### Parameters

• **config**: [`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Returns

`void`

#### Source

[src/lib/connection/application/facade.ts:20](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/facade.ts#L20)

***

### release()

> **release**(`connection`): `Promise`\<`void`\>

#### Parameters

• **connection**: [`Connection`](../interfaces/Connection.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/facade.ts:36](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/facade.ts#L36)
