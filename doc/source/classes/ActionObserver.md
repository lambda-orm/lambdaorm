[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ActionObserver

# Class: `abstract` ActionObserver

Defined in: [src/lib/execution/domain/executor.ts:22](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L22)

## Extended by

- [`ExecutionActionObserver`](ExecutionActionObserver.md)

## Constructors

### Constructor

> **new ActionObserver**(`on`, `condition?`, `transactional?`): `ActionObserver`

Defined in: [src/lib/execution/domain/executor.ts:26](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L26)

#### Parameters

##### on

[`SentenceCategory`](../enumerations/SentenceCategory.md)[]

##### condition?

`string`

##### transactional?

`boolean`

#### Returns

`ActionObserver`

## Properties

### condition?

> `optional` **condition**: `string`

Defined in: [src/lib/execution/domain/executor.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L24)

***

### on

> **on**: [`SentenceCategory`](../enumerations/SentenceCategory.md)[]

Defined in: [src/lib/execution/domain/executor.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L23)

***

### transactional?

> `optional` **transactional**: `boolean`

Defined in: [src/lib/execution/domain/executor.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L25)

## Methods

### after()

> **after**(`args`): `Promise`\<`void`\>

Defined in: [src/lib/execution/domain/executor.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L33)

#### Parameters

##### args

[`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

***

### before()

> **before**(`args`): `Promise`\<`void`\>

Defined in: [src/lib/execution/domain/executor.ts:32](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L32)

#### Parameters

##### args

[`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

***

### error()

> **error**(`args`): `Promise`\<`void`\>

Defined in: [src/lib/execution/domain/executor.ts:34](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L34)

#### Parameters

##### args

[`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>
