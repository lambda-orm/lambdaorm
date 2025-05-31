[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ExecutionActionObserver

# Class: ExecutionActionObserver

Defined in: [src/lib/execution/application/services/observer.ts:5](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/observer.ts#L5)

## Extends

- [`ActionObserver`](ActionObserver.md)

## Constructors

### Constructor

> **new ExecutionActionObserver**(`config`, `expressions`): `ExecutionActionObserver`

Defined in: [src/lib/execution/application/services/observer.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/observer.ts#L6)

#### Parameters

##### config

[`ListenerConfig`](../interfaces/ListenerConfig.md)

##### expressions

`Expressions`

#### Returns

`ExecutionActionObserver`

#### Overrides

[`ActionObserver`](ActionObserver.md).[`constructor`](ActionObserver.md#constructor)

## Properties

### condition?

> `optional` **condition**: `string`

Defined in: [src/lib/execution/domain/executor.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L24)

#### Inherited from

[`ActionObserver`](ActionObserver.md).[`condition`](ActionObserver.md#condition)

***

### on

> **on**: [`SentenceCategory`](../enumerations/SentenceCategory.md)[]

Defined in: [src/lib/execution/domain/executor.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L23)

#### Inherited from

[`ActionObserver`](ActionObserver.md).[`on`](ActionObserver.md#on)

***

### transactional?

> `optional` **transactional**: `boolean`

Defined in: [src/lib/execution/domain/executor.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L25)

#### Inherited from

[`ActionObserver`](ActionObserver.md).[`transactional`](ActionObserver.md#transactional)

## Methods

### after()

> **after**(`args`): `Promise`\<`void`\>

Defined in: [src/lib/execution/application/services/observer.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/observer.ts#L16)

#### Parameters

##### args

[`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`ActionObserver`](ActionObserver.md).[`after`](ActionObserver.md#after)

***

### before()

> **before**(`args`): `Promise`\<`void`\>

Defined in: [src/lib/execution/application/services/observer.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/observer.ts#L10)

#### Parameters

##### args

[`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`ActionObserver`](ActionObserver.md).[`before`](ActionObserver.md#before)

***

### error()

> **error**(`args`): `Promise`\<`void`\>

Defined in: [src/lib/execution/application/services/observer.ts:22](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/application/services/observer.ts#L22)

#### Parameters

##### args

[`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`ActionObserver`](ActionObserver.md).[`error`](ActionObserver.md#error)
