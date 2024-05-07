[Lambda ORM](../README.md) / ExpressionFacade

# Class: ExpressionFacade

## Table of contents

### Constructors

- [constructor](ExpressionFacade.md#constructor)

### Methods

- [build](ExpressionFacade.md#build)
- [execute](ExpressionFacade.md#execute)
- [executeList](ExpressionFacade.md#executelist)
- [plan](ExpressionFacade.md#plan)
- [solveQueryOptions](ExpressionFacade.md#solvequeryoptions)
- [transaction](ExpressionFacade.md#transaction)

## Constructors

### constructor

• **new ExpressionFacade**(`sentenceFacade`, `schemaState`, `languages`, `executor`, `expressions`, `cache`, `helper`): [`ExpressionFacade`](ExpressionFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentenceFacade` | [`SentenceFacade`](SentenceFacade.md) |
| `schemaState` | [`SchemaState`](SchemaState.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `expressions` | `Expressions` |
| `cache` | `ICache`\<`string`, `string`\> |
| `helper` | [`OrmH3lp`](OrmH3lp.md) |

#### Returns

[`ExpressionFacade`](ExpressionFacade.md)

#### Defined in

[src/lib/expressions/application/facade.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/facade.ts#L24)

## Methods

### build

▸ **build**(`query`, `options?`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/lib/expressions/application/facade.ts:38](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/facade.ts#L38)

___

### execute

▸ **execute**(`query`, `data?`, `options?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `data` | `any` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/facade.ts:50](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/facade.ts#L50)

___

### executeList

▸ **executeList**(`queries`, `options?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queries` | `string`[] |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/facade.ts:54](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/facade.ts#L54)

___

### plan

▸ **plan**(`query`, `options?`): [`QueryPlan`](../interfaces/QueryPlan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

#### Defined in

[src/lib/expressions/application/facade.ts:42](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/facade.ts#L42)

___

### solveQueryOptions

▸ **solveQueryOptions**(`options?`): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Defined in

[src/lib/expressions/application/facade.ts:46](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/facade.ts#L46)

___

### transaction

▸ **transaction**(`options?`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `undefined` \| [`QueryOptions`](../interfaces/QueryOptions.md) | `undefined` |
| `callback` | (`tr`: [`QueryTransaction`](QueryTransaction.md)) => `Promise`\<`void`\> | `undefined` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/expressions/application/facade.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/facade.ts#L58)
