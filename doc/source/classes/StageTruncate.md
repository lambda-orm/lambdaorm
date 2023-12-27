[Lambda ORM](../README.md) / StageTruncate

# Class: StageTruncate

## Hierarchy

- [`StageActionDDL`](StageActionDDL.md)

  ↳ **`StageTruncate`**

## Table of contents

### Constructors

- [constructor](StageTruncate.md#constructor)

### Methods

- [execute](StageTruncate.md#execute)
- [queries](StageTruncate.md#queries)
- [sentence](StageTruncate.md#sentence)

## Constructors

### constructor

• **new StageTruncate**(`executor`, `stageModelService`, `schemaFacade`, `languages`, `options`, `helper`): [`StageTruncate`](StageTruncate.md)

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

[`StageTruncate`](StageTruncate.md)

#### Inherited from

[StageActionDDL](StageActionDDL.md).[constructor](StageActionDDL.md#constructor)

#### Defined in

<<<<<<< HEAD
[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/useCases/base/actionDDL.ts#L10)
=======
[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/useCases/base/actionDDL.ts#L10)
>>>>>>> release/1.2.0

## Methods

### execute

▸ **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[execute](StageActionDDL.md#execute)

#### Defined in

<<<<<<< HEAD
[src/lib/stage/application/useCases/truncate.ts:13](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/useCases/truncate.ts#L13)
=======
[src/lib/stage/application/useCases/truncate.ts:13](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/useCases/truncate.ts#L13)
>>>>>>> release/1.2.0

___

### queries

▸ **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[queries](StageActionDDL.md#queries)

#### Defined in

<<<<<<< HEAD
[src/lib/stage/application/useCases/truncate.ts:5](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/useCases/truncate.ts#L5)
=======
[src/lib/stage/application/useCases/truncate.ts:5](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/useCases/truncate.ts#L5)
>>>>>>> release/1.2.0

___

### sentence

▸ **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[StageActionDDL](StageActionDDL.md).[sentence](StageActionDDL.md#sentence)

#### Defined in

<<<<<<< HEAD
[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
=======
[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
>>>>>>> release/1.2.0
