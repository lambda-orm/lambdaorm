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

[src/lib/manager/schema.ts:292](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L292)

## Properties

### mappings

• **mappings**: [`Mapping`](../interfaces/model.Mapping.md)[]

#### Defined in

[src/lib/manager/schema.ts:290](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L290)

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

[src/lib/manager/schema.ts:307](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L307)

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

[src/lib/manager/schema.ts:314](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L314)

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

[src/lib/manager/schema.ts:322](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L322)

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

[src/lib/manager/schema.ts:296](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L296)
