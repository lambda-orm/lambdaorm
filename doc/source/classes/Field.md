[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Field

# Class: Field

## Extends

- `Operand`

## Constructors

### new Field()

> **new Field**(`pos`, `entity`, `name`, `returnType`?, `alias`?, `isRoot`?): [`Field`](Field.md)

#### Parameters

• **pos**: `Position`

• **entity**: `string`

• **name**: `string`

• **returnType?**: `Type`

• **alias?**: `string`

• **isRoot?**: `boolean`

#### Returns

[`Field`](Field.md)

#### Overrides

`Operand.constructor`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:13

## Properties

### alias?

> `optional` **alias**: `string`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:10

***

### children

> **children**: `Operand`[]

#### Inherited from

`Operand.children`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:44

***

### entity

> **entity**: `string`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:9

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

### isRoot?

> `optional` **isRoot**: `boolean`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:11

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

### pos

> `readonly` **pos**: `Position`

#### Inherited from

`Operand.pos`

#### Source

node\_modules/3xpr/shared/domain/operand.d.ts:41

***

### prefix?

> `optional` **prefix**: `string`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:12

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

## Methods

### clone()

> **clone**(): [`Field`](Field.md)

#### Returns

[`Field`](Field.md)

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:15

***

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

### fieldName()

> **fieldName**(): `any`

#### Returns

`any`

#### Source

node\_modules/lambdaorm-base/sentence/domain/sentence.d.ts:14

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
