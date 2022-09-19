[Lambda ORM](../README.md) / [model](../modules/model.md) / Insert

# Class: Insert

[model](../modules/model.md).Insert

## Hierarchy

- `ArrowFunction`

  ↳ **`Insert`**

## Table of contents

### Constructors

- [constructor](model.Insert.md#constructor)

### Properties

- [children](model.Insert.md#children)
- [clause](model.Insert.md#clause)
- [data](model.Insert.md#data)
- [id](model.Insert.md#id)
- [index](model.Insert.md#index)
- [level](model.Insert.md#level)
- [metadata](model.Insert.md#metadata)
- [name](model.Insert.md#name)
- [parent](model.Insert.md#parent)
- [type](model.Insert.md#type)

### Methods

- [clone](model.Insert.md#clone)
- [eval](model.Insert.md#eval)
- [set](model.Insert.md#set)

## Constructors

### constructor

• **new Insert**(`name`, `children`, `clause`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `children` | `Operand`[] |
| `clause` | `string` |

#### Overrides

ArrowFunction.constructor

#### Defined in

[src/lib/model/operands.ts:72](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/operands.ts#L72)

## Properties

### children

• **children**: `Operand`[]

#### Inherited from

ArrowFunction.children

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:10

___

### clause

• **clause**: `string`

#### Defined in

[src/lib/model/operands.ts:71](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/operands.ts#L71)

___

### data

• `Optional` **data**: `Data`

#### Inherited from

ArrowFunction.data

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:62

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

node_modules/js-expressions/operand/operands.d.ts:55

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

node_modules/js-expressions/operand/operands.d.ts:56

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
