[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Sentence

# Class: Sentence

## Extends

- `Operand`

## Constructors

### new Sentence()

> **new Sentence**(`pos`, `name`, `children`, `entity`, `alias`): [`Sentence`](Sentence.md)

#### Parameters

• **pos**: `Position`

• **name**: `string`

• **children**: `Operand`[]

• **entity**: `string`

• **alias**: `string`

#### Returns

[`Sentence`](Sentence.md)

#### Overrides

`Operand.constructor`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:61

## Properties

### action

> **action**: [`SentenceAction`](../enumerations/SentenceAction.md)

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:57

***

### alias

> **alias**: `string`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:56

***

### children

> **children**: `Operand`[]

#### Inherited from

`Operand.children`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:44

***

### columns

> **columns**: [`Property`](../interfaces/Property.md)[]

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:53

***

### constraints

> **constraints**: [`Constraint`](../interfaces/Constraint.md)[]

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:58

***

### defaults

> **defaults**: [`Behavior`](../interfaces/Behavior.md)[]

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:60

***

### entity

> **entity**: `string`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:55

***

### evaluator?

> `optional` **evaluator**: `IEvaluator`

#### Inherited from

`Operand.evaluator`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:46

***

### id?

> `optional` **id**: `string`

#### Inherited from

`Operand.id`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:48

***

### name

> **name**: `any`

#### Inherited from

`Operand.name`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:42

***

### number?

> `optional` **number**: `number`

#### Inherited from

`Operand.number`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:47

***

### parameters

> **parameters**: `Parameter`[]

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:54

***

### pos

> `readonly` **pos**: `Position`

#### Inherited from

`Operand.pos`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:41

***

### returnType?

> `optional` **returnType**: `Type`

#### Inherited from

`Operand.returnType`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:45

***

### type

> `readonly` **type**: `OperandType`

#### Inherited from

`Operand.type`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:43

***

### values

> **values**: [`Behavior`](../interfaces/Behavior.md)[]

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:59

## Methods

### eval()

> **eval**(`context`): `any`

#### Parameters

• **context**: `Context`

#### Returns

`any`

#### Inherited from

`Operand.eval`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:50

***

### evalAsync()

> **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

• **context**: `Context`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Operand.evalAsync`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:51

***

### getCompositeIncludes()

> **getCompositeIncludes**(): [`SentenceInclude`](SentenceInclude.md)[]

#### Returns

[`SentenceInclude`](SentenceInclude.md)[]

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:63

***

### getIncludes()

> **getIncludes**(): [`SentenceInclude`](SentenceInclude.md)[]

#### Returns

[`SentenceInclude`](SentenceInclude.md)[]

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:62

***

### isAsync()

> **isAsync**(): `boolean`

#### Returns

`boolean`

#### Inherited from

`Operand.isAsync`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:52

***

### solve()

> **solve**(`context`): `Promise`\<`any`\>

#### Parameters

• **context**: `Context`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Operand.solve`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:53
