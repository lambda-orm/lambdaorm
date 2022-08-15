[Lambda ORM](../README.md) / [connection](../modules/connection.md) / SQLjsConnection

# Class: SQLjsConnection

[connection](../modules/connection.md).SQLjsConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`SQLjsConnection`**

## Table of contents

### Constructors

- [constructor](connection.SQLjsConnection.md#constructor)

### Properties

- [cnx](connection.SQLjsConnection.md#cnx)
- [inTransaction](connection.SQLjsConnection.md#intransaction)
- [maxChunkSizeIdsOnSelect](connection.SQLjsConnection.md#maxchunksizeidsonselect)
- [maxChunkSizeOnBulkInsert](connection.SQLjsConnection.md#maxchunksizeonbulkinsert)
- [maxChunkSizeOnSelect](connection.SQLjsConnection.md#maxchunksizeonselect)
- [pool](connection.SQLjsConnection.md#pool)

### Accessors

- [config](connection.SQLjsConnection.md#config)

### Methods

- [addFk](connection.SQLjsConnection.md#addfk)
- [addPk](connection.SQLjsConnection.md#addpk)
- [addProperty](connection.SQLjsConnection.md#addproperty)
- [addUk](connection.SQLjsConnection.md#adduk)
- [alterProperty](connection.SQLjsConnection.md#alterproperty)
- [beginTransaction](connection.SQLjsConnection.md#begintransaction)
- [bulkDelete](connection.SQLjsConnection.md#bulkdelete)
- [bulkInsert](connection.SQLjsConnection.md#bulkinsert)
- [bulkUpdate](connection.SQLjsConnection.md#bulkupdate)
- [commit](connection.SQLjsConnection.md#commit)
- [createEntity](connection.SQLjsConnection.md#createentity)
- [createFk](connection.SQLjsConnection.md#createfk)
- [createIndex](connection.SQLjsConnection.md#createindex)
- [createSequence](connection.SQLjsConnection.md#createsequence)
- [delete](connection.SQLjsConnection.md#delete)
- [dropEntity](connection.SQLjsConnection.md#dropentity)
- [dropFK](connection.SQLjsConnection.md#dropfk)
- [dropIndex](connection.SQLjsConnection.md#dropindex)
- [dropPk](connection.SQLjsConnection.md#droppk)
- [dropProperty](connection.SQLjsConnection.md#dropproperty)
- [dropSequence](connection.SQLjsConnection.md#dropsequence)
- [dropUk](connection.SQLjsConnection.md#dropuk)
- [execute](connection.SQLjsConnection.md#execute)
- [executeDDL](connection.SQLjsConnection.md#executeddl)
- [executeSentence](connection.SQLjsConnection.md#executesentence)
- [insert](connection.SQLjsConnection.md#insert)
- [rollback](connection.SQLjsConnection.md#rollback)
- [select](connection.SQLjsConnection.md#select)
- [truncateEntity](connection.SQLjsConnection.md#truncateentity)
- [update](connection.SQLjsConnection.md#update)
- [writeDate](connection.SQLjsConnection.md#writedate)
- [writeTime](connection.SQLjsConnection.md#writetime)

## Constructors

### constructor

• **new SQLjsConnection**(`cnx`, `pool`)

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

▸ **addPk**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[addPk](connection.Connection.md#addpk)

#### Defined in

[src/lib/connection/connection.ts:141](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L141)

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

▸ **addUk**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[addUk](connection.Connection.md#adduk)

#### Defined in

[src/lib/connection/connection.ts:145](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L145)

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

[src/lib/connection/dialects/SQLjs.ts:100](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L100)

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

▸ **bulkInsert**(`mapping`, `dialect`, `query`, `array`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `array` | `any`[] |

#### Returns

`Promise`<`number`[]\>

#### Overrides

[Connection](connection.Connection.md).[bulkInsert](connection.Connection.md#bulkinsert)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L59)

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

#### Inherited from

[Connection](connection.Connection.md).[bulkUpdate](connection.Connection.md#bulkupdate)

#### Defined in

[src/lib/connection/connection.ts:109](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L109)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:104](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L104)

___

### createEntity

▸ **createEntity**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[createEntity](connection.Connection.md#createentity)

#### Defined in

[src/lib/connection/connection.ts:117](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L117)

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

▸ **createIndex**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[createIndex](connection.Connection.md#createindex)

#### Defined in

[src/lib/connection/connection.ts:129](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L129)

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

#### Inherited from

[Connection](connection.Connection.md).[createSequence](connection.Connection.md#createsequence)

#### Defined in

[src/lib/connection/connection.ts:121](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L121)

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

[src/lib/connection/dialects/SQLjs.ts:84](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L84)

___

### dropEntity

▸ **dropEntity**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[dropEntity](connection.Connection.md#dropentity)

#### Defined in

[src/lib/connection/connection.ts:157](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L157)

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

▸ **dropIndex**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[dropIndex](connection.Connection.md#dropindex)

#### Defined in

[src/lib/connection/connection.ts:177](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L177)

___

### dropPk

▸ **dropPk**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[dropPk](connection.Connection.md#droppk)

#### Defined in

[src/lib/connection/connection.ts:165](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L165)

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

#### Inherited from

[Connection](connection.Connection.md).[dropSequence](connection.Connection.md#dropsequence)

#### Defined in

[src/lib/connection/connection.ts:153](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L153)

___

### dropUk

▸ **dropUk**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[dropUk](connection.Connection.md#dropuk)

#### Defined in

[src/lib/connection/connection.ts:169](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L169)

___

### execute

▸ **execute**(`query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[execute](connection.Connection.md#execute)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:88](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L88)

___

### executeDDL

▸ **executeDDL**(`query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[executeDDL](connection.Connection.md#executeddl)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:92](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L92)

___

### executeSentence

▸ **executeSentence**(`sentence`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `any` |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[executeSentence](connection.Connection.md#executesentence)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:96](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L96)

___

### insert

▸ **insert**(`mapping`, `dialect`, `query`, `data`): `Promise`<`number`\>

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

[Connection](connection.Connection.md).[insert](connection.Connection.md#insert)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L53)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[src/lib/connection/dialects/SQLjs.ts:108](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L108)

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

[src/lib/connection/dialects/SQLjs.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L49)

___

### truncateEntity

▸ **truncateEntity**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[truncateEntity](connection.Connection.md#truncateentity)

#### Defined in

[src/lib/connection/connection.ts:113](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/connection.ts#L113)

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

[src/lib/connection/dialects/SQLjs.ts:80](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/connection/dialects/SQLjs.ts#L80)

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
