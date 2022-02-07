[Lambda ORM](../README.md) / [stage](../modules/stage.md) / StageImport

# Class: StageImport

[stage](../modules/stage.md).StageImport

## Hierarchy

- `StageActionDML`

  ↳ **`StageImport`**

## Table of contents

### Constructors

- [constructor](stage.StageImport.md#constructor)

### Methods

- [execute](stage.StageImport.md#execute)
- [sentence](stage.StageImport.md#sentence)

## Constructors

### constructor

• **new StageImport**(`state`, `model`, `expressionManager`, `executor`, `stage`)

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

[src/lib/stage/stageActionDML.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/stage/stageActionDML.ts#L12)

## Methods

### execute

▸ **execute**(`data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SchemaData`](../interfaces/model.SchemaData.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/stage/stageImport.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/stage/stageImport.ts#L6)

___

### sentence

▸ **sentence**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

StageActionDML.sentence

#### Defined in

[src/lib/stage/stageActionDML.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/stage/stageActionDML.ts#L20)
