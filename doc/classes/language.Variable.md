[Lambda ORM](../README.md) / [language](../modules/language.md) / Variable

# Class: Variable

[language](../modules/language.md).Variable

## Hierarchy

- [`Operand`](language.Operand.md)

  ↳ **`Variable`**

## Table of contents

### Constructors

- [constructor](language.Variable.md#constructor)

### Properties

- [children](language.Variable.md#children)
- [context](language.Variable.md#context)
- [id](language.Variable.md#id)
- [index](language.Variable.md#index)
- [level](language.Variable.md#level)
- [name](language.Variable.md#name)
- [number](language.Variable.md#number)
- [parent](language.Variable.md#parent)
- [type](language.Variable.md#type)

### Methods

- [clone](language.Variable.md#clone)
- [eval](language.Variable.md#eval)
- [set](language.Variable.md#set)

## Constructors

### constructor

• **new Variable**(`name`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `type` | `string` | `'any'` |

#### Overrides

[Operand](language.Operand.md).[constructor](language.Operand.md#constructor)

#### Defined in

[language/operands.ts:64](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L64)

## Properties

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Inherited from

[Operand](language.Operand.md).[children](language.Operand.md#children)

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L14)

___

### context

• `Optional` **context**: [`Context`](model.Context.md)

#### Defined in

[language/operands.ts:62](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L62)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Operand](language.Operand.md).[id](language.Operand.md#id)

#### Defined in

[language/operands.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L10)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[Operand](language.Operand.md).[index](language.Operand.md#index)

#### Defined in

[language/operands.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L12)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[Operand](language.Operand.md).[level](language.Operand.md#level)

#### Defined in

[language/operands.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L13)

___

### name

• **name**: `string`

#### Inherited from

[Operand](language.Operand.md).[name](language.Operand.md#name)

#### Defined in

[language/operands.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L8)

___

### number

• `Optional` **number**: `number`

#### Defined in

[language/operands.ts:63](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L63)

___

### parent

• `Optional` **parent**: [`Operand`](language.Operand.md)

#### Inherited from

[Operand](language.Operand.md).[parent](language.Operand.md#parent)

#### Defined in

[language/operands.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L11)

___

### type

• **type**: `string`

#### Inherited from

[Operand](language.Operand.md).[type](language.Operand.md#type)

#### Defined in

[language/operands.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L9)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[Operand](language.Operand.md).[clone](language.Operand.md#clone)

#### Defined in

[language/operands.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L25)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](language.Operand.md).[eval](language.Operand.md#eval)

#### Defined in

[language/operands.ts:74](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L74)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Overrides

[Operand](language.Operand.md).[set](language.Operand.md#set)

#### Defined in

[language/operands.ts:70](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/language/operands.ts#L70)
