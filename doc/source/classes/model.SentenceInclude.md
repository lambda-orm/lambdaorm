[Lambda ORM](../README.md) / [model](../modules/model.md) / SentenceInclude

# Class: SentenceInclude

[model](../modules/model.md).SentenceInclude

## Hierarchy

- `Operand`

  ↳ **`SentenceInclude`**

## Table of contents

### Constructors

- [constructor](model.SentenceInclude.md#constructor)

### Properties

- [children](model.SentenceInclude.md#children)
- [id](model.SentenceInclude.md#id)
- [index](model.SentenceInclude.md#index)
- [level](model.SentenceInclude.md#level)
- [name](model.SentenceInclude.md#name)
- [parent](model.SentenceInclude.md#parent)
- [relation](model.SentenceInclude.md#relation)
- [type](model.SentenceInclude.md#type)

### Methods

- [clone](model.SentenceInclude.md#clone)
- [eval](model.SentenceInclude.md#eval)
- [set](model.SentenceInclude.md#set)

## Constructors

### constructor

• **new SentenceInclude**(`name`, `children`, `relation`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `children` | `Operand`[] |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/model/operands.ts:177](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L177)

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

### relation

• **relation**: [`Relation`](../interfaces/model.Relation.md)

#### Defined in

[src/lib/model/operands.ts:175](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L175)

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

[src/lib/model/operands.ts:183](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L183)

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
