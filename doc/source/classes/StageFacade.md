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
- [introspect](StageFacade.md#introspect)
- [match](StageFacade.md#match)
- [sync](StageFacade.md#sync)
- [syncAndImport](StageFacade.md#syncandimport)
- [truncate](StageFacade.md#truncate)

## Constructors

### constructor

• **new StageFacade**(`workspace`, `schemaState`, `expression`, `executor`, `languages`, `helper`): [`StageFacade`](StageFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |
| `schemaState` | [`SchemaState`](SchemaState.md) |
| `expression` | [`ExpressionFacade`](ExpressionFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `helper` | [`OrmH3lp`](OrmH3lp.md) |

#### Returns

[`StageFacade`](StageFacade.md)

#### Defined in

[src/lib/stage/application/facade.ts:22](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L22)

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

[src/lib/stage/application/facade.ts:52](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L52)

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

[src/lib/stage/application/facade.ts:42](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L42)

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

[src/lib/stage/application/facade.ts:32](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L32)

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

[src/lib/stage/application/facade.ts:57](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L57)

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

[src/lib/stage/application/facade.ts:62](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L62)

___

### introspect

▸ **introspect**(`options?`): `Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Defined in

[src/lib/stage/application/facade.ts:67](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L67)

___

### match

▸ **match**(`options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `StageMatchOptions` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/stage/application/facade.ts:72](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L72)

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

[src/lib/stage/application/facade.ts:37](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L37)

___

### syncAndImport

▸ **syncAndImport**(`data`, `name`, `options?`): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `name` | `string` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Defined in

[src/lib/stage/application/facade.ts:79](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L79)

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

[src/lib/stage/application/facade.ts:47](https://github.com/lambda-orm/lambdaorm/blob/14bde00a/src/lib/stage/application/facade.ts#L47)
