[Lambda ORM](../README.md) / [manager](../modules/manager.md) / StageConfig

# Class: StageConfig

[manager](../modules/manager.md).StageConfig

## Table of contents

### Constructors

- [constructor](manager.StageConfig.md#constructor)

### Properties

- [default](manager.StageConfig.md#default)
- [stages](manager.StageConfig.md#stages)

### Methods

- [get](manager.StageConfig.md#get)
- [load](manager.StageConfig.md#load)

## Constructors

### constructor

• **new StageConfig**()

#### Defined in

[src/lib/manager/schema.ts:268](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L268)

## Properties

### default

• `Optional` **default**: `string`

#### Defined in

[src/lib/manager/schema.ts:266](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L266)

___

### stages

• **stages**: [`Stage`](../interfaces/model.Stage.md)[]

#### Defined in

[src/lib/manager/schema.ts:265](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L265)

## Methods

### get

▸ **get**(`name?`): [`Stage`](../interfaces/model.Stage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`Stage`](../interfaces/model.Stage.md)

#### Defined in

[src/lib/manager/schema.ts:283](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L283)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Stage`](../interfaces/model.Stage.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:272](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L272)
