[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ConfigManager

# Class: ConfigManager

[manager](../modules/manager.md).ConfigManager

## Table of contents

### Constructors

- [constructor](manager.ConfigManager.md#constructor)

### Properties

- [config](manager.ConfigManager.md#config)
- [database](manager.ConfigManager.md#database)
- [schema](manager.ConfigManager.md#schema)
- [workspace](manager.ConfigManager.md#workspace)

### Methods

- [load](manager.ConfigManager.md#load)

## Constructors

### constructor

• **new ConfigManager**(`workspace`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Defined in

[manager/configManager.ts:338](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/configManager.ts#L338)

## Properties

### config

• **config**: [`Config`](../interfaces/model.Config.md)

#### Defined in

[manager/configManager.ts:334](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/configManager.ts#L334)

___

### database

• **database**: `DatabaseConfig`

#### Defined in

[manager/configManager.ts:332](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/configManager.ts#L332)

___

### schema

• **schema**: `SchemaConfig`

#### Defined in

[manager/configManager.ts:333](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/configManager.ts#L333)

___

### workspace

• **workspace**: `string`

#### Defined in

[manager/configManager.ts:335](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/configManager.ts#L335)

## Methods

### load

▸ **load**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/model.Config.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/configManager.ts:346](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/configManager.ts#L346)
