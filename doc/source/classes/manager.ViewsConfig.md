[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ViewsConfig

# Class: ViewsConfig

[manager](../modules/manager.md).ViewsConfig

## Table of contents

### Constructors

- [constructor](manager.ViewsConfig.md#constructor)

### Properties

- [views](manager.ViewsConfig.md#views)

### Methods

- [get](manager.ViewsConfig.md#get)
- [getInstance](manager.ViewsConfig.md#getinstance)
- [load](manager.ViewsConfig.md#load)

## Constructors

### constructor

• **new ViewsConfig**()

#### Defined in

[src/lib/manager/schema.ts:374](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L374)

## Properties

### views

• **views**: [`View`](../interfaces/model.View.md)[]

#### Defined in

[src/lib/manager/schema.ts:372](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L372)

## Methods

### get

▸ **get**(`name?`): [`View`](../interfaces/model.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`View`](../interfaces/model.View.md)

#### Defined in

[src/lib/manager/schema.ts:392](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L392)

___

### getInstance

▸ **getInstance**(`name?`): [`ViewConfig`](manager.ViewConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`ViewConfig`](manager.ViewConfig.md)

#### Defined in

[src/lib/manager/schema.ts:403](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L403)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`View`](../interfaces/model.View.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:378](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L378)
