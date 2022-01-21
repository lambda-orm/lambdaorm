[Lambda ORM](../README.md) / [manager](../modules/manager.md) / LibManager

# Class: LibManager

[manager](../modules/manager.md).LibManager

## Table of contents

### Constructors

- [constructor](manager.LibManager.md#constructor)

### Methods

- [getConfig](manager.LibManager.md#getconfig)
- [getConfigFileName](manager.LibManager.md#getconfigfilename)

## Constructors

### constructor

• **new LibManager**()

## Methods

### getConfig

▸ **getConfig**(`source?`): `Promise`<[`Schema`](../interfaces/model.Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source?` | `string` |

#### Returns

`Promise`<[`Schema`](../interfaces/model.Schema.md)\>

#### Defined in

[src/lib/manager/lib.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/lib.ts#L7)

___

### getConfigFileName

▸ **getConfigFileName**(`workspace`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[src/lib/manager/lib.ts:66](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/lib.ts#L66)
