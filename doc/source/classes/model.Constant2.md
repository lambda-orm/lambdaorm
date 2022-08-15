[Lambda ORM](../README.md) / [model](../modules/model.md) / Constant2

# Class: Constant2

[model](../modules/model.md).Constant2

## Hierarchy

- `Constant`

  ↳ **`Constant2`**

## Table of contents

### Constructors

- [constructor](model.Constant2.md#constructor)

### Properties

- [children](model.Constant2.md#children)
- [id](model.Constant2.md#id)
- [index](model.Constant2.md#index)
- [level](model.Constant2.md#level)
- [name](model.Constant2.md#name)
- [parent](model.Constant2.md#parent)
- [type](model.Constant2.md#type)

### Methods

- [clone](model.Constant2.md#clone)
- [eval](model.Constant2.md#eval)
- [set](model.Constant2.md#set)

## Constructors

### constructor

• **new Constant2**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Inherited from

Constant.constructor

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:17

## Properties

### children

• **children**: `Operand`[]

#### Inherited from

Constant.children

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:10

___

### id

• `Optional` **id**: `string`

#### Inherited from

Constant.id

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:6

___

### index

• `Optional` **index**: `number`

#### Inherited from

Constant.index

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:8

___

### level

• `Optional` **level**: `number`

#### Inherited from

Constant.level

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:9

___

### name

• **name**: `string`

#### Inherited from

Constant.name

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:4

___

### parent

• `Optional` **parent**: `Operand`

#### Inherited from

Constant.parent

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:7

___

### type

• **type**: `string`

#### Inherited from

Constant.type

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:5

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

Constant.clone

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:12

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

Constant.eval

#### Defined in

[src/lib/model/operands.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L7)

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

Constant.set

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:13
