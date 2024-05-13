[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ReleaseConnection

# Class: ReleaseConnection

## Constructors

### new ReleaseConnection()

> **new ReleaseConnection**(`poolService`): [`ReleaseConnection`](ReleaseConnection.md)

#### Parameters

• **poolService**: [`ConnectionPoolService`](ConnectionPoolService.md)

#### Returns

[`ReleaseConnection`](ReleaseConnection.md)

#### Source

[src/lib/connection/application/useCases/release.ts:6](https://github.com/lambda-orm/lambdaorm/blob/500b65f534ab1bcb8cf5af2781a7f18794a4944e/src/lib/connection/application/useCases/release.ts#L6)

## Methods

### release()

> **release**(`connection`): `Promise`\<`void`\>

#### Parameters

• **connection**: [`Connection`](../interfaces/Connection.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/application/useCases/release.ts:8](https://github.com/lambda-orm/lambdaorm/blob/500b65f534ab1bcb8cf5af2781a7f18794a4944e/src/lib/connection/application/useCases/release.ts#L8)
