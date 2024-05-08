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

[src/lib/connection/application/services/connectionPoolService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/connection/application/services/connectionPoolService.ts#L8)

## Methods

### end()

> **end**(`name`): `Promise`\<`void`\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:22](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/connection/application/services/connectionPoolService.ts#L22)

***

### endAll()

> **endAll**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:29](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/connection/application/services/connectionPoolService.ts#L29)

***

### get()

> **get**(`name`): [`ConnectionPool`](../interfaces/ConnectionPool.md)

#### Parameters

• **name**: `string`

#### Returns

[`ConnectionPool`](../interfaces/ConnectionPool.md)

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:14](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/connection/application/services/connectionPoolService.ts#L14)

***

### load()

> **load**(`config`): `void`

#### Parameters

• **config**: [`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Returns

`void`

#### Source

[src/lib/connection/application/services/connectionPoolService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/connection/application/services/connectionPoolService.ts#L10)
