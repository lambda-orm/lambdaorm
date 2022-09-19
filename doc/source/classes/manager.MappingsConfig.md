[Lambda ORM](../README.md) / [manager](../modules/manager.md) / MappingsConfig

# Class: MappingsConfig

[manager](../modules/manager.md).MappingsConfig

## Table of contents

### Constructors

- [constructor](manager.MappingsConfig.md#constructor)

### Properties

- [mappings](manager.MappingsConfig.md#mappings)

### Methods

- [delete](manager.MappingsConfig.md#delete)
- [get](manager.MappingsConfig.md#get)
- [getInstance](manager.MappingsConfig.md#getinstance)
- [load](manager.MappingsConfig.md#load)

## Constructors

### constructor

• **new MappingsConfig**()

#### Defined in

[src/lib/manager/schema.ts:291](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L291)

## Properties

### mappings

• **mappings**: [`Mapping`](../interfaces/model.Mapping.md)[]

#### Defined in

[src/lib/manager/schema.ts:289](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L289)

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

[src/lib/manager/schema.ts:306](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L306)

___

### get

▸ **get**(`name`): [`Mapping`](../interfaces/model.Mapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Mapping`](../interfaces/model.Mapping.md)

#### Defined in

[src/lib/manager/schema.ts:313](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L313)

___

### getInstance

▸ **getInstance**(`name`): [`MappingConfig`](manager.MappingConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`MappingConfig`](manager.MappingConfig.md)

#### Defined in

[src/lib/manager/schema.ts:321](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L321)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Mapping`](../interfaces/model.Mapping.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:295](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L295)
