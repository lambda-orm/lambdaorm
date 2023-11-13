[Lambda ORM](../README.md) / ViewsConfigService

# Class: ViewsConfigService

## Table of contents

### Constructors

- [constructor](ViewsConfigService.md#constructor)

### Properties

- [views](ViewsConfigService.md#views)

### Methods

- [get](ViewsConfigService.md#get)
- [getInstance](ViewsConfigService.md#getinstance)
- [load](ViewsConfigService.md#load)

## Constructors

### constructor

• **new ViewsConfigService**(): [`ViewsConfigService`](ViewsConfigService.md)

#### Returns

[`ViewsConfigService`](ViewsConfigService.md)

#### Defined in

[src/lib/schema/application/services/config/viewsConfigService.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/services/config/viewsConfigService.ts#L7)

## Properties

### views

• **views**: [`View`](../interfaces/View.md)[]

#### Defined in

[src/lib/schema/application/services/config/viewsConfigService.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/services/config/viewsConfigService.ts#L5)

## Methods

### get

▸ **get**(`name?`): [`View`](../interfaces/View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`View`](../interfaces/View.md)

#### Defined in

[src/lib/schema/application/services/config/viewsConfigService.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/services/config/viewsConfigService.ts#L25)

___

### getInstance

▸ **getInstance**(`name?`): [`ViewConfigService`](ViewConfigService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`ViewConfigService`](ViewConfigService.md)

#### Defined in

[src/lib/schema/application/services/config/viewsConfigService.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/services/config/viewsConfigService.ts#L36)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`View`](../interfaces/View.md) |

#### Returns

`void`

#### Defined in

[src/lib/schema/application/services/config/viewsConfigService.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/schema/application/services/config/viewsConfigService.ts#L11)
