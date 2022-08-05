[Lambda ORM](../README.md) / [manager](../modules/manager.md) / LanguageDDLBuilder

# Class: LanguageDDLBuilder

[manager](../modules/manager.md).LanguageDDLBuilder

## Table of contents

### Constructors

- [constructor](manager.LanguageDDLBuilder.md#constructor)

### Methods

- [addFk](manager.LanguageDDLBuilder.md#addfk)
- [addPk](manager.LanguageDDLBuilder.md#addpk)
- [addProperty](manager.LanguageDDLBuilder.md#addproperty)
- [addUk](manager.LanguageDDLBuilder.md#adduk)
- [alterProperty](manager.LanguageDDLBuilder.md#alterproperty)
- [createEntity](manager.LanguageDDLBuilder.md#createentity)
- [createFk](manager.LanguageDDLBuilder.md#createfk)
- [createIndex](manager.LanguageDDLBuilder.md#createindex)
- [createSequence](manager.LanguageDDLBuilder.md#createsequence)
- [dropEntity](manager.LanguageDDLBuilder.md#dropentity)
- [dropFk](manager.LanguageDDLBuilder.md#dropfk)
- [dropIndex](manager.LanguageDDLBuilder.md#dropindex)
- [dropPk](manager.LanguageDDLBuilder.md#droppk)
- [dropProperty](manager.LanguageDDLBuilder.md#dropproperty)
- [dropSequence](manager.LanguageDDLBuilder.md#dropsequence)
- [dropUk](manager.LanguageDDLBuilder.md#dropuk)
- [setNull](manager.LanguageDDLBuilder.md#setnull)
- [truncateEntity](manager.LanguageDDLBuilder.md#truncateentity)

## Constructors

### constructor

• **new LanguageDDLBuilder**(`dataSource`, `mapping`, `dialect`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | [`DataSource`](../interfaces/model.DataSource.md) |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |

#### Defined in

[src/lib/manager/ddlBuilder.ts:440](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L440)

## Methods

### addFk

▸ `Abstract` **addFk**(`entity`, `relation`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:460](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L460)

___

### addPk

▸ `Abstract` **addPk**(`entity`, `primaryKey`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `primaryKey` | `string`[] |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:458](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L458)

___

### addProperty

▸ `Abstract` **addProperty**(`entity`, `property`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:455](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L455)

___

### addUk

▸ `Abstract` **addUk**(`entity`, `uniqueKey`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `uniqueKey` | `string`[] |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:459](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L459)

___

### alterProperty

▸ `Abstract` **alterProperty**(`entity`, `property`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:456](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L456)

___

### createEntity

▸ `Abstract` **createEntity**(`entity`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:454](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L454)

___

### createFk

▸ `Abstract` **createFk**(`entity`, `relation`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:461](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L461)

___

### createIndex

▸ `Abstract` **createIndex**(`entity`, `index`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `index` | [`Index`](../interfaces/model.Index.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:462](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L462)

___

### createSequence

▸ `Abstract` **createSequence**(`entity`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:463](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L463)

___

### dropEntity

▸ `Abstract` **dropEntity**(`entity`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:451](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L451)

___

### dropFk

▸ `Abstract` **dropFk**(`entity`, `relation`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:448](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L448)

___

### dropIndex

▸ `Abstract` **dropIndex**(`entity`, `index`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `index` | [`Index`](../interfaces/model.Index.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:449](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L449)

___

### dropPk

▸ `Abstract` **dropPk**(`entity`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:452](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L452)

___

### dropProperty

▸ `Abstract` **dropProperty**(`entity`, `property`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:457](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L457)

___

### dropSequence

▸ `Abstract` **dropSequence**(`entity`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:450](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L450)

___

### dropUk

▸ `Abstract` **dropUk**(`entity`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:453](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L453)

___

### setNull

▸ `Abstract` **setNull**(`entity`, `relation`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:447](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L447)

___

### truncateEntity

▸ `Abstract` **truncateEntity**(`entity`): `undefined` \| [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:446](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/ddlBuilder.ts#L446)
