[Lambda ORM](../README.md) / ConnectionPoolService

# Class: ConnectionPoolService

## Table of contents

### Constructors

- [constructor](ConnectionPoolService.md#constructor)

### Methods

- [end](ConnectionPoolService.md#end)
- [endAll](ConnectionPoolService.md#endall)
- [get](ConnectionPoolService.md#get)
- [load](ConnectionPoolService.md#load)

## Constructors

### constructor

• **new ConnectionPoolService**(`dialectPoolService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialectPoolService` | [`DialectPoolService`](DialectPoolService.md) |

#### Defined in

[src/lib/connection/application/services/connectionPoolService.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/f313d751/src/lib/connection/application/services/connectionPoolService.ts#L8)

## Methods

### end

▸ **end**(`name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/application/services/connectionPoolService.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/f313d751/src/lib/connection/application/services/connectionPoolService.ts#L22)

___

### endAll

▸ **endAll**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/application/services/connectionPoolService.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/f313d751/src/lib/connection/application/services/connectionPoolService.ts#L29)

___

### get

▸ **get**(`name`): [`ConnectionPool`](../interfaces/ConnectionPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ConnectionPool`](../interfaces/ConnectionPool.md)

#### Defined in

[src/lib/connection/application/services/connectionPoolService.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/f313d751/src/lib/connection/application/services/connectionPoolService.ts#L14)

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

[src/lib/connection/application/services/connectionPoolService.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/f313d751/src/lib/connection/application/services/connectionPoolService.ts#L10)
