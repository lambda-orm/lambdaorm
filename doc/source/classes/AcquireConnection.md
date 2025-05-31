[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / AcquireConnection

# Class: AcquireConnection

Defined in: [src/lib/connection/application/useCases/acquire.ts:4](https://github.com/lambda-orm/lambdaorm/blob/c3a91c30fec1b72ec517236790b02085e94a7ae1/src/lib/connection/application/useCases/acquire.ts#L4)

## Constructors

### Constructor

> **new AcquireConnection**(`poolService`): `AcquireConnection`

Defined in: [src/lib/connection/application/useCases/acquire.ts:6](https://github.com/lambda-orm/lambdaorm/blob/c3a91c30fec1b72ec517236790b02085e94a7ae1/src/lib/connection/application/useCases/acquire.ts#L6)

#### Parameters

##### poolService

[`ConnectionPoolService`](ConnectionPoolService.md)

#### Returns

`AcquireConnection`

## Methods

### acquire()

> **acquire**(`name`): `Promise`\<[`Connection`](../interfaces/Connection.md)\>

Defined in: [src/lib/connection/application/useCases/acquire.ts:8](https://github.com/lambda-orm/lambdaorm/blob/c3a91c30fec1b72ec517236790b02085e94a7ae1/src/lib/connection/application/useCases/acquire.ts#L8)

#### Parameters

##### name

`string`

#### Returns

`Promise`\<[`Connection`](../interfaces/Connection.md)\>
