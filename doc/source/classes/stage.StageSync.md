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

• **new StageSync**(`state`, `schema`, `routing`, `languageManager`, `executor`, `stage`)

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

[src/lib/stage/stageActionDDL.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/stage/stageActionDDL.ts#L13)

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

[src/lib/stage/stageSync.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/stage/stageSync.ts#L14)

___

### queries

▸ **queries**(): `Promise`<[`Query`](model.Query.md)[]\>

#### Returns

`Promise`<[`Query`](model.Query.md)[]\>

#### Overrides

StageActionDDL.queries

#### Defined in

[src/lib/stage/stageSync.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/stage/stageSync.ts#L7)

___

### sentence

▸ **sentence**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Inherited from

StageActionDDL.sentence

#### Defined in

[src/lib/stage/stageActionDDL.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/stage/stageActionDDL.ts#L23)
