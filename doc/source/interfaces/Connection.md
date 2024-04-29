[Lambda ORM](../README.md) / Connection

# Interface: Connection

## Table of contents

### Properties

- [cnx](Connection.md#cnx)
- [id](Connection.md#id)
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
- [bulkMerge](Connection.md#bulkmerge)
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
- [end](Connection.md#end)
- [execute](Connection.md#execute)
- [executeDDL](Connection.md#executeddl)
- [executeSentence](Connection.md#executesentence)
- [foreignKeys](Connection.md#foreignkeys)
- [indexes](Connection.md#indexes)
- [insert](Connection.md#insert)
- [insertConditional](Connection.md#insertconditional)
- [merge](Connection.md#merge)
- [objects](Connection.md#objects)
- [partitions](Connection.md#partitions)
- [primaryKeys](Connection.md#primarykeys)
- [rollback](Connection.md#rollback)
- [select](Connection.md#select)
- [sequences](Connection.md#sequences)
- [tables](Connection.md#tables)
- [truncateEntity](Connection.md#truncateentity)
- [uniqueKeys](Connection.md#uniquekeys)
- [update](Connection.md#update)
- [upsert](Connection.md#upsert)
- [views](Connection.md#views)
- [writeDate](Connection.md#writedate)
- [writeTime](Connection.md#writetime)

## Properties

### cnx

• **cnx**: `any`

#### Defined in

[src/lib/connection/application/ports/connection.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L7)

___

### id

• **id**: `string`

#### Defined in

[src/lib/connection/application/ports/connection.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L6)

___

### inTransaction

• **inTransaction**: `boolean`

#### Defined in

[src/lib/connection/application/ports/connection.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L9)

___

### maxChunkSizeIdsOnSelect

• **maxChunkSizeIdsOnSelect**: `number`

#### Defined in

[src/lib/connection/application/ports/connection.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L11)

___

### maxChunkSizeOnBulkInsert

• **maxChunkSizeOnBulkInsert**: `number`

#### Defined in

[src/lib/connection/application/ports/connection.ts:12](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L12)

___

### maxChunkSizeOnSelect

• **maxChunkSizeOnSelect**: `number`

#### Defined in

[src/lib/connection/application/ports/connection.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L10)

___

### pool

• **pool**: `any`

#### Defined in

[src/lib/connection/application/ports/connection.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L8)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](ConnectionConfig.md)

#### Defined in

[src/lib/connection/application/ports/connection.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L13)

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

[src/lib/connection/application/ports/connection.ts:45](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L45)

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

[src/lib/connection/application/ports/connection.ts:43](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L43)

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

[src/lib/connection/application/ports/connection.ts:42](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L42)

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

[src/lib/connection/application/ports/connection.ts:44](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L44)

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

[src/lib/connection/application/ports/connection.ts:41](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L41)

___

### beginTransaction

▸ **beginTransaction**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:32](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L32)

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

[src/lib/connection/application/ports/connection.ts:26](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L26)

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

[src/lib/connection/application/ports/connection.ts:21](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L21)

___

### bulkMerge

▸ **bulkMerge**(`mapping`, `dialect`, `query`, `array`): `Promise`\<`any`[]\>

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

[src/lib/connection/application/ports/connection.ts:28](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L28)

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

[src/lib/connection/application/ports/connection.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L24)

___

### commit

▸ **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L33)

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

[src/lib/connection/application/ports/connection.ts:37](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L37)

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

[src/lib/connection/application/ports/connection.ts:39](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L39)

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

[src/lib/connection/application/ports/connection.ts:40](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L40)

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

[src/lib/connection/application/ports/connection.ts:38](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L38)

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

[src/lib/connection/application/ports/connection.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L25)

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

[src/lib/connection/application/ports/connection.ts:47](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L47)

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

[src/lib/connection/application/ports/connection.ts:51](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L51)

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

[src/lib/connection/application/ports/connection.ts:52](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L52)

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

[src/lib/connection/application/ports/connection.ts:49](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L49)

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

[src/lib/connection/application/ports/connection.ts:48](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L48)

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

[src/lib/connection/application/ports/connection.ts:46](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L46)

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

[src/lib/connection/application/ports/connection.ts:50](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L50)

___

### end

▸ **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:14](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L14)

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

[src/lib/connection/application/ports/connection.ts:29](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L29)

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

[src/lib/connection/application/ports/connection.ts:30](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L30)

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

[src/lib/connection/application/ports/connection.ts:31](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L31)

___

### foreignKeys

▸ **foreignKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L58)

___

### indexes

▸ **indexes**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:61](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L61)

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

[src/lib/connection/application/ports/connection.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L19)

___

### insertConditional

▸ **insertConditional**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:20](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L20)

___

### merge

▸ **merge**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:27](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L27)

___

### objects

▸ **objects**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:53](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L53)

___

### partitions

▸ **partitions**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:56](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L56)

___

### primaryKeys

▸ **primaryKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:59](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L59)

___

### rollback

▸ **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/connection/application/ports/connection.ts:34](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L34)

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

[src/lib/connection/application/ports/connection.ts:18](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L18)

___

### sequences

▸ **sequences**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:57](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L57)

___

### tables

▸ **tables**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:54](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L54)

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

[src/lib/connection/application/ports/connection.ts:36](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L36)

___

### uniqueKeys

▸ **uniqueKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:60](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L60)

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

[src/lib/connection/application/ports/connection.ts:22](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L22)

___

### upsert

▸ **upsert**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L23)

___

### views

▸ **views**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

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

[src/lib/connection/application/ports/connection.ts:55](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L55)

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

[src/lib/connection/application/ports/connection.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L15)

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

[src/lib/connection/application/ports/connection.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/connection/application/ports/connection.ts#L16)
