[Lambda ORM](../README.md) / MappingsConfigService

# Class: MappingsConfigService

## Table of contents

### Constructors

- [constructor](MappingsConfigService.md#constructor)

### Properties

- [mappings](MappingsConfigService.md#mappings)

### Methods

- [delete](MappingsConfigService.md#delete)
- [get](MappingsConfigService.md#get)
- [getInstance](MappingsConfigService.md#getinstance)
- [load](MappingsConfigService.md#load)

## Constructors

### constructor

• **new MappingsConfigService**(): [`MappingsConfigService`](MappingsConfigService.md)

#### Returns

[`MappingsConfigService`](MappingsConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingsConfigService.d.ts:5

## Properties

### mappings

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingsConfigService.d.ts:4

## Methods

### delete

▸ **delete**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingsConfigService.d.ts:7

___

### get

▸ **get**(`name`): [`Mapping`](../interfaces/Mapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Mapping`](../interfaces/Mapping.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingsConfigService.d.ts:8

___

### getInstance

▸ **getInstance**(`name`): [`MappingConfigService`](MappingConfigService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`MappingConfigService`](MappingConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingsConfigService.d.ts:9

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Mapping`](../interfaces/Mapping.md) |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingsConfigService.d.ts:6
