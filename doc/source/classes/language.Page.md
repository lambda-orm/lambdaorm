[Lambda ORM](../README.md) / [language](../modules/language.md) / Page

# Class: Page

[language](../modules/language.md).Page

## Hierarchy

- `ChildFunction`

  ↳ **`Page`**

## Table of contents

### Constructors

- [constructor](language.Page.md#constructor)

### Properties

- [children](language.Page.md#children)
- [data](language.Page.md#data)
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

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `children?` | `Operand`[] |
| `type?` | `string` |

#### Inherited from

ChildFunction.constructor

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:11

## Properties

### children

• **children**: `Operand`[]

#### Inherited from

ChildFunction.children

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:10

___

### data

• `Optional` **data**: `Data`

#### Inherited from

ChildFunction.data

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:48

___

### id

• `Optional` **id**: `string`

#### Inherited from

ChildFunction.id

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:6

___

### index

• `Optional` **index**: `number`

#### Inherited from

ChildFunction.index

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:8

___

### level

• `Optional` **level**: `number`

#### Inherited from

ChildFunction.level

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:9

___

### metadata

• `Optional` **metadata**: `ExpressionConfig`

#### Inherited from

ChildFunction.metadata

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:44

___

### name

• **name**: `string`

#### Inherited from

ChildFunction.name

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:4

___

### parent

• `Optional` **parent**: `Operand`

#### Inherited from

ChildFunction.parent

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:7

___

### type

• **type**: `string`

#### Inherited from

ChildFunction.type

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:5

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

ChildFunction.clone

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:12

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Inherited from

ChildFunction.eval

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

ChildFunction.set

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:13
