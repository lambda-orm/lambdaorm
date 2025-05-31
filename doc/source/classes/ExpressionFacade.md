[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ExpressionFacade

# Class: ExpressionFacade

Defined in: [src/lib/expressions/application/facade.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/facade.ts#L19)

## Constructors

### Constructor

> **new ExpressionFacade**(`sentenceFacade`, `schemaState`, `languages`, `executor`, `expressions`, `cache`, `helper`): `ExpressionFacade`

Defined in: [src/lib/expressions/application/facade.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/facade.ts#L24)

#### Parameters

##### sentenceFacade

[`SentenceFacade`](SentenceFacade.md)

##### schemaState

[`SchemaState`](SchemaState.md)

##### languages

[`LanguagesService`](LanguagesService.md)

##### executor

[`Executor`](../interfaces/Executor.md)

##### expressions

`Expressions`

##### cache

`ICache`\<`string`, `string`\>

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`ExpressionFacade`

## Methods

### build()

> **build**(`query`, `options?`): [`Query`](Query.md)

Defined in: [src/lib/expressions/application/facade.ts:38](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/facade.ts#L38)

#### Parameters

##### query

`string`

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`Query`](Query.md)

***

### execute()

> **execute**(`query`, `data`, `options?`): `Promise`\<`any`\>

Defined in: [src/lib/expressions/application/facade.ts:50](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/facade.ts#L50)

#### Parameters

##### query

`string`

##### data

`any` = `{}`

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`Promise`\<`any`\>

***

### executeList()

> **executeList**(`queries`, `options?`): `Promise`\<`any`\>

Defined in: [src/lib/expressions/application/facade.ts:54](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/facade.ts#L54)

#### Parameters

##### queries

`string`[]

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`Promise`\<`any`\>

***

### plan()

> **plan**(`query`, `options?`): [`QueryPlan`](../interfaces/QueryPlan.md)

Defined in: [src/lib/expressions/application/facade.ts:42](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/facade.ts#L42)

#### Parameters

##### query

`string`

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

***

### solveQueryOptions()

> **solveQueryOptions**(`options?`): [`QueryOptions`](../interfaces/QueryOptions.md)

Defined in: [src/lib/expressions/application/facade.ts:46](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/facade.ts#L46)

#### Parameters

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

Defined in: [src/lib/expressions/application/facade.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/facade.ts#L58)

#### Parameters

##### options

`undefined` | [`QueryOptions`](../interfaces/QueryOptions.md)

##### callback

(`tr`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>
