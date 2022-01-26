[Lambda ORM](../README.md) / [model](../modules/model.md) / Data

# Class: Data

[model](../modules/model.md).Data

## Table of contents

### Constructors

- [constructor](model.Data.md#constructor)

### Properties

- [data](model.Data.md#data)
- [parent](model.Data.md#parent)

### Methods

- [contains](model.Data.md#contains)
- [get](model.Data.md#get)
- [getData](model.Data.md#getdata)
- [init](model.Data.md#init)
- [newData](model.Data.md#newdata)
- [set](model.Data.md#set)

## Constructors

### constructor

• **new Data**(`data`, `parent?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `parent?` | [`Data`](model.Data.md) |

#### Defined in

[src/lib/model/data.ts:4](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L4)

## Properties

### data

• **data**: `any`

#### Defined in

[src/lib/model/data.ts:2](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L2)

___

### parent

• **parent**: `any`

#### Defined in

[src/lib/model/data.ts:3](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L3)

## Methods

### contains

▸ **contains**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/model/data.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L19)

___

### get

▸ **get**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/model/data.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L29)

___

### getData

▸ **getData**(`variable`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/model/data.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L13)

___

### init

▸ **init**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/model/data.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L50)

___

### newData

▸ **newData**(): [`Data`](model.Data.md)

#### Returns

[`Data`](model.Data.md)

#### Defined in

[src/lib/model/data.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L9)

___

### set

▸ **set**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/model/data.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/model/data.ts#L40)
