[Lambda ORM](../README.md) / [model](../modules/model.md) / Field

# Class: Field

[model](../modules/model.md).Field

## Hierarchy

- `Operand`

  ↳ **`Field`**

## Table of contents

### Constructors

- [constructor](model.Field.md#constructor)

### Properties

- [alias](model.Field.md#alias)
- [children](model.Field.md#children)
- [entity](model.Field.md#entity)
- [id](model.Field.md#id)
- [index](model.Field.md#index)
- [isRoot](model.Field.md#isroot)
- [level](model.Field.md#level)
- [name](model.Field.md#name)
- [parent](model.Field.md#parent)
- [prefix](model.Field.md#prefix)
- [type](model.Field.md#type)

### Methods

- [clone](model.Field.md#clone)
- [eval](model.Field.md#eval)
- [set](model.Field.md#set)

## Constructors

### constructor

• **new Field**(`entity`, `name`, `type`, `alias?`, `isRoot?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `name` | `string` |
| `type` | `string` |
| `alias?` | `string` |
| `isRoot?` | `boolean` |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/model/operands.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L25)

## Properties

### alias

• `Optional` **alias**: `string`

#### Defined in

[src/lib/model/operands.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L22)

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

[src/lib/model/operands.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L21)

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

### isRoot

• `Optional` **isRoot**: `boolean`

#### Defined in

[src/lib/model/operands.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L23)

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

### prefix

• `Optional` **prefix**: `string`

#### Defined in

[src/lib/model/operands.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L24)

___

### type

• **type**: `string`

#### Inherited from

Operand.type

#### Defined in

node_modules/js-expressions/operand/operands.d.ts:5

## Methods

### clone

▸ **clone**(): [`Field`](model.Field.md)

#### Returns

[`Field`](model.Field.md)

#### Overrides

Operand.clone

#### Defined in

[src/lib/model/operands.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L32)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

Operand.eval

#### Defined in

[src/lib/model/operands.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/operands.ts#L36)

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
