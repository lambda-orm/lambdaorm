[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageDelete

# Class: StageDelete

[stage](../modules/stage.md).StageDelete

## Hierarchy

- `StageActionDML`

  ↳ **`StageDelete`**

## Table of contents

### Constructors

- [constructor](stage.StageDelete.md#constructor)

### Methods

- [execute](stage.StageDelete.md#execute)
- [queries](stage.StageDelete.md#queries)
- [sentence](stage.StageDelete.md#sentence)

## Constructors

### constructor

• **new StageDelete**(`state`, `model`, `expressionManager`, `executor`, `options`)

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

[src/lib/stage/stageActionDML.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageActionDML.ts#L12)

## Methods

### execute

▸ **execute**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/stage/stageDelete.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageDelete.ts#L5)

___

### queries

▸ **queries**(): [`Query`](model.Query.md)[]

#### Returns

[`Query`](model.Query.md)[]

#### Inherited from

StageActionDML.queries

#### Defined in

[src/lib/stage/stageActionDML.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageActionDML.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

StageActionDML.sentence

#### Defined in

[src/lib/stage/stageActionDML.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/stage/stageActionDML.ts#L20)
