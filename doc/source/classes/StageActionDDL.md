[Lambda ORM](../README.md) / StageActionDDL

# Class: StageActionDDL

## Hierarchy

- **`StageActionDDL`**

  ↳ [`StageDrop`](StageDrop.md)

  ↳ [`StageSync`](StageSync.md)

  ↳ [`StageTruncate`](StageTruncate.md)

## Table of contents

### Constructors

- [constructor](StageActionDDL.md#constructor)

### Methods

- [execute](StageActionDDL.md#execute)
- [queries](StageActionDDL.md#queries)
- [sentence](StageActionDDL.md#sentence)

## Constructors

### constructor

• **new StageActionDDL**(`executor`, `stageModelService`, `schemaFacade`, `languages`, `options`, `helper`): [`StageActionDDL`](StageActionDDL.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `stageModelService` | [`StageModelService`](StageModelService.md) |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute

▸ **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:17](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDDL.ts#L17)

___

### queries

▸ **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:18](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDDL.ts#L18)

___

### sentence

▸ **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
