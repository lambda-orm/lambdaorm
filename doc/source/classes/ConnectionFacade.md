[Lambda ORM](../README.md) / ConnectionFacade

# Class: ConnectionFacade

## Table of contents

### Constructors

- [constructor](ConnectionFacade.md#constructor)

### Methods

- [acquire](ConnectionFacade.md#acquire)
- [addDialect](ConnectionFacade.md#adddialect)
- [end](ConnectionFacade.md#end)
- [getConfig](ConnectionFacade.md#getconfig)
- [load](ConnectionFacade.md#load)
- [release](ConnectionFacade.md#release)

## Constructors

### constructor

• **new ConnectionFacade**(`dialectService`, `poolService`, `acquireConnection`, `releaseConnection`): [`ConnectionFacade`](ConnectionFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialectService` | [`DialectPoolService`](DialectPoolService.md) |
| `poolService` | [`ConnectionPoolService`](ConnectionPoolService.md) |
| `acquireConnection` | [`AcquireConnection`](AcquireConnection.md) |
| `releaseConnection` | [`ReleaseConnection`](ReleaseConnection.md) |

#### Returns

[`ConnectionFacade`](ConnectionFacade.md)

#### Defined in

[src/lib/connection/application/facade.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d1b498ee2dcb0adac2059644725f796da18ff3ea/src/lib/connection/application/facade.ts#L10)

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

[src/lib/connection/application/facade.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d1b498ee2dcb0adac2059644725f796da18ff3ea/src/lib/connection/application/facade.ts#L33)

___

### addDialect

▸ **addDialect**(`dialect`, `classConnectionPool`): [`ConnectionFacade`](ConnectionFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |
| `classConnectionPool` | `any` |

#### Returns

[`ConnectionFacade`](ConnectionFacade.md)

#### Defined in

[src/lib/connection/application/facade.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d1b498ee2dcb0adac2059644725f796da18ff3ea/src/lib/connection/application/facade.ts#L16)

___

### end

▸ **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/facade.ts:29](https://github.com/lambda-orm/lambdaorm/blob/d1b498ee2dcb0adac2059644725f796da18ff3ea/src/lib/connection/application/facade.ts#L29)

___

### getConfig

▸ **getConfig**(`name`): [`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ConnectionConfig`](../interfaces/ConnectionConfig.md)

#### Defined in

[src/lib/connection/application/facade.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d1b498ee2dcb0adac2059644725f796da18ff3ea/src/lib/connection/application/facade.ts#L25)

___

### load

▸ **load**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/ConnectionConfig.md) |

#### Returns

`void`

#### Defined in

[src/lib/connection/application/facade.ts:21](https://github.com/lambda-orm/lambdaorm/blob/d1b498ee2dcb0adac2059644725f796da18ff3ea/src/lib/connection/application/facade.ts#L21)

___

### release

▸ **release**(`connection`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](../interfaces/Connection.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/facade.ts:37](https://github.com/lambda-orm/lambdaorm/blob/d1b498ee2dcb0adac2059644725f796da18ff3ea/src/lib/connection/application/facade.ts#L37)
