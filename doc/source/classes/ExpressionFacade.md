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
- [solveOptions](ExpressionFacade.md#solveoptions)
- [transaction](ExpressionFacade.md#transaction)

## Constructors

### constructor

• **new ExpressionFacade**(`sentenceFacade`, `schemaFacade`, `languages`, `executor`, `expressions`, `cache`, `helper`): [`ExpressionFacade`](ExpressionFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentenceFacade` | [`SentenceFacade`](SentenceFacade.md) |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `expressions` | `Expressions` |
| `cache` | `ICache`\<`string`, `string`\> |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`ExpressionFacade`](ExpressionFacade.md)

#### Defined in

[src/lib/expressions/application/facade.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/facade.ts#L24)

## Methods

### build

▸ **build**(`expression`, `options?`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/lib/expressions/application/facade.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/facade.ts#L38)

___

### execute

▸ **execute**(`expression`, `data?`, `options?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data` | `any` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/facade.ts:50](https://github.com/FlavioLionelRita/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/facade.ts#L50)

___

### executeList

▸ **executeList**(`expressions`, `options?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressions` | `string`[] |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/facade.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/facade.ts#L54)

___

### plan

▸ **plan**(`expression`, `options?`): [`QueryPlan`](../interfaces/QueryPlan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

#### Defined in

[src/lib/expressions/application/facade.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/facade.ts#L42)

___

### solveOptions

▸ **solveOptions**(`options?`): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Defined in

[src/lib/expressions/application/facade.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/facade.ts#L46)

___

### transaction

▸ **transaction**(`options?`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `undefined` \| [`QueryOptions`](../interfaces/QueryOptions.md) | `undefined` |
| `callback` | (`tr`: [`ExpressionTransaction`](ExpressionTransaction.md)) => `Promise`\<`void`\> | `undefined` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/expressions/application/facade.ts:58](https://github.com/FlavioLionelRita/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/facade.ts#L58)
