[Lambda ORM](../README.md) / StageSync

# Class: StageSync

## Hierarchy

- [`StageActionDDL`](StageActionDDL.md)

  ↳ **`StageSync`**

## Table of contents

### Constructors

- [constructor](StageSync.md#constructor)

### Methods

- [execute](StageSync.md#execute)
- [queries](StageSync.md#queries)
- [sentence](StageSync.md#sentence)

## Constructors

### constructor

• **new StageSync**(`executor`, `stageModelService`, `schemaFacade`, `languages`, `options`, `helper`): [`StageSync`](StageSync.md)

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

[`StageSync`](StageSync.md)

#### Inherited from

[StageActionDDL](StageActionDDL.md).[constructor](StageActionDDL.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute

▸ **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[execute](StageActionDDL.md#execute)

#### Defined in

[src/lib/stage/application/useCases/sync.ts:11](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/sync.ts#L11)

___

### queries

▸ **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[queries](StageActionDDL.md#queries)

#### Defined in

[src/lib/stage/application/useCases/sync.ts:6](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/sync.ts#L6)

___

### sentence

▸ **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[StageActionDDL](StageActionDDL.md).[sentence](StageActionDDL.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
