[Lambda ORM](../README.md) / Data

# Class: Data

## Table of contents

### Constructors

- [constructor](Data.md#constructor)

### Properties

- [data](Data.md#data)
- [parent](Data.md#parent)

### Methods

- [clone](Data.md#clone)
- [contains](Data.md#contains)
- [get](Data.md#get)
- [getData](Data.md#getdata)
- [init](Data.md#init)
- [newData](Data.md#newdata)
- [set](Data.md#set)

## Constructors

### constructor

• **new Data**(`data`, `parent?`): [`Data`](Data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `parent?` | [`Data`](Data.md) |

#### Returns

[`Data`](Data.md)

#### Defined in

[src/lib/query/domain/data.ts:4](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L4)

## Properties

### data

• **data**: `any`

#### Defined in

[src/lib/query/domain/data.ts:2](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L2)

___

### parent

• **parent**: `any`

#### Defined in

[src/lib/query/domain/data.ts:3](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L3)

## Methods

### clone

▸ **clone**(): [`Data`](Data.md)

#### Returns

[`Data`](Data.md)

#### Defined in

[src/lib/query/domain/data.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L13)

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

[src/lib/query/domain/data.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L25)

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

[src/lib/query/domain/data.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L35)

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

[src/lib/query/domain/data.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L19)

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

[src/lib/query/domain/data.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L56)

___

### newData

▸ **newData**(): [`Data`](Data.md)

#### Returns

[`Data`](Data.md)

#### Defined in

[src/lib/query/domain/data.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L9)

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

[src/lib/query/domain/data.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/3d32e0b6/src/lib/query/domain/data.ts#L46)
