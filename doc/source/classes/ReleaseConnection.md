[Lambda ORM](../README.md) / ReleaseConnection

# Class: ReleaseConnection

## Table of contents

### Constructors

- [constructor](ReleaseConnection.md#constructor)

### Methods

- [release](ReleaseConnection.md#release)

## Constructors

### constructor

• **new ReleaseConnection**(`poolService`): [`ReleaseConnection`](ReleaseConnection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolService` | [`ConnectionPoolService`](ConnectionPoolService.md) |

#### Returns

[`ReleaseConnection`](ReleaseConnection.md)

#### Defined in

[src/lib/connection/application/useCases/release.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/01807f7a/src/lib/connection/application/useCases/release.ts#L6)

## Methods

### release

▸ **release**(`connection`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](../interfaces/Connection.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/useCases/release.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/01807f7a/src/lib/connection/application/useCases/release.ts#L8)
