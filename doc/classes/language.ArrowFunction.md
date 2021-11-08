[Lambda ORM](../README.md) / [language](../modules/language.md) / ArrowFunction

# Class: ArrowFunction

[language](../modules/language.md).ArrowFunction

## Hierarchy

- [`FunctionRef`](language.FunctionRef.md)

  ↳ **`ArrowFunction`**

  ↳↳ [`Map`](language.Map.md)

  ↳↳ [`Filter`](language.Filter.md)

  ↳↳ [`GroupBy`](language.GroupBy.md)

  ↳↳ [`Having`](language.Having.md)

  ↳↳ [`Sort`](language.Sort.md)

  ↳↳ [`Insert`](language.Insert.md)

  ↳↳ [`Update`](language.Update.md)

  ↳↳ [`Delete`](language.Delete.md)

## Table of contents

### Constructors

- [constructor](language.ArrowFunction.md#constructor)

### Properties

- [children](language.ArrowFunction.md#children)
- [dataContext](language.ArrowFunction.md#datacontext)
- [id](language.ArrowFunction.md#id)
- [index](language.ArrowFunction.md#index)
- [level](language.ArrowFunction.md#level)
- [metadata](language.ArrowFunction.md#metadata)
- [name](language.ArrowFunction.md#name)
- [parent](language.ArrowFunction.md#parent)
- [type](language.ArrowFunction.md#type)

### Methods

- [clone](language.ArrowFunction.md#clone)
- [eval](language.ArrowFunction.md#eval)
- [set](language.ArrowFunction.md#set)

## Constructors

### constructor

• **new ArrowFunction**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](language.Operand.md)[] | `[]` |
| `type` | `string` | `'any'` |

#### Inherited from

[FunctionRef](language.FunctionRef.md).[constructor](language.FunctionRef.md#constructor)

#### Defined in

[language/operands.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L15)

## Properties

### children

• **children**: [`Operand`](language.Operand.md)[]

#### Inherited from

[FunctionRef](language.FunctionRef.md).[children](language.FunctionRef.md#children)

#### Defined in

[language/operands.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L14)

___

### dataContext

• `Optional` **dataContext**: [`DataContext`](model.DataContext.md)

#### Defined in

[language/operands.ts:168](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L168)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[FunctionRef](language.FunctionRef.md).[id](language.FunctionRef.md#id)

#### Defined in

[language/operands.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L10)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[FunctionRef](language.FunctionRef.md).[index](language.FunctionRef.md#index)

#### Defined in

[language/operands.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L12)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[FunctionRef](language.FunctionRef.md).[level](language.FunctionRef.md#level)

#### Defined in

[language/operands.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L13)

___

### metadata

• `Optional` **metadata**: `OperandMetadata`

#### Inherited from

[FunctionRef](language.FunctionRef.md).[metadata](language.FunctionRef.md#metadata)

#### Defined in

[language/operands.ts:147](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L147)

___

### name

• **name**: `string`

#### Inherited from

[FunctionRef](language.FunctionRef.md).[name](language.FunctionRef.md#name)

#### Defined in

[language/operands.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L8)

___

### parent

• `Optional` **parent**: [`Operand`](language.Operand.md)

#### Inherited from

[FunctionRef](language.FunctionRef.md).[parent](language.FunctionRef.md#parent)

#### Defined in

[language/operands.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L11)

___

### type

• **type**: `string`

#### Inherited from

[FunctionRef](language.FunctionRef.md).[type](language.FunctionRef.md#type)

#### Defined in

[language/operands.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L9)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[FunctionRef](language.FunctionRef.md).[clone](language.FunctionRef.md#clone)

#### Defined in

[language/operands.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L25)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Inherited from

[FunctionRef](language.FunctionRef.md).[eval](language.FunctionRef.md#eval)

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

[FunctionRef](language.FunctionRef.md).[set](language.FunctionRef.md#set)

#### Defined in

[language/operands.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/operands.ts#L40)
