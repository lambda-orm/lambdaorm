[Lambda ORM](../README.md) / [language](../modules/language.md) / Include

# Class: Include

[language](../modules/language.md).Include

## Hierarchy

- [`Operand`](language.Operand.md)

  ↳ **`Include`**

## Table of contents

### Constructors

- [constructor](language.Include.md#constructor)

### Properties

- [children](language.Include.md#children)
- [id](language.Include.md#id)
- [index](language.Include.md#index)
- [level](language.Include.md#level)
- [name](language.Include.md#name)
- [parent](language.Include.md#parent)
- [relation](language.Include.md#relation)
- [type](language.Include.md#type)

### Methods

- [clone](language.Include.md#clone)
- [eval](language.Include.md#eval)
- [set](language.Include.md#set)

## Constructors

### constructor

• **new Include**(`name`, `children?`, `relation`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](language.Operand.md)[] | `[]` |
| `relation` | `any` | `undefined` |

#### Overrides

[Operand](language.Operand.md).[constructor](language.Operand.md#constructor)

#### Defined in

[language/operands.ts:306](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L306)

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

### relation

• **relation**: `any`

#### Defined in

[language/operands.ts:303](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L303)

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

[language/operands.ts:312](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/operands.ts#L312)

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
