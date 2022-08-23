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

- [clone](model.Data.md#clone)
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

[src/lib/model/data.ts:4](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L4)

## Properties

### data

• **data**: `any`

#### Defined in

[src/lib/model/data.ts:2](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L2)

___

### parent

• **parent**: `any`

#### Defined in

[src/lib/model/data.ts:3](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L3)

## Methods

### clone

▸ **clone**(): [`Data`](model.Data.md)

#### Returns

[`Data`](model.Data.md)

#### Defined in

[src/lib/model/data.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L13)

___

### contains

▸ **contains**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/model/data.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L25)

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

[src/lib/model/data.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L35)

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

[src/lib/model/data.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L19)

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

[src/lib/model/data.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L56)

___

### newData

▸ **newData**(): [`Data`](model.Data.md)

#### Returns

[`Data`](model.Data.md)

#### Defined in

[src/lib/model/data.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L9)

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

[src/lib/model/data.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/data.ts#L46)
