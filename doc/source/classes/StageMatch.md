[Lambda ORM](../README.md) / StageMatch

# Class: StageMatch

## Hierarchy

- [`StageActionDDL`](StageActionDDL.md)

  ↳ **`StageMatch`**

## Table of contents

### Constructors

- [constructor](StageMatch.md#constructor)

### Methods

- [execute](StageMatch.md#execute)
- [queries](StageMatch.md#queries)
- [sentence](StageMatch.md#sentence)

## Constructors

### constructor

• **new StageMatch**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): [`StageMatch`](StageMatch.md)

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

[`StageMatch`](StageMatch.md)

#### Inherited from

[StageActionDDL](StageActionDDL.md).[constructor](StageActionDDL.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute

▸ **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[execute](StageActionDDL.md#execute)

#### Defined in

[src/lib/stage/application/useCases/match.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/stage/application/useCases/match.ts#L11)

___

### queries

▸ **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[queries](StageActionDDL.md#queries)

#### Defined in

[src/lib/stage/application/useCases/match.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/stage/application/useCases/match.ts#L6)

___

### sentence

▸ **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[StageActionDDL](StageActionDDL.md).[sentence](StageActionDDL.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d9dd50600cc1cb524c4fb0ae404756c6e8eb3402/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
