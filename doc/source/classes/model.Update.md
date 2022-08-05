[Lambda ORM](../README.md) / [model](../modules/model.md) / Update

# Class: Update

[model](../modules/model.md).Update

## Hierarchy

- `ArrowFunction`

  ↳ **`Update`**

## Table of contents

### Constructors

- [constructor](model.Update.md#constructor)

### Properties

- [alias](model.Update.md#alias)
- [children](model.Update.md#children)
- [data](model.Update.md#data)
- [id](model.Update.md#id)
- [index](model.Update.md#index)
- [level](model.Update.md#level)
- [metadata](model.Update.md#metadata)
- [name](model.Update.md#name)
- [parent](model.Update.md#parent)
- [type](model.Update.md#type)

### Methods

- [clone](model.Update.md#clone)
- [eval](model.Update.md#eval)
- [set](model.Update.md#set)

## Constructors

### constructor

• **new Update**(`name`, `children`, `alias`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `children` | `Operand`[] |
| `alias` | `string` |

#### Overrides

ArrowFunction.constructor

#### Defined in

[src/lib/model/operands.ts:79](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L79)

## Properties

### alias

• **alias**: `string`

#### Defined in

[src/lib/model/operands.ts:78](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L78)

___

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
