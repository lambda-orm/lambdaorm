[Lambda ORM](../README.md) / [model](../modules/model.md) / Sentence

# Class: Sentence

[model](../modules/model.md).Sentence

## Hierarchy

- `Operand`

  ↳ **`Sentence`**

## Table of contents

### Constructors

- [constructor](model.Sentence.md#constructor)

### Properties

- [action](model.Sentence.md#action)
- [alias](model.Sentence.md#alias)
- [children](model.Sentence.md#children)
- [columns](model.Sentence.md#columns)
- [constraints](model.Sentence.md#constraints)
- [defaults](model.Sentence.md#defaults)
- [entity](model.Sentence.md#entity)
- [id](model.Sentence.md#id)
- [index](model.Sentence.md#index)
- [level](model.Sentence.md#level)
- [name](model.Sentence.md#name)
- [parameters](model.Sentence.md#parameters)
- [parent](model.Sentence.md#parent)
- [type](model.Sentence.md#type)
- [values](model.Sentence.md#values)

### Methods

- [clone](model.Sentence.md#clone)
- [eval](model.Sentence.md#eval)
- [getCompositeIncludes](model.Sentence.md#getcompositeincludes)
- [getIncludes](model.Sentence.md#getincludes)
- [set](model.Sentence.md#set)

## Constructors

### constructor

• **new Sentence**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`SentenceArgs`](../interfaces/model.SentenceArgs.md) |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/model/operands.ts:106](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L106)

## Properties

### action

• **action**: `string`

#### Defined in

[src/lib/model/operands.ts:101](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L101)

___

### alias

• **alias**: `string`

#### Defined in

[src/lib/model/operands.ts:100](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L100)

___

### children

• **children**: `Operand`[]

#### Inherited from

Operand.children

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:10

___

### columns

• **columns**: [`Property`](../interfaces/model.Property.md)[]

#### Defined in

[src/lib/model/operands.ts:97](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L97)

___

### constraints

• **constraints**: [`Constraint`](../interfaces/model.Constraint.md)[]

#### Defined in

[src/lib/model/operands.ts:102](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L102)

___

### defaults

• **defaults**: [`Behavior`](../interfaces/model.Behavior.md)[]

#### Defined in

[src/lib/model/operands.ts:104](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L104)

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/model/operands.ts:99](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L99)

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

### parameters

• **parameters**: [`Parameter`](../interfaces/model.Parameter.md)[]

#### Defined in

[src/lib/model/operands.ts:98](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L98)

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

___

### values

• **values**: [`Behavior`](../interfaces/model.Behavior.md)[]

#### Defined in

[src/lib/model/operands.ts:103](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L103)

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

[src/lib/model/operands.ts:170](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L170)

___

### getCompositeIncludes

▸ **getCompositeIncludes**(): [`SentenceInclude`](model.SentenceInclude.md)[]

#### Returns

[`SentenceInclude`](model.SentenceInclude.md)[]

#### Defined in

[src/lib/model/operands.ts:123](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L123)

___

### getIncludes

▸ **getIncludes**(): [`SentenceInclude`](model.SentenceInclude.md)[]

#### Returns

[`SentenceInclude`](model.SentenceInclude.md)[]

#### Defined in

[src/lib/model/operands.ts:119](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L119)

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
