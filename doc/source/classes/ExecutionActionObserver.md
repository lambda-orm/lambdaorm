[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ExecutionActionObserver

# Class: ExecutionActionObserver

## Extends

- [`ActionObserver`](ActionObserver.md)

## Constructors

### new ExecutionActionObserver()

> **new ExecutionActionObserver**(`config`, `expressions`): [`ExecutionActionObserver`](ExecutionActionObserver.md)

#### Parameters

• **config**: [`ListenerConfig`](../interfaces/ListenerConfig.md)

• **expressions**: `Expressions`

#### Returns

[`ExecutionActionObserver`](ExecutionActionObserver.md)

#### Overrides

[`ActionObserver`](ActionObserver.md).[`constructor`](ActionObserver.md#constructors)

#### Source

[src/lib/execution/application/services/observer.ts:6](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/application/services/observer.ts#L6)

## Properties

### condition?

> `optional` **condition**: `string`

#### Inherited from

[`ActionObserver`](ActionObserver.md).[`condition`](ActionObserver.md#condition)

#### Source

[src/lib/execution/domain/executor.ts:17](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L17)

***

### on

> **on**: [`SentenceCategory`](../enumerations/SentenceCategory.md)[]

#### Inherited from

[`ActionObserver`](ActionObserver.md).[`on`](ActionObserver.md#on)

#### Source

[src/lib/execution/domain/executor.ts:16](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L16)

***

### transactional?

> `optional` **transactional**: `boolean`

#### Inherited from

[`ActionObserver`](ActionObserver.md).[`transactional`](ActionObserver.md#transactional)

#### Source

[src/lib/execution/domain/executor.ts:18](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L18)

## Methods

### after()

> **after**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`ActionObserver`](ActionObserver.md).[`after`](ActionObserver.md#after)

#### Source

[src/lib/execution/application/services/observer.ts:16](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/application/services/observer.ts#L16)

***

### before()

> **before**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`ActionObserver`](ActionObserver.md).[`before`](ActionObserver.md#before)

#### Source

[src/lib/execution/application/services/observer.ts:10](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/application/services/observer.ts#L10)

***

### error()

> **error**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`ActionObserver`](ActionObserver.md).[`error`](ActionObserver.md#error)

#### Source

[src/lib/execution/application/services/observer.ts:22](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/application/services/observer.ts#L22)
