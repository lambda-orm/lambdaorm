[Lambda ORM](../README.md) / DialectPoolService

# Class: DialectPoolService

## Table of contents

### Constructors

- [constructor](DialectPoolService.md#constructor)

### Methods

- [add](DialectPoolService.md#add)
- [create](DialectPoolService.md#create)

## Constructors

### constructor

• **new DialectPoolService**(`helper`): [`DialectPoolService`](DialectPoolService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`DialectPoolService`](DialectPoolService.md)

#### Defined in

[src/lib/connection/application/services/dialectPoolService.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/d07a0a4f/src/lib/connection/application/services/dialectPoolService.ts#L7)

## Methods

### add

▸ **add**(`dialect`, `classConnectionPool`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |
| `classConnectionPool` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/connection/application/services/dialectPoolService.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/d07a0a4f/src/lib/connection/application/services/dialectPoolService.ts#L11)

___

### create

▸ **create**(`config`): [`ConnectionPool`](../interfaces/ConnectionPool.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/ConnectionConfig.md) |

#### Returns

[`ConnectionPool`](../interfaces/ConnectionPool.md)

#### Defined in

[src/lib/connection/application/services/dialectPoolService.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/d07a0a4f/src/lib/connection/application/services/dialectPoolService.ts#L15)
