[Lambda ORM](../README.md) / Page

# Class: Page

## Hierarchy

- [`Clause`](Clause.md)

  ↳ **`Page`**

## Table of contents

### Constructors

- [constructor](Page.md#constructor)

### Properties

- [alias](Page.md#alias)
- [children](Page.md#children)
- [entity](Page.md#entity)
- [evaluator](Page.md#evaluator)
- [id](Page.md#id)
- [name](Page.md#name)
- [number](Page.md#number)
- [pos](Page.md#pos)
- [returnType](Page.md#returntype)
- [type](Page.md#type)

### Methods

- [eval](Page.md#eval)

## Constructors

### constructor

• **new Page**(`pos`, `name`, `children`, `entity`, `alias`): [`Page`](Page.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `name` | `string` |
| `children` | `Operand`[] |
| `entity` | `string` |
| `alias` | `string` |

#### Returns

[`Page`](Page.md)

#### Inherited from

[Clause](Clause.md).[constructor](Clause.md#constructor)

#### Defined in

[src/lib/sentence/domain/sentence.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/69928a4f/src/lib/sentence/domain/sentence.ts#L54)

## Properties

### alias

• **alias**: `string`

#### Inherited from

[Clause](Clause.md).[alias](Clause.md#alias)

#### Defined in

[src/lib/sentence/domain/sentence.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/69928a4f/src/lib/sentence/domain/sentence.ts#L52)

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

[src/lib/sentence/domain/sentence.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/69928a4f/src/lib/sentence/domain/sentence.ts#L53)

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
