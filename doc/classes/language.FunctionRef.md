[Lambda ORM](../README.md) / [language](../modules/language.md) / FunctionRef

# Class: FunctionRef

[language](../modules/language.md).FunctionRef

## Hierarchy

- [`Operand`](language.Operand.md)

  ↳ **`FunctionRef`**

  ↳↳ [`ChildFunction`](language.ChildFunction.md)

  ↳↳ [`ArrowFunction`](language.ArrowFunction.md)

## Table of contents

### Constructors

- [constructor](language.FunctionRef.md#constructor)

### Properties

- [children](language.FunctionRef.md#children)
- [id](language.FunctionRef.md#id)
- [index](language.FunctionRef.md#index)
- [level](language.FunctionRef.md#level)
- [metadata](language.FunctionRef.md#metadata)
- [name](language.FunctionRef.md#name)
- [parent](language.FunctionRef.md#parent)
- [type](language.FunctionRef.md#type)

### Methods

- [clone](language.FunctionRef.md#clone)
- [eval](language.FunctionRef.md#eval)
- [set](language.FunctionRef.md#set)

## Constructors

### constructor

• **new FunctionRef**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](language.Operand.md)[] | `[]` |
| `type` | `string` | `'any'` |

#### Inherited from

[Operand](language.Operand.md).[constructor](language.Operand.md#constructor)

#### Defined in

[language/operands.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L15)

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

### metadata

• `Optional` **metadata**: `OperandMetadata`

#### Defined in

[language/operands.ts:147](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L147)

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

[language/operands.ts:148](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L148)

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
