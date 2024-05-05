[Lambda ORM](../README.md) / StagePull

# Class: StagePull

## Hierarchy

- [`StageActionDDL`](StageActionDDL.md)

  ↳ **`StagePull`**

## Table of contents

### Constructors

- [constructor](StagePull.md#constructor)

### Methods

- [execute](StagePull.md#execute)
- [queries](StagePull.md#queries)
- [sentence](StagePull.md#sentence)

## Constructors

### constructor

• **new StagePull**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): [`StagePull`](StagePull.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `stageModelService` | [`StageModelService`](StageModelService.md) |
| `schemaState` | [`SchemaState`](SchemaState.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |
| `helper` | [`OrmH3lp`](OrmH3lp.md) |

#### Returns

[`StagePull`](StagePull.md)

#### Inherited from

[StageActionDDL](StageActionDDL.md).[constructor](StageActionDDL.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/61ef464db604bd933b79241155b2eeec50bb5452/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute

▸ **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[execute](StageActionDDL.md#execute)

#### Defined in

[src/lib/stage/application/useCases/pull.ts:11](https://github.com/lambda-orm/lambdaorm/blob/61ef464db604bd933b79241155b2eeec50bb5452/src/lib/stage/application/useCases/pull.ts#L11)

___

### queries

▸ **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[queries](StageActionDDL.md#queries)

#### Defined in

[src/lib/stage/application/useCases/pull.ts:6](https://github.com/lambda-orm/lambdaorm/blob/61ef464db604bd933b79241155b2eeec50bb5452/src/lib/stage/application/useCases/pull.ts#L6)

___

### sentence

▸ **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[StageActionDDL](StageActionDDL.md).[sentence](StageActionDDL.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/61ef464db604bd933b79241155b2eeec50bb5452/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
