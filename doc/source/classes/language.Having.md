[Lambda ORM](../README.md) / [language](../modules/language.md) / Having

# Class: Having

[language](../modules/language.md).Having

## Hierarchy

- `ArrowFunction`

  ↳ **`Having`**

## Table of contents

### Constructors

- [constructor](language.Having.md#constructor)

### Properties

- [children](language.Having.md#children)
- [data](language.Having.md#data)
- [id](language.Having.md#id)
- [index](language.Having.md#index)
- [level](language.Having.md#level)
- [metadata](language.Having.md#metadata)
- [name](language.Having.md#name)
- [parent](language.Having.md#parent)
- [type](language.Having.md#type)

### Methods

- [clone](language.Having.md#clone)
- [eval](language.Having.md#eval)
- [set](language.Having.md#set)

## Constructors

### constructor

• **new Having**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `children?` | `Operand`[] |
| `type?` | `string` |

#### Inherited from

ArrowFunction.constructor

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:11

## Properties

### children

• **children**: `Operand`[]

#### Inherited from

ArrowFunction.children

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:10

___

### data

• `Optional` **data**: `Data`

#### Inherited from

ArrowFunction.data

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:51

___

### id

• `Optional` **id**: `string`

#### Inherited from

ArrowFunction.id

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:6

___

### index

• `Optional` **index**: `number`

#### Inherited from

ArrowFunction.index

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:8

___

### level

• `Optional` **level**: `number`

#### Inherited from

ArrowFunction.level

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:9

___

### metadata

• `Optional` **metadata**: `ExpressionConfig`

#### Inherited from

ArrowFunction.metadata

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:44

___

### name

• **name**: `string`

#### Inherited from

ArrowFunction.name

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:4

___

### parent

• `Optional` **parent**: `Operand`

#### Inherited from

ArrowFunction.parent

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:7

___

### type

• **type**: `string`

#### Inherited from

ArrowFunction.type

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:5

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

ArrowFunction.clone

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:12

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Inherited from

ArrowFunction.eval

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:45

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

ArrowFunction.set

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:13
