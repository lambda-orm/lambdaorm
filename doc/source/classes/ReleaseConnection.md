[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ReleaseConnection

# Class: ReleaseConnection

Defined in: [src/lib/connection/application/useCases/release.ts:4](https://github.com/lambda-orm/lambdaorm/blob/0c7200c61eb042585cd3ed78e0f69b7956734d6b/src/lib/connection/application/useCases/release.ts#L4)

## Constructors

### Constructor

> **new ReleaseConnection**(`poolService`): `ReleaseConnection`

Defined in: [src/lib/connection/application/useCases/release.ts:6](https://github.com/lambda-orm/lambdaorm/blob/0c7200c61eb042585cd3ed78e0f69b7956734d6b/src/lib/connection/application/useCases/release.ts#L6)

#### Parameters

##### poolService

[`ConnectionPoolService`](ConnectionPoolService.md)

#### Returns

`ReleaseConnection`

## Methods

### release()

> **release**(`connection`): `Promise`\<`void`\>

Defined in: [src/lib/connection/application/useCases/release.ts:8](https://github.com/lambda-orm/lambdaorm/blob/0c7200c61eb042585cd3ed78e0f69b7956734d6b/src/lib/connection/application/useCases/release.ts#L8)

#### Parameters

##### connection

[`Connection`](../interfaces/Connection.md)

#### Returns

`Promise`\<`void`\>
