[Lambda ORM](../README.md) / [connection](../modules/connection.md) / Connection

# Class: Connection

[connection](../modules/connection.md).Connection

## Hierarchy

- **`Connection`**

  ↳ [`MySqlConnection`](connection.MySqlConnection.md)

  ↳ [`PostgreSQLConnection`](connection.PostgreSQLConnection.md)

  ↳ [`SqlServerConnection`](connection.SqlServerConnection.md)

  ↳ [`OracleConnection`](connection.OracleConnection.md)

  ↳ [`SQLjsConnection`](connection.SQLjsConnection.md)

  ↳ [`MongodbConnection`](connection.MongodbConnection.md)

## Table of contents

### Constructors

- [constructor](connection.Connection.md#constructor)

### Properties

- [cnx](connection.Connection.md#cnx)
- [inTransaction](connection.Connection.md#intransaction)
- [maxChunkSizeIdsOnSelect](connection.Connection.md#maxchunksizeidsonselect)
- [maxChunkSizeOnBulkInsert](connection.Connection.md#maxchunksizeonbulkinsert)
- [maxChunkSizeOnSelect](connection.Connection.md#maxchunksizeonselect)
- [pool](connection.Connection.md#pool)

### Accessors

- [config](connection.Connection.md#config)

### Methods

- [addFk](connection.Connection.md#addfk)
- [addPk](connection.Connection.md#addpk)
- [addProperty](connection.Connection.md#addproperty)
- [addUk](connection.Connection.md#adduk)
- [alterProperty](connection.Connection.md#alterproperty)
- [beginTransaction](connection.Connection.md#begintransaction)
- [bulkDelete](connection.Connection.md#bulkdelete)
- [bulkInsert](connection.Connection.md#bulkinsert)
- [bulkUpdate](connection.Connection.md#bulkupdate)
- [commit](connection.Connection.md#commit)
- [createEntity](connection.Connection.md#createentity)
- [createFk](connection.Connection.md#createfk)
- [createIndex](connection.Connection.md#createindex)
- [createSequence](connection.Connection.md#createsequence)
- [delete](connection.Connection.md#delete)
- [dropEntity](connection.Connection.md#dropentity)
- [dropFk](connection.Connection.md#dropfk)
- [dropIndex](connection.Connection.md#dropindex)
- [dropPk](connection.Connection.md#droppk)
- [dropProperty](connection.Connection.md#dropproperty)
- [dropSequence](connection.Connection.md#dropsequence)
- [dropUk](connection.Connection.md#dropuk)
- [execute](connection.Connection.md#execute)
- [executeDDL](connection.Connection.md#executeddl)
- [executeSentence](connection.Connection.md#executesentence)
- [insert](connection.Connection.md#insert)
- [rollback](connection.Connection.md#rollback)
- [select](connection.Connection.md#select)
- [truncateEntity](connection.Connection.md#truncateentity)
- [update](connection.Connection.md#update)
- [writeDate](connection.Connection.md#writedate)
- [writeTime](connection.Connection.md#writetime)

## Constructors

### constructor

• **new Connection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Defined in

[src/lib/connection/connection.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L16)

## Properties

### cnx

• **cnx**: `any`

#### Defined in

[src/lib/connection/connection.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L8)

___

### inTransaction

• **inTransaction**: `boolean`

#### Defined in

[src/lib/connection/connection.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L10)

___

### maxChunkSizeIdsOnSelect

• **maxChunkSizeIdsOnSelect**: `number`

#### Defined in

[src/lib/connection/connection.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L13)

___

### maxChunkSizeOnBulkInsert

• **maxChunkSizeOnBulkInsert**: `number`

#### Defined in

[src/lib/connection/connection.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L14)

___

### maxChunkSizeOnSelect

• **maxChunkSizeOnSelect**: `number`

#### Defined in

[src/lib/connection/connection.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L12)

___

### pool

• **pool**: `any`

#### Defined in

[src/lib/connection/connection.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L9)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

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

#### Defined in

[src/lib/connection/connection.ts:134](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L134)

___

### beginTransaction

▸ `Abstract` **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connection.ts:102](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L102)

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

#### Defined in

[src/lib/connection/connection.ts:106](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L106)

___

### bulkInsert

▸ `Abstract` **bulkInsert**(`mapping`, `dialect`, `query`, `array`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `array` | `any`[] |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/connection/connection.ts:96](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L96)

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

#### Defined in

[src/lib/connection/connection.ts:110](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L110)

___

### commit

▸ `Abstract` **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connection.ts:103](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L103)

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

#### Defined in

[src/lib/connection/connection.ts:122](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L122)

___

### delete

▸ `Abstract` **delete**(`mapping`, `dialect`, `query`, `data`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/connection/connection.ts:98](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L98)

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

#### Defined in

[src/lib/connection/connection.ts:170](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L170)

___

### execute

▸ `Abstract` **execute**(`query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/connection/connection.ts:99](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L99)

___

### executeDDL

▸ `Abstract` **executeDDL**(`query`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/connection/connection.ts:100](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L100)

___

### executeSentence

▸ `Abstract` **executeSentence**(`sentence`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/connection/connection.ts:101](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L101)

___

### insert

▸ `Abstract` **insert**(`mapping`, `dialect`, `query`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/connection/connection.ts:95](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L95)

___

### rollback

▸ `Abstract` **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connection.ts:104](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L104)

___

### select

▸ `Abstract` **select**(`mapping`, `dialect`, `query`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/connection/connection.ts:94](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L94)

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

#### Defined in

[src/lib/connection/connection.ts:114](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L114)

___

### update

▸ `Abstract` **update**(`mapping`, `dialect`, `query`, `data`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `query` | [`Query`](model.Query.md) |
| `data` | [`Data`](model.Data.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/lib/connection/connection.ts:97](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L97)

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

#### Defined in

[src/lib/connection/connection.ts:89](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/connection/connection.ts#L89)
