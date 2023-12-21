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

node_modules/lambdaorm-base/query/domain/data.d.ts:4

## Properties

### data

• **data**: `any`

#### Defined in

node_modules/lambdaorm-base/query/domain/data.d.ts:2

___

### parent

• **parent**: `any`

#### Defined in

node_modules/lambdaorm-base/query/domain/data.d.ts:3

## Methods

### clone

▸ **clone**(): [`Data`](Data.md)

#### Returns

[`Data`](Data.md)

#### Defined in

node_modules/lambdaorm-base/query/domain/data.d.ts:6

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

node_modules/lambdaorm-base/query/domain/data.d.ts:8

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

node_modules/lambdaorm-base/query/domain/data.d.ts:9

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

node_modules/lambdaorm-base/query/domain/data.d.ts:7

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

node_modules/lambdaorm-base/query/domain/data.d.ts:11

___

### newData

▸ **newData**(): [`Data`](Data.md)

#### Returns

[`Data`](Data.md)

#### Defined in

node_modules/lambdaorm-base/query/domain/data.d.ts:5

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

node_modules/lambdaorm-base/query/domain/data.d.ts:10
