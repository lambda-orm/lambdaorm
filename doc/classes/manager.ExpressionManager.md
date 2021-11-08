[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ExpressionManager

# Class: ExpressionManager

[manager](../modules/manager.md).ExpressionManager

## Table of contents

### Constructors

- [constructor](manager.ExpressionManager.md#constructor)

### Methods

- [complete](manager.ExpressionManager.md#complete)
- [eval](manager.ExpressionManager.md#eval)
- [metadata](manager.ExpressionManager.md#metadata)
- [model](manager.ExpressionManager.md#model)
- [parameters](manager.ExpressionManager.md#parameters)
- [sentence](manager.ExpressionManager.md#sentence)
- [toExpression](manager.ExpressionManager.md#toexpression)
- [toOperand](manager.ExpressionManager.md#tooperand)
- [toQuery](manager.ExpressionManager.md#toquery)

## Constructors

### constructor

• **new ExpressionManager**(`cache`, `configManager`, `languageManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | [`Cache`](../interfaces/model.Cache.md) |
| `configManager` | [`ConfigManager`](manager.ConfigManager.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |

#### Defined in

[manager/expressionManager.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L16)

## Methods

### complete

▸ **complete**(`expression`, `database?`): `string`

complete the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a complete expression from a simplified expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression that can be simplified |
| `database?` | `string` | - |

#### Returns

`string`

full expression

#### Defined in

[manager/expressionManager.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L32)

___

### eval

▸ **eval**(`expression`, `dataContext`, `database?`): `Promise`<`any`\>

Evaluate and solve expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `dataContext` | `any` | - |
| `database?` | `string` | - |

#### Returns

`Promise`<`any`\>

Result of the evaluale expression

#### Defined in

[manager/expressionManager.ts:121](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L121)

___

### metadata

▸ **metadata**(`expression`, `database?`): `Promise`<`any`\>

Get metadata of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `database?` | `string` |

#### Returns

`Promise`<`any`\>

metadata of expression

#### Defined in

[manager/expressionManager.ts:157](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L157)

___

### model

▸ **model**(`expression`, `database?`): `Promise`<`any`\>

Get model of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `database?` | `string` |

#### Returns

`Promise`<`any`\>

Model of expression

#### Defined in

[manager/expressionManager.ts:132](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L132)

___

### parameters

▸ **parameters**(`expression`, `database?`): `Promise`<`any`\>

Get parameters of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `database?` | `string` |

#### Returns

`Promise`<`any`\>

Parameters of expression

#### Defined in

[manager/expressionManager.ts:142](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L142)

___

### sentence

▸ **sentence**(`expression`, `database?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `database?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[manager/expressionManager.ts:147](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L147)

___

### toExpression

▸ **toExpression**(`func`): `string`

Read lambda expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `Function` | lambda expression |

#### Returns

`string`

String expression

#### Defined in

[manager/expressionManager.ts:95](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L95)

___

### toOperand

▸ **toOperand**(`expression`, `database?`): `Promise`<[`Operand`](language.Operand.md)\>

Build expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression to build |
| `database?` | `string` | - |

#### Returns

`Promise`<[`Operand`](language.Operand.md)\>

Operand

#### Defined in

[manager/expressionManager.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L52)

___

### toQuery

▸ **toQuery**(`expression`, `database?`): `Promise`<[`Query`](model.Query.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `database?` | `string` |

#### Returns

`Promise`<[`Query`](model.Query.md)\>

#### Defined in

[manager/expressionManager.ts:72](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/expressionManager.ts#L72)
