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
- [evalAsync](SentenceInclude.md#evalasync)
- [isAsync](SentenceInclude.md#isasync)
- [solve](SentenceInclude.md#solve)

## Constructors

### constructor

• **new SentenceInclude**(`pos`, `name`, `children`, `relation`): [`SentenceInclude`](SentenceInclude.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `name` | `string` |
| `children` | `Operand`[] |
| `relation` | [`Relation`](../interfaces/Relation.md) |

#### Returns

[`SentenceInclude`](SentenceInclude.md)

#### Overrides

Operand.constructor

#### Defined in

node_modules/lambdaorm-base/sentence/domain/sentence.d.ts:67

## Properties

### children

• **children**: `Operand`[]

#### Inherited from

Operand.children

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:44

___

### evaluator

• `Optional` **evaluator**: `IEvaluator`

#### Inherited from

Operand.evaluator

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:46

___

### id

• `Optional` **id**: `string`

#### Inherited from

Operand.id

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:48

___

### name

• **name**: `any`

#### Inherited from

Operand.name

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:42

___

### number

• `Optional` **number**: `number`

#### Inherited from

Operand.number

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:47

___

### pos

• `Readonly` **pos**: `Position`

#### Inherited from

Operand.pos

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:41

___

### relation

• **relation**: [`Relation`](../interfaces/Relation.md)

#### Defined in

node_modules/lambdaorm-base/sentence/domain/sentence.d.ts:66

___

### returnType

• `Optional` **returnType**: `Type`

#### Inherited from

Operand.returnType

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:45

___

### type

• `Readonly` **type**: `OperandType`

#### Inherited from

Operand.type

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:43

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

node_modules/3xpr/shared/domain/operand.d.ts:50

___

### evalAsync

▸ **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

Operand.evalAsync

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:51

___

### isAsync

▸ **isAsync**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Operand.isAsync

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:52

___

### solve

▸ **solve**(`context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

Operand.solve

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:53
