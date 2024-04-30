[Lambda ORM](../README.md) / DdlBuilder

# Interface: DdlBuilder

## Table of contents

### Methods

- [addFk](DdlBuilder.md#addfk)
- [addPk](DdlBuilder.md#addpk)
- [addProperty](DdlBuilder.md#addproperty)
- [addUk](DdlBuilder.md#adduk)
- [alterProperty](DdlBuilder.md#alterproperty)
- [alterPropertyRequired](DdlBuilder.md#alterpropertyrequired)
- [alterPropertyType](DdlBuilder.md#alterpropertytype)
- [createEntity](DdlBuilder.md#createentity)
- [createFk](DdlBuilder.md#createfk)
- [createIndex](DdlBuilder.md#createindex)
- [createSequence](DdlBuilder.md#createsequence)
- [dropEntity](DdlBuilder.md#dropentity)
- [dropFk](DdlBuilder.md#dropfk)
- [dropIndex](DdlBuilder.md#dropindex)
- [dropPk](DdlBuilder.md#droppk)
- [dropProperty](DdlBuilder.md#dropproperty)
- [dropSequence](DdlBuilder.md#dropsequence)
- [dropUk](DdlBuilder.md#dropuk)
- [foreignKeys](DdlBuilder.md#foreignkeys)
- [indexes](DdlBuilder.md#indexes)
- [objects](DdlBuilder.md#objects)
- [primaryKeys](DdlBuilder.md#primarykeys)
- [sequences](DdlBuilder.md#sequences)
- [setNull](DdlBuilder.md#setnull)
- [tables](DdlBuilder.md#tables)
- [truncateEntity](DdlBuilder.md#truncateentity)
- [uniqueKeys](DdlBuilder.md#uniquekeys)
- [views](DdlBuilder.md#views)

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

[src/lib/language/application/ports/DdlBuilder.ts:24](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L24)

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

[src/lib/language/application/ports/DdlBuilder.ts:22](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L22)

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

[src/lib/language/application/ports/DdlBuilder.ts:14](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L14)

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

[src/lib/language/application/ports/DdlBuilder.ts:23](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L23)

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

[src/lib/language/application/ports/DdlBuilder.ts:18](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L18)

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

[src/lib/language/application/ports/DdlBuilder.ts:20](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L20)

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

[src/lib/language/application/ports/DdlBuilder.ts:19](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L19)

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

[src/lib/language/application/ports/DdlBuilder.ts:13](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L13)

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

[src/lib/language/application/ports/DdlBuilder.ts:25](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L25)

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

[src/lib/language/application/ports/DdlBuilder.ts:26](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L26)

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

[src/lib/language/application/ports/DdlBuilder.ts:27](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L27)

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

[src/lib/language/application/ports/DdlBuilder.ts:10](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L10)

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

[src/lib/language/application/ports/DdlBuilder.ts:7](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L7)

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

[src/lib/language/application/ports/DdlBuilder.ts:8](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L8)

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

[src/lib/language/application/ports/DdlBuilder.ts:11](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L11)

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

[src/lib/language/application/ports/DdlBuilder.ts:21](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L21)

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

[src/lib/language/application/ports/DdlBuilder.ts:9](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L9)

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

[src/lib/language/application/ports/DdlBuilder.ts:12](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L12)

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

[src/lib/language/application/ports/DdlBuilder.ts:33](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L33)

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

[src/lib/language/application/ports/DdlBuilder.ts:34](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L34)

___

### objects

▸ **objects**(): [`Query`](../classes/Query.md)

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/DdlBuilder.ts:28](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L28)

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

[src/lib/language/application/ports/DdlBuilder.ts:31](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L31)

___

### sequences

▸ **sequences**(): [`Query`](../classes/Query.md)

#### Returns

[`Query`](../classes/Query.md)

#### Defined in

[src/lib/language/application/ports/DdlBuilder.ts:35](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L35)

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

[src/lib/language/application/ports/DdlBuilder.ts:6](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L6)

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

[src/lib/language/application/ports/DdlBuilder.ts:29](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L29)

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

[src/lib/language/application/ports/DdlBuilder.ts:5](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L5)

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

[src/lib/language/application/ports/DdlBuilder.ts:32](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L32)

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

[src/lib/language/application/ports/DdlBuilder.ts:30](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/language/application/ports/DdlBuilder.ts#L30)
