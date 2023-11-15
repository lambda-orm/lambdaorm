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

[src/lib/schema/application/services/config/mappingsConfigService.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/schema/application/services/config/mappingsConfigService.ts#L7)

## Properties

### mappings

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

#### Defined in

[src/lib/schema/application/services/config/mappingsConfigService.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/schema/application/services/config/mappingsConfigService.ts#L5)

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

[src/lib/schema/application/services/config/mappingsConfigService.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/schema/application/services/config/mappingsConfigService.ts#L22)

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

[src/lib/schema/application/services/config/mappingsConfigService.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/schema/application/services/config/mappingsConfigService.ts#L29)

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

[src/lib/schema/application/services/config/mappingsConfigService.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/schema/application/services/config/mappingsConfigService.ts#L37)

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

[src/lib/schema/application/services/config/mappingsConfigService.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/schema/application/services/config/mappingsConfigService.ts#L11)
