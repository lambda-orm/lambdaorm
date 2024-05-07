[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ActionObserver

# Class: `abstract` ActionObserver

## Extended by

- [`ExecutionActionObserver`](ExecutionActionObserver.md)

## Constructors

### new ActionObserver()

> **new ActionObserver**(`on`, `condition`?, `transactional`?): [`ActionObserver`](ActionObserver.md)

#### Parameters

• **on**: [`SentenceCategory`](../enumerations/SentenceCategory.md)[]

• **condition?**: `string`

• **transactional?**: `boolean`

#### Returns

[`ActionObserver`](ActionObserver.md)

#### Source

[src/lib/execution/domain/executor.ts:19](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/executor.ts#L19)

## Properties

### condition?

> `optional` **condition**: `string`

#### Source

[src/lib/execution/domain/executor.ts:17](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/executor.ts#L17)

***

### on

> **on**: [`SentenceCategory`](../enumerations/SentenceCategory.md)[]

#### Source

[src/lib/execution/domain/executor.ts:16](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/executor.ts#L16)

***

### transactional?

> `optional` **transactional**: `boolean`

#### Source

[src/lib/execution/domain/executor.ts:18](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/executor.ts#L18)

## Methods

### after()

> **after**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:26](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/executor.ts#L26)

***

### before()

> **before**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:25](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/executor.ts#L25)

***

### error()

> **error**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:27](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/executor.ts#L27)
