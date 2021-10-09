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
- [serialize](language.OperandManager.md#serialize)

## Constructors

### constructor

• **new OperandManager**(`language`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`LanguageManager`](language.LanguageManager.md) |

#### Defined in

[language/operandManager.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operandManager.ts#L45)

## Methods

### build

▸ **build**(`node`, `schema`): [`Sentence`](language.Sentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](parser.Node.md) |
| `schema` | [`SchemaHelper`](schema.SchemaHelper.md) |

#### Returns

[`Sentence`](language.Sentence.md)

#### Defined in

[language/operandManager.ts:49](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operandManager.ts#L49)

___

### deserialize

▸ **deserialize**(`serialized`): [`Operand`](language.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serialized` | `any` |

#### Returns

[`Operand`](language.Operand.md)

#### Defined in

[language/operandManager.ts:103](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operandManager.ts#L103)

___

### eval

▸ **eval**(`operand`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](language.Operand.md) |
| `context` | [`Context`](model.Context.md) |

#### Returns

`any`

#### Defined in

[language/operandManager.ts:107](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operandManager.ts#L107)

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

[language/operandManager.ts:60](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operandManager.ts#L60)

___

### serialize

▸ **serialize**(`operand`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](language.Operand.md) |

#### Returns

`any`

#### Defined in

[language/operandManager.ts:79](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operandManager.ts#L79)
