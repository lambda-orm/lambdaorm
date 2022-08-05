[Lambda ORM](../README.md) / [model](../modules/model.md) / From

# Class: From

[model](../modules/model.md).From

## Hierarchy

- `Operand`

  ↳ **`From`**

## Table of contents

### Constructors

- [constructor](model.From.md#constructor)

### Properties

- [alias](model.From.md#alias)
- [children](model.From.md#children)
- [id](model.From.md#id)
- [index](model.From.md#index)
- [level](model.From.md#level)
- [name](model.From.md#name)
- [parent](model.From.md#parent)
- [type](model.From.md#type)

### Methods

- [clone](model.From.md#clone)
- [eval](model.From.md#eval)
- [set](model.From.md#set)

## Constructors

### constructor

• **new From**(`name`, `alias`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `alias` | `string` |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/model/operands.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/operands.ts#L42)

## Properties

### alias

• **alias**: `string`

#### Defined in

[src/lib/model/operands.ts:41](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/operands.ts#L41)

___

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

[src/lib/model/operands.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/operands.ts#L47)

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
