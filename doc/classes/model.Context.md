[Lambda ORM](../README.md) / [model](../modules/model.md) / Context

# Class: Context

[model](../modules/model.md).Context

## Table of contents

### Constructors

- [constructor](model.Context.md#constructor)

### Properties

- [data](model.Context.md#data)
- [parent](model.Context.md#parent)

### Methods

- [contains](model.Context.md#contains)
- [get](model.Context.md#get)
- [getContext](model.Context.md#getcontext)
- [init](model.Context.md#init)
- [newContext](model.Context.md#newcontext)
- [set](model.Context.md#set)

## Constructors

### constructor

• **new Context**(`data`, `parent?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `parent?` | [`Context`](model.Context.md) |

#### Defined in

[model/context.ts:4](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L4)

## Properties

### data

• **data**: `any`

#### Defined in

[model/context.ts:2](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L2)

___

### parent

• **parent**: `any`

#### Defined in

[model/context.ts:3](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L3)

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

[model/context.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L19)

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

[model/context.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L29)

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

[model/context.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L13)

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

[model/context.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L50)

___

### newContext

▸ **newContext**(): [`Context`](model.Context.md)

#### Returns

[`Context`](model.Context.md)

#### Defined in

[model/context.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L9)

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

[model/context.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/model/context.ts#L40)
