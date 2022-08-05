[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ExpressionManager

# Class: ExpressionManager

[manager](../modules/manager.md).ExpressionManager

## Table of contents

### Constructors

- [constructor](manager.ExpressionManager.md#constructor)

### Methods

- [constraints](manager.ExpressionManager.md#constraints)
- [metadata](manager.ExpressionManager.md#metadata)
- [model](manager.ExpressionManager.md#model)
- [normalize](manager.ExpressionManager.md#normalize)
- [parameters](manager.ExpressionManager.md#parameters)
- [sentence](manager.ExpressionManager.md#sentence)
- [toExpression](manager.ExpressionManager.md#toexpression)
- [toOperand](manager.ExpressionManager.md#tooperand)
- [toQuery](manager.ExpressionManager.md#toquery)

## Constructors

### constructor

• **new ExpressionManager**(`cache`, `schema`, `languages`, `expressions`, `routing`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | `Cache` |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |
| `languages` | [`Languages`](manager.Languages.md) |
| `expressions` | `Expressions` |
| `routing` | [`Routing`](manager.Routing.md) |

#### Defined in

[src/lib/manager/expressionManager.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L16)

## Methods

### constraints

▸ **constraints**(`expression`): [`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)

Get constraints of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)

constraints

#### Defined in

[src/lib/manager/expressionManager.ts:162](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L162)

___

### metadata

▸ **metadata**(`expression`): [`Metadata`](../interfaces/model.Metadata.md)

Get metadata of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`Metadata`](../interfaces/model.Metadata.md)

metadata of expression

#### Defined in

[src/lib/manager/expressionManager.ts:197](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L197)

___

### model

▸ **model**(`expression`): [`MetadataModel`](../interfaces/model.MetadataModel.md)[]

Get model of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`MetadataModel`](../interfaces/model.MetadataModel.md)[]

Model of expression

#### Defined in

[src/lib/manager/expressionManager.ts:152](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L152)

___

### normalize

▸ **normalize**(`expression`): `string`

normalize the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a normalized expression from a expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression that can be simplified |

#### Returns

`string`

full expression

#### Defined in

[src/lib/manager/expressionManager.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L32)

___

### parameters

▸ **parameters**(`expression`): [`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]

Parameters of expression

#### Defined in

[src/lib/manager/expressionManager.ts:172](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L172)

___

### sentence

▸ **sentence**(`expression`, `options`): [`MetadataSentence`](../interfaces/model.MetadataSentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Returns

[`MetadataSentence`](../interfaces/model.MetadataSentence.md)

#### Defined in

[src/lib/manager/expressionManager.ts:177](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L177)

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

[src/lib/manager/expressionManager.ts:124](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L124)

___

### toOperand

▸ **toOperand**(`expression`): `Operand`

Build expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression to build |

#### Returns

`Operand`

Operand

#### Defined in

[src/lib/manager/expressionManager.ts:48](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L48)

___

### toQuery

▸ **toQuery**(`expression`, `options`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/expressionManager.ts:64](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/expressionManager.ts#L64)
