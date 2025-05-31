[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / QueryExecutorImpl

# Class: QueryExecutorImpl

Defined in: [src/lib/execution/application/services/queryExecutor/queryExecutor.ts:20](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L20)

## Implements

- [`QueryExecutor`](../interfaces/QueryExecutor.md)
- [`QueryInternalExecutor`](../interfaces/QueryInternalExecutor.md)

## Constructors

### Constructor

> **new QueryExecutorImpl**(`connectionFacade`, `languages`, `schemaState`, `expressions`, `_options`, `helper`, `transactional`): `QueryExecutorImpl`

Defined in: [src/lib/execution/application/services/queryExecutor/queryExecutor.ts:32](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L32)

#### Parameters

##### connectionFacade

[`ConnectionFacade`](ConnectionFacade.md)

##### languages

[`LanguagesService`](LanguagesService.md)

##### schemaState

[`SchemaState`](SchemaState.md)

##### expressions

`Expressions`

##### \_options

[`QueryOptions`](../interfaces/QueryOptions.md)

##### helper

[`OrmH3lp`](OrmH3lp.md)

##### transactional

`boolean` = `false`

#### Returns

`QueryExecutorImpl`

## Accessors

### options

#### Get Signature

> **get** **options**(): [`QueryOptions`](../interfaces/QueryOptions.md)

Defined in: [src/lib/execution/application/services/queryExecutor/queryExecutor.ts:53](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L53)

##### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`options`](../interfaces/QueryExecutor.md#options)

## Methods

### \_execute()

> **\_execute**(`query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/execution/application/services/queryExecutor/queryExecutor.ts:122](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L122)

#### Parameters

##### query

[`Query`](Query.md)

##### data

[`Data`](Data.md)

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`QueryInternalExecutor`](../interfaces/QueryInternalExecutor.md).[`_execute`](../interfaces/QueryInternalExecutor.md#_execute)

***

### commit()

> **commit**(): `Promise`\<`void`\>

Defined in: [src/lib/execution/application/services/queryExecutor/queryExecutor.ts:69](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L69)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`commit`](../interfaces/QueryExecutor.md#commit)

***

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/execution/application/services/queryExecutor/queryExecutor.ts:91](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L91)

#### Parameters

##### query

[`Query`](Query.md)

##### data

`any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`execute`](../interfaces/QueryExecutor.md#execute)

***

### release()

> **release**(): `Promise`\<`void`\>

Defined in: [src/lib/execution/application/services/queryExecutor/queryExecutor.ts:83](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L83)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`release`](../interfaces/QueryExecutor.md#release)

***

### rollback()

> **rollback**(): `Promise`\<`void`\>

Defined in: [src/lib/execution/application/services/queryExecutor/queryExecutor.ts:76](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L76)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`QueryExecutor`](../interfaces/QueryExecutor.md).[`rollback`](../interfaces/QueryExecutor.md#rollback)
