[Lambda ORM](../README.md) / [manager](../modules/manager.md) / MappingConfig

# Class: MappingConfig

[manager](../modules/manager.md).MappingConfig

## Hierarchy

- `ModelConfigBase`<[`EntityMapping`](../interfaces/model.EntityMapping.md), [`PropertyMapping`](../interfaces/model.PropertyMapping.md)\>

  ↳ **`MappingConfig`**

## Table of contents

### Constructors

- [constructor](manager.MappingConfig.md#constructor)

### Properties

- [enums](manager.MappingConfig.md#enums)

### Accessors

- [entities](manager.MappingConfig.md#entities)
- [format](manager.MappingConfig.md#format)
- [name](manager.MappingConfig.md#name)

### Methods

- [entityMapping](manager.MappingConfig.md#entitymapping)
- [existsProperty](manager.MappingConfig.md#existsproperty)
- [get](manager.MappingConfig.md#get)
- [getAutoIncrement](manager.MappingConfig.md#getautoincrement)
- [getEntity](manager.MappingConfig.md#getentity)
- [getEnum](manager.MappingConfig.md#getenum)
- [getFieldIds](manager.MappingConfig.md#getfieldids)
- [getForcedEntity](manager.MappingConfig.md#getforcedentity)
- [getProperty](manager.MappingConfig.md#getproperty)
- [getRelation](manager.MappingConfig.md#getrelation)
- [isChild](manager.MappingConfig.md#ischild)
- [listEntities](manager.MappingConfig.md#listentities)
- [set](manager.MappingConfig.md#set)
- [sortByDependencies](manager.MappingConfig.md#sortbydependencies)
- [sortByRelations](manager.MappingConfig.md#sortbyrelations)

## Constructors

### constructor

• **new MappingConfig**(`mapping`, `enums?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mapping` | [`Mapping`](../interfaces/model.Mapping.md) | `undefined` |
| `enums` | [`Enum`](../interfaces/model.Enum.md)[] | `[]` |

#### Overrides

ModelConfigBase&lt;EntityMapping, PropertyMapping\&gt;.constructor

#### Defined in

[src/lib/manager/schema.ts:256](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L256)

## Properties

### enums

• **enums**: [`Enum`](../interfaces/model.Enum.md)[]

#### Overrides

ModelConfigBase.enums

#### Defined in

[src/lib/manager/schema.ts:255](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L255)

## Accessors

### entities

• `get` **entities**(): [`EntityMapping`](../interfaces/model.EntityMapping.md)[]

#### Returns

[`EntityMapping`](../interfaces/model.EntityMapping.md)[]

#### Overrides

ModelConfigBase.entities

#### Defined in

[src/lib/manager/schema.ts:278](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L278)

___

### format

• `get` **format**(): `undefined` \| [`FormatMapping`](../interfaces/model.FormatMapping.md)

#### Returns

`undefined` \| [`FormatMapping`](../interfaces/model.FormatMapping.md)

#### Defined in

[src/lib/manager/schema.ts:266](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L266)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/manager/schema.ts:262](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L262)

## Methods

### entityMapping

▸ **entityMapping**(`entityName`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| `string`

#### Defined in

[src/lib/manager/schema.ts:282](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L282)

___

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

### get

▸ **get**(): [`Mapping`](../interfaces/model.Mapping.md)

#### Returns

[`Mapping`](../interfaces/model.Mapping.md)

#### Defined in

[src/lib/manager/schema.ts:270](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L270)

___

### getAutoIncrement

▸ **getAutoIncrement**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Inherited from

ModelConfigBase.getAutoIncrement

#### Defined in

[src/lib/manager/schema.ts:58](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L58)

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`EntityMapping`](../interfaces/model.EntityMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`EntityMapping`](../interfaces/model.EntityMapping.md)

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

▸ **getFieldIds**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)[]

#### Inherited from

ModelConfigBase.getFieldIds

#### Defined in

[src/lib/manager/schema.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L66)

___

### getForcedEntity

▸ **getForcedEntity**(`name`): [`EntityMapping`](../interfaces/model.EntityMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`EntityMapping`](../interfaces/model.EntityMapping.md)

#### Inherited from

ModelConfigBase.getForcedEntity

#### Defined in

[src/lib/manager/schema.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L16)

___

### getProperty

▸ **getProperty**(`entityName`, `name`): [`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

[`PropertyMapping`](../interfaces/model.PropertyMapping.md)

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

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Mapping`](../interfaces/model.Mapping.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:274](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/schema.ts#L274)

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
