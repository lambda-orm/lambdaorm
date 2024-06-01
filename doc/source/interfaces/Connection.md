[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Connection

# Interface: Connection

## Properties

### cnx

> **cnx**: `any`

#### Source

[src/lib/connection/domain/ports/connection.ts:7](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L7)

***

### id

> **id**: `string`

#### Source

[src/lib/connection/domain/ports/connection.ts:6](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L6)

***

### inTransaction

> **inTransaction**: `boolean`

#### Source

[src/lib/connection/domain/ports/connection.ts:9](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L9)

***

### maxChunkSizeIdsOnSelect

> **maxChunkSizeIdsOnSelect**: `number`

#### Source

[src/lib/connection/domain/ports/connection.ts:11](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L11)

***

### maxChunkSizeOnBulkInsert

> **maxChunkSizeOnBulkInsert**: `number`

#### Source

[src/lib/connection/domain/ports/connection.ts:12](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L12)

***

### maxChunkSizeOnSelect

> **maxChunkSizeOnSelect**: `number`

#### Source

[src/lib/connection/domain/ports/connection.ts:10](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L10)

***

### pool

> **pool**: `any`

#### Source

[src/lib/connection/domain/ports/connection.ts:8](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L8)

## Accessors

### config

> `get` **config**(): [`ConnectionConfig`](ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](ConnectionConfig.md)

#### Source

[src/lib/connection/domain/ports/connection.ts:13](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L13)

## Methods

### addFk()

> **addFk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:45](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L45)

***

### addPk()

> **addPk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:43](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L43)

***

### addProperty()

> **addProperty**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:42](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L42)

***

### addUk()

> **addUk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:44](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L44)

***

### alterProperty()

> **alterProperty**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:41](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L41)

***

### beginTransaction()

> **beginTransaction**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:32](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L32)

***

### bulkDelete()

> **bulkDelete**(`_mapping`, `_dialect`, `_query`, `_array`): `Promise`\<`number`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **\_dialect**: [`DialectService`](DialectService.md)

• **\_query**: [`Query`](../classes/Query.md)

• **\_array**: `any`[]

#### Returns

`Promise`\<`number`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:26](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L26)

***

### bulkInsert()

> **bulkInsert**(`mapping`, `dialect`, `query`, `array`): `Promise`\<`any`[]\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **array**: `any`[]

#### Returns

`Promise`\<`any`[]\>

#### Source

[src/lib/connection/domain/ports/connection.ts:21](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L21)

***

### bulkMerge()

> **bulkMerge**(`mapping`, `dialect`, `query`, `array`): `Promise`\<`any`[]\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **array**: `any`[]

#### Returns

`Promise`\<`any`[]\>

#### Source

[src/lib/connection/domain/ports/connection.ts:28](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L28)

***

### bulkUpdate()

> **bulkUpdate**(`_mapping`, `_dialect`, `_query`, `_array`): `Promise`\<`number`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **\_dialect**: [`DialectService`](DialectService.md)

• **\_query**: [`Query`](../classes/Query.md)

• **\_array**: `any`[]

#### Returns

`Promise`\<`number`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:24](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L24)

***

### commit()

> **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:33](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L33)

***

### createEntity()

> **createEntity**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:37](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L37)

***

### createFk()

> **createFk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:39](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L39)

***

### createIndex()

> **createIndex**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:40](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L40)

***

### createSequence()

> **createSequence**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:38](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L38)

***

### delete()

> **delete**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`number`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`number`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:25](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L25)

***

### dropEntity()

> **dropEntity**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:47](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L47)

***

### dropFk()

> **dropFk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:51](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L51)

***

### dropIndex()

> **dropIndex**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:52](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L52)

***

### dropPk()

> **dropPk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:49](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L49)

***

### dropProperty()

> **dropProperty**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:48](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L48)

***

### dropSequence()

> **dropSequence**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:46](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L46)

***

### dropUk()

> **dropUk**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:50](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L50)

***

### end()

> **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:14](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L14)

***

### execute()

> **execute**(`query`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:29](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L29)

***

### executeDDL()

> **executeDDL**(`query`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:30](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L30)

***

### executeSentence()

> **executeSentence**(`sentence`): `Promise`\<`any`\>

#### Parameters

• **sentence**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:31](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L31)

***

### foreignKeys()

> **foreignKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:58](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L58)

***

### indexes()

> **indexes**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:61](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L61)

***

### insert()

> **insert**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:19](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L19)

***

### insertConditional()

> **insertConditional**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:20](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L20)

***

### merge()

> **merge**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:27](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L27)

***

### objects()

> **objects**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:53](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L53)

***

### partitions()

> **partitions**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:56](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L56)

***

### primaryKeys()

> **primaryKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:59](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L59)

***

### rollback()

> **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:34](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L34)

***

### select()

> **select**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:18](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L18)

***

### sequences()

> **sequences**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:57](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L57)

***

### tables()

> **tables**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:54](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L54)

***

### truncateEntity()

> **truncateEntity**(`_mapping`, `query`): `Promise`\<`any`\>

#### Parameters

• **\_mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **query**: [`Query`](../classes/Query.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:36](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L36)

***

### uniqueKeys()

> **uniqueKeys**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:60](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L60)

***

### update()

> **update**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`number`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`number`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:22](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L22)

***

### upsert()

> **upsert**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:23](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L23)

***

### views()

> **views**(`mapping`, `dialect`, `query`, `data`): `Promise`\<`any`\>

#### Parameters

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

• **query**: [`Query`](../classes/Query.md)

• **data**: [`Data`](../classes/Data.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/connection/domain/ports/connection.ts:55](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L55)

***

### writeDate()

> **writeDate**(`value`, `mapping`, `dialect`): `any`

#### Parameters

• **value**: `any`

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

#### Returns

`any`

#### Source

[src/lib/connection/domain/ports/connection.ts:15](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L15)

***

### writeTime()

> **writeTime**(`value`, `mapping`, `dialect`): `any`

#### Parameters

• **value**: `any`

• **mapping**: [`MappingConfigService`](../classes/MappingConfigService.md)

• **dialect**: [`DialectService`](DialectService.md)

#### Returns

`any`

#### Source

[src/lib/connection/domain/ports/connection.ts:16](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/connection/domain/ports/connection.ts#L16)
