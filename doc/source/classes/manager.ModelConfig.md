[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ModelConfig

# Class: ModelConfig

[manager](../modules/manager.md).ModelConfig

## Hierarchy

- `ModelConfigBase`<[`Entity`](../interfaces/model.Entity.md), [`Property`](../interfaces/model.Property.md)\>

  ↳ **`ModelConfig`**

## Table of contents

### Constructors

- [constructor](manager.ModelConfig.md#constructor)

### Properties

- [entities](manager.ModelConfig.md#entities)
- [enums](manager.ModelConfig.md#enums)

### Methods

- [existsProperty](manager.ModelConfig.md#existsproperty)
- [getAutoIncrement](manager.ModelConfig.md#getautoincrement)
- [getEntity](manager.ModelConfig.md#getentity)
- [getEnum](manager.ModelConfig.md#getenum)
- [getFieldIds](manager.ModelConfig.md#getfieldids)
- [getForcedEntity](manager.ModelConfig.md#getforcedentity)
- [getProperty](manager.ModelConfig.md#getproperty)
- [getRelation](manager.ModelConfig.md#getrelation)
- [isChild](manager.ModelConfig.md#ischild)
- [listEntities](manager.ModelConfig.md#listentities)
- [sortByDependencies](manager.ModelConfig.md#sortbydependencies)
- [sortByRelations](manager.ModelConfig.md#sortbyrelations)

## Constructors

### constructor

• **new ModelConfig**(`entities?`, `enums?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entities` | [`Entity`](../interfaces/model.Entity.md)[] | `[]` |
| `enums` | [`Enum`](../interfaces/model.Enum.md)[] | `[]` |

#### Overrides

ModelConfigBase&lt;Entity, Property\&gt;.constructor

#### Defined in

[src/lib/manager/schema.ts:247](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L247)

## Properties

### entities

• **entities**: [`Entity`](../interfaces/model.Entity.md)[]

#### Overrides

ModelConfigBase.entities

#### Defined in

[src/lib/manager/schema.ts:244](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L244)

___

### enums

• **enums**: [`Enum`](../interfaces/model.Enum.md)[]

#### Overrides

ModelConfigBase.enums

#### Defined in

[src/lib/manager/schema.ts:245](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L245)

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

ModelConfigBase.existsProperty

#### Defined in

[src/lib/manager/schema.ts:40](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L40)

___

### getAutoIncrement

▸ **getAutoIncrement**(`entityName`): `undefined` \| [`Property`](../interfaces/model.Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`Property`](../interfaces/model.Property.md)

#### Inherited from

ModelConfigBase.getAutoIncrement

#### Defined in

[src/lib/manager/schema.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L59)

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`Entity`](../interfaces/model.Entity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Entity`](../interfaces/model.Entity.md)

#### Inherited from

ModelConfigBase.getEntity

#### Defined in

[src/lib/manager/schema.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L13)

___

### getEnum

▸ **getEnum**(`name`): `undefined` \| [`Enum`](../interfaces/model.Enum.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Enum`](../interfaces/model.Enum.md)

#### Inherited from

ModelConfigBase.getEnum

#### Defined in

[src/lib/manager/schema.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L25)

___

### getFieldIds

▸ **getFieldIds**(`entityName`): `undefined` \| [`Property`](../interfaces/model.Property.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`Property`](../interfaces/model.Property.md)[]

#### Inherited from

ModelConfigBase.getFieldIds

#### Defined in

[src/lib/manager/schema.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L67)

___

### getForcedEntity

▸ **getForcedEntity**(`name`): [`Entity`](../interfaces/model.Entity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Entity`](../interfaces/model.Entity.md)

#### Inherited from

ModelConfigBase.getForcedEntity

#### Defined in

[src/lib/manager/schema.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L17)

___

### getProperty

▸ **getProperty**(`entityName`, `name`): [`Property`](../interfaces/model.Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

[`Property`](../interfaces/model.Property.md)

#### Inherited from

ModelConfigBase.getProperty

#### Defined in

[src/lib/manager/schema.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L47)

___

### getRelation

▸ **getRelation**(`entity`, `relation`): [`RelationInfo`](../interfaces/model.RelationInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `relation` | `string` |

#### Returns

[`RelationInfo`](../interfaces/model.RelationInfo.md)

#### Inherited from

ModelConfigBase.getRelation

#### Defined in

[src/lib/manager/schema.ts:217](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L217)

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

ModelConfigBase.isChild

#### Defined in

[src/lib/manager/schema.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L29)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

ModelConfigBase.listEntities

#### Defined in

[src/lib/manager/schema.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L75)

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

ModelConfigBase.sortByDependencies

#### Defined in

[src/lib/manager/schema.ts:106](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L106)

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

ModelConfigBase.sortByRelations

#### Defined in

[src/lib/manager/schema.ts:84](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L84)
