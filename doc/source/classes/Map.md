[Lambda ORM](../README.md) / Map

# Class: Map

## Hierarchy

- [`Clause`](Clause.md)

  ↳ **`Map`**

## Table of contents

### Constructors

- [constructor](Map.md#constructor)

### Properties

- [alias](Map.md#alias)
- [children](Map.md#children)
- [entity](Map.md#entity)
- [evaluator](Map.md#evaluator)
- [id](Map.md#id)
- [name](Map.md#name)
- [number](Map.md#number)
- [pos](Map.md#pos)
- [returnType](Map.md#returntype)
- [type](Map.md#type)

### Methods

- [eval](Map.md#eval)

## Constructors

### constructor

• **new Map**(`pos`, `name`, `children`, `entity`, `alias`): [`Map`](Map.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `name` | `string` |
| `children` | `Operand`[] |
| `entity` | `string` |
| `alias` | `string` |

#### Returns

[`Map`](Map.md)

#### Inherited from

[Clause](Clause.md).[constructor](Clause.md#constructor)

#### Defined in

[src/lib/sentence/domain/sentence.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/65e6d804/src/lib/sentence/domain/sentence.ts#L54)

## Properties

### alias

• **alias**: `string`

#### Inherited from

[Clause](Clause.md).[alias](Clause.md#alias)

#### Defined in

[src/lib/sentence/domain/sentence.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/65e6d804/src/lib/sentence/domain/sentence.ts#L52)

___

### children

• **children**: `Operand`[]

#### Inherited from

[Clause](Clause.md).[children](Clause.md#children)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:43

___

### entity

• **entity**: `string`

#### Inherited from

[Clause](Clause.md).[entity](Clause.md#entity)

#### Defined in

[src/lib/sentence/domain/sentence.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/65e6d804/src/lib/sentence/domain/sentence.ts#L53)

___

### evaluator

• `Optional` **evaluator**: `IEvaluator`

#### Inherited from

[Clause](Clause.md).[evaluator](Clause.md#evaluator)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:45

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Clause](Clause.md).[id](Clause.md#id)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:47

___

### name

• **name**: `any`

#### Inherited from

[Clause](Clause.md).[name](Clause.md#name)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:41

___

### number

• `Optional` **number**: `number`

#### Inherited from

[Clause](Clause.md).[number](Clause.md#number)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:46

___

### pos

• `Readonly` **pos**: `Position`

#### Inherited from

[Clause](Clause.md).[pos](Clause.md#pos)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:40

___

### returnType

• `Optional` **returnType**: `Type`

#### Inherited from

[Clause](Clause.md).[returnType](Clause.md#returntype)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:44

___

### type

• `Readonly` **type**: `OperandType`

#### Inherited from

[Clause](Clause.md).[type](Clause.md#type)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:42

## Methods

### eval

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`any`

#### Inherited from

[Clause](Clause.md).[eval](Clause.md#eval)

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:49
