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
- [sentence](stage.StageExport.md#sentence)

## Constructors

### constructor

• **new StageExport**(`state`, `model`, `expressionManager`, `executor`, `stage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StageState`](stage.StageState.md) |
| `model` | [`ModelConfig`](manager.ModelConfig.md) |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `executor` | [`Executor`](manager.Executor.md) |
| `stage` | `string` |

#### Inherited from

StageActionDML.constructor

#### Defined in

[src/lib/stage/stageActionDML.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/stage/stageActionDML.ts#L12)

## Methods

### execute

▸ **execute**(): `Promise`<[`SchemaData`](../interfaces/model.SchemaData.md)\>

#### Returns

`Promise`<[`SchemaData`](../interfaces/model.SchemaData.md)\>

#### Defined in

[src/lib/stage/stageExport.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/stage/stageExport.ts#L5)

___

### sentence

▸ **sentence**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

StageActionDML.sentence

#### Defined in

[src/lib/stage/stageActionDML.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/stage/stageActionDML.ts#L20)
