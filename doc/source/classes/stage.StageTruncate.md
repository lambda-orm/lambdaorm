[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageTruncate

# Class: StageTruncate

[stage](../modules/stage.md).StageTruncate

## Hierarchy

- `StageActionDDL`

  ↳ **`StageTruncate`**

## Table of contents

### Constructors

- [constructor](stage.StageTruncate.md#constructor)

### Methods

- [execute](stage.StageTruncate.md#execute)
- [queries](stage.StageTruncate.md#queries)
- [sentence](stage.StageTruncate.md#sentence)

## Constructors

### constructor

• **new StageTruncate**(`state`, `schema`, `routing`, `languages`, `executor`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StageModel`](stage.StageModel.md) |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `languages` | [`Languages`](manager.Languages.md) |
| `executor` | [`Executor`](manager.Executor.md) |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Inherited from

StageActionDDL.constructor

#### Defined in

[src/lib/stage/stageActionDDL.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageActionDDL.ts#L12)

## Methods

### execute

▸ **execute**(): `Promise`<[`ExecuteResult`](../interfaces/model.ExecuteResult.md)[]\>

#### Returns

`Promise`<[`ExecuteResult`](../interfaces/model.ExecuteResult.md)[]\>

#### Defined in

[src/lib/stage/stageTruncate.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageTruncate.ts#L14)

___

### queries

▸ **queries**(): `Promise`<[`Query`](model.Query.md)[]\>

#### Returns

`Promise`<[`Query`](model.Query.md)[]\>

#### Overrides

StageActionDDL.queries

#### Defined in

[src/lib/stage/stageTruncate.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageTruncate.ts#L6)

___

### sentence

▸ **sentence**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Inherited from

StageActionDDL.sentence

#### Defined in

[src/lib/stage/stageActionDDL.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageActionDDL.ts#L22)
