[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Connection

# Interface: Connection

Defined in: [src/lib/connection/domain/ports/connection.ts:5](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L5)

## Properties

### cnx

> **cnx**: `any`

Defined in: [src/lib/connection/domain/ports/connection.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L7)

***

### id

> **id**: `string`

Defined in: [src/lib/connection/domain/ports/connection.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L6)

***

### inTransaction

> **inTransaction**: `boolean`

Defined in: [src/lib/connection/domain/ports/connection.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L9)

***

### maxChunkSizeIdsOnSelect

> **maxChunkSizeIdsOnSelect**: `number`

Defined in: [src/lib/connection/domain/ports/connection.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L11)

***

### maxChunkSizeOnBulkInsert

> **maxChunkSizeOnBulkInsert**: `number`

Defined in: [src/lib/connection/domain/ports/connection.ts:12](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L12)

***

### maxChunkSizeOnSelect

> **maxChunkSizeOnSelect**: `number`

Defined in: [src/lib/connection/domain/ports/connection.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L10)

***

### pool

> **pool**: `any`

Defined in: [src/lib/connection/domain/ports/connection.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L8)

## Accessors

### config

#### Get Signature

> **get** **config**(): [`ConnectionConfig`](ConnectionConfig.md)

Defined in: [src/lib/connection/domain/ports/connection.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L13)

##### Returns

[`ConnectionConfig`](ConnectionConfig.md)

## Methods

### addFk()

> **addFk**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:45](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L45)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### addPk()

> **addPk**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:43](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L43)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### addProperty()

> **addProperty**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:42](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L42)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### addUk()

> **addUk**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:44](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L44)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### alterProperty()

> **alterProperty**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:41](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L41)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### beginTransaction()

> **beginTransaction**(): `Promise`\<`void`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:32](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L32)

#### Returns

`Promise`\<`void`\>

***

### bulkDelete()

> **bulkDelete**(`_mapping`, `_dialect`, `_query`, `_array`): `Promise`\<`number`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:26](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L26)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### \_dialect

[`DialectService`](DialectService.md)

##### \_query

[`Query`](../classes/Query.md)

##### \_array

`any`[]

#### Returns

`Promise`\<`number`\>

***

### bulkInsert()

> **bulkInsert**(`mapping`, `dialect`, `query`, `array`): `Promise`\<`any`[]\>

Defined in: [src/lib/connection/domain/ports/connection.ts:21](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L21)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### array

`any`[]

#### Returns

`Promise`\<`any`[]\>

***

### bulkMerge()

> **bulkMerge**(`mapping`, `dialect`, `query`, `array`): `Promise`\<`any`[]\>

Defined in: [src/lib/connection/domain/ports/connection.ts:28](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L28)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### array

`any`[]

#### Returns

`Promise`\<`any`[]\>

***

### bulkUpdate()

> **bulkUpdate**(`_mapping`, `_dialect`, `_query`, `_array`): `Promise`\<`number`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L24)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### \_dialect

[`DialectService`](DialectService.md)

##### \_query

[`Query`](../classes/Query.md)

##### \_array

`any`[]

#### Returns

`Promise`\<`number`\>

***

### commit()

> **commit**(): `Promise`\<`void`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L33)

#### Returns

`Promise`\<`void`\>

***

### createEntity()

> **createEntity**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:37](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L37)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### createFk()

> **createFk**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:39](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L39)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### createIndex()

> **createIndex**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:40](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L40)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### createSequence()

> **createSequence**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:38](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L38)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### delete()

> **delete**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`number`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L25)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`number`\>

***

### dropEntity()

> **dropEntity**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:47](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L47)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### dropFk()

> **dropFk**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:51](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L51)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### dropIndex()

> **dropIndex**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:52](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L52)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### dropPk()

> **dropPk**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:49](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L49)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### dropProperty()

> **dropProperty**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:48](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L48)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### dropSequence()

> **dropSequence**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:46](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L46)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### dropUk()

> **dropUk**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:50](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L50)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### end()

> **end**(): `Promise`\<`void`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:14](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L14)

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:29](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L29)

#### Parameters

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### executeDDL()

> **executeDDL**(`query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:30](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L30)

#### Parameters

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### executeSentence()

> **executeSentence**(`sentence`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:31](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L31)

#### Parameters

##### sentence

`any`

#### Returns

`Promise`\<`any`\>

***

### foreignKeys()

> **foreignKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L58)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### indexes()

> **indexes**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:61](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L61)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### insert()

> **insert**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L19)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### insertConditional()

> **insertConditional**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:20](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L20)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### merge()

> **merge**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:27](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L27)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### objects()

> **objects**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:53](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L53)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### partitions()

> **partitions**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:56](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L56)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### primaryKeys()

> **primaryKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:59](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L59)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### rollback()

> **rollback**(): `Promise`\<`void`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:34](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L34)

#### Returns

`Promise`\<`void`\>

***

### select()

> **select**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:18](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L18)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### sequences()

> **sequences**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:57](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L57)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### tables()

> **tables**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:54](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L54)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### truncateEntity()

> **truncateEntity**(`_mapping`, `query`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:36](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L36)

#### Parameters

##### \_mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### query

[`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

***

### uniqueKeys()

> **uniqueKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:60](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L60)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### update()

> **update**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`number`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:22](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L22)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`number`\>

***

### upsert()

> **upsert**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L23)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### views()

> **views**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/connection/domain/ports/connection.ts:55](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L55)

#### Parameters

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

##### query

[`Query`](../classes/Query.md)

##### data

[`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

***

### writeDate()

> **writeDate**(`value`, `mapping`, `dialect`): `any`

Defined in: [src/lib/connection/domain/ports/connection.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L15)

#### Parameters

##### value

`any`

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

#### Returns

`any`

***

### writeTime()

> **writeTime**(`value`, `mapping`, `dialect`): `any`

Defined in: [src/lib/connection/domain/ports/connection.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/connection/domain/ports/connection.ts#L16)

#### Parameters

##### value

`any`

##### mapping

[`MappingConfigService`](../classes/MappingConfigService.md)

##### dialect

[`DialectService`](DialectService.md)

#### Returns

`any`
