[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ConnectionPoolService

# Class: ConnectionPoolService

## Constructors

### new ConnectionPoolService()

> **new ConnectionPoolService**(`dialectPoolService`): [`ConnectionPoolService`](ConnectionPoolService.md)

#### Parameters

• **dialectPoolService**: [`DialectPoolService`](DialectPoolService.md)

#### Returns

[`ConnectionPoolService`](ConnectionPoolService.md)

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:7](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/services/connectionPoolService.ts#L7)

## Methods

### end()

> **end**(`name`): `Promise`\<`void`\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:21](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/services/connectionPoolService.ts#L21)

***

### endAll()

> **endAll**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:28](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/services/connectionPoolService.ts#L28)

***

### get()

> **get**(`name`): [`ConnectionPool`](../interfaces/ConnectionPool.md)

#### Parameters

• **name**: `string`

#### Returns

[`ConnectionPool`](../interfaces/ConnectionPool.md)

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/services/connectionPoolService.ts#L13)

***

### load()

> **load**(`config`): `void`

#### Parameters

• **config**: [`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Returns

`void`

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:9](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/application/services/connectionPoolService.ts#L9)
