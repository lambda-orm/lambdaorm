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

[src/lib/connection/application/facade.ts:10](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/connection/application/facade.ts#L10)

## Methods

### acquire()

> **acquire**(`name`): `Promise`\<[`Connection`](../interfaces/Connection.md)\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<[`Connection`](../interfaces/Connection.md)\>

#### Source

[src/lib/connection/application/facade.ts:33](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/connection/application/facade.ts#L33)

***

### addDialect()

> **addDialect**(`dialect`, `classConnectionPool`): [`ConnectionFacade`](ConnectionFacade.md)

#### Parameters

• **dialect**: `string`

• **classConnectionPool**: `any`

#### Returns

[`ConnectionFacade`](ConnectionFacade.md)

#### Source

[src/lib/connection/application/facade.ts:16](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/connection/application/facade.ts#L16)

***

### end()

> **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/facade.ts:29](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/connection/application/facade.ts#L29)

***

### getConfig()

> **getConfig**(`name`): [`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Parameters

• **name**: `string`

#### Returns

[`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Source

[src/lib/connection/application/facade.ts:25](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/connection/application/facade.ts#L25)

***

### load()

> **load**(`config`): `void`

#### Parameters

• **config**: [`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Returns

`void`

#### Source

[src/lib/connection/application/facade.ts:21](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/connection/application/facade.ts#L21)

***

### release()

> **release**(`connection`): `Promise`\<`void`\>

#### Parameters

• **connection**: [`Connection`](../interfaces/Connection.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/facade.ts:37](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/connection/application/facade.ts#L37)
