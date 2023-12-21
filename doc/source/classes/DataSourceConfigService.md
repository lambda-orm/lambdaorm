[Lambda ORM](../README.md) / DataSourceConfigService

# Class: DataSourceConfigService

## Table of contents

### Constructors

- [constructor](DataSourceConfigService.md#constructor)

### Properties

- [default](DataSourceConfigService.md#default)
- [sources](DataSourceConfigService.md#sources)

### Methods

- [get](DataSourceConfigService.md#get)
- [load](DataSourceConfigService.md#load)

## Constructors

### constructor

• **new DataSourceConfigService**(): [`DataSourceConfigService`](DataSourceConfigService.md)

#### Returns

[`DataSourceConfigService`](DataSourceConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/dataSourceConfigService.d.ts:5

## Properties

### default

• `Optional` **default**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/dataSourceConfigService.d.ts:4

___

### sources

• **sources**: [`Source`](../interfaces/Source.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/dataSourceConfigService.d.ts:3

## Methods

### get

▸ **get**(`name?`): [`Source`](../interfaces/Source.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`Source`](../interfaces/Source.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/dataSourceConfigService.d.ts:7

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Source`](../interfaces/Source.md) |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/dataSourceConfigService.d.ts:6
