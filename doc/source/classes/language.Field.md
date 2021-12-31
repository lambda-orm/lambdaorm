[Lambda ORM](../README.md) / [language](../modules/language.md) / Field

# Class: Field

[language](../modules/language.md).Field

## Hierarchy

- `Operand`

  ↳ **`Field`**

## Table of contents

### Constructors

- [constructor](language.Field.md#constructor)

### Properties

- [alias](language.Field.md#alias)
- [children](language.Field.md#children)
- [entity](language.Field.md#entity)
- [id](language.Field.md#id)
- [index](language.Field.md#index)
- [level](language.Field.md#level)
- [name](language.Field.md#name)
- [parent](language.Field.md#parent)
- [type](language.Field.md#type)

### Methods

- [clone](language.Field.md#clone)
- [eval](language.Field.md#eval)
- [set](language.Field.md#set)

## Constructors

### constructor

• **new Field**(`entity`, `name`, `type`, `alias?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `name` | `string` |
| `type` | `string` |
| `alias?` | `string` |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/operand/operands.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L23)

## Properties

### alias

• `Optional` **alias**: `string`

#### Defined in

[src/lib/operand/operands.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L22)

___

### children

• **children**: `Operand`[]

#### Inherited from

Operand.children

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:10

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/operand/operands.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L21)

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

▸ **clone**(): [`Field`](language.Field.md)

#### Returns

[`Field`](language.Field.md)

#### Overrides

Operand.clone

#### Defined in

[src/lib/operand/operands.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L29)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

Operand.eval

#### Defined in

[src/lib/operand/operands.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L33)

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
