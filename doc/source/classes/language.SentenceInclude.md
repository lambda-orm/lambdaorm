[Lambda ORM](../README.md) / [language](../modules/language.md) / SentenceInclude

# Class: SentenceInclude

[language](../modules/language.md).SentenceInclude

## Hierarchy

- `Operand`

  ↳ **`SentenceInclude`**

## Table of contents

### Constructors

- [constructor](language.SentenceInclude.md#constructor)

### Properties

- [children](language.SentenceInclude.md#children)
- [id](language.SentenceInclude.md#id)
- [index](language.SentenceInclude.md#index)
- [level](language.SentenceInclude.md#level)
- [name](language.SentenceInclude.md#name)
- [parent](language.SentenceInclude.md#parent)
- [relation](language.SentenceInclude.md#relation)
- [type](language.SentenceInclude.md#type)

### Methods

- [clone](language.SentenceInclude.md#clone)
- [eval](language.SentenceInclude.md#eval)
- [set](language.SentenceInclude.md#set)

## Constructors

### constructor

• **new SentenceInclude**(`name`, `children?`, `relation`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | `Operand`[] | `[]` |
| `relation` | [`Relation`](../interfaces/model.Relation.md) | `undefined` |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/operand/operands.ts:132](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/operand/operands.ts#L132)

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

[src/lib/operand/operands.ts:130](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/operand/operands.ts#L130)

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

[src/lib/operand/operands.ts:138](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/operand/operands.ts#L138)

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
