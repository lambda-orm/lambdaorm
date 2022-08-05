[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageClean

# Class: StageClean

[stage](../modules/stage.md).StageClean

## Hierarchy

- `StageActionDDL`

  ↳ **`StageClean`**

## Table of contents

### Constructors

- [constructor](stage.StageClean.md#constructor)

### Methods

- [execute](stage.StageClean.md#execute)
- [queries](stage.StageClean.md#queries)
- [sentence](stage.StageClean.md#sentence)

## Constructors

### constructor

• **new StageClean**(`state`, `mapping`, `schema`, `routing`, `languages`, `executor`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StageModel`](stage.StageModel.md) |
| `mapping` | [`StageMapping`](stage.StageMapping.md) |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `languages` | [`Languages`](manager.Languages.md) |
| `executor` | [`Executor`](manager.Executor.md) |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Overrides

StageActionDDL.constructor

#### Defined in

[src/lib/stage/stageClean.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageClean.ts#L9)

## Methods

### execute

▸ **execute**(): `Promise`<[`ExecuteResult`](../interfaces/model.ExecuteResult.md)[]\>

#### Returns

`Promise`<[`ExecuteResult`](../interfaces/model.ExecuteResult.md)[]\>

#### Defined in

[src/lib/stage/stageClean.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageClean.ts#L22)

___

### queries

▸ **queries**(): `Promise`<[`Query`](model.Query.md)[]\>

#### Returns

`Promise`<[`Query`](model.Query.md)[]\>

#### Overrides

StageActionDDL.queries

#### Defined in

[src/lib/stage/stageClean.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageClean.ts#L14)

___

### sentence

▸ **sentence**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Inherited from

StageActionDDL.sentence

#### Defined in

[src/lib/stage/stageActionDDL.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageActionDDL.ts#L22)
