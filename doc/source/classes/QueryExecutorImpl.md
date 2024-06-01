[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / QueryExecutorImpl

# Class: QueryExecutorImpl

## Implements

- [`QueryExecutor`](../interfaces/QueryExecutor.md)
- [`QueryInternalExecutor`](../interfaces/QueryInternalExecutor.md)

## Constructors

### new QueryExecutorImpl()

> **new QueryExecutorImpl**(`connectionFacade`, `languages`, `schemaState`, `expressions`, `_options`, `helper`, `transactional`): [`QueryExecutorImpl`](QueryExecutorImpl.md)

#### Parameters

• **connectionFacade**: [`ConnectionFacade`](ConnectionFacade.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **expressions**: `Expressions`

• **\_options**: [`QueryOptions`](../interfaces/QueryOptions.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

• **transactional**: `boolean`= `false`

#### Returns

[`QueryExecutorImpl`](QueryExecutorImpl.md)

#### Source

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:32](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L32)

## Accessors

### options

> `get` **options**(): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Source

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:53](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L53)

## Methods

### \_execute()

> **\_execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](Query.md)

• **data**: [`Data`](Data.md)

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`QueryInternalExecutor`](../interfaces/QueryInternalExecutor.md).[`_execute`](../interfaces/QueryInternalExecutor.md#_execute)

#### Source

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:122](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L122)

***

### commit()

> **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`commit`](../interfaces/QueryExecutor.md#commit)

#### Source

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:69](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L69)

***

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](Query.md)

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`execute`](../interfaces/QueryExecutor.md#execute)

#### Source

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:91](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L91)

***

### release()

> **release**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`release`](../interfaces/QueryExecutor.md#release)

#### Source

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:83](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L83)

***

### rollback()

> **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`rollback`](../interfaces/QueryExecutor.md#rollback)

#### Source

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:76](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L76)
