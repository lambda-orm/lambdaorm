[Lambda ORM](../README.md) / [manager](../modules/manager.md) / DatabaseFacade

# Class: DatabaseFacade

[manager](../modules/manager.md).DatabaseFacade

## Table of contents

### Constructors

- [constructor](manager.DatabaseFacade.md#constructor)

### Methods

- [clean](manager.DatabaseFacade.md#clean)
- [exists](manager.DatabaseFacade.md#exists)
- [export](manager.DatabaseFacade.md#export)
- [import](manager.DatabaseFacade.md#import)
- [sync](manager.DatabaseFacade.md#sync)
- [truncate](manager.DatabaseFacade.md#truncate)

## Constructors

### constructor

• **new DatabaseFacade**(`configManager`, `expressionManager`, `languageManager`, `executor`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configManager` | [`ConfigManager`](manager.ConfigManager.md) |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `executor` | [`Executor`](manager.Executor.md) |

#### Defined in

[manager/databaseFacade.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/databaseFacade.ts#L18)

## Methods

### clean

▸ **clean**(`name`): `DatabaseClean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`DatabaseClean`

#### Defined in

[manager/databaseFacade.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/databaseFacade.ts#L39)

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

[manager/databaseFacade.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/databaseFacade.ts#L26)

___

### export

▸ **export**(`name`): `DatabaseExport`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`DatabaseExport`

#### Defined in

[manager/databaseFacade.ts:55](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/databaseFacade.ts#L55)

___

### import

▸ **import**(`name`): `DatabaseImport`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`DatabaseImport`

#### Defined in

[manager/databaseFacade.ts:63](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/databaseFacade.ts#L63)

___

### sync

▸ **sync**(`name`): `DatabaseSync`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`DatabaseSync`

#### Defined in

[manager/databaseFacade.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/databaseFacade.ts#L31)

___

### truncate

▸ **truncate**(`name`): `DatabaseClean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`DatabaseClean`

#### Defined in

[manager/databaseFacade.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/databaseFacade.ts#L47)
