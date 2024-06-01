[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ExecutorImpl

# Class: ExecutorImpl

## Implements

- [`Executor`](../interfaces/Executor.md)
- [`ObservableExecutor`](../interfaces/ObservableExecutor.md)

## Constructors

### new ExecutorImpl()

> **new ExecutorImpl**(`connectionFacade`, `languages`, `schemaState`, `expressions`, `helper`): [`ExecutorImpl`](ExecutorImpl.md)

#### Parameters

• **connectionFacade**: [`ConnectionFacade`](ConnectionFacade.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **expressions**: `Expressions`

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`ExecutorImpl`](ExecutorImpl.md)

#### Source

[src/lib/execution/application/services/executor.ts:12](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/application/services/executor.ts#L12)

## Methods

### execute()

> **execute**(`query`, `data`, `options`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](Query.md)

• **data**: `any`

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`execute`](../interfaces/Executor.md#execute)

#### Source

[src/lib/execution/application/services/executor.ts:33](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/application/services/executor.ts#L33)

***

### executeList()

> **executeList**(`queries`, `options`): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Parameters

• **queries**: [`Query`](Query.md)[]

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`executeList`](../interfaces/Executor.md#executelist)

#### Source

[src/lib/execution/application/services/executor.ts:56](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/application/services/executor.ts#L56)

***

### subscribe()

> **subscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Implementation of

[`ObservableExecutor`](../interfaces/ObservableExecutor.md).[`subscribe`](../interfaces/ObservableExecutor.md#subscribe)

#### Source

[src/lib/execution/application/services/executor.ts:21](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/application/services/executor.ts#L21)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

Create a transaction

#### Parameters

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

• **callback**

Code to be executed in transaction

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`transaction`](../interfaces/Executor.md#transaction)

#### Source

[src/lib/execution/application/services/executor.ts:86](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/application/services/executor.ts#L86)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Implementation of

[`ObservableExecutor`](../interfaces/ObservableExecutor.md).[`unsubscribe`](../interfaces/ObservableExecutor.md#unsubscribe)

#### Source

[src/lib/execution/application/services/executor.ts:25](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/application/services/executor.ts#L25)
