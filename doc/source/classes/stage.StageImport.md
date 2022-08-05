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
- [queries](stage.StageImport.md#queries)
- [sentence](stage.StageImport.md#sentence)

## Constructors

### constructor

• **new StageImport**(`state`, `model`, `expressionManager`, `executor`, `options`)

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

[src/lib/stage/stageActionDML.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/stage/stageActionDML.ts#L12)

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

[src/lib/stage/stageImport.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/stage/stageImport.ts#L7)

___

### queries

▸ **queries**(): [`Query`](model.Query.md)[]

#### Returns

[`Query`](model.Query.md)[]

#### Inherited from

StageActionDML.queries

#### Defined in

[src/lib/stage/stageActionDML.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/stage/stageActionDML.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

StageActionDML.sentence

#### Defined in

[src/lib/stage/stageActionDML.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/stage/stageActionDML.ts#L20)
