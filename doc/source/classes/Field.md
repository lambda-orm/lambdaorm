[Lambda ORM](../README.md) / Field

# Class: Field

## Hierarchy

- `Operand`

  ↳ **`Field`**

## Table of contents

### Constructors

- [constructor](Field.md#constructor)

### Properties

- [alias](Field.md#alias)
- [children](Field.md#children)
- [entity](Field.md#entity)
- [evaluator](Field.md#evaluator)
- [id](Field.md#id)
- [isRoot](Field.md#isroot)
- [name](Field.md#name)
- [number](Field.md#number)
- [pos](Field.md#pos)
- [prefix](Field.md#prefix)
- [returnType](Field.md#returntype)
- [type](Field.md#type)

### Methods

- [clone](Field.md#clone)
- [eval](Field.md#eval)
- [fieldName](Field.md#fieldname)

## Constructors

### constructor

• **new Field**(`pos`, `entity`, `name`, `returnType?`, `alias?`, `isRoot?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `entity` | `string` |
| `name` | `string` |
| `returnType?` | `Type` |
| `alias?` | `string` |
| `isRoot?` | `boolean` |

#### Overrides

Operand.constructor

#### Defined in

[src/lib/sentence/domain/sentence.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/sentence/domain/sentence.ts#L32)

## Properties

### alias

• `Optional` **alias**: `string`

#### Defined in

[src/lib/sentence/domain/sentence.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/sentence/domain/sentence.ts#L29)

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

[src/lib/sentence/domain/sentence.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/sentence/domain/sentence.ts#L28)

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

### isRoot

• `Optional` **isRoot**: `boolean`

#### Defined in

[src/lib/sentence/domain/sentence.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/sentence/domain/sentence.ts#L30)

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

### prefix

• `Optional` **prefix**: `string`

#### Defined in

[src/lib/sentence/domain/sentence.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/sentence/domain/sentence.ts#L31)

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

### clone

▸ **clone**(): [`Field`](Field.md)

#### Returns

[`Field`](Field.md)

#### Defined in

[src/lib/sentence/domain/sentence.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/sentence/domain/sentence.ts#L46)

___

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

___

### fieldName

▸ **fieldName**(): `any`

#### Returns

`any`

#### Defined in

[src/lib/sentence/domain/sentence.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/7c2cff39/src/lib/sentence/domain/sentence.ts#L39)
