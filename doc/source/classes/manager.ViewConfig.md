[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ViewConfig

# Class: ViewConfig

[manager](../modules/manager.md).ViewConfig

## Table of contents

### Constructors

- [constructor](manager.ViewConfig.md#constructor)

### Accessors

- [entities](manager.ViewConfig.md#entities)
- [name](manager.ViewConfig.md#name)

### Methods

- [excludeEntity](manager.ViewConfig.md#excludeentity)
- [get](manager.ViewConfig.md#get)
- [getEntity](manager.ViewConfig.md#getentity)
- [getProperty](manager.ViewConfig.md#getproperty)
- [set](manager.ViewConfig.md#set)

## Constructors

### constructor

• **new ViewConfig**(`view`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | [`View`](../interfaces/model.View.md) |

#### Defined in

[src/lib/manager/schema.ts:333](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L333)

## Accessors

### entities

• `get` **entities**(): [`EntityView`](../interfaces/model.EntityView.md)[]

#### Returns

[`EntityView`](../interfaces/model.EntityView.md)[]

#### Defined in

[src/lib/manager/schema.ts:349](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L349)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/manager/schema.ts:337](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L337)

## Methods

### excludeEntity

▸ **excludeEntity**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/manager/schema.ts:365](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L365)

___

### get

▸ **get**(): [`View`](../interfaces/model.View.md)

#### Returns

[`View`](../interfaces/model.View.md)

#### Defined in

[src/lib/manager/schema.ts:341](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L341)

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`EntityView`](../interfaces/model.EntityView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`EntityView`](../interfaces/model.EntityView.md)

#### Defined in

[src/lib/manager/schema.ts:353](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L353)

___

### getProperty

▸ **getProperty**(`entityName`, `name`): `undefined` \| [`PropertyView`](../interfaces/model.PropertyView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

`undefined` \| [`PropertyView`](../interfaces/model.PropertyView.md)

#### Defined in

[src/lib/manager/schema.ts:357](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L357)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`View`](../interfaces/model.View.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:345](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L345)
