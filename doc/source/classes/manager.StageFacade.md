[Lambda ORM](../README.md) / [manager](../modules/manager.md) / StageFacade

# Class: StageFacade

[manager](../modules/manager.md).StageFacade

## Table of contents

### Constructors

- [constructor](manager.StageFacade.md#constructor)

### Methods

- [clean](manager.StageFacade.md#clean)
- [exists](manager.StageFacade.md#exists)
- [export](manager.StageFacade.md#export)
- [import](manager.StageFacade.md#import)
- [sync](manager.StageFacade.md#sync)
- [truncate](manager.StageFacade.md#truncate)

## Constructors

### constructor

• **new StageFacade**(`schemaConfig`, `routing`, `expressionManager`, `languageManager`, `executor`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaConfig` | [`SchemaConfig`](manager.SchemaConfig.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `executor` | [`Executor`](manager.Executor.md) |

#### Defined in

[src/lib/manager/stageFacade.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/stageFacade.ts#L20)

## Methods

### clean

▸ **clean**(`name`): [`StageClean`](stage.StageClean.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`StageClean`](stage.StageClean.md)

#### Defined in

[src/lib/manager/stageFacade.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/stageFacade.ts#L47)

___

### exists

▸ **exists**(`name`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/manager/stageFacade.ts:37](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/stageFacade.ts#L37)

___

### export

▸ **export**(`name`): [`StageExport`](stage.StageExport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`StageExport`](stage.StageExport.md)

#### Defined in

[src/lib/manager/stageFacade.ts:57](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/stageFacade.ts#L57)

___

### import

▸ **import**(`name`): [`StageImport`](stage.StageImport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`StageImport`](stage.StageImport.md)

#### Defined in

[src/lib/manager/stageFacade.ts:62](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/stageFacade.ts#L62)

___

### sync

▸ **sync**(`name`): [`StageSync`](stage.StageSync.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`StageSync`](stage.StageSync.md)

#### Defined in

[src/lib/manager/stageFacade.ts:42](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/stageFacade.ts#L42)

___

### truncate

▸ **truncate**(`name`): [`StageClean`](stage.StageClean.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`StageClean`](stage.StageClean.md)

#### Defined in

[src/lib/manager/stageFacade.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/stageFacade.ts#L52)
