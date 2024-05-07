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

• **on**: [`SentenceAction`](../enumerations/SentenceAction.md)[]

• **condition?**: `string`

• **transactional?**: `boolean`

#### Returns

[`ActionObserver`](ActionObserver.md)

#### Source

[src/lib/execution/domain/executor.ts:20](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/execution/domain/executor.ts#L20)

## Properties

### condition?

> `optional` **condition**: `string`

#### Source

[src/lib/execution/domain/executor.ts:18](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/execution/domain/executor.ts#L18)

***

### on

> **on**: [`SentenceAction`](../enumerations/SentenceAction.md)[]

#### Source

[src/lib/execution/domain/executor.ts:17](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/execution/domain/executor.ts#L17)

***

### transactional?

> `optional` **transactional**: `boolean`

#### Source

[src/lib/execution/domain/executor.ts:19](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/execution/domain/executor.ts#L19)

## Methods

### after()

> **after**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:27](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/execution/domain/executor.ts#L27)

***

### before()

> **before**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:26](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/execution/domain/executor.ts#L26)

***

### error()

> **error**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:28](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/execution/domain/executor.ts#L28)
