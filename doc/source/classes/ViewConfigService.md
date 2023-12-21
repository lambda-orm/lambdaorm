[Lambda ORM](../README.md) / ViewConfigService

# Class: ViewConfigService

## Table of contents

### Constructors

- [constructor](ViewConfigService.md#constructor)

### Accessors

- [entities](ViewConfigService.md#entities)
- [name](ViewConfigService.md#name)

### Methods

- [excludeEntity](ViewConfigService.md#excludeentity)
- [get](ViewConfigService.md#get)
- [getEntity](ViewConfigService.md#getentity)
- [getProperty](ViewConfigService.md#getproperty)
- [set](ViewConfigService.md#set)

## Constructors

### constructor

• **new ViewConfigService**(`view`): [`ViewConfigService`](ViewConfigService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | [`View`](../interfaces/View.md) |

#### Returns

[`ViewConfigService`](ViewConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:4

## Accessors

### entities

• `get` **entities**(): [`EntityView`](../interfaces/EntityView.md)[]

#### Returns

[`EntityView`](../interfaces/EntityView.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:8

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:5

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

node_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:11

___

### get

▸ **get**(): [`View`](../interfaces/View.md)

#### Returns

[`View`](../interfaces/View.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:6

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`EntityView`](../interfaces/EntityView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`EntityView`](../interfaces/EntityView.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:9

___

### getProperty

▸ **getProperty**(`entityName`, `name`): `undefined` \| [`PropertyView`](../interfaces/PropertyView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

`undefined` \| [`PropertyView`](../interfaces/PropertyView.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:10

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`View`](../interfaces/View.md) |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:7
