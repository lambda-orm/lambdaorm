[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ExpressionFacade

# Class: ExpressionFacade

[manager](../modules/manager.md).ExpressionFacade

Expression Manager

## Table of contents

### Constructors

- [constructor](manager.ExpressionFacade.md#constructor)

### Properties

- [expression](manager.ExpressionFacade.md#expression)

### Methods

- [complete](manager.ExpressionFacade.md#complete)
- [eval](manager.ExpressionFacade.md#eval)
- [execute](manager.ExpressionFacade.md#execute)
- [metadata](manager.ExpressionFacade.md#metadata)
- [model](manager.ExpressionFacade.md#model)
- [parameters](manager.ExpressionFacade.md#parameters)
- [sentence](manager.ExpressionFacade.md#sentence)

## Constructors

### constructor

• **new ExpressionFacade**(`expressionManager`, `executor`, `configManager`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `executor` | [`Executor`](manager.Executor.md) |
| `configManager` | [`ConfigManager`](manager.ConfigManager.md) |
| `expression` | `string` |

#### Defined in

[manager/expressionFacade.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L13)

## Properties

### expression

• **expression**: `string`

#### Defined in

[manager/expressionFacade.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L11)

## Methods

### complete

▸ **complete**(`database?`): `string`

Complete expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `database?` | `string` |

#### Returns

`string`

Expression complete

#### Defined in

[manager/expressionFacade.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L25)

___

### eval

▸ **eval**(`dataContext`, `database?`): `Promise`<`any`\>

Evaluate and solve expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataContext` | `any` |
| `database?` | `string` |

#### Returns

`Promise`<`any`\>

Result of the evaluale expression

#### Defined in

[manager/expressionFacade.ts:67](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L67)

___

### execute

▸ **execute**(`dataContext?`, `database?`): `Promise`<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataContext` | `any` | - |
| `database?` | `string` | Database name |

#### Returns

`Promise`<`any`\>

Result of execution

#### Defined in

[manager/expressionFacade.ts:77](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L77)

___

### metadata

▸ **metadata**(`database?`): `Promise`<`any`\>

Get metadata of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `database?` | `string` |

#### Returns

`Promise`<`any`\>

metadata of expression

#### Defined in

[manager/expressionFacade.ts:56](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L56)

___

### model

▸ **model**(`database?`): `Promise`<`any`\>

Get model of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `database?` | `string` |

#### Returns

`Promise`<`any`\>

Model of expression

#### Defined in

[manager/expressionFacade.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L34)

___

### parameters

▸ **parameters**(`database?`): `Promise`<`any`\>

Get parameters of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `database?` | `string` |

#### Returns

`Promise`<`any`\>

Parameters of expression

#### Defined in

[manager/expressionFacade.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L43)

___

### sentence

▸ **sentence**(`database?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `database?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[manager/expressionFacade.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionFacade.ts#L47)
