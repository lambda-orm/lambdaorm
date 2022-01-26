[Lambda ORM](../README.md) / [language](../modules/language.md) / Join

# Class: Join

[language](../modules/language.md).Join

## Hierarchy

- `Operand`

  ↳ **`Join`**

## Table of contents

### Constructors

- [constructor](language.Join.md#constructor)

### Properties

- [children](language.Join.md#children)
- [id](language.Join.md#id)
- [index](language.Join.md#index)
- [level](language.Join.md#level)
- [name](language.Join.md#name)
- [parent](language.Join.md#parent)
- [type](language.Join.md#type)

### Methods

- [clone](language.Join.md#clone)
- [eval](language.Join.md#eval)
- [set](language.Join.md#set)

## Constructors

### constructor

• **new Join**(`name`, `children?`, `type?`)

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

[src/lib/operand/operands.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/operand/operands.ts#L44)

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
