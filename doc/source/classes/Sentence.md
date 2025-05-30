[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Sentence

# Class: Sentence

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:52

## Extends

- `Operand`

## Constructors

### Constructor

> **new Sentence**(`pos`, `name`, `children`, `entity`, `alias`): `Sentence`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:61

#### Parameters

##### pos

`Position`

##### name

`string`

##### children

`Operand`[]

##### entity

`string`

##### alias

`string`

#### Returns

`Sentence`

#### Overrides

`Operand.constructor`

## Properties

### action

> **action**: [`SentenceAction`](../enumerations/SentenceAction.md)

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:57

***

### alias

> **alias**: `string`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:56

***

### children

> **children**: `Operand`[]

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:44

#### Inherited from

`Operand.children`

***

### columns

> **columns**: [`Property`](../interfaces/Property.md)[]

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:53

***

### constraints

> **constraints**: [`Constraint`](../interfaces/Constraint.md)[]

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:58

***

### defaults

> **defaults**: [`Behavior`](../interfaces/Behavior.md)[]

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:60

***

### entity

> **entity**: `string`

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:55

***

### evaluator?

> `optional` **evaluator**: `IEvaluator`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:46

#### Inherited from

`Operand.evaluator`

***

### id?

> `optional` **id**: `string`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:48

#### Inherited from

`Operand.id`

***

### name

> **name**: `any`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:42

#### Inherited from

`Operand.name`

***

### number?

> `optional` **number**: `number`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:47

#### Inherited from

`Operand.number`

***

### parameters

> **parameters**: `Parameter`[]

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:54

***

### pos

> `readonly` **pos**: `Position`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:41

#### Inherited from

`Operand.pos`

***

### returnType?

> `optional` **returnType**: `Type`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:45

#### Inherited from

`Operand.returnType`

***

### type

> `readonly` **type**: `OperandType`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:43

#### Inherited from

`Operand.type`

***

### values

> **values**: [`Behavior`](../interfaces/Behavior.md)[]

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:59

## Methods

### eval()

> **eval**(`context`): `any`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:50

#### Parameters

##### context

`Context`

#### Returns

`any`

#### Inherited from

`Operand.eval`

***

### evalAsync()

> **evalAsync**(`context`): `Promise`\<`any`\>

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:51

#### Parameters

##### context

`Context`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Operand.evalAsync`

***

### getCompositeIncludes()

> **getCompositeIncludes**(): [`SentenceInclude`](SentenceInclude.md)[]

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:63

#### Returns

[`SentenceInclude`](SentenceInclude.md)[]

***

### getIncludes()

> **getIncludes**(): [`SentenceInclude`](SentenceInclude.md)[]

Defined in: node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:62

#### Returns

[`SentenceInclude`](SentenceInclude.md)[]

***

### isAsync()

> **isAsync**(): `boolean`

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:52

#### Returns

`boolean`

#### Inherited from

`Operand.isAsync`

***

### solve()

> **solve**(`context`): `Promise`\<`any`\>

Defined in: node\_modules/3xpr/shared/domain/operand.d.ts:53

#### Parameters

##### context

`Context`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Operand.solve`
