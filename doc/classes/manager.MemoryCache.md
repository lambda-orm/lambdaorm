[Lambda ORM](../README.md) / [manager](../modules/manager.md) / MemoryCache

# Class: MemoryCache

[manager](../modules/manager.md).MemoryCache

## Implements

- [`Cache`](../interfaces/model.Cache.md)

## Table of contents

### Constructors

- [constructor](manager.MemoryCache.md#constructor)

### Methods

- [del](manager.MemoryCache.md#del)
- [get](manager.MemoryCache.md#get)
- [set](manager.MemoryCache.md#set)

## Constructors

### constructor

• **new MemoryCache**()

#### Defined in

[manager/memoryCache.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/memoryCache.ts#L5)

## Methods

### del

▸ **del**(`key`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`void`

#### Implementation of

[Cache](../interfaces/model.Cache.md).[del](../interfaces/model.Cache.md#del)

#### Defined in

[manager/memoryCache.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/memoryCache.ts#L17)

___

### get

▸ **get**(`key`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`any`

#### Implementation of

[Cache](../interfaces/model.Cache.md).[get](../interfaces/model.Cache.md#get)

#### Defined in

[manager/memoryCache.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/memoryCache.ts#L9)

___

### set

▸ **set**(`key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Implementation of

[Cache](../interfaces/model.Cache.md).[set](../interfaces/model.Cache.md#set)

#### Defined in

[manager/memoryCache.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/memoryCache.ts#L13)
