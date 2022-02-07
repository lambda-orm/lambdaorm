[Lambda ORM](../README.md) / [language](../modules/language.md) / OperandManager

# Class: OperandManager

[language](../modules/language.md).OperandManager

## Table of contents

### Constructors

- [constructor](language.OperandManager.md#constructor)

### Methods

- [build](language.OperandManager.md#build)
- [deserialize](language.OperandManager.md#deserialize)
- [eval](language.OperandManager.md#eval)
- [model](language.OperandManager.md#model)
- [parameters](language.OperandManager.md#parameters)
- [serialize](language.OperandManager.md#serialize)

## Constructors

### constructor

• **new OperandManager**(`modelConfig`, `expressionConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelConfig` | [`ModelConfig`](manager.ModelConfig.md) |
| `expressionConfig` | `ExpressionConfig` |

#### Defined in

[src/lib/operand/operandManager.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/operand/operandManager.ts#L40)

## Methods

### build

▸ **build**(`node`): [`Sentence`](language.Sentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

[`Sentence`](language.Sentence.md)

#### Defined in

[src/lib/operand/operandManager.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/operand/operandManager.ts#L45)

___

### deserialize

▸ **deserialize**(`serialized`): `Operand`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serialized` | `any` |

#### Returns

`Operand`

#### Defined in

[src/lib/operand/operandManager.ts:120](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/operand/operandManager.ts#L120)

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

[src/lib/operand/operandManager.ts:124](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/operand/operandManager.ts#L124)

___

### model

▸ **model**(`sentence`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](language.Sentence.md) |

#### Returns

`any`

#### Defined in

[src/lib/operand/operandManager.ts:56](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/operand/operandManager.ts#L56)

___

### parameters

▸ **parameters**(`sentence`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](language.Sentence.md) |

#### Returns

`any`

#### Defined in

[src/lib/operand/operandManager.ts:77](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/operand/operandManager.ts#L77)

___

### serialize

▸ **serialize**(`operand`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | `Operand` |

#### Returns

`any`

#### Defined in

[src/lib/operand/operandManager.ts:95](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/operand/operandManager.ts#L95)
