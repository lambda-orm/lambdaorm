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

[src/lib/execution/domain/executor.ts:26](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/execution/domain/executor.ts#L26)

## Properties

### condition?

> `optional` **condition**: `string`

#### Source

[src/lib/execution/domain/executor.ts:24](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/execution/domain/executor.ts#L24)

***

### on

> **on**: [`SentenceCategory`](../enumerations/SentenceCategory.md)[]

#### Source

[src/lib/execution/domain/executor.ts:23](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/execution/domain/executor.ts#L23)

***

### transactional?

> `optional` **transactional**: `boolean`

#### Source

[src/lib/execution/domain/executor.ts:25](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/execution/domain/executor.ts#L25)

## Methods

### after()

> **after**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:33](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/execution/domain/executor.ts#L33)

***

### before()

> **before**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:32](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/execution/domain/executor.ts#L32)

***

### error()

> **error**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**: [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:34](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/execution/domain/executor.ts#L34)
