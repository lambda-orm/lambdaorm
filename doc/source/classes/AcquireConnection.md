[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / AcquireConnection

# Class: AcquireConnection

## Constructors

### new AcquireConnection()

> **new AcquireConnection**(`poolService`): [`AcquireConnection`](AcquireConnection.md)

#### Parameters

• **poolService**: [`ConnectionPoolService`](ConnectionPoolService.md)

#### Returns

[`AcquireConnection`](AcquireConnection.md)

#### Source

[src/lib/connection/application/useCases/acquire.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d3091fcee159ea28f1f31cae156d6b1e1cec840e/src/lib/connection/application/useCases/acquire.ts#L6)

## Methods

### acquire()

> **acquire**(`name`): `Promise`\<[`Connection`](../interfaces/Connection.md)\>

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<[`Connection`](../interfaces/Connection.md)\>

#### Source

[src/lib/connection/application/useCases/acquire.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d3091fcee159ea28f1f31cae156d6b1e1cec840e/src/lib/connection/application/useCases/acquire.ts#L8)
