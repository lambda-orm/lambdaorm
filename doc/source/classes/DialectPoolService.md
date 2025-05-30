[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / DialectPoolService

# Class: DialectPoolService

Defined in: [src/lib/connection/application/services/dialectPoolService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/0c7200c61eb042585cd3ed78e0f69b7956734d6b/src/lib/connection/application/services/dialectPoolService.ts#L4)

## Constructors

### Constructor

> **new DialectPoolService**(`helper`): `DialectPoolService`

Defined in: [src/lib/connection/application/services/dialectPoolService.ts:6](https://github.com/lambda-orm/lambdaorm/blob/0c7200c61eb042585cd3ed78e0f69b7956734d6b/src/lib/connection/application/services/dialectPoolService.ts#L6)

#### Parameters

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`DialectPoolService`

## Methods

### add()

> **add**(`dialect`, `classConnectionPool`): `void`

Defined in: [src/lib/connection/application/services/dialectPoolService.ts:10](https://github.com/lambda-orm/lambdaorm/blob/0c7200c61eb042585cd3ed78e0f69b7956734d6b/src/lib/connection/application/services/dialectPoolService.ts#L10)

#### Parameters

##### dialect

`string`

##### classConnectionPool

`any`

#### Returns

`void`

***

### create()

> **create**(`config`): [`ConnectionPool`](../interfaces/ConnectionPool.md)

Defined in: [src/lib/connection/application/services/dialectPoolService.ts:14](https://github.com/lambda-orm/lambdaorm/blob/0c7200c61eb042585cd3ed78e0f69b7956734d6b/src/lib/connection/application/services/dialectPoolService.ts#L14)

#### Parameters

##### config

[`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Returns

[`ConnectionPool`](../interfaces/ConnectionPool.md)
