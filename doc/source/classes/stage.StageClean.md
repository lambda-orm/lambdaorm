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

• **new StageClean**(`state`, `schema`, `routing`, `languageManager`, `executor`, `stage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`StageState`](stage.StageState.md) |
| `schema` | [`SchemaConfig`](manager.SchemaConfig.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `executor` | [`Executor`](manager.Executor.md) |
| `stage` | `string` |

#### Inherited from

StageActionDDL.constructor

#### Defined in

[src/lib/stage/stageActionDDL.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageActionDDL.ts#L13)

## Methods

### execute

▸ **execute**(`tryAllCan?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tryAllCan` | `boolean` | `false` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/stage/stageClean.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageClean.ts#L15)

___

### queries

▸ **queries**(): `Promise`<[`Query`](model.Query.md)[]\>

#### Returns

`Promise`<[`Query`](model.Query.md)[]\>

#### Overrides

StageActionDDL.queries

#### Defined in

[src/lib/stage/stageClean.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageClean.ts#L6)

___

### sentence

▸ **sentence**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Inherited from

StageActionDDL.sentence

#### Defined in

[src/lib/stage/stageActionDDL.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/stage/stageActionDDL.ts#L23)
