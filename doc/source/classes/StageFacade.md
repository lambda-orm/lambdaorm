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
- [fetch](StageFacade.md#fetch)
- [import](StageFacade.md#import)
- [incorporate](StageFacade.md#incorporate)
- [introspect](StageFacade.md#introspect)
- [pull](StageFacade.md#pull)
- [push](StageFacade.md#push)
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

[src/lib/stage/application/facade.ts:22](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L22)

## Methods

### delete

▸ **delete**(`options?`): [`StageDelete`](StageDelete.md)

Delete source entities related to the stage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

[`StageDelete`](StageDelete.md)

#### Defined in

[src/lib/stage/application/facade.ts:77](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L77)

___

### drop

▸ **drop**(`options?`): [`StageActionDDL`](StageActionDDL.md)

Drop source entities related to the stage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Defined in

[src/lib/stage/application/facade.ts:57](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L57)

___

### exists

▸ **exists**(`name`): `Promise`\<`boolean`\>

Check if the stage exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | string |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/lib/stage/application/facade.ts:37](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L37)

___

### export

▸ **export**(`options?`): [`StageExport`](StageExport.md)

Export source entities related to the stage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

[`StageExport`](StageExport.md)

#### Defined in

[src/lib/stage/application/facade.ts:87](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L87)

___

### fetch

▸ **fetch**(`options?`): `Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

Fetch all mappings from the stage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

`Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Defined in

[src/lib/stage/application/facade.ts:107](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L107)

___

### import

▸ **import**(`options?`): [`StageImport`](StageImport.md)

Import data into source entities related to the stage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

[`StageImport`](StageImport.md)

#### Defined in

[src/lib/stage/application/facade.ts:97](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L97)

___

### incorporate

▸ **incorporate**(`data`, `name`, `options?`): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

Update and Push Schema and import data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | any\|any[] |
| `name` | `string` | string |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Defined in

[src/lib/stage/application/facade.ts:144](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L144)

___

### introspect

▸ **introspect**(`data`, `name`, `options?`): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

Update and Push Schema with data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | any\|any[] |
| `name` | `string` | string |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Defined in

[src/lib/stage/application/facade.ts:131](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L131)

___

### pull

▸ **pull**(`options?`): `Promise`\<`void`\>

Pull the stage with the sources

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`StagePullOptions`](../interfaces/StagePullOptions.md) | StagePullOptions |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/stage/application/facade.ts:117](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L117)

___

### push

▸ **push**(`options?`): [`StageActionDDL`](StageActionDDL.md)

Push the stage with sources

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Defined in

[src/lib/stage/application/facade.ts:47](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L47)

___

### truncate

▸ **truncate**(`options?`): [`StageActionDDL`](StageActionDDL.md)

Truncate source entities related to the stage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | QueryOptions |

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Defined in

[src/lib/stage/application/facade.ts:67](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/stage/application/facade.ts#L67)
