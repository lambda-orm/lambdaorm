[Lambda ORM](../README.md) / SentenceInclude

# Class: SentenceInclude

## Hierarchy

- `Operand`

  ↳ **`SentenceInclude`**

## Table of contents

### Constructors

- [constructor](SentenceInclude.md#constructor)

### Properties

- [children](SentenceInclude.md#children)
- [evaluator](SentenceInclude.md#evaluator)
- [id](SentenceInclude.md#id)
- [name](SentenceInclude.md#name)
- [number](SentenceInclude.md#number)
- [pos](SentenceInclude.md#pos)
- [relation](SentenceInclude.md#relation)
- [returnType](SentenceInclude.md#returntype)
- [type](SentenceInclude.md#type)

### Methods

- [eval](SentenceInclude.md#eval)

## Constructors

### constructor

• **new SentenceInclude**(`pos`, `name`, `children`, `relation`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `name` | `string` |
| `children` | `Operand`[] |
| `relation` | [`Relation`](../interfaces/Relation.md) |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/sentence/domain/sentence.ts:130](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/sentence/domain/sentence.ts#L130)

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

### relation

• **relation**: [`Relation`](../interfaces/Relation.md)

#### Defined in

[src/lib/sentence/domain/sentence.ts:129](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/sentence/domain/sentence.ts#L129)

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

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`any`

#### Inherited from

Operand.eval

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:49
