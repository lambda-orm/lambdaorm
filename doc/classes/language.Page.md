[Lambda ORM](../README.md) / [language](../modules/language.md) / Page

# Class: Page

[language](../modules/language.md).Page

## Hierarchy

- [`ChildFunction`](language.ChildFunction.md)

  ↳ **`Page`**

## Table of contents

### Constructors

- [constructor](language.Page.md#constructor)

### Properties

- [children](language.Page.md#children)
- [context](language.Page.md#context)
- [id](language.Page.md#id)
- [index](language.Page.md#index)
- [level](language.Page.md#level)
- [metadata](language.Page.md#metadata)
- [name](language.Page.md#name)
- [parent](language.Page.md#parent)
- [type](language.Page.md#type)

### Methods

- [clone](language.Page.md#clone)
- [eval](language.Page.md#eval)
- [set](language.Page.md#set)

## Constructors

### constructor

• **new Page**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](language.Operand.md)[] | `[]` |
| `type` | `string` | `'any'` |

#### Inherited from

[ChildFunction](language.ChildFunction.md).[constructor](language.ChildFunction.md#constructor)

#### Defined in

[language/operands.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L15)

## Properties

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Inherited from

[ChildFunction](language.ChildFunction.md).[children](language.ChildFunction.md#children)

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L14)

___

### context

• `Optional` **context**: [`Context`](model.Context.md)

#### Inherited from

[ChildFunction](language.ChildFunction.md).[context](language.ChildFunction.md#context)

#### Defined in

[language/operands.ts:165](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L165)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[ChildFunction](language.ChildFunction.md).[id](language.ChildFunction.md#id)

#### Defined in

[language/operands.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L10)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[ChildFunction](language.ChildFunction.md).[index](language.ChildFunction.md#index)

#### Defined in

[language/operands.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L12)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[ChildFunction](language.ChildFunction.md).[level](language.ChildFunction.md#level)

#### Defined in

[language/operands.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L13)

___

### metadata

• `Optional` **metadata**: `OperandMetadata`

#### Inherited from

[ChildFunction](language.ChildFunction.md).[metadata](language.ChildFunction.md#metadata)

#### Defined in

[language/operands.ts:147](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L147)

___

### name

• **name**: `string`

#### Inherited from

[ChildFunction](language.ChildFunction.md).[name](language.ChildFunction.md#name)

#### Defined in

[language/operands.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L8)

___

### parent

• `Optional` **parent**: [`Operand`](language.Operand.md)

#### Inherited from

[ChildFunction](language.ChildFunction.md).[parent](language.ChildFunction.md#parent)

#### Defined in

[language/operands.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L11)

___

### type

• **type**: `string`

#### Inherited from

[ChildFunction](language.ChildFunction.md).[type](language.ChildFunction.md#type)

#### Defined in

[language/operands.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L9)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[ChildFunction](language.ChildFunction.md).[clone](language.ChildFunction.md#clone)

#### Defined in

[language/operands.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L25)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Inherited from

[ChildFunction](language.ChildFunction.md).[eval](language.ChildFunction.md#eval)

#### Defined in

[language/operands.ts:148](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L148)

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

[ChildFunction](language.ChildFunction.md).[set](language.ChildFunction.md#set)

#### Defined in

[language/operands.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L40)
