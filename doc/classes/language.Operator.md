[Lambda ORM](../README.md) / [language](../modules/language.md) / Operator

# Class: Operator

[language](../modules/language.md).Operator

## Hierarchy

- [`Operand`](language.Operand.md)

  ↳ **`Operator`**

## Table of contents

### Constructors

- [constructor](language.Operator.md#constructor)

### Properties

- [children](language.Operator.md#children)
- [id](language.Operator.md#id)
- [index](language.Operator.md#index)
- [level](language.Operator.md#level)
- [metadata](language.Operator.md#metadata)
- [name](language.Operator.md#name)
- [parent](language.Operator.md#parent)
- [type](language.Operator.md#type)

### Methods

- [clone](language.Operator.md#clone)
- [eval](language.Operator.md#eval)
- [set](language.Operator.md#set)

## Constructors

### constructor

• **new Operator**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](language.Operand.md)[] | `[]` |
| `type` | `string` | `'any'` |

#### Inherited from

[Operand](language.Operand.md).[constructor](language.Operand.md#constructor)

#### Defined in

[language/operands.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L15)

## Properties

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Inherited from

[Operand](language.Operand.md).[children](language.Operand.md#children)

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L14)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Operand](language.Operand.md).[id](language.Operand.md#id)

#### Defined in

[language/operands.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L10)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[Operand](language.Operand.md).[index](language.Operand.md#index)

#### Defined in

[language/operands.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L12)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[Operand](language.Operand.md).[level](language.Operand.md#level)

#### Defined in

[language/operands.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L13)

___

### metadata

• `Optional` **metadata**: `OperandMetadata`

#### Defined in

[language/operands.ts:130](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L130)

___

### name

• **name**: `string`

#### Inherited from

[Operand](language.Operand.md).[name](language.Operand.md#name)

#### Defined in

[language/operands.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L8)

___

### parent

• `Optional` **parent**: [`Operand`](language.Operand.md)

#### Inherited from

[Operand](language.Operand.md).[parent](language.Operand.md#parent)

#### Defined in

[language/operands.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L11)

___

### type

• **type**: `string`

#### Inherited from

[Operand](language.Operand.md).[type](language.Operand.md#type)

#### Defined in

[language/operands.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L9)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[Operand](language.Operand.md).[clone](language.Operand.md#clone)

#### Defined in

[language/operands.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L25)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](language.Operand.md).[eval](language.Operand.md#eval)

#### Defined in

[language/operands.ts:131](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L131)

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

[language/operands.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L40)
