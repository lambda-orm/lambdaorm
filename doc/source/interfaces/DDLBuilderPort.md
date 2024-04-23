[Lambda ORM](../README.md) / DDLBuilderPort

# Interface: DDLBuilderPort

## Table of contents

### Methods

- [addFk](DDLBuilderPort.md#addfk)
- [addPk](DDLBuilderPort.md#addpk)
- [addProperty](DDLBuilderPort.md#addproperty)
- [addUk](DDLBuilderPort.md#adduk)
- [alterProperty](DDLBuilderPort.md#alterproperty)
- [alterPropertyRequired](DDLBuilderPort.md#alterpropertyrequired)
- [alterPropertyType](DDLBuilderPort.md#alterpropertytype)
- [createEntity](DDLBuilderPort.md#createentity)
- [createFk](DDLBuilderPort.md#createfk)
- [createIndex](DDLBuilderPort.md#createindex)
- [createSequence](DDLBuilderPort.md#createsequence)
- [dropEntity](DDLBuilderPort.md#dropentity)
- [dropFk](DDLBuilderPort.md#dropfk)
- [dropIndex](DDLBuilderPort.md#dropindex)
- [dropPk](DDLBuilderPort.md#droppk)
- [dropProperty](DDLBuilderPort.md#dropproperty)
- [dropSequence](DDLBuilderPort.md#dropsequence)
- [dropUk](DDLBuilderPort.md#dropuk)
- [foreignKeys](DDLBuilderPort.md#foreignkeys)
- [indexes](DDLBuilderPort.md#indexes)
- [objects](DDLBuilderPort.md#objects)
- [primaryKeys](DDLBuilderPort.md#primarykeys)
- [sequences](DDLBuilderPort.md#sequences)
- [setNull](DDLBuilderPort.md#setnull)
- [tables](DDLBuilderPort.md#tables)
- [truncateEntity](DDLBuilderPort.md#truncateentity)
- [uniqueKeys](DDLBuilderPort.md#uniquekeys)
- [views](DDLBuilderPort.md#views)

## Methods

### addFk

▸ **addFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `relation` | [`Relation`](Relation.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:24](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L24)

___

### addPk

▸ **addPk**(`entity`, `primaryKey`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `primaryKey` | `string`[] |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:22](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L22)

___

### addProperty

▸ **addProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `property` | [`PropertyMapping`](PropertyMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:14](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L14)

___

### addUk

▸ **addUk**(`entity`, `uniqueKey`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `uniqueKey` | `string`[] |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:23](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L23)

___

### alterProperty

▸ **alterProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `property` | [`PropertyMapping`](PropertyMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

**`Deprecated`**

Use alterPropertyType or alterPropertyRequired

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:18](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L18)

___

### alterPropertyRequired

▸ **alterPropertyRequired**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `property` | [`PropertyMapping`](PropertyMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:20](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L20)

___

### alterPropertyType

▸ **alterPropertyType**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `property` | [`PropertyMapping`](PropertyMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:19](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L19)

___

### createEntity

▸ **createEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:13](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L13)

___

### createFk

▸ **createFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `relation` | [`Relation`](Relation.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:25](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L25)

___

### createIndex

▸ **createIndex**(`entity`, `index`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `index` | [`Index`](Index.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:26](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L26)

___

### createSequence

▸ **createSequence**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:27](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L27)

___

### dropEntity

▸ **dropEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:10](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L10)

___

### dropFk

▸ **dropFk**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `relation` | [`Relation`](Relation.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:7](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L7)

___

### dropIndex

▸ **dropIndex**(`entity`, `index`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `index` | [`Index`](Index.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:8](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L8)

___

### dropPk

▸ **dropPk**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:11](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L11)

___

### dropProperty

▸ **dropProperty**(`entity`, `property`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `property` | [`PropertyMapping`](PropertyMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:21](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L21)

___

### dropSequence

▸ **dropSequence**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:9](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L9)

___

### dropUk

▸ **dropUk**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:12](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L12)

___

### foreignKeys

▸ **foreignKeys**(`tableNames`): [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableNames` | `string`[] |

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:33](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L33)

___

### indexes

▸ **indexes**(`tableNames`): [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableNames` | `string`[] |

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:34](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L34)

___

### objects

▸ **objects**(): [`Query`](../classes/Query.md)

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:28](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L28)

___

### primaryKeys

▸ **primaryKeys**(`tableNames`): [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableNames` | `string`[] |

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:31](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L31)

___

### sequences

▸ **sequences**(`sequenceNames`): [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sequenceNames` | `string`[] |

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:35](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L35)

___

### setNull

▸ **setNull**(`entity`, `relation`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |
| `relation` | [`Relation`](Relation.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:6](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L6)

___

### tables

▸ **tables**(`names`): [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `names` | `string`[] |

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:29](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L29)

___

### truncateEntity

▸ **truncateEntity**(`entity`): `undefined` \| [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](EntityMapping.md) |

#### Returns

`undefined` \| [`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:5](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L5)

___

### uniqueKeys

▸ **uniqueKeys**(`tableNames`): [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableNames` | `string`[] |

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:32](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L32)

___

### views

▸ **views**(`names`): [`Query`](../classes/Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `names` | `string`[] |

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/ddlBuilderPort.ts:30](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/language/application/ports/ddlBuilderPort.ts#L30)
