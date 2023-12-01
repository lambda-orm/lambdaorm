[Lambda ORM](../README.md) / Constant

# Class: Constant

## Hierarchy

- `Operand`

  ↳ **`Constant`**

## Table of contents

### Constructors

- [constructor](Constant.md#constructor)

### Properties

- [children](Constant.md#children)
- [evaluator](Constant.md#evaluator)
- [id](Constant.md#id)
- [name](Constant.md#name)
- [number](Constant.md#number)
- [pos](Constant.md#pos)
- [returnType](Constant.md#returntype)
- [type](Constant.md#type)

### Methods

- [eval](Constant.md#eval)

## Constructors

### constructor

• **new Constant**(`pos`, `name`, `type`, `children?`, `returnType?`): [`Constant`](Constant.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `name` | `any` |
| `type` | `OperandType` |
| `children?` | `Operand`[] |
| `returnType?` | `Type` |

#### Returns

[`Constant`](Constant.md)

#### Inherited from

Operand.constructor

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:48

## Properties

### children

• **children**: `Operand`[]

#### Inherited from

Operand.children

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:43

___

### evaluator

• `Optional` **evaluator**: `IEvaluator`

#### Inherited from

Operand.evaluator

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:45

___

### id

• `Optional` **id**: `string`

#### Inherited from

Operand.id

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:47

___

### name

• **name**: `any`

#### Inherited from

Operand.name

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:41

___

### number

• `Optional` **number**: `number`

#### Inherited from

Operand.number

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:46

___

### pos

• `Readonly` **pos**: `Position`

#### Inherited from

Operand.pos

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:40

___

### returnType

• `Optional` **returnType**: `Type`

#### Inherited from

Operand.returnType

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:44

___

### type

• `Readonly` **type**: `OperandType`

#### Inherited from

Operand.type

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:42

## Methods

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

Operand.eval

#### Defined in

[src/lib/sentence/domain/sentence.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/b900e4c6/src/lib/sentence/domain/sentence.ts#L8)
