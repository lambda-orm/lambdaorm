[Lambda ORM](../README.md) / Clause

# Class: Clause

## Hierarchy

- `Operand`

  ↳ **`Clause`**

  ↳↳ [`Map`](Map.md)

  ↳↳ [`Filter`](Filter.md)

  ↳↳ [`GroupBy`](GroupBy.md)

  ↳↳ [`Having`](Having.md)

  ↳↳ [`Sort`](Sort.md)

  ↳↳ [`Page`](Page.md)

  ↳↳ [`From`](From.md)

  ↳↳ [`Join`](Join.md)

  ↳↳ [`Insert`](Insert.md)

  ↳↳ [`BulkInsert`](BulkInsert.md)

  ↳↳ [`Update`](Update.md)

  ↳↳ [`Delete`](Delete.md)

## Table of contents

### Constructors

- [constructor](Clause.md#constructor)

### Properties

- [alias](Clause.md#alias)
- [children](Clause.md#children)
- [entity](Clause.md#entity)
- [evaluator](Clause.md#evaluator)
- [id](Clause.md#id)
- [name](Clause.md#name)
- [number](Clause.md#number)
- [pos](Clause.md#pos)
- [returnType](Clause.md#returntype)
- [type](Clause.md#type)

### Methods

- [eval](Clause.md#eval)

## Constructors

### constructor

• **new Clause**(`pos`, `name`, `children`, `entity`, `alias`): [`Clause`](Clause.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `name` | `string` |
| `children` | `Operand`[] |
| `entity` | `string` |
| `alias` | `string` |

#### Returns

[`Clause`](Clause.md)

#### Overrides

Operand.constructor

#### Defined in

[src/lib/sentence/domain/sentence.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/sentence/domain/sentence.ts#L54)

## Properties

### alias

• **alias**: `string`

#### Defined in

[src/lib/sentence/domain/sentence.ts:52](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/sentence/domain/sentence.ts#L52)

___

### children

• **children**: `Operand`[]

#### Inherited from

Operand.children

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:43

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/sentence/domain/sentence.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/52663e30/src/lib/sentence/domain/sentence.ts#L53)

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
