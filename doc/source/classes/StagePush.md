[Lambda ORM](../README.md) / StagePush

# Class: StagePush

## Hierarchy

- [`StageActionDDL`](StageActionDDL.md)

  ↳ **`StagePush`**

## Table of contents

### Constructors

- [constructor](StagePush.md#constructor)

### Methods

- [execute](StagePush.md#execute)
- [queries](StagePush.md#queries)
- [sentence](StagePush.md#sentence)

## Constructors

### constructor

• **new StagePush**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): [`StagePush`](StagePush.md)

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

[`StagePush`](StagePush.md)

#### Inherited from

[StageActionDDL](StageActionDDL.md).[constructor](StageActionDDL.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute

▸ **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[execute](StageActionDDL.md#execute)

#### Defined in

[src/lib/stage/application/useCases/push.ts:11](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/stage/application/useCases/push.ts#L11)

___

### queries

▸ **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[queries](StageActionDDL.md#queries)

#### Defined in

[src/lib/stage/application/useCases/push.ts:6](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/stage/application/useCases/push.ts#L6)

___

### sentence

▸ **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[StageActionDDL](StageActionDDL.md).[sentence](StageActionDDL.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
