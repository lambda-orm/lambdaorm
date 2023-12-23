[Lambda ORM](../README.md) / StageFacade

# Class: StageFacade

## Table of contents

### Constructors

- [constructor](StageFacade.md#constructor)

### Methods

- [delete](StageFacade.md#delete)
- [drop](StageFacade.md#drop)
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

[src/lib/stage/application/facade.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/b29e96f0/src/lib/stage/application/facade.ts#L19)

## Methods

### delete

▸ **delete**(`options?`): [`StageDelete`](StageDelete.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageDelete`](StageDelete.md)

#### Defined in

[src/lib/stage/application/facade.ts:48](https://github.com/FlavioLionelRita/lambdaorm/blob/b29e96f0/src/lib/stage/application/facade.ts#L48)

___

### drop

▸ **drop**(`options?`): [`StageActionDDL`](StageActionDDL.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Defined in

[src/lib/stage/application/facade.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/b29e96f0/src/lib/stage/application/facade.ts#L38)

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

[src/lib/stage/application/facade.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/b29e96f0/src/lib/stage/application/facade.ts#L28)

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

[src/lib/stage/application/facade.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/b29e96f0/src/lib/stage/application/facade.ts#L53)

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

[src/lib/stage/application/facade.ts:58](https://github.com/FlavioLionelRita/lambdaorm/blob/b29e96f0/src/lib/stage/application/facade.ts#L58)

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

[src/lib/stage/application/facade.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/b29e96f0/src/lib/stage/application/facade.ts#L33)

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

[src/lib/stage/application/facade.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/b29e96f0/src/lib/stage/application/facade.ts#L43)
