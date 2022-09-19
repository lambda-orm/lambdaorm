[Lambda ORM](../README.md) / [manager](../modules/manager.md) / DataSourceConfig

# Class: DataSourceConfig

[manager](../modules/manager.md).DataSourceConfig

## Table of contents

### Constructors

- [constructor](manager.DataSourceConfig.md#constructor)

### Properties

- [default](manager.DataSourceConfig.md#default)
- [sources](manager.DataSourceConfig.md#sources)

### Methods

- [get](manager.DataSourceConfig.md#get)
- [load](manager.DataSourceConfig.md#load)

## Constructors

### constructor

• **new DataSourceConfig**()

#### Defined in

[src/lib/manager/schema.ts:415](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L415)

## Properties

### default

• `Optional` **default**: `string`

#### Defined in

[src/lib/manager/schema.ts:413](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L413)

___

### sources

• **sources**: [`source`](../interfaces/model.source.md)[]

#### Defined in

[src/lib/manager/schema.ts:412](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L412)

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

[src/lib/manager/schema.ts:430](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L430)

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

[src/lib/manager/schema.ts:419](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L419)
