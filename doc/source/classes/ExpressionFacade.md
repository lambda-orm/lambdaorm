[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ExpressionFacade

# Class: ExpressionFacade

## Constructors

### new ExpressionFacade()

> **new ExpressionFacade**(`sentenceFacade`, `schemaState`, `languages`, `executor`, `expressions`, `cache`, `helper`): [`ExpressionFacade`](ExpressionFacade.md)

#### Parameters

• **sentenceFacade**: [`SentenceFacade`](SentenceFacade.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **executor**: [`Executor`](../interfaces/Executor.md)

• **expressions**: `Expressions`

• **cache**: `ICache`\<`string`, `string`\>

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`ExpressionFacade`](ExpressionFacade.md)

#### Source

[src/lib/expressions/application/facade.ts:24](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/expressions/application/facade.ts#L24)

## Methods

### build()

> **build**(`query`, `options`?): [`Query`](Query.md)

#### Parameters

• **query**: `string`

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`Query`](Query.md)

#### Source

[src/lib/expressions/application/facade.ts:38](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/expressions/application/facade.ts#L38)

***

### execute()

> **execute**(`query`, `data`, `options`?): `Promise`\<`any`\>

#### Parameters

• **query**: `string`

• **data**: `any`= `{}`

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/expressions/application/facade.ts:50](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/expressions/application/facade.ts#L50)

***

### executeList()

> **executeList**(`queries`, `options`?): `Promise`\<`any`\>

#### Parameters

• **queries**: `string`[]

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/expressions/application/facade.ts:54](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/expressions/application/facade.ts#L54)

***

### plan()

> **plan**(`query`, `options`?): [`QueryPlan`](../interfaces/QueryPlan.md)

#### Parameters

• **query**: `string`

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

#### Source

[src/lib/expressions/application/facade.ts:42](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/expressions/application/facade.ts#L42)

***

### solveQueryOptions()

> **solveQueryOptions**(`options`?): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Parameters

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Source

[src/lib/expressions/application/facade.ts:46](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/expressions/application/facade.ts#L46)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

#### Parameters

• **options**: `undefined` \| [`QueryOptions`](../interfaces/QueryOptions.md)= `undefined`

• **callback**

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/expressions/application/facade.ts:58](https://github.com/lambda-orm/lambdaorm/blob/5ec43dcfdfda08254bf7f6af2d1f42240f4abbbd/src/lib/expressions/application/facade.ts#L58)
