[Lambda ORM](../README.md) / [language](../modules/language.md) / Constant

# Class: Constant

[language](../modules/language.md).Constant

## Hierarchy

- [`Operand`](language.Operand.md)

  ↳ **`Constant`**

## Table of contents

### Constructors

- [constructor](language.Constant.md#constructor)

### Properties

- [children](language.Constant.md#children)
- [id](language.Constant.md#id)
- [index](language.Constant.md#index)
- [level](language.Constant.md#level)
- [name](language.Constant.md#name)
- [parent](language.Constant.md#parent)
- [type](language.Constant.md#type)

### Methods

- [clone](language.Constant.md#clone)
- [eval](language.Constant.md#eval)
- [set](language.Constant.md#set)

## Constructors

### constructor

• **new Constant**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Overrides

[Operand](language.Operand.md).[constructor](language.Operand.md#constructor)

#### Defined in

[language/operands.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L44)

## Properties

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Inherited from

[Operand](language.Operand.md).[children](language.Operand.md#children)

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L14)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Operand](language.Operand.md).[id](language.Operand.md#id)

#### Defined in

[language/operands.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L10)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[Operand](language.Operand.md).[index](language.Operand.md#index)

#### Defined in

[language/operands.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L12)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[Operand](language.Operand.md).[level](language.Operand.md#level)

#### Defined in

[language/operands.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L13)

___

### name

• **name**: `string`

#### Inherited from

[Operand](language.Operand.md).[name](language.Operand.md#name)

#### Defined in

[language/operands.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L8)

___

### parent

• `Optional` **parent**: [`Operand`](language.Operand.md)

#### Inherited from

[Operand](language.Operand.md).[parent](language.Operand.md#parent)

#### Defined in

[language/operands.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L11)

___

### type

• **type**: `string`

#### Inherited from

[Operand](language.Operand.md).[type](language.Operand.md#type)

#### Defined in

[language/operands.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L9)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[Operand](language.Operand.md).[clone](language.Operand.md#clone)

#### Defined in

[language/operands.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L25)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](language.Operand.md).[eval](language.Operand.md#eval)

#### Defined in

[language/operands.ts:48](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L48)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Inherited from

[Operand](language.Operand.md).[set](language.Operand.md#set)

#### Defined in

[language/operands.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L40)
