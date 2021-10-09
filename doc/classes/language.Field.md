[Lambda ORM](../README.md) / [language](../modules/language.md) / Field

# Class: Field

[language](../modules/language.md).Field

## Hierarchy

- [`Operand`](language.Operand.md)

  ↳ **`Field`**

## Table of contents

### Constructors

- [constructor](language.Field.md#constructor)

### Properties

- [children](language.Field.md#children)
- [entity](language.Field.md#entity)
- [id](language.Field.md#id)
- [index](language.Field.md#index)
- [level](language.Field.md#level)
- [mapping](language.Field.md#mapping)
- [name](language.Field.md#name)
- [parent](language.Field.md#parent)
- [type](language.Field.md#type)

### Methods

- [clone](language.Field.md#clone)
- [eval](language.Field.md#eval)
- [set](language.Field.md#set)

## Constructors

### constructor

• **new Field**(`entity`, `name`, `type`, `mapping`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `name` | `string` |
| `type` | `string` |
| `mapping` | `string` |

#### Overrides

[Operand](language.Operand.md).[constructor](language.Operand.md#constructor)

#### Defined in

[language/operands.ts:81](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L81)

## Properties

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Inherited from

[Operand](language.Operand.md).[children](language.Operand.md#children)

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L14)

___

### entity

• **entity**: `string`

#### Defined in

[language/operands.ts:79](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L79)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Operand](language.Operand.md).[id](language.Operand.md#id)

#### Defined in

[language/operands.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L10)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[Operand](language.Operand.md).[index](language.Operand.md#index)

#### Defined in

[language/operands.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L12)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[Operand](language.Operand.md).[level](language.Operand.md#level)

#### Defined in

[language/operands.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L13)

___

### mapping

• **mapping**: `string`

#### Defined in

[language/operands.ts:80](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L80)

___

### name

• **name**: `string`

#### Inherited from

[Operand](language.Operand.md).[name](language.Operand.md#name)

#### Defined in

[language/operands.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L8)

___

### parent

• `Optional` **parent**: [`Operand`](language.Operand.md)

#### Inherited from

[Operand](language.Operand.md).[parent](language.Operand.md#parent)

#### Defined in

[language/operands.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L11)

___

### type

• **type**: `string`

#### Inherited from

[Operand](language.Operand.md).[type](language.Operand.md#type)

#### Defined in

[language/operands.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L9)

## Methods

### clone

▸ **clone**(): [`Field`](language.Field.md)

#### Returns

[`Field`](language.Field.md)

#### Overrides

[Operand](language.Operand.md).[clone](language.Operand.md#clone)

#### Defined in

[language/operands.ts:87](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L87)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](language.Operand.md).[eval](language.Operand.md#eval)

#### Defined in

[language/operands.ts:91](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L91)

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

[language/operands.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L40)
