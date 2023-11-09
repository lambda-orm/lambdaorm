[Lambda ORM](../README.md) / AcquireConnection

# Class: AcquireConnection

## Table of contents

### Constructors

- [constructor](AcquireConnection.md#constructor)

### Methods

- [acquire](AcquireConnection.md#acquire)

## Constructors

### constructor

• **new AcquireConnection**(`poolService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolService` | [`ConnectionPoolService`](ConnectionPoolService.md) |

#### Defined in

[src/lib/connection/application/useCases/acquire.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/9a3f2a20/src/lib/connection/application/useCases/acquire.ts#L6)

## Methods

### acquire

▸ **acquire**(`name`): `Promise`<[`Connection`](../interfaces/Connection.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`Connection`](../interfaces/Connection.md)\>

#### Defined in

[src/lib/connection/application/useCases/acquire.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/9a3f2a20/src/lib/connection/application/useCases/acquire.ts#L8)
