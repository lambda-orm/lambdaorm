[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ViewConfigService

# Class: ViewConfigService

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:2

## Constructors

### Constructor

> **new ViewConfigService**(`view`): `ViewConfigService`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:4

#### Parameters

##### view

[`View`](../interfaces/View.md)

#### Returns

`ViewConfigService`

## Accessors

### entities

#### Get Signature

> **get** **entities**(): [`EntityView`](../interfaces/EntityView.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:8

##### Returns

[`EntityView`](../interfaces/EntityView.md)[]

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:5

##### Returns

`string`

## Methods

### excludeEntity()

> **excludeEntity**(`name`): `boolean`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:11

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### get()

> **get**(): [`View`](../interfaces/View.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:6

#### Returns

[`View`](../interfaces/View.md)

***

### getEntity()

> **getEntity**(`name`): `undefined` \| [`EntityView`](../interfaces/EntityView.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:9

#### Parameters

##### name

`string`

#### Returns

`undefined` \| [`EntityView`](../interfaces/EntityView.md)

***

### getProperty()

> **getProperty**(`entityName`, `name`): `undefined` \| [`PropertyView`](../interfaces/PropertyView.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:10

#### Parameters

##### entityName

`string`

##### name

`string`

#### Returns

`undefined` \| [`PropertyView`](../interfaces/PropertyView.md)

***

### set()

> **set**(`value`): `void`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/viewConfigService.d.ts:7

#### Parameters

##### value

[`View`](../interfaces/View.md)

#### Returns

`void`
