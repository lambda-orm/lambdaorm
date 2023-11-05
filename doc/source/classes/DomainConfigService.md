[Lambda ORM](../README.md) / DomainConfigService

# Class: DomainConfigService

## Hierarchy

- `DomainConfigServiceBase`<[`Entity`](../interfaces/Entity.md), [`Property`](../interfaces/Property.md)\>

  ↳ **`DomainConfigService`**

## Table of contents

### Constructors

- [constructor](DomainConfigService.md#constructor)

### Properties

- [entities](DomainConfigService.md#entities)
- [enums](DomainConfigService.md#enums)

### Methods

- [existsProperty](DomainConfigService.md#existsproperty)
- [getAutoIncrement](DomainConfigService.md#getautoincrement)
- [getEntity](DomainConfigService.md#getentity)
- [getEnum](DomainConfigService.md#getenum)
- [getFieldIds](DomainConfigService.md#getfieldids)
- [getForcedEntity](DomainConfigService.md#getforcedentity)
- [getProperty](DomainConfigService.md#getproperty)
- [getRelation](DomainConfigService.md#getrelation)
- [isChild](DomainConfigService.md#ischild)
- [listEntities](DomainConfigService.md#listentities)
- [sortByDependencies](DomainConfigService.md#sortbydependencies)
- [sortByRelations](DomainConfigService.md#sortbyrelations)

## Constructors

### constructor

• **new DomainConfigService**(`entities?`, `enums?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entities` | [`Entity`](../interfaces/Entity.md)[] | `[]` |
| `enums` | [`Enum`](../interfaces/Enum.md)[] | `[]` |

#### Overrides

DomainConfigServiceBase&lt;Entity, Property\&gt;.constructor

#### Defined in

[src/lib/schema/application/services/config/domainConfigService.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigService.ts#L8)

## Properties

### entities

• **entities**: [`Entity`](../interfaces/Entity.md)[]

#### Overrides

DomainConfigServiceBase.entities

#### Defined in

[src/lib/schema/application/services/config/domainConfigService.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigService.ts#L5)

___

### enums

• **enums**: [`Enum`](../interfaces/Enum.md)[]

#### Overrides

DomainConfigServiceBase.enums

#### Defined in

[src/lib/schema/application/services/config/domainConfigService.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigService.ts#L6)

## Methods

### existsProperty

▸ **existsProperty**(`entityName`, `name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

`boolean`

#### Inherited from

DomainConfigServiceBase.existsProperty

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L38)

___

### getAutoIncrement

▸ **getAutoIncrement**(`entityName`): `undefined` \| [`Property`](../interfaces/Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`Property`](../interfaces/Property.md)

#### Inherited from

DomainConfigServiceBase.getAutoIncrement

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L57)

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`Entity`](../interfaces/Entity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Entity`](../interfaces/Entity.md)

#### Inherited from

DomainConfigServiceBase.getEntity

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L11)

___

### getEnum

▸ **getEnum**(`name`): `undefined` \| [`Enum`](../interfaces/Enum.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Enum`](../interfaces/Enum.md)

#### Inherited from

DomainConfigServiceBase.getEnum

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L23)

___

### getFieldIds

▸ **getFieldIds**(`entityName`): `undefined` \| [`Property`](../interfaces/Property.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`Property`](../interfaces/Property.md)[]

#### Inherited from

DomainConfigServiceBase.getFieldIds

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L65)

___

### getForcedEntity

▸ **getForcedEntity**(`name`): [`Entity`](../interfaces/Entity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Entity`](../interfaces/Entity.md)

#### Inherited from

DomainConfigServiceBase.getForcedEntity

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L15)

___

### getProperty

▸ **getProperty**(`entityName`, `name`): [`Property`](../interfaces/Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

[`Property`](../interfaces/Property.md)

#### Inherited from

DomainConfigServiceBase.getProperty

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:45](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L45)

___

### getRelation

▸ **getRelation**(`entity`, `relation`): [`RelationInfo`](../interfaces/RelationInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `relation` | `string` |

#### Returns

[`RelationInfo`](../interfaces/RelationInfo.md)

#### Inherited from

DomainConfigServiceBase.getRelation

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:281](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L281)

___

### isChild

▸ **isChild**(`entityName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`boolean`

#### Inherited from

DomainConfigServiceBase.isChild

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L27)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

DomainConfigServiceBase.listEntities

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:73](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L73)

___

### sortByDependencies

▸ **sortByDependencies**(`entities?`): `string`[]

Sort a list of entities according to their dependencies

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `entities` | `string`[] | `[]` | entities to order |

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

DomainConfigServiceBase.sortByDependencies

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:136](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L136)

___

### sortByRelations

▸ **sortByRelations**(`mainEntities`, `allEntities`): `string`[]

Sort a list of entities according to their relationships

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainEntities` | `string`[] |
| `allEntities` | `string`[] |

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

DomainConfigServiceBase.sortByRelations

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:82](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L82)
