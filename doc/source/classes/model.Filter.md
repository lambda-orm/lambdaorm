[Lambda ORM](../README.md) / [model](../modules/model.md) / Filter

# Class: Filter

[model](../modules/model.md).Filter

## Hierarchy

- `ArrowFunction`

  ↳ **`Filter`**

## Table of contents

### Constructors

- [constructor](model.Filter.md#constructor)

### Properties

- [children](model.Filter.md#children)
- [data](model.Filter.md#data)
- [id](model.Filter.md#id)
- [index](model.Filter.md#index)
- [level](model.Filter.md#level)
- [metadata](model.Filter.md#metadata)
- [name](model.Filter.md#name)
- [parent](model.Filter.md#parent)
- [type](model.Filter.md#type)

### Methods

- [clone](model.Filter.md#clone)
- [eval](model.Filter.md#eval)
- [set](model.Filter.md#set)

## Constructors

### constructor

• **new Filter**(`name`, `children?`, `type?`)

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

node_modules/js-expressions/operand/operands.d.ts:59

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

node_modules/js-expressions/operand/operands.d.ts:52

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

node_modules/js-expressions/operand/operands.d.ts:53

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
