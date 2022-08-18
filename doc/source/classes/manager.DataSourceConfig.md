[Lambda ORM](../README.md) / [manager](../modules/manager.md) / DataSourceConfig

# Class: DataSourceConfig

[manager](../modules/manager.md).DataSourceConfig

## Table of contents

### Constructors

- [constructor](manager.DataSourceConfig.md#constructor)

### Properties

- [sources](manager.DataSourceConfig.md#sources)
- [default](manager.DataSourceConfig.md#default)

### Methods

- [get](manager.DataSourceConfig.md#get)
- [load](manager.DataSourceConfig.md#load)

## Constructors

### constructor

• **new DataSourceConfig**()

#### Defined in

[src/lib/manager/schema.ts:416](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L416)

## Properties

### sources

• **sources**: [`source`](../interfaces/model.source.md)[]

#### Defined in

[src/lib/manager/schema.ts:413](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L413)

___

### default

• `Optional` **default**: `string`

#### Defined in

[src/lib/manager/schema.ts:414](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L414)

## Methods

### get

▸ **get**(`name?`): [`source`](../interfaces/model.source.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`source`](../interfaces/model.source.md)

#### Defined in

[src/lib/manager/schema.ts:431](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L431)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`source`](../interfaces/model.source.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:420](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L420)
