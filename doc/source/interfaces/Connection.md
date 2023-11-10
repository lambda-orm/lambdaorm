[Lambda ORM](../README.md) / Connection

# Interface: Connection

## Table of contents

### Properties

- [cnx](Connection.md#cnx)
- [inTransaction](Connection.md#intransaction)
- [maxChunkSizeIdsOnSelect](Connection.md#maxchunksizeidsonselect)
- [maxChunkSizeOnBulkInsert](Connection.md#maxchunksizeonbulkinsert)
- [maxChunkSizeOnSelect](Connection.md#maxchunksizeonselect)
- [pool](Connection.md#pool)

### Accessors

- [config](Connection.md#config)

### Methods

- [addFk](Connection.md#addfk)
- [addPk](Connection.md#addpk)
- [addProperty](Connection.md#addproperty)
- [addUk](Connection.md#adduk)
- [alterProperty](Connection.md#alterproperty)
- [beginTransaction](Connection.md#begintransaction)
- [bulkDelete](Connection.md#bulkdelete)
- [bulkInsert](Connection.md#bulkinsert)
- [bulkUpdate](Connection.md#bulkupdate)
- [commit](Connection.md#commit)
- [createEntity](Connection.md#createentity)
- [createFk](Connection.md#createfk)
- [createIndex](Connection.md#createindex)
- [createSequence](Connection.md#createsequence)
- [delete](Connection.md#delete)
- [dropEntity](Connection.md#dropentity)
- [dropFk](Connection.md#dropfk)
- [dropIndex](Connection.md#dropindex)
- [dropPk](Connection.md#droppk)
- [dropProperty](Connection.md#dropproperty)
- [dropSequence](Connection.md#dropsequence)
- [dropUk](Connection.md#dropuk)
- [execute](Connection.md#execute)
- [executeDDL](Connection.md#executeddl)
- [executeSentence](Connection.md#executesentence)
- [insert](Connection.md#insert)
- [rollback](Connection.md#rollback)
- [select](Connection.md#select)
- [truncateEntity](Connection.md#truncateentity)
- [update](Connection.md#update)
- [writeDate](Connection.md#writedate)
- [writeTime](Connection.md#writetime)

## Properties

### cnx

• **cnx**: `any`

#### Defined in

[src/lib/connection/application/ports/connection.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L6)

___

### inTransaction

• **inTransaction**: `boolean`

#### Defined in

[src/lib/connection/application/ports/connection.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L8)

___

### maxChunkSizeIdsOnSelect

• **maxChunkSizeIdsOnSelect**: `number`

#### Defined in

[src/lib/connection/application/ports/connection.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L10)

___

### maxChunkSizeOnBulkInsert

• **maxChunkSizeOnBulkInsert**: `number`

#### Defined in

[src/lib/connection/application/ports/connection.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L11)

___

### maxChunkSizeOnSelect

• **maxChunkSizeOnSelect**: `number`

#### Defined in

[src/lib/connection/application/ports/connection.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L9)

___

### pool

• **pool**: `any`

#### Defined in

[src/lib/connection/application/ports/connection.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L7)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](ConnectionConfig.md)

#### Defined in

[src/lib/connection/application/ports/connection.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L12)

## Methods

### addFk

▸ **addFk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L39)

___

### addPk

▸ **addPk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L37)

___

### addProperty

▸ **addProperty**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L36)

___

### addUk

▸ **addUk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L38)

___

### alterProperty

▸ **alterProperty**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L35)

___

### beginTransaction

▸ **beginTransaction**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L24)

___

### bulkDelete

▸ **bulkDelete**(`_mapping`, `_dialect`, `_query`, `_array`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `_dialect` | [`DialectService`](../classes/DialectService.md) |
| `_query` | [`Query`](../classes/Query.md) |
| `_array` | `any`[] |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L28)

___

### bulkInsert

▸ **bulkInsert**(`mapping`, `dialect`, `query`, `array`): `Promise`\<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `dialect` | [`DialectService`](../classes/DialectService.md) |
| `query` | [`Query`](../classes/Query.md) |
| `array` | `any`[] |

#### Returns

`Promise`\<`any`[]\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L18)

___

### bulkUpdate

▸ **bulkUpdate**(`_mapping`, `_dialect`, `_query`, `_array`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `_dialect` | [`DialectService`](../classes/DialectService.md) |
| `_query` | [`Query`](../classes/Query.md) |
| `_array` | `any`[] |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L29)

___

### commit

▸ **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L25)

___

### createEntity

▸ **createEntity**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L31)

___

### createFk

▸ **createFk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L33)

___

### createIndex

▸ **createIndex**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L34)

___

### createSequence

▸ **createSequence**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L32)

___

### delete

▸ **delete**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `dialect` | [`DialectService`](../classes/DialectService.md) |
| `query` | [`Query`](../classes/Query.md) |
| `data` | [`Data`](../classes/Data.md) |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L20)

___

### dropEntity

▸ **dropEntity**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:41](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L41)

___

### dropFk

▸ **dropFk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:45](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L45)

___

### dropIndex

▸ **dropIndex**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L46)

___

### dropPk

▸ **dropPk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L43)

___

### dropProperty

▸ **dropProperty**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L42)

___

### dropSequence

▸ **dropSequence**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:40](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L40)

___

### dropUk

▸ **dropUk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L44)

___

### execute

▸ **execute**(`query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L21)

___

### executeDDL

▸ **executeDDL**(`query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L22)

___

### executeSentence

▸ **executeSentence**(`sentence`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L23)

___

### insert

▸ **insert**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `dialect` | [`DialectService`](../classes/DialectService.md) |
| `query` | [`Query`](../classes/Query.md) |
| `data` | [`Data`](../classes/Data.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L17)

___

### rollback

▸ **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L26)

___

### select

▸ **select**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `dialect` | [`DialectService`](../classes/DialectService.md) |
| `query` | [`Query`](../classes/Query.md) |
| `data` | [`Data`](../classes/Data.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L16)

___

### truncateEntity

▸ **truncateEntity**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `query` | [`Query`](../classes/Query.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L30)

___

### update

▸ **update**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `dialect` | [`DialectService`](../classes/DialectService.md) |
| `query` | [`Query`](../classes/Query.md) |
| `data` | [`Data`](../classes/Data.md) |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L19)

___

### writeDate

▸ **writeDate**(`value`, `mapping`, `dialect`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `dialect` | [`DialectService`](../classes/DialectService.md) |

#### Returns

`any`

#### Defined in

[src/lib/connection/application/ports/connection.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L13)

___

### writeTime

▸ **writeTime**(`value`, `mapping`, `dialect`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `mapping` | [`MappingConfigService`](../classes/MappingConfigService.md) |
| `dialect` | [`DialectService`](../classes/DialectService.md) |

#### Returns

`any`

#### Defined in

[src/lib/connection/application/ports/connection.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/d65e38bc/src/lib/connection/application/ports/connection.ts#L14)
