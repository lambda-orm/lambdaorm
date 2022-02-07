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

• **new ExpressionManager**(`cache`, `schema`, `languageManager`, `expressions`, `routing`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | `Cache` |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `expressions` | `Expressions` |
| `routing` | [`Routing`](manager.Routing.md) |

#### Defined in

[src/lib/manager/expressionManager.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L16)

## Methods

### complete

▸ **complete**(`expression`): `string`

complete the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a complete expression from a simplified expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression that can be simplified |

#### Returns

`string`

full expression

#### Defined in

[src/lib/manager/expressionManager.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L30)

___

### eval

▸ **eval**(`expression`, `data`): `Promise`<`any`\>

Evaluate and solve expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `data` | `any` | Data with variables |

#### Returns

`Promise`<`any`\>

Result of the evaluale expression

#### Defined in

[src/lib/manager/expressionManager.ts:111](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L111)

___

### metadata

▸ **metadata**(`expression`): `Promise`<`any`\>

Get metadata of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

`Promise`<`any`\>

metadata of expression

#### Defined in

[src/lib/manager/expressionManager.ts:147](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L147)

___

### model

▸ **model**(`expression`): `Promise`<`any`\>

Get model of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

`Promise`<`any`\>

Model of expression

#### Defined in

[src/lib/manager/expressionManager.ts:122](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L122)

___

### parameters

▸ **parameters**(`expression`): `Promise`<`any`\>

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

`Promise`<`any`\>

Parameters of expression

#### Defined in

[src/lib/manager/expressionManager.ts:132](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L132)

___

### sentence

▸ **sentence**(`expression`, `stage`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `stage` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/manager/expressionManager.ts:137](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L137)

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

[src/lib/manager/expressionManager.ts:86](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L86)

___

### toOperand

▸ **toOperand**(`expression`): `Promise`<`Operand`\>

Build expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression to build |

#### Returns

`Promise`<`Operand`\>

Operand

#### Defined in

[src/lib/manager/expressionManager.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L47)

___

### toQuery

▸ **toQuery**(`expression`, `stage`): `Promise`<[`Query`](model.Query.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `stage` | `string` |

#### Returns

`Promise`<[`Query`](model.Query.md)\>

#### Defined in

[src/lib/manager/expressionManager.ts:65](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/expressionManager.ts#L65)
