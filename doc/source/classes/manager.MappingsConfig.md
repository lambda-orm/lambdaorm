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

[src/lib/manager/schema.ts:189](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L189)

## Properties

### mappings

• **mappings**: [`Mapping`](../interfaces/model.Mapping.md)[]

#### Defined in

[src/lib/manager/schema.ts:187](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L187)

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

[src/lib/manager/schema.ts:204](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L204)

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

[src/lib/manager/schema.ts:211](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L211)

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

[src/lib/manager/schema.ts:219](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L219)

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

[src/lib/manager/schema.ts:193](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L193)
