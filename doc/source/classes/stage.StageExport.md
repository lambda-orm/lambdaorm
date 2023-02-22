[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageExport

# Class: StageExport

[stage](../modules/stage.md).StageExport

## Hierarchy

- `StageActionDML`

  ↳ **`StageExport`**

## Table of contents

### Constructors

- [constructor](stage.StageExport.md#constructor)

### Methods

- [execute](stage.StageExport.md#execute)
- [queries](stage.StageExport.md#queries)
- [sentence](stage.StageExport.md#sentence)

## Constructors

### constructor

• **new StageExport**(`state`, `model`, `expressionManager`, `executor`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StageMapping`](stage.StageMapping.md) |
| `model` | [`ModelConfig`](manager.ModelConfig.md) |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `executor` | [`Executor`](manager.Executor.md) |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Inherited from

StageActionDML.constructor

#### Defined in

[src/lib/stage/stageActionDML.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageActionDML.ts#L12)

## Methods

### execute

▸ **execute**(): `Promise`<[`SchemaConfig`](../interfaces/model.SchemaConfig.md)\>

#### Returns

`Promise`<[`SchemaConfig`](../interfaces/model.SchemaConfig.md)\>

#### Defined in

[src/lib/stage/stageExport.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageExport.ts#L5)

___

### queries

▸ **queries**(): [`Query`](model.Query.md)[]

#### Returns

[`Query`](model.Query.md)[]

#### Inherited from

StageActionDML.queries

#### Defined in

[src/lib/stage/stageActionDML.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageActionDML.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

StageActionDML.sentence

#### Defined in

[src/lib/stage/stageActionDML.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/stage/stageActionDML.ts#L20)
