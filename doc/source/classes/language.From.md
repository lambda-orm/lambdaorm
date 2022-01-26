[Lambda ORM](../README.md) / [language](../modules/language.md) / From

# Class: From

[language](../modules/language.md).From

## Hierarchy

- `Operand`

  ↳ **`From`**

## Table of contents

### Constructors

- [constructor](language.From.md#constructor)

### Properties

- [children](language.From.md#children)
- [id](language.From.md#id)
- [index](language.From.md#index)
- [level](language.From.md#level)
- [name](language.From.md#name)
- [parent](language.From.md#parent)
- [type](language.From.md#type)

### Methods

- [clone](language.From.md#clone)
- [eval](language.From.md#eval)
- [set](language.From.md#set)

## Constructors

### constructor

• **new From**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `children?` | `Operand`[] |
| `type?` | `string` |

#### Inherited from

Operand.constructor

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:11

## Properties

### children

• **children**: `Operand`[]

#### Inherited from

Operand.children

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:10

___

### id

• `Optional` **id**: `string`

#### Inherited from

Operand.id

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:6

___

### index

• `Optional` **index**: `number`

#### Inherited from

Operand.index

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:8

___

### level

• `Optional` **level**: `number`

#### Inherited from

Operand.level

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:9

___

### name

• **name**: `string`

#### Inherited from

Operand.name

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:4

___

### parent

• `Optional` **parent**: `Operand`

#### Inherited from

Operand.parent

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:7

___

### type

• **type**: `string`

#### Inherited from

Operand.type

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:5

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

Operand.clone

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:12

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

Operand.eval

#### Defined in

[src/lib/operand/operands.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/operand/operands.ts#L39)

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

Operand.set

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:13
