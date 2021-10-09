[Lambda ORM](../README.md) / [language](../modules/language.md) / Operand

# Class: Operand

[language](../modules/language.md).Operand

## Hierarchy

- **`Operand`**

  ↳ [`Constant`](language.Constant.md)

  ↳ [`Variable`](language.Variable.md)

  ↳ [`Field`](language.Field.md)

  ↳ [`KeyValue`](language.KeyValue.md)

  ↳ [`List`](language.List.md)

  ↳ [`Obj`](language.Obj.md)

  ↳ [`Operator`](language.Operator.md)

  ↳ [`FunctionRef`](language.FunctionRef.md)

  ↳ [`Block`](language.Block.md)

  ↳ [`From`](language.From.md)

  ↳ [`Join`](language.Join.md)

  ↳ [`Sentence`](language.Sentence.md)

  ↳ [`SentenceInclude`](language.SentenceInclude.md)

  ↳ [`Query`](language.Query.md)

  ↳ [`Include`](language.Include.md)

## Table of contents

### Constructors

- [constructor](language.Operand.md#constructor)

### Properties

- [children](language.Operand.md#children)
- [id](language.Operand.md#id)
- [index](language.Operand.md#index)
- [level](language.Operand.md#level)
- [name](language.Operand.md#name)
- [parent](language.Operand.md#parent)
- [type](language.Operand.md#type)

### Methods

- [clone](language.Operand.md#clone)
- [eval](language.Operand.md#eval)
- [set](language.Operand.md#set)

## Constructors

### constructor

• **new Operand**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](language.Operand.md)[] | `[]` |
| `type` | `string` | `'any'` |

#### Defined in

[language/operands.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L15)

## Properties

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L14)

___

### id

• `Optional` **id**: `string`

#### Defined in

[language/operands.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L10)

___

### index

• `Optional` **index**: `number`

#### Defined in

[language/operands.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L12)

___

### level

• `Optional` **level**: `number`

#### Defined in

[language/operands.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L13)

___

### name

• **name**: `string`

#### Defined in

[language/operands.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L8)

___

### parent

• `Optional` **parent**: [`Operand`](language.Operand.md)

#### Defined in

[language/operands.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L11)

___

### type

• **type**: `string`

#### Defined in

[language/operands.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L9)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Defined in

[language/operands.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L25)

___

### eval

▸ `Abstract` **eval**(): `any`

#### Returns

`any`

#### Defined in

[language/operands.ts:41](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L41)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[language/operands.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/language/operands.ts#L40)
