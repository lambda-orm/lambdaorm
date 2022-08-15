[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MongodbConnection

# Class: MongodbConnection

[connection](../modules/connection.md).MongodbConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`MongodbConnection`**

## Table of contents

### Constructors

- [constructor](connection.MongodbConnection.md#constructor)

### Properties

- [cnx](connection.MongodbConnection.md#cnx)
- [inTransaction](connection.MongodbConnection.md#intransaction)
- [maxChunkSizeIdsOnSelect](connection.MongodbConnection.md#maxchunksizeidsonselect)
- [maxChunkSizeOnBulkInsert](connection.MongodbConnection.md#maxchunksizeonbulkinsert)
- [maxChunkSizeOnSelect](connection.MongodbConnection.md#maxchunksizeonselect)
- [pool](connection.MongodbConnection.md#pool)

### Accessors

- [config](connection.MongodbConnection.md#config)

### Methods

- [addFk](connection.MongodbConnection.md#addfk)
- [addPk](connection.MongodbConnection.md#addpk)
- [addProperty](connection.MongodbConnection.md#addproperty)
- [addUk](connection.MongodbConnection.md#adduk)
- [alterProperty](connection.MongodbConnection.md#alterproperty)
- [beginTransaction](connection.MongodbConnection.md#begintransaction)
- [bulkDelete](connection.MongodbConnection.md#bulkdelete)
- [bulkInsert](connection.MongodbConnection.md#bulkinsert)
- [bulkUpdate](connection.MongodbConnection.md#bulkupdate)
- [commit](connection.MongodbConnection.md#commit)
- [createEntity](connection.MongodbConnection.md#createentity)
- [createFk](connection.MongodbConnection.md#createfk)
- [createIndex](connection.MongodbConnection.md#createindex)
- [createSequence](connection.MongodbConnection.md#createsequence)
- [delete](connection.MongodbConnection.md#delete)
- [dropEntity](connection.MongodbConnection.md#dropentity)
- [dropFK](connection.MongodbConnection.md#dropfk)
- [dropIndex](connection.MongodbConnection.md#dropindex)
- [dropPk](connection.MongodbConnection.md#droppk)
- [dropProperty](connection.MongodbConnection.md#dropproperty)
- [dropSequence](connection.MongodbConnection.md#dropsequence)
- [dropUk](connection.MongodbConnection.md#dropuk)
- [execute](connection.MongodbConnection.md#execute)
- [executeDDL](connection.MongodbConnection.md#executeddl)
- [executeSentence](connection.MongodbConnection.md#executesentence)
- [insert](connection.MongodbConnection.md#insert)
- [rollback](connection.MongodbConnection.md#rollback)
- [select](connection.MongodbConnection.md#select)
- [truncateEntity](connection.MongodbConnection.md#truncateentity)
- [update](connection.MongodbConnection.md#update)
- [writeDate](connection.MongodbConnection.md#writedate)
- [writeTime](connection.MongodbConnection.md#writetime)

## Constructors

### constructor

• **new MongodbConnection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Inherited from

[Connection](connection.Connection.md).[constructor](connection.Connection.md#constructor)

#### Defined in

[src/lib/connection/connection.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L15)

## Properties

### cnx

• **cnx**: `any`

#### Inherited from

[Connection](connection.Connection.md).[cnx](connection.Connection.md#cnx)

#### Defined in

[src/lib/connection/connection.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L7)

___

### inTransaction

• **inTransaction**: `boolean`

#### Inherited from

[Connection](connection.Connection.md).[inTransaction](connection.Connection.md#intransaction)

#### Defined in

[src/lib/connection/connection.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L9)

___

### maxChunkSizeIdsOnSelect

• **maxChunkSizeIdsOnSelect**: `number`

#### Inherited from

[Connection](connection.Connection.md).[maxChunkSizeIdsOnSelect](connection.Connection.md#maxchunksizeidsonselect)

#### Defined in

[src/lib/connection/connection.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L12)

___

### maxChunkSizeOnBulkInsert

• **maxChunkSizeOnBulkInsert**: `number`

#### Inherited from

[Connection](connection.Connection.md).[maxChunkSizeOnBulkInsert](connection.Connection.md#maxchunksizeonbulkinsert)

#### Defined in

[src/lib/connection/connection.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L13)

___

### maxChunkSizeOnSelect

• **maxChunkSizeOnSelect**: `number`

#### Inherited from

[Connection](connection.Connection.md).[maxChunkSizeOnSelect](connection.Connection.md#maxchunksizeonselect)

#### Defined in

[src/lib/connection/connection.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L11)

___

### pool

• **pool**: `any`

#### Inherited from

[Connection](connection.Connection.md).[pool](connection.Connection.md#pool)

#### Defined in

[src/lib/connection/connection.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L8)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

Connection.config

#### Defined in

[src/lib/connection/connection.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L24)

## Methods

### addFk

▸ **addFk**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[addFk](connection.Connection.md#addfk)

#### Defined in

[src/lib/connection/connection.ts:149](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L149)

___

### addPk

▸ **addPk**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[addPk](connection.Connection.md#addpk)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:353](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L353)

___

### addProperty

▸ **addProperty**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[addProperty](connection.Connection.md#addproperty)

#### Defined in

[src/lib/connection/connection.ts:137](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L137)

___

### addUk

▸ **addUk**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[addUk](connection.Connection.md#adduk)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:357](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L357)

___

### alterProperty

▸ **alterProperty**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[alterProperty](connection.Connection.md#alterproperty)

#### Defined in

[src/lib/connection/connection.ts:133](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L133)

___

### beginTransaction

▸ **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[beginTransaction](connection.Connection.md#begintransaction)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:227](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L227)

___

### bulkDelete

▸ **bulkDelete**(`_mapping`, `_dialect`, `_query`, `_array`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `_dialect` | [`Dialect`](manager.Dialect.md) |
| `_query` | [`Query`](model.Query.md) |
| `_array` | `any`[] |

#### Returns

`Promise`<`number`\>

#### Inherited from

[Connection](connection.Connection.md).[bulkDelete](connection.Connection.md#bulkdelete)

#### Defined in

[src/lib/connection/connection.ts:105](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L105)

___

### bulkInsert

▸ **bulkInsert**(`mapping`, `dialect`, `query`, `array`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `array` | `any`[] |

#### Returns

`Promise`<`any`[]\>

#### Overrides

[Connection](connection.Connection.md).[bulkInsert](connection.Connection.md#bulkinsert)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:85](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L85)

___

### bulkUpdate

▸ **bulkUpdate**(`_mapping`, `_dialect`, `_query`, `_array`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `_dialect` | [`Dialect`](manager.Dialect.md) |
| `_query` | [`Query`](model.Query.md) |
| `_array` | `any`[] |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[bulkUpdate](connection.Connection.md#bulkupdate)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:169](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L169)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:240](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L240)

___

### createEntity

▸ **createEntity**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[createEntity](connection.Connection.md#createentity)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:338](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L338)

___

### createFk

▸ **createFk**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[createFk](connection.Connection.md#createfk)

#### Defined in

[src/lib/connection/connection.ts:125](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L125)

___

### createIndex

▸ **createIndex**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[createIndex](connection.Connection.md#createindex)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:347](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L347)

___

### createSequence

▸ **createSequence**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[createSequence](connection.Connection.md#createsequence)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:343](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L343)

___

### delete

▸ **delete**(`mapping`, `dialect`, `query`, `data`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[delete](connection.Connection.md#delete)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:204](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L204)

___

### dropEntity

▸ **dropEntity**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[dropEntity](connection.Connection.md#dropentity)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:366](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L366)

___

### dropFK

▸ **dropFK**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[dropFK](connection.Connection.md#dropfk)

#### Defined in

[src/lib/connection/connection.ts:173](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L173)

___

### dropIndex

▸ **dropIndex**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[dropIndex](connection.Connection.md#dropindex)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:382](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L382)

___

### dropPk

▸ **dropPk**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[dropPk](connection.Connection.md#droppk)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:372](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L372)

___

### dropProperty

▸ **dropProperty**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[dropProperty](connection.Connection.md#dropproperty)

#### Defined in

[src/lib/connection/connection.ts:161](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L161)

___

### dropSequence

▸ **dropSequence**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[dropSequence](connection.Connection.md#dropsequence)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:361](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L361)

___

### dropUk

▸ **dropUk**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[dropUk](connection.Connection.md#dropuk)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:377](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L377)

___

### execute

▸ **execute**(`_query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[execute](connection.Connection.md#execute)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:215](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L215)

___

### executeDDL

▸ **executeDDL**(`_query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[executeDDL](connection.Connection.md#executeddl)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:223](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L223)

___

### executeSentence

▸ **executeSentence**(`_sentence`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_sentence` | `any` |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[executeSentence](connection.Connection.md#executesentence)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:219](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L219)

___

### insert

▸ **insert**(`mapping`, `dialect`, `query`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[insert](connection.Connection.md#insert)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:63](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L63)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:246](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L246)

___

### select

▸ **select**(`mapping`, `dialect`, `query`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[select](connection.Connection.md#select)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:41](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L41)

___

### truncateEntity

▸ **truncateEntity**(`mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[truncateEntity](connection.Connection.md#truncateentity)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:333](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L333)

___

### update

▸ **update**(`mapping`, `dialect`, `query`, `data`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[update](connection.Connection.md#update)

#### Defined in

[src/lib/connection/dialects/MongoDB.ts:157](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/MongoDB.ts#L157)

___

### writeDate

▸ **writeDate**(`value`, `mapping`, `dialect`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |

#### Returns

`any`

#### Inherited from

[Connection](connection.Connection.md).[writeDate](connection.Connection.md#writedate)

#### Defined in

[src/lib/connection/connection.ts:83](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L83)

___

### writeTime

▸ **writeTime**(`value`, `mapping`, `dialect`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |

#### Returns

`any`

#### Inherited from

[Connection](connection.Connection.md).[writeTime](connection.Connection.md#writetime)

#### Defined in

[src/lib/connection/connection.ts:88](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L88)
