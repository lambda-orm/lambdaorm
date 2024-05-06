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

[src/lib/connection/application/useCases/acquire.ts:6](https://github.com/lambda-orm/lambdaorm/blob/b2dcdf45bee27aeba3f984c2906e1e8e2c137a45/src/lib/connection/application/useCases/acquire.ts#L6)

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

[src/lib/connection/application/useCases/acquire.ts:8](https://github.com/lambda-orm/lambdaorm/blob/b2dcdf45bee27aeba3f984c2906e1e8e2c137a45/src/lib/connection/application/useCases/acquire.ts#L8)
