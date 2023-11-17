[Lambda ORM](../README.md) / StageFacade

# Class: StageFacade

## Table of contents

### Constructors

- [constructor](StageFacade.md#constructor)

### Methods

- [clean](StageFacade.md#clean)
- [delete](StageFacade.md#delete)
- [exists](StageFacade.md#exists)
- [export](StageFacade.md#export)
- [import](StageFacade.md#import)
- [sync](StageFacade.md#sync)
- [truncate](StageFacade.md#truncate)

## Constructors

### constructor

• **new StageFacade**(`schemaFacade`, `expression`, `executor`, `languages`, `helper`): [`StageFacade`](StageFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `expression` | [`ExpressionFacade`](ExpressionFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`StageFacade`](StageFacade.md)

#### Defined in

[src/lib/stage/application/facade.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/stage/application/facade.ts#L20)

## Methods

### clean

▸ **clean**(`options?`): [`StageActionDDL`](StageActionDDL.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Defined in

[src/lib/stage/application/facade.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/stage/application/facade.ts#L39)

___

### delete

▸ **delete**(`options?`): [`StageDelete`](StageDelete.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageDelete`](StageDelete.md)

#### Defined in

[src/lib/stage/application/facade.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/stage/application/facade.ts#L49)

___

### exists

▸ **exists**(`name`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/lib/stage/application/facade.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/stage/application/facade.ts#L29)

___

### export

▸ **export**(`options?`): [`StageExport`](StageExport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageExport`](StageExport.md)

#### Defined in

[src/lib/stage/application/facade.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/stage/application/facade.ts#L54)

___

### import

▸ **import**(`options?`): [`StageImport`](StageImport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageImport`](StageImport.md)

#### Defined in

[src/lib/stage/application/facade.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/stage/application/facade.ts#L59)

___

### sync

▸ **sync**(`options?`): [`StageActionDDL`](StageActionDDL.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Defined in

[src/lib/stage/application/facade.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/stage/application/facade.ts#L34)

___

### truncate

▸ **truncate**(`options?`): [`StageActionDDL`](StageActionDDL.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Defined in

[src/lib/stage/application/facade.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/d21f27fe/src/lib/stage/application/facade.ts#L44)
