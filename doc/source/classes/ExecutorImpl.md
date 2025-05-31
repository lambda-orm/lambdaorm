[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ExecutorImpl

# Class: ExecutorImpl

Defined in: [src/lib/execution/application/services/executor.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/executor.ts#L10)

## Implements

- [`Executor`](../interfaces/Executor.md)
- [`ObservableExecutor`](../interfaces/ObservableExecutor.md)

## Constructors

### Constructor

> **new ExecutorImpl**(`connectionFacade`, `languages`, `schemaState`, `expressions`, `helper`): `ExecutorImpl`

Defined in: [src/lib/execution/application/services/executor.ts:12](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/executor.ts#L12)

#### Parameters

##### connectionFacade

[`ConnectionFacade`](ConnectionFacade.md)

##### languages

[`LanguagesService`](LanguagesService.md)

##### schemaState

[`SchemaState`](SchemaState.md)

##### expressions

`Expressions`

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`ExecutorImpl`

## Methods

### execute()

> **execute**(`query`, `data`, `options`): `Promise`\<`any`\>

Defined in: [src/lib/execution/application/services/executor.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/executor.ts#L33)

#### Parameters

##### query

[`Query`](Query.md)

##### data

`any`

##### options

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`execute`](../interfaces/Executor.md#execute)

***

### executeList()

> **executeList**(`queries`, `options`): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Defined in: [src/lib/execution/application/services/executor.ts:56](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/executor.ts#L56)

#### Parameters

##### queries

[`Query`](Query.md)[]

##### options

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`executeList`](../interfaces/Executor.md#executelist)

***

### subscribe()

> **subscribe**(`observer`): `void`

Defined in: [src/lib/execution/application/services/executor.ts:21](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/executor.ts#L21)

#### Parameters

##### observer

[`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Implementation of

[`ObservableExecutor`](../interfaces/ObservableExecutor.md).[`subscribe`](../interfaces/ObservableExecutor.md#subscribe)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

Defined in: [src/lib/execution/application/services/executor.ts:86](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/executor.ts#L86)

Create a transaction

#### Parameters

##### options

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

##### callback

(`tr`) => `Promise`\<`void`\>

Code to be executed in transaction

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`transaction`](../interfaces/Executor.md#transaction)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

Defined in: [src/lib/execution/application/services/executor.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/executor.ts#L25)

#### Parameters

##### observer

[`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Implementation of

[`ObservableExecutor`](../interfaces/ObservableExecutor.md).[`unsubscribe`](../interfaces/ObservableExecutor.md#unsubscribe)
