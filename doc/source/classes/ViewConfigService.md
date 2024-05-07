[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ViewConfigService

# Class: ViewConfigService

## Constructors

### new ViewConfigService()

> **new ViewConfigService**(`view`): [`ViewConfigService`](ViewConfigService.md)

#### Parameters

• **view**: [`View`](../interfaces/View.md)

#### Returns

[`ViewConfigService`](ViewConfigService.md)

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:4

## Accessors

### entities

> `get` **entities**(): [`EntityView`](../interfaces/EntityView.md)[]

#### Returns

[`EntityView`](../interfaces/EntityView.md)[]

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:8

***

### name

> `get` **name**(): `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:5

## Methods

### excludeEntity()

> **excludeEntity**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:11

***

### get()

> **get**(): [`View`](../interfaces/View.md)

#### Returns

[`View`](../interfaces/View.md)

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:6

***

### getEntity()

> **getEntity**(`name`): `undefined` \| [`EntityView`](../interfaces/EntityView.md)

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| [`EntityView`](../interfaces/EntityView.md)

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:9

***

### getProperty()

> **getProperty**(`entityName`, `name`): `undefined` \| [`PropertyView`](../interfaces/PropertyView.md)

#### Parameters

• **entityName**: `string`

• **name**: `string`

#### Returns

`undefined` \| [`PropertyView`](../interfaces/PropertyView.md)

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:10

***

### set()

> **set**(`value`): `void`

#### Parameters

• **value**: [`View`](../interfaces/View.md)

#### Returns

`void`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:7
