[Lambda ORM](../README.md) / [model](../modules/model.md) / DataContext

# Class: DataContext

[model](../modules/model.md).DataContext

## Table of contents

### Constructors

- [constructor](model.DataContext.md#constructor)

### Properties

- [data](model.DataContext.md#data)
- [parent](model.DataContext.md#parent)

### Methods

- [contains](model.DataContext.md#contains)
- [get](model.DataContext.md#get)
- [getContext](model.DataContext.md#getcontext)
- [init](model.DataContext.md#init)
- [newContext](model.DataContext.md#newcontext)
- [set](model.DataContext.md#set)

## Constructors

### constructor

• **new DataContext**(`data`, `parent?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `parent?` | [`DataContext`](model.DataContext.md) |

#### Defined in

[model/context.ts:4](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L4)

## Properties

### data

• **data**: `any`

#### Defined in

[model/context.ts:2](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L2)

___

### parent

• **parent**: `any`

#### Defined in

[model/context.ts:3](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L3)

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

[model/context.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L19)

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

[model/context.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L29)

___

### getContext

▸ **getContext**(`variable`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | `string` |

#### Returns

`any`

#### Defined in

[model/context.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L13)

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

[model/context.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L50)

___

### newContext

▸ **newContext**(): [`DataContext`](model.DataContext.md)

#### Returns

[`DataContext`](model.DataContext.md)

#### Defined in

[model/context.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L9)

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

[model/context.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/context.ts#L40)
