[Lambda ORM](../README.md) / AcquireConnection

# Class: AcquireConnection

## Table of contents

### Constructors

- [constructor](AcquireConnection.md#constructor)

### Methods

- [acquire](AcquireConnection.md#acquire)

## Constructors

### constructor

• **new AcquireConnection**(`poolService`): [`AcquireConnection`](AcquireConnection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolService` | [`ConnectionPoolService`](ConnectionPoolService.md) |

#### Returns

[`AcquireConnection`](AcquireConnection.md)

#### Defined in

[src/lib/connection/application/useCases/acquire.ts:6](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/connection/application/useCases/acquire.ts#L6)

## Methods

### acquire

▸ **acquire**(`name`): `Promise`\<[`Connection`](../interfaces/Connection.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<[`Connection`](../interfaces/Connection.md)\>

#### Defined in

[src/lib/connection/application/useCases/acquire.ts:8](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/connection/application/useCases/acquire.ts#L8)
