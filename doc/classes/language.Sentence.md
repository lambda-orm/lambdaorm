[Lambda ORM](../README.md) / [language](../modules/language.md) / Sentence

# Class: Sentence

[language](../modules/language.md).Sentence

## Hierarchy

- [`Operand`](language.Operand.md)

  ↳ **`Sentence`**

## Table of contents

### Constructors

- [constructor](language.Sentence.md#constructor)

### Properties

- [alias](language.Sentence.md#alias)
- [children](language.Sentence.md#children)
- [clause](language.Sentence.md#clause)
- [columns](language.Sentence.md#columns)
- [entity](language.Sentence.md#entity)
- [id](language.Sentence.md#id)
- [index](language.Sentence.md#index)
- [level](language.Sentence.md#level)
- [name](language.Sentence.md#name)
- [parameters](language.Sentence.md#parameters)
- [parent](language.Sentence.md#parent)
- [type](language.Sentence.md#type)

### Methods

- [clone](language.Sentence.md#clone)
- [eval](language.Sentence.md#eval)
- [getIncludes](language.Sentence.md#getincludes)
- [set](language.Sentence.md#set)

## Constructors

### constructor

• **new Sentence**(`name`, `children?`, `entity`, `alias`, `columns?`, `parameters?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](language.Operand.md)[] | `[]` |
| `entity` | `string` | `undefined` |
| `alias` | `string` | `undefined` |
| `columns` | [`Property`](../interfaces/model.Property.md)[] | `[]` |
| `parameters` | [`Parameter`](../interfaces/model.Parameter.md)[] | `[]` |

#### Overrides

[Operand](language.Operand.md).[constructor](language.Operand.md#constructor)

#### Defined in

[language/operands.ts:211](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L211)

## Properties

### alias

• **alias**: `string`

#### Defined in

[language/operands.ts:209](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L209)

___

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Inherited from

[Operand](language.Operand.md).[children](language.Operand.md#children)

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L14)

___

### clause

• **clause**: `string`

#### Defined in

[language/operands.ts:210](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L210)

___

### columns

• **columns**: [`Property`](../interfaces/model.Property.md)[]

#### Defined in

[language/operands.ts:205](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L205)

___

### entity

• **entity**: `string`

#### Defined in

[language/operands.ts:207](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L207)

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

### parameters

• **parameters**: [`Parameter`](../interfaces/model.Parameter.md)[]

#### Defined in

[language/operands.ts:206](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L206)

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

[language/operands.ts:264](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L264)

___

### getIncludes

▸ **getIncludes**(): [`SentenceInclude`](language.SentenceInclude.md)[]

#### Returns

[`SentenceInclude`](language.SentenceInclude.md)[]

#### Defined in

[language/operands.ts:222](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L222)

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
