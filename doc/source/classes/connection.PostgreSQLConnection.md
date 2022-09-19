[Lambda ORM](../README.md) / [connection](../modules/connection.md) / PostgreSQLConnection

# Class: PostgreSQLConnection

[connection](../modules/connection.md).PostgreSQLConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`PostgreSQLConnection`**

## Table of contents

### Constructors

- [constructor](connection.PostgreSQLConnection.md#constructor)

### Properties

- [cnx](connection.PostgreSQLConnection.md#cnx)
- [inTransaction](connection.PostgreSQLConnection.md#intransaction)
- [maxChunkSizeIdsOnSelect](connection.PostgreSQLConnection.md#maxchunksizeidsonselect)
- [maxChunkSizeOnBulkInsert](connection.PostgreSQLConnection.md#maxchunksizeonbulkinsert)
- [maxChunkSizeOnSelect](connection.PostgreSQLConnection.md#maxchunksizeonselect)
- [pool](connection.PostgreSQLConnection.md#pool)

### Accessors

- [config](connection.PostgreSQLConnection.md#config)

### Methods

- [addFk](connection.PostgreSQLConnection.md#addfk)
- [addPk](connection.PostgreSQLConnection.md#addpk)
- [addProperty](connection.PostgreSQLConnection.md#addproperty)
- [addUk](connection.PostgreSQLConnection.md#adduk)
- [alterProperty](connection.PostgreSQLConnection.md#alterproperty)
- [beginTransaction](connection.PostgreSQLConnection.md#begintransaction)
- [bulkDelete](connection.PostgreSQLConnection.md#bulkdelete)
- [bulkInsert](connection.PostgreSQLConnection.md#bulkinsert)
- [bulkUpdate](connection.PostgreSQLConnection.md#bulkupdate)
- [commit](connection.PostgreSQLConnection.md#commit)
- [createEntity](connection.PostgreSQLConnection.md#createentity)
- [createFk](connection.PostgreSQLConnection.md#createfk)
- [createIndex](connection.PostgreSQLConnection.md#createindex)
- [createSequence](connection.PostgreSQLConnection.md#createsequence)
- [delete](connection.PostgreSQLConnection.md#delete)
- [dropEntity](connection.PostgreSQLConnection.md#dropentity)
- [dropFk](connection.PostgreSQLConnection.md#dropfk)
- [dropIndex](connection.PostgreSQLConnection.md#dropindex)
- [dropPk](connection.PostgreSQLConnection.md#droppk)
- [dropProperty](connection.PostgreSQLConnection.md#dropproperty)
- [dropSequence](connection.PostgreSQLConnection.md#dropsequence)
- [dropUk](connection.PostgreSQLConnection.md#dropuk)
- [execute](connection.PostgreSQLConnection.md#execute)
- [executeDDL](connection.PostgreSQLConnection.md#executeddl)
- [executeSentence](connection.PostgreSQLConnection.md#executesentence)
- [insert](connection.PostgreSQLConnection.md#insert)
- [rollback](connection.PostgreSQLConnection.md#rollback)
- [select](connection.PostgreSQLConnection.md#select)
- [truncateEntity](connection.PostgreSQLConnection.md#truncateentity)
- [update](connection.PostgreSQLConnection.md#update)
- [writeDate](connection.PostgreSQLConnection.md#writedate)
- [writeTime](connection.PostgreSQLConnection.md#writetime)

## Constructors

### constructor

• **new PostgreSQLConnection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Inherited from

[Connection](connection.Connection.md).[constructor](connection.Connection.md#constructor)

#### Defined in

[src/lib/connection/connection.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L16)

## Properties

### cnx

• **cnx**: `any`

#### Inherited from

[Connection](connection.Connection.md).[cnx](connection.Connection.md#cnx)

#### Defined in

[src/lib/connection/connection.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L8)

___

### inTransaction

• **inTransaction**: `boolean`

#### Inherited from

[Connection](connection.Connection.md).[inTransaction](connection.Connection.md#intransaction)

#### Defined in

[src/lib/connection/connection.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L10)

___

### maxChunkSizeIdsOnSelect

• **maxChunkSizeIdsOnSelect**: `number`

#### Inherited from

[Connection](connection.Connection.md).[maxChunkSizeIdsOnSelect](connection.Connection.md#maxchunksizeidsonselect)

#### Defined in

[src/lib/connection/connection.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L13)

___

### maxChunkSizeOnBulkInsert

• **maxChunkSizeOnBulkInsert**: `number`

#### Inherited from

[Connection](connection.Connection.md).[maxChunkSizeOnBulkInsert](connection.Connection.md#maxchunksizeonbulkinsert)

#### Defined in

[src/lib/connection/connection.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L14)

___

### maxChunkSizeOnSelect

• **maxChunkSizeOnSelect**: `number`

#### Inherited from

[Connection](connection.Connection.md).[maxChunkSizeOnSelect](connection.Connection.md#maxchunksizeonselect)

#### Defined in

[src/lib/connection/connection.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L12)

___

### pool

• **pool**: `any`

#### Inherited from

[Connection](connection.Connection.md).[pool](connection.Connection.md#pool)

#### Defined in

[src/lib/connection/connection.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L9)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Inherited from

Connection.config

#### Defined in

[src/lib/connection/connection.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L25)

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

[src/lib/connection/connection.ts:150](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L150)

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

[src/lib/connection/connection.ts:142](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L142)

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

[src/lib/connection/connection.ts:138](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L138)

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

[src/lib/connection/connection.ts:146](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L146)

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

[src/lib/connection/connection.ts:134](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L134)

___

### beginTransaction

▸ **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[beginTransaction](connection.Connection.md#begintransaction)

#### Defined in

[src/lib/connection/dialects/PostgreSQL.ts:167](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L167)

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

[src/lib/connection/connection.ts:106](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L106)

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

[src/lib/connection/dialects/PostgreSQL.ts:76](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L76)

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

[src/lib/connection/connection.ts:110](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L110)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[src/lib/connection/dialects/PostgreSQL.ts:172](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L172)

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

[src/lib/connection/connection.ts:118](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L118)

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

[src/lib/connection/connection.ts:126](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L126)

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

[src/lib/connection/connection.ts:130](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L130)

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

[src/lib/connection/connection.ts:122](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L122)

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

[src/lib/connection/dialects/PostgreSQL.ts:150](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L150)

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

[src/lib/connection/connection.ts:158](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L158)

___

### dropFk

▸ **dropFk**(`_mapping`, `query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Connection](connection.Connection.md).[dropFk](connection.Connection.md#dropfk)

#### Defined in

[src/lib/connection/connection.ts:174](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L174)

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

[src/lib/connection/connection.ts:178](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L178)

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

[src/lib/connection/connection.ts:166](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L166)

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

[src/lib/connection/connection.ts:162](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L162)

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

[src/lib/connection/connection.ts:154](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L154)

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

[src/lib/connection/connection.ts:170](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L170)

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

[src/lib/connection/dialects/PostgreSQL.ts:155](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L155)

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

[src/lib/connection/dialects/PostgreSQL.ts:159](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L159)

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

[src/lib/connection/dialects/PostgreSQL.ts:163](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L163)

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

[src/lib/connection/dialects/PostgreSQL.ts:66](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L66)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[src/lib/connection/dialects/PostgreSQL.ts:177](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L177)

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

[src/lib/connection/dialects/PostgreSQL.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L61)

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

[src/lib/connection/connection.ts:114](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L114)

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

[src/lib/connection/dialects/PostgreSQL.ts:145](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/dialects/PostgreSQL.ts#L145)

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

[src/lib/connection/connection.ts:84](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L84)

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

[src/lib/connection/connection.ts:89](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L89)
