[Lambda ORM](../README.md) / [model](../modules/model.md) / Join

# Class: Join

[model](../modules/model.md).Join

## Hierarchy

- `Operand`

  ↳ **`Join`**

## Table of contents

### Constructors

- [constructor](model.Join.md#constructor)

### Properties

- [alias](model.Join.md#alias)
- [children](model.Join.md#children)
- [entity](model.Join.md#entity)
- [id](model.Join.md#id)
- [index](model.Join.md#index)
- [level](model.Join.md#level)
- [name](model.Join.md#name)
- [parent](model.Join.md#parent)
- [type](model.Join.md#type)

### Methods

- [clone](model.Join.md#clone)
- [eval](model.Join.md#eval)
- [set](model.Join.md#set)

## Constructors

### constructor

• **new Join**(`name`, `children`, `entity`, `alias`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `children` | `Operand`[] |
| `entity` | `string` |
| `alias` | `string` |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/model/operands.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/operands.ts#L54)

## Properties

### alias

• **alias**: `string`

#### Defined in

[src/lib/model/operands.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/operands.ts#L52)

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

[src/lib/model/operands.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/operands.ts#L53)

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

[src/lib/model/operands.ts:60](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/operands.ts#L60)

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
