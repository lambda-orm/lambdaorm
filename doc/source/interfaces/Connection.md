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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:6](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L6)
=======
[src/lib/connection/application/ports/connection.ts:6](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L6)
>>>>>>> release/1.2.0

___

### inTransaction

• **inTransaction**: `boolean`

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:8](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L8)
=======
[src/lib/connection/application/ports/connection.ts:8](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L8)
>>>>>>> release/1.2.0

___

### maxChunkSizeIdsOnSelect

• **maxChunkSizeIdsOnSelect**: `number`

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:10](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L10)
=======
[src/lib/connection/application/ports/connection.ts:10](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L10)
>>>>>>> release/1.2.0

___

### maxChunkSizeOnBulkInsert

• **maxChunkSizeOnBulkInsert**: `number`

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:11](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L11)
=======
[src/lib/connection/application/ports/connection.ts:11](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L11)
>>>>>>> release/1.2.0

___

### maxChunkSizeOnSelect

• **maxChunkSizeOnSelect**: `number`

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:9](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L9)
=======
[src/lib/connection/application/ports/connection.ts:9](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L9)
>>>>>>> release/1.2.0

___

### pool

• **pool**: `any`

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:7](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L7)
=======
[src/lib/connection/application/ports/connection.ts:7](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L7)
>>>>>>> release/1.2.0

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](ConnectionConfig.md)

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:12](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L12)
=======
[src/lib/connection/application/ports/connection.ts:12](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L12)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:39](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L39)
=======
[src/lib/connection/application/ports/connection.ts:39](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L39)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:37](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L37)
=======
[src/lib/connection/application/ports/connection.ts:37](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L37)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:36](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L36)
=======
[src/lib/connection/application/ports/connection.ts:36](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L36)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:38](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L38)
=======
[src/lib/connection/application/ports/connection.ts:38](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L38)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:35](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L35)
=======
[src/lib/connection/application/ports/connection.ts:35](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L35)
>>>>>>> release/1.2.0

___

### beginTransaction

▸ **beginTransaction**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:24](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L24)
=======
[src/lib/connection/application/ports/connection.ts:24](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L24)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:28](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L28)
=======
[src/lib/connection/application/ports/connection.ts:28](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L28)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:18](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L18)
=======
[src/lib/connection/application/ports/connection.ts:18](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L18)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:29](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L29)
=======
[src/lib/connection/application/ports/connection.ts:29](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L29)
>>>>>>> release/1.2.0

___

### commit

▸ **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:25](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L25)
=======
[src/lib/connection/application/ports/connection.ts:25](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L25)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:31](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L31)
=======
[src/lib/connection/application/ports/connection.ts:31](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L31)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:33](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L33)
=======
[src/lib/connection/application/ports/connection.ts:33](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L33)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:34](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L34)
=======
[src/lib/connection/application/ports/connection.ts:34](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L34)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:32](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L32)
=======
[src/lib/connection/application/ports/connection.ts:32](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L32)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:20](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L20)
=======
[src/lib/connection/application/ports/connection.ts:20](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L20)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:41](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L41)
=======
[src/lib/connection/application/ports/connection.ts:41](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L41)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:45](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L45)
=======
[src/lib/connection/application/ports/connection.ts:45](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L45)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:46](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L46)
=======
[src/lib/connection/application/ports/connection.ts:46](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L46)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:43](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L43)
=======
[src/lib/connection/application/ports/connection.ts:43](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L43)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:42](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L42)
=======
[src/lib/connection/application/ports/connection.ts:42](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L42)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:40](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L40)
=======
[src/lib/connection/application/ports/connection.ts:40](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L40)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:44](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L44)
=======
[src/lib/connection/application/ports/connection.ts:44](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L44)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:21](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L21)
=======
[src/lib/connection/application/ports/connection.ts:21](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L21)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:22](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L22)
=======
[src/lib/connection/application/ports/connection.ts:22](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L22)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:23](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L23)
=======
[src/lib/connection/application/ports/connection.ts:23](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L23)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:17](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L17)
=======
[src/lib/connection/application/ports/connection.ts:17](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L17)
>>>>>>> release/1.2.0

___

### rollback

▸ **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:26](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L26)
=======
[src/lib/connection/application/ports/connection.ts:26](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L26)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:16](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L16)
=======
[src/lib/connection/application/ports/connection.ts:16](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L16)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:30](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L30)
=======
[src/lib/connection/application/ports/connection.ts:30](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L30)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:19](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L19)
=======
[src/lib/connection/application/ports/connection.ts:19](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L19)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:13](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L13)
=======
[src/lib/connection/application/ports/connection.ts:13](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L13)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/connection/application/ports/connection.ts:14](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/connection/application/ports/connection.ts#L14)
=======
[src/lib/connection/application/ports/connection.ts:14](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/connection/application/ports/connection.ts#L14)
>>>>>>> release/1.2.0
