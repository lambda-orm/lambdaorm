[Lambda ORM](../README.md) / [language](../modules/language.md) / Sentence

# Class: Sentence

[language](../modules/language.md).Sentence

## Hierarchy

- `Operand`

  ↳ **`Sentence`**

## Table of contents

### Constructors

- [constructor](language.Sentence.md#constructor)

### Properties

- [action](language.Sentence.md#action)
- [alias](language.Sentence.md#alias)
- [children](language.Sentence.md#children)
- [columns](language.Sentence.md#columns)
- [entity](language.Sentence.md#entity)
- [id](language.Sentence.md#id)
- [index](language.Sentence.md#index)
- [level](language.Sentence.md#level)
- [name](language.Sentence.md#name)
- [parameters](language.Sentence.md#parameters)
- [parent](language.Sentence.md#parent)
- [type](language.Sentence.md#type)

### Methods

- [clone](language.Sentence.md#clone)
- [eval](language.Sentence.md#eval)
- [getIncludes](language.Sentence.md#getincludes)
- [set](language.Sentence.md#set)

## Constructors

### constructor

• **new Sentence**(`name`, `children?`, `entity`, `alias`, `columns?`, `parameters?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | `Operand`[] | `[]` |
| `entity` | `string` | `undefined` |
| `alias` | `string` | `undefined` |
| `columns` | [`Property`](../interfaces/model.Property.md)[] | `[]` |
| `parameters` | [`Parameter`](../interfaces/model.Parameter.md)[] | `[]` |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/operand/operands.ts:72](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L72)

## Properties

### action

• **action**: `string`

#### Defined in

[src/lib/operand/operands.ts:71](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L71)

___

### alias

• **alias**: `string`

#### Defined in

[src/lib/operand/operands.ts:70](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L70)

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

[src/lib/operand/operands.ts:66](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L66)

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/operand/operands.ts:68](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L68)

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

[src/lib/operand/operands.ts:67](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L67)

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

[src/lib/operand/operands.ts:125](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L125)

___

### getIncludes

▸ **getIncludes**(): [`SentenceInclude`](language.SentenceInclude.md)[]

#### Returns

[`SentenceInclude`](language.SentenceInclude.md)[]

#### Defined in

[src/lib/operand/operands.ts:83](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/operand/operands.ts#L83)

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
