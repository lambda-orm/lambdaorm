[Lambda ORM](../README.md) / [language](../modules/language.md) / Query

# Class: Query

[language](../modules/language.md).Query

## Hierarchy

- [`Operand`](language.Operand.md)

  ↳ **`Query`**

## Table of contents

### Constructors

- [constructor](language.Query.md#constructor)

### Properties

- [autoincrement](language.Query.md#autoincrement)
- [children](language.Query.md#children)
- [columns](language.Query.md#columns)
- [dialect](language.Query.md#dialect)
- [entity](language.Query.md#entity)
- [id](language.Query.md#id)
- [index](language.Query.md#index)
- [level](language.Query.md#level)
- [name](language.Query.md#name)
- [parameters](language.Query.md#parameters)
- [parent](language.Query.md#parent)
- [sentence](language.Query.md#sentence)
- [type](language.Query.md#type)

### Methods

- [clone](language.Query.md#clone)
- [eval](language.Query.md#eval)
- [set](language.Query.md#set)

## Constructors

### constructor

• **new Query**(`name`, `children?`, `dialect`, `sentence`, `entity`, `autoincrement?`, `columns?`, `parameters?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](language.Operand.md)[] | `[]` |
| `dialect` | `string` | `undefined` |
| `sentence` | `string` | `undefined` |
| `entity` | `string` | `undefined` |
| `autoincrement?` | [`Property`](../interfaces/model.Property.md) | `undefined` |
| `columns` | [`Property`](../interfaces/model.Property.md)[] | `[]` |
| `parameters` | [`Parameter`](../interfaces/model.Parameter.md)[] | `[]` |

#### Overrides

[Operand](language.Operand.md).[constructor](language.Operand.md#constructor)

#### Defined in

[language/operands.ts:288](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L288)

## Properties

### autoincrement

• `Optional` **autoincrement**: [`Property`](../interfaces/model.Property.md)

#### Defined in

[language/operands.ts:285](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L285)

___

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Inherited from

[Operand](language.Operand.md).[children](language.Operand.md#children)

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L14)

___

### columns

• **columns**: [`Property`](../interfaces/model.Property.md)[]

#### Defined in

[language/operands.ts:286](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L286)

___

### dialect

• **dialect**: `string`

#### Defined in

[language/operands.ts:283](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L283)

___

### entity

• **entity**: `string`

#### Defined in

[language/operands.ts:284](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L284)

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

### name

• **name**: `string`

#### Inherited from

[Operand](language.Operand.md).[name](language.Operand.md#name)

#### Defined in

[language/operands.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L8)

___

### parameters

• **parameters**: [`Parameter`](../interfaces/model.Parameter.md)[]

#### Defined in

[language/operands.ts:287](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L287)

___

### parent

• `Optional` **parent**: [`Operand`](language.Operand.md)

#### Inherited from

[Operand](language.Operand.md).[parent](language.Operand.md#parent)

#### Defined in

[language/operands.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L11)

___

### sentence

• **sentence**: `string`

#### Defined in

[language/operands.ts:282](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L282)

___

### type

• **type**: `string`

#### Inherited from

[Operand](language.Operand.md).[type](language.Operand.md#type)

#### Defined in

[language/operands.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L9)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[Operand](language.Operand.md).[clone](language.Operand.md#clone)

#### Defined in

[language/operands.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L25)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](language.Operand.md).[eval](language.Operand.md#eval)

#### Defined in

[language/operands.ts:298](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L298)

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
