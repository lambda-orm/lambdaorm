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

[src/lib/manager/schema.ts:246](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L246)

## Properties

### entities

• **entities**: [`Entity`](../interfaces/model.Entity.md)[]

#### Overrides

ModelConfigBase.entities

#### Defined in

[src/lib/manager/schema.ts:243](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L243)

___

### enums

• **enums**: [`Enum`](../interfaces/model.Enum.md)[]

#### Overrides

ModelConfigBase.enums

#### Defined in

[src/lib/manager/schema.ts:244](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L244)

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

[src/lib/manager/schema.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L39)

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

[src/lib/manager/schema.ts:58](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L58)

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

[src/lib/manager/schema.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L12)

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

[src/lib/manager/schema.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L24)

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

[src/lib/manager/schema.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L66)

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

[src/lib/manager/schema.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L16)

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

[src/lib/manager/schema.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L46)

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

[src/lib/manager/schema.ts:216](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L216)

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

[src/lib/manager/schema.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L28)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

ModelConfigBase.listEntities

#### Defined in

[src/lib/manager/schema.ts:74](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L74)

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

[src/lib/manager/schema.ts:105](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L105)

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

[src/lib/manager/schema.ts:83](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L83)
