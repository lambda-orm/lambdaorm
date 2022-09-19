[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageSync

# Class: StageSync

[stage](../modules/stage.md).StageSync

## Hierarchy

- `StageActionDDL`

  ↳ **`StageSync`**

## Table of contents

### Constructors

- [constructor](stage.StageSync.md#constructor)

### Methods

- [execute](stage.StageSync.md#execute)
- [queries](stage.StageSync.md#queries)
- [sentence](stage.StageSync.md#sentence)

## Constructors

### constructor

• **new StageSync**(`state`, `schema`, `routing`, `languages`, `executor`, `options`)

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

[src/lib/stage/stageActionDDL.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageActionDDL.ts#L12)

## Methods

### execute

▸ **execute**(): `Promise`<[`ExecuteResult`](../interfaces/model.ExecuteResult.md)[]\>

#### Returns

`Promise`<[`ExecuteResult`](../interfaces/model.ExecuteResult.md)[]\>

#### Defined in

[src/lib/stage/stageSync.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageSync.ts#L11)

___

### queries

▸ **queries**(): `Promise`<[`Query`](model.Query.md)[]\>

#### Returns

`Promise`<[`Query`](model.Query.md)[]\>

#### Overrides

StageActionDDL.queries

#### Defined in

[src/lib/stage/stageSync.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageSync.ts#L6)

___

### sentence

▸ **sentence**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Inherited from

StageActionDDL.sentence

#### Defined in

[src/lib/stage/stageActionDDL.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageActionDDL.ts#L22)
