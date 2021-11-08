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

• **new OperandManager**(`language`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`LanguageManager`](language.LanguageManager.md) |

#### Defined in

[language/operandManager.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operandManager.ts#L45)

## Methods

### build

▸ **build**(`node`, `schema`): [`Sentence`](language.Sentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](parser.Node.md) |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |

#### Returns

[`Sentence`](language.Sentence.md)

#### Defined in

[language/operandManager.ts:49](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operandManager.ts#L49)

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

[language/operandManager.ts:123](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operandManager.ts#L123)

___

### eval

▸ **eval**(`operand`, `dataContext`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](language.Operand.md) |
| `dataContext` | [`DataContext`](model.DataContext.md) |

#### Returns

`any`

#### Defined in

[language/operandManager.ts:127](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operandManager.ts#L127)

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

[language/operandManager.ts:60](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operandManager.ts#L60)

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

[language/operandManager.ts:81](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operandManager.ts#L81)

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

[language/operandManager.ts:99](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operandManager.ts#L99)
