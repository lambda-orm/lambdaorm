[Lambda ORM](../README.md) / [manager](../modules/manager.md) / OperandManager

# Class: OperandManager

[manager](../modules/manager.md).OperandManager

## Table of contents

### Constructors

- [constructor](manager.OperandManager.md#constructor)

### Methods

- [build](manager.OperandManager.md#build)
- [clone](manager.OperandManager.md#clone)
- [constraints](manager.OperandManager.md#constraints)
- [deserialize](manager.OperandManager.md#deserialize)
- [eval](manager.OperandManager.md#eval)
- [model](manager.OperandManager.md#model)
- [parameters](manager.OperandManager.md#parameters)
- [serialize](manager.OperandManager.md#serialize)

## Constructors

### constructor

• **new OperandManager**(`modelConfig`, `expressionConfig`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelConfig` | [`ModelConfig`](manager.ModelConfig.md) |
| `expressionConfig` | `ExpressionConfig` |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/manager/operandManager.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L43)

## Methods

### build

▸ **build**(`node`): [`Sentence`](model.Sentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

[`Sentence`](model.Sentence.md)

#### Defined in

[src/lib/manager/operandManager.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L49)

___

### clone

▸ **clone**(`value`): `Operand`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Operand` |

#### Returns

`Operand`

#### Defined in

[src/lib/manager/operandManager.ts:106](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L106)

___

### constraints

▸ **constraints**(`sentence`): [`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](model.Sentence.md) |

#### Returns

[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)

#### Defined in

[src/lib/manager/operandManager.ts:92](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L92)

___

### deserialize

▸ **deserialize**(`value`): `Operand`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Operand`

#### Defined in

[src/lib/manager/operandManager.ts:114](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L114)

___

### eval

▸ **eval**(`operand`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | `Operand` |
| `data` | [`Data`](model.Data.md) |

#### Returns

`any`

#### Defined in

[src/lib/manager/operandManager.ts:263](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L263)

___

### model

▸ **model**(`sentence`): [`MetadataModel`](../interfaces/model.MetadataModel.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](model.Sentence.md) |

#### Returns

[`MetadataModel`](../interfaces/model.MetadataModel.md)[]

#### Defined in

[src/lib/manager/operandManager.ts:55](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L55)

___

### parameters

▸ **parameters**(`sentence`): [`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](model.Sentence.md) |

#### Returns

[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]

#### Defined in

[src/lib/manager/operandManager.ts:73](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L73)

___

### serialize

▸ **serialize**(`operand`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | `Operand` |

#### Returns

`string`

#### Defined in

[src/lib/manager/operandManager.ts:110](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/operandManager.ts#L110)
