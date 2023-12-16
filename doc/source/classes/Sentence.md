[Lambda ORM](../README.md) / Sentence

# Class: Sentence

## Hierarchy

- `Operand`

  ↳ **`Sentence`**

## Table of contents

### Constructors

- [constructor](Sentence.md#constructor)

### Properties

- [action](Sentence.md#action)
- [alias](Sentence.md#alias)
- [children](Sentence.md#children)
- [columns](Sentence.md#columns)
- [constraints](Sentence.md#constraints)
- [crudAction](Sentence.md#crudaction)
- [defaults](Sentence.md#defaults)
- [entity](Sentence.md#entity)
- [evaluator](Sentence.md#evaluator)
- [id](Sentence.md#id)
- [name](Sentence.md#name)
- [number](Sentence.md#number)
- [parameters](Sentence.md#parameters)
- [pos](Sentence.md#pos)
- [returnType](Sentence.md#returntype)
- [type](Sentence.md#type)
- [values](Sentence.md#values)

### Methods

- [eval](Sentence.md#eval)
- [evalAsync](Sentence.md#evalasync)
- [getCompositeIncludes](Sentence.md#getcompositeincludes)
- [getIncludes](Sentence.md#getincludes)
- [isAsync](Sentence.md#isasync)
- [solve](Sentence.md#solve)

## Constructors

### constructor

• **new Sentence**(`pos`, `name`, `children`, `entity`, `alias`): [`Sentence`](Sentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `Position` |
| `name` | `string` |
| `children` | `Operand`[] |
| `entity` | `string` |
| `alias` | `string` |

#### Returns

[`Sentence`](Sentence.md)

#### Overrides

Operand.constructor

#### Defined in

[src/lib/sentence/domain/sentence.ts:85](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L85)

## Properties

### action

• **action**: [`SentenceAction`](../enums/SentenceAction.md)

#### Defined in

[src/lib/sentence/domain/sentence.ts:79](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L79)

___

### alias

• **alias**: `string`

#### Defined in

[src/lib/sentence/domain/sentence.ts:78](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L78)

___

### children

• **children**: `Operand`[]

#### Inherited from

Operand.children

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:44

___

### columns

• **columns**: [`Property`](../interfaces/Property.md)[]

#### Defined in

[src/lib/sentence/domain/sentence.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L75)

___

### constraints

• **constraints**: [`Constraint`](../interfaces/Constraint.md)[]

#### Defined in

[src/lib/sentence/domain/sentence.ts:81](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L81)

___

### crudAction

• **crudAction**: [`SentenceCrudAction`](../enums/SentenceCrudAction.md)

#### Defined in

[src/lib/sentence/domain/sentence.ts:80](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L80)

___

### defaults

• **defaults**: [`Behavior`](../interfaces/Behavior.md)[]

#### Defined in

[src/lib/sentence/domain/sentence.ts:83](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L83)

___

### entity

• **entity**: `string`

#### Defined in

[src/lib/sentence/domain/sentence.ts:77](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L77)

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

### parameters

• **parameters**: `Parameter`[]

#### Defined in

[src/lib/sentence/domain/sentence.ts:76](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L76)

___

### pos

• `Readonly` **pos**: `Position`

#### Inherited from

Operand.pos

#### Defined in

node_modules/3xpr/shared/domain/operand.d.ts:41

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

___

### values

• **values**: [`Behavior`](../interfaces/Behavior.md)[]

#### Defined in

[src/lib/sentence/domain/sentence.ts:82](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L82)

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

### getCompositeIncludes

▸ **getCompositeIncludes**(): [`SentenceInclude`](SentenceInclude.md)[]

#### Returns

[`SentenceInclude`](SentenceInclude.md)[]

#### Defined in

[src/lib/sentence/domain/sentence.ts:103](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L103)

___

### getIncludes

▸ **getIncludes**(): [`SentenceInclude`](SentenceInclude.md)[]

#### Returns

[`SentenceInclude`](SentenceInclude.md)[]

#### Defined in

[src/lib/sentence/domain/sentence.ts:99](https://github.com/FlavioLionelRita/lambdaorm/blob/3a7cdffc/src/lib/sentence/domain/sentence.ts#L99)

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
